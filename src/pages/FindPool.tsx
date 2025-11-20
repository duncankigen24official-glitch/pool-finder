import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import LocationInput from "@/components/find-pool/LocationInput";
import DateTimePickerModal from "@/components/find-pool/DateTimePickerModal";
import SeatSelectorModal from "@/components/find-pool/SeatSelectorModal";
import { Button } from "@/components/ui/button";
import { Calendar, User } from "lucide-react";
import { format } from "date-fns";
import heroImage from "@/assets/hero-image.jpg";

const FindPool = () => {
  const navigate = useNavigate();
  const [sourceAddress, setSourceAddress] = useState("9, England RM10 8QB, United Kingdom");
  const [destinationAddress, setDestinationAddress] = useState("9, England RM10 8QB, United Kingdom");
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<number | null>(null);
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [showSeatSelector, setShowSeatSelector] = useState(false);

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
      <div className="relative">
        {/* Hero Section */}
        <div className="relative h-64 w-full overflow-hidden">
          <img
            src={heroImage}
            alt="Find your pool"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/30" />
        </div>

        {/* Header */}
        <div className="absolute top-4 left-4">
          <h1 className="text-xl font-bold text-primary uppercase tracking-wide">
            FIND POOL
          </h1>
        </div>

        {/* Content */}
        <div className="px-4 py-6">
          <div className="text-center mb-8">
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
              onClick={() => navigate("/find-pool/location-picker", { state: { type: "source" } })}
            />
            <div className="h-px bg-border my-2" />
            <LocationInput
              type="destination"
              address={destinationAddress}
              onClick={() => navigate("/find-pool/location-picker", { state: { type: "destination" } })}
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
