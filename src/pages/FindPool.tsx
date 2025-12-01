import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
  const [searchParams] = useSearchParams();
  const [sourceAddress, setSourceAddress] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [sourceCoords, setSourceCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [destinationCoords, setDestinationCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
  const [selectedSeats, setSelectedSeats] = useState<number | null>(null);
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [showSeatSelector, setShowSeatSelector] = useState(false);

  // Handle location updates from URL params
  useEffect(() => {
    const source = searchParams.get("source");
    const destination = searchParams.get("destination");
    const sourceAddr = searchParams.get("sourceAddress");
    const destAddr = searchParams.get("destinationAddress");

    if (source) {
      const [lat, lng] = source.split(",").map(Number);
      setSourceCoords({ lat, lng });
      if (sourceAddr) setSourceAddress(sourceAddr);
    }
    if (destination) {
      const [lat, lng] = destination.split(",").map(Number);
      setDestinationCoords({ lat, lng });
      if (destAddr) setDestinationAddress(destAddr);
    }
  }, [searchParams]);

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
        {/* Hero Image Background */}
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Find Pool Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        </div>

        {/* Header */}
        <div className="relative z-10 p-4">
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
              address={sourceAddress || "Select pickup location"}
              onClick={() => {
                const params = new URLSearchParams(searchParams);
                params.set("mode", "source");
                navigate(`/find-pool/location-picker?${params.toString()}`);
              }}
            />
            <div className="h-px bg-border my-2" />
            <LocationInput
              type="destination"
              address={destinationAddress || "Select destination"}
              onClick={() => {
                const params = new URLSearchParams(searchParams);
                params.set("mode", "destination");
                navigate(`/find-pool/location-picker?${params.toString()}`);
              }}
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