import { useState, useCallback, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MapPin, Search, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapContainer } from "@/components/map/MapContainer";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 51.5074,
    longitude: -0.1278,
  });
  const [selectedAddress, setSelectedAddress] = useState("Loading location...");
  const [marker, setMarker] = useState({
    latitude: 51.5074,
    longitude: -0.1278,
  });
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);

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

  // Initial reverse geocode
  useEffect(() => {
    reverseGeocode(selectedLocation.latitude, selectedLocation.longitude);
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
    setSearchQuery(result.place_name);
    setShowResults(false);
  };

  const handleLocationChange = useCallback((newLocation: { latitude: number; longitude: number }) => {
    setSelectedLocation(newLocation);
    setMarker(newLocation);
    reverseGeocode(newLocation.latitude, newLocation.longitude);
  }, [reverseGeocode]);

  const handleMapClick = useCallback((event: mapboxgl.MapMouseEvent) => {
    const { lng, lat } = event.lngLat;
    setSelectedLocation({ latitude: lat, longitude: lng });
    setMarker({ latitude: lat, longitude: lng });
    reverseGeocode(lat, lng);
  }, [reverseGeocode]);

  const handleConfirm = () => {
    // Determine return path based on current URL
    const returnPath = window.location.pathname.includes("offer-pool") 
      ? "/offer-pool" 
      : "/find-pool";
    
    // Navigate back with location data in URL params
    const params = new URLSearchParams(window.location.search);
    params.set(mode, `${selectedLocation.latitude},${selectedLocation.longitude}`);
    params.set(`${mode}Address`, selectedAddress);
    
    navigate(`${returnPath}?${params.toString()}`, { replace: true });
  };

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
      </div>

      {/* Map with center marker */}
      <div className="h-full w-full">
        <MapContainer
          center={selectedLocation}
          markers={[
            {
              latitude: marker.latitude,
              longitude: marker.longitude,
              color: mode === "source" ? "#10b981" : "#6366f1",
            },
          ]}
          zoom={13}
          onMapClick={handleMapClick}
          className="w-full h-full"
        />
      </div>

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
          disabled={isLoadingAddress}
          className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-semibold"
        >
          Confirm location
        </Button>
      </div>
    </div>
  );
};

export default LocationPicker;
