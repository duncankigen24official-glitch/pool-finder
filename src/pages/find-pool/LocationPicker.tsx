import { useState, useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MapPin, Search, Loader2, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapContainer } from "@/components/map/MapContainer";
import { useGeolocation } from "@/hooks/useGeolocation";
import mapboxgl from 'mapbox-gl';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiZHVuY2Fua2lnZW4yNCIsImEiOiJjbWljb2FsOG4xZnh1MmlzYTltNnIwY2tuIn0.G2yMP2YUVYSAwhDSTwhoFg';

interface SearchResult {
  id: string;
  place_name: string;
  center: [number, number];
}

const LocationPicker = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get("mode") || "source";
  const { position, loading: geoLoading } = useGeolocation();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<{latitude: number; longitude: number} | null>(null);
  const [selectedAddress, setSelectedAddress] = useState("Loading location...");
  const [marker, setMarker] = useState<{latitude: number; longitude: number} | null>(null);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [initialLocationSet, setInitialLocationSet] = useState(false);

  // Set initial location from GPS
  useEffect(() => {
    if (position && !initialLocationSet) {
      const location = { latitude: position.latitude, longitude: position.longitude };
      setSelectedLocation(location);
      setMarker(location);
      reverseGeocode(position.latitude, position.longitude);
      setInitialLocationSet(true);
    } else if (!geoLoading && !position && !initialLocationSet) {
      // GPS failed, use default (Nairobi)
      const defaultLocation = { latitude: -1.2921, longitude: 36.8219 };
      setSelectedLocation(defaultLocation);
      setMarker(defaultLocation);
      reverseGeocode(defaultLocation.latitude, defaultLocation.longitude);
      setInitialLocationSet(true);
    }
  }, [position, geoLoading, initialLocationSet]);

  // Reverse geocode to get address from coordinates
  const reverseGeocode = useCallback(async (lat: number, lng: number) => {
    setIsLoadingAddress(true);
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOX_TOKEN}`
      );
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        setSelectedAddress(data.features[0].place_name);
      } else {
        setSelectedAddress(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
      }
    } catch (error) {
      console.error('Reverse geocoding error:', error);
      setSelectedAddress(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
    } finally {
      setIsLoadingAddress(false);
    }
  }, []);

  // Search for places
  useEffect(() => {
    const searchPlaces = async () => {
      if (!searchQuery || searchQuery.length < 3) {
        setSearchResults([]);
        setShowResults(false);
        return;
      }

      setIsSearching(true);
      try {
        const response = await fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(searchQuery)}.json?access_token=${MAPBOX_TOKEN}&limit=5`
        );
        const data = await response.json();
        
        if (data.features) {
          setSearchResults(data.features);
          setShowResults(true);
        }
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsSearching(false);
      }
    };

    const debounceTimer = setTimeout(searchPlaces, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery]);

  const handleSearchResultSelect = (result: SearchResult) => {
    const [lng, lat] = result.center;
    setSelectedLocation({ latitude: lat, longitude: lng });
    setMarker({ latitude: lat, longitude: lng });
    setSelectedAddress(result.place_name);
    setSearchQuery(""); // Clear search query
    setSearchResults([]); // Clear results
    setShowResults(false); // Close dropdown
  };

  const handleMapClick = useCallback((event: mapboxgl.MapMouseEvent) => {
    const { lng, lat } = event.lngLat;
    setSelectedLocation({ latitude: lat, longitude: lng });
    setMarker({ latitude: lat, longitude: lng });
    reverseGeocode(lat, lng);
  }, [reverseGeocode]);

  const handleUseMyLocation = () => {
    if (position) {
      const location = { latitude: position.latitude, longitude: position.longitude };
      setSelectedLocation(location);
      setMarker(location);
      reverseGeocode(position.latitude, position.longitude);
    }
  };

  const handleConfirm = () => {
    if (!selectedLocation) return;
    
    // Determine return path from URL param (defaults to find-pool)
    const returnTo = searchParams.get("returnTo") || "find-pool";
    const returnPath = `/${returnTo}`;
    
    // Preserve existing location params and update the selected location
    const params = new URLSearchParams();
    
    // Keep existing source/destination if they exist
    const existingSource = searchParams.get("source");
    const existingSourceAddress = searchParams.get("sourceAddress");
    const existingDestination = searchParams.get("destination");
    const existingDestinationAddress = searchParams.get("destinationAddress");
    
    if (existingSource && mode !== "source") params.set("source", existingSource);
    if (existingSourceAddress && mode !== "source") params.set("sourceAddress", existingSourceAddress);
    if (existingDestination && mode !== "destination") params.set("destination", existingDestination);
    if (existingDestinationAddress && mode !== "destination") params.set("destinationAddress", existingDestinationAddress);
    
    // Set the new location
    params.set(mode, `${selectedLocation.latitude},${selectedLocation.longitude}`);
    params.set(`${mode}Address`, selectedAddress);
    
    navigate(`${returnPath}?${params.toString()}`, { replace: true });
  };

  // Show loading while getting GPS
  if (geoLoading && !initialLocationSet) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-2" />
          <p className="text-muted-foreground">Getting your location...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen w-full relative bg-background">
      {/* Search Bar */}
      <div className="absolute top-4 left-4 right-4 z-10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search location"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchResults.length > 0 && setShowResults(true)}
            className="pl-10 pr-10 bg-card h-12 rounded-xl shadow-lg"
          />
          {isSearching && (
            <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground animate-spin" />
          )}
          
          {/* Search Results Dropdown */}
          {showResults && searchResults.length > 0 && (
            <div className="absolute top-full mt-2 left-0 right-0 bg-card rounded-xl shadow-2xl overflow-hidden max-h-80 overflow-y-auto">
              {searchResults.map((result) => (
                <button
                  key={result.id}
                  onClick={() => handleSearchResultSelect(result)}
                  className="w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors border-b border-border last:border-b-0 flex items-start gap-3"
                >
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground">{result.place_name}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Use My Location Button */}
        <button
          onClick={handleUseMyLocation}
          disabled={!position}
          className="mt-2 flex items-center gap-2 px-4 py-2 bg-card rounded-lg shadow text-sm text-primary font-medium hover:bg-muted/50 transition-colors disabled:opacity-50"
        >
          <Navigation className="h-4 w-4" />
          Use my current location
        </button>
      </div>

      {/* Map with center marker */}
      {selectedLocation && (
        <div className="h-full w-full">
          <MapContainer
            center={selectedLocation}
            markers={marker ? [
              {
                latitude: marker.latitude,
                longitude: marker.longitude,
                color: mode === "source" ? "#10b981" : "#6366f1",
              },
            ] : []}
            zoom={15}
            onMapClick={handleMapClick}
            className="w-full h-full"
          />
        </div>
      )}

      {/* Location Card */}
      <div className="absolute bottom-0 left-0 right-0 bg-card rounded-t-3xl p-4 shadow-2xl">
        <div className="flex items-start gap-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
            <MapPin className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            {isLoadingAddress ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Loading address...</span>
              </div>
            ) : (
              <>
                <p className="text-foreground font-medium">{selectedAddress}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {mode === "source" ? "Pickup location" : "Drop-off location"}
                </p>
              </>
            )}
          </div>
        </div>
        <Button
          onClick={handleConfirm}
          disabled={isLoadingAddress || !selectedLocation}
          className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-semibold"
        >
          Confirm location
        </Button>
      </div>
    </div>
  );
};

export default LocationPicker;