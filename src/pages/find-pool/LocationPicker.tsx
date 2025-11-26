import { useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapContainer } from "@/components/map/MapContainer";

const LocationPicker = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { type, returnPath } = location.state || { type: "source", returnPath: "/find-pool" };
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState({
    latitude: 51.5074,
    longitude: -0.1278,
  });
  const [selectedAddress, setSelectedAddress] = useState("London, United Kingdom");
  const [marker, setMarker] = useState({
    latitude: 51.5074,
    longitude: -0.1278,
  });

  const handleLocationChange = useCallback((newLocation: { latitude: number; longitude: number }) => {
    setSelectedLocation(newLocation);
    setMarker(newLocation);
    // In a real app, this would reverse geocode to get the address
    setSelectedAddress(`${newLocation.latitude.toFixed(4)}, ${newLocation.longitude.toFixed(4)}`);
  }, []);

  const handleConfirm = () => {
    // Navigate back with the selected location
    navigate(returnPath, {
      state: {
        [type]: {
          address: selectedAddress,
          latitude: selectedLocation.latitude,
          longitude: selectedLocation.longitude,
        },
      },
      replace: true,
    });
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
            className="pl-10 bg-card h-12 rounded-xl shadow-lg"
          />
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
              color: type === "source" ? "#10b981" : "#6366f1",
            },
          ]}
          zoom={13}
          onLocationChange={handleLocationChange}
          className="w-full h-full"
        />
      </div>

      {/* Center Pin Overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full pointer-events-none z-10">
        <MapPin className="h-10 w-10 text-primary drop-shadow-lg" />
      </div>

      {/* Location Card */}
      <div className="absolute bottom-0 left-0 right-0 bg-card rounded-t-3xl p-4 shadow-2xl">
        <div className="flex items-start gap-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
            <MapPin className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <p className="text-foreground font-medium">{selectedAddress}</p>
            <p className="text-sm text-muted-foreground mt-1">
              {type === "source" ? "Pickup location" : "Drop-off location"}
            </p>
          </div>
        </div>
        <Button
          onClick={handleConfirm}
          className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-semibold"
        >
          Confirm location
        </Button>
      </div>
    </div>
  );
};

export default LocationPicker;
