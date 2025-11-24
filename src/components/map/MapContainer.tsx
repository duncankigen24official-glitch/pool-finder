import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoiZHVuY2Fua2lnZW4yNCIsImEiOiJjbWljb2FsOG4xZnh1MmlzYTltNnIwY2tuIn0.G2yMP2YUVYSAwhDSTwhoFg';

interface Marker {
  latitude: number;
  longitude: number;
  label?: string;
  color?: string;
}

interface MapContainerProps {
  center?: { latitude: number; longitude: number };
  markers?: Marker[];
  zoom?: number;
  showUserLocation?: boolean;
  onLocationChange?: (location: { latitude: number; longitude: number }) => void;
  className?: string;
}

export const MapContainer = ({
  center = { latitude: -1.286389, longitude: 36.817223 }, // Nairobi default
  markers = [],
  zoom = 12,
  showUserLocation = false,
  onLocationChange,
  className = "w-full h-full"
}: MapContainerProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [userMarker, setUserMarker] = useState<mapboxgl.Marker | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [center.longitude, center.latitude],
      zoom: zoom
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    map.current.addControl(new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: showUserLocation,
      showUserHeading: true
    }), 'top-right');

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  // Update center
  useEffect(() => {
    if (map.current && center) {
      map.current.flyTo({
        center: [center.longitude, center.latitude],
        zoom: zoom
      });
    }
  }, [center.latitude, center.longitude, zoom]);

  // Update markers
  useEffect(() => {
    if (!map.current) return;

    // Remove old markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Add new markers
    markers.forEach((marker) => {
      const el = document.createElement('div');
      el.className = 'w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shadow-lg';
      el.style.backgroundColor = marker.color || '#6366f1';
      
      if (marker.label) {
        el.textContent = marker.label;
      }

      const mapMarker = new mapboxgl.Marker(el)
        .setLngLat([marker.longitude, marker.latitude])
        .addTo(map.current!);

      markersRef.current.push(mapMarker);
    });
  }, [markers]);

  // Track user location
  useEffect(() => {
    if (!map.current || !showUserLocation) return;

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        if (!userMarker) {
          const marker = new mapboxgl.Marker({ color: '#3b82f6' })
            .setLngLat([longitude, latitude])
            .addTo(map.current!);
          setUserMarker(marker);
        } else {
          userMarker.setLngLat([longitude, latitude]);
        }

        onLocationChange?.({ latitude, longitude });
      },
      (error) => console.error('Geolocation error:', error),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
      userMarker?.remove();
    };
  }, [showUserLocation, onLocationChange]);

  return <div ref={mapContainer} className={className} />;
};
