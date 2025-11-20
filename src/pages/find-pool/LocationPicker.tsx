import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const LocationPicker = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { type } = location.state || { type: "source" };
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("9, England RM10 8QB, United Kingdom");

  const handleConfirm = () => {
    // In a real app, this would update the location in the parent component
    navigate(-1);
  };

  return (
    <div className="h-screen w-full relative bg-[#1a3a3a]">
      {/* Search Bar */}
      <div className="absolute top-4 left-4 right-4 z-10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-card h-12 rounded-xl shadow-lg"
          />
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="h-full w-full flex items-center justify-center">
        <div className="text-white/50 text-center">
          <MapPin className="h-16 w-16 mx-auto mb-2" />
          <p className="text-sm">Map integration required</p>
          <p className="text-xs mt-1">Add Mapbox or Google Maps API</p>
        </div>
      </div>

      {/* Location Card */}
      <div className="absolute bottom-0 left-0 right-0 bg-card rounded-t-3xl p-4 shadow-2xl">
        <div className="flex items-start gap-3 mb-4">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
            <MapPin className="h-5 w-5 text-primary" />
          </div>
          <p className="text-foreground flex-1">{selectedAddress}</p>
        </div>
        <Button
          onClick={handleConfirm}
          className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-semibold"
        >
          Pick this location
        </Button>
      </div>
    </div>
  );
};

export default LocationPicker;
