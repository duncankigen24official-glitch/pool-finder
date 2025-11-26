import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import LocationInput from "@/components/find-pool/LocationInput";
import DateTimePickerModal from "@/components/find-pool/DateTimePickerModal";
import SeatSelectorModal from "@/components/find-pool/SeatSelectorModal";
import { Button } from "@/components/ui/button";
import { Calendar, User } from "lucide-react";
import { format } from "date-fns";
import { MapContainer } from "@/components/map/MapContainer";

const FindPool = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sourceAddress, setSourceAddress] = useState("9, England RM10 8QB, United Kingdom");
  const [destinationAddress, setDestinationAddress] = useState("9, England RM10 8QB, United Kingdom");
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<number | null>(null);
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [showSeatSelector, setShowSeatSelector] = useState(false);

  // Handle location updates from LocationPicker
  useEffect(() => {
    if (location.state?.source) {
      setSourceAddress(location.state.source.address);
    }
    if (location.state?.destination) {
      setDestinationAddress(location.state.destination.address);
    }
  }, [location.state]);

  const handleFindPool = () => {
    // Navigate to results page
    navigate("/find-pool/results", {
      state: {
        source: sourceAddress,
        destination: destinationAddress,
        dateTime: selectedDateTime,
        seats: selectedSeats,
      },
    });
  };

  return (
    <PageLayout showNotification>
      <div className="relative h-screen flex flex-col">
        {/* Map Background */}
        <div className="absolute inset-0">
          <MapContainer
            center={{ latitude: 51.5074, longitude: -0.1278 }}
            zoom={11}
            className="w-full h-full"
          />
        </div>

        {/* Header */}
        <div className="relative z-10 p-4 bg-gradient-to-b from-background/90 to-transparent">
          <h1 className="text-xl font-bold text-primary uppercase tracking-wide">
            FIND POOL
          </h1>
        </div>

        {/* Content Card */}
        <div className="relative z-10 mt-auto bg-background rounded-t-3xl shadow-2xl">
          <div className="px-4 py-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-primary mb-2">Find your pool</h2>
              <p className="text-muted-foreground">
                You full and comfortable travel, share your journey with all like you
              </p>
            </div>

            {/* Location Inputs */}
            <div className="bg-card rounded-xl p-4 mb-4 shadow-sm space-y-3">
            <LocationInput
              type="source"
              address={sourceAddress}
              onClick={() => navigate("/find-pool/location-picker", { state: { type: "source", returnPath: "/find-pool" } })}
            />
            <div className="h-px bg-border my-2" />
            <LocationInput
              type="destination"
              address={destinationAddress}
              onClick={() => navigate("/find-pool/location-picker", { state: { type: "destination", returnPath: "/find-pool" } })}
            />
            </div>

            {/* Date & Time */}
            <button
              onClick={() => setShowDateTimePicker(true)}
              className="w-full bg-card rounded-xl p-4 mb-4 shadow-sm flex items-center gap-3 hover:bg-muted/50 transition-colors"
            >
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <span className="text-muted-foreground">
                {selectedDateTime
                  ? format(selectedDateTime, "dd/MM/yyyy, h:mm a")
                  : "Date & time"}
              </span>
            </button>

            {/* Number of Seats */}
            <button
              onClick={() => setShowSeatSelector(true)}
              className="w-full bg-card rounded-xl p-4 mb-6 shadow-sm flex items-center gap-3 hover:bg-muted/50 transition-colors"
            >
              <User className="h-5 w-5 text-muted-foreground" />
              <span className="text-muted-foreground">
                {selectedSeats ? `${selectedSeats} seat` : "No of seat"}
              </span>
            </button>

            {/* Find Pool Button */}
            <Button
              onClick={handleFindPool}
              className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-semibold rounded-xl"
            >
              Find pool
            </Button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <DateTimePickerModal
        open={showDateTimePicker}
        onClose={() => setShowDateTimePicker(false)}
        onConfirm={setSelectedDateTime}
        initialDate={selectedDateTime || new Date()}
      />

      <SeatSelectorModal
        open={showSeatSelector}
        onClose={() => setShowSeatSelector(false)}
        onConfirm={setSelectedSeats}
        initialSeats={selectedSeats || 1}
      />
    </PageLayout>
  );
};

export default FindPool;