import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import LocationInput from "@/components/find-pool/LocationInput";
import DateTimePickerModal from "@/components/find-pool/DateTimePickerModal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import offerPoolHero from "@/assets/offer-pool-hero.png";

const OfferPool = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [sourceAddress, setSourceAddress] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [sourceCoords, setSourceCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [destinationCoords, setDestinationCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [recurringRide, setRecurringRide] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

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

  const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleContinue = () => {
    if (!sourceCoords || !sourceAddress) {
      toast.error("Please select a pickup location");
      return;
    }
    if (!destinationCoords || !destinationAddress) {
      toast.error("Please select a destination");
      return;
    }
    if (!selectedDateTime) {
      toast.error("Please select date and time");
      return;
    }

    navigate("/offer-pool/details", {
      state: {
        sourceAddress,
        destinationAddress,
        sourceCoords,
        destinationCoords,
        dateTime: selectedDateTime,
        recurring: recurringRide,
        days: selectedDays,
      },
    });
  };

  return (
    <PageLayout>
      <div className="px-4 py-6">
        {/* Hero Section */}
        <div className="text-center mb-6">
          <h1 className="text-primary font-bold text-xl uppercase tracking-wide mb-4">
            OFFER POOL
          </h1>
          <img
            src={offerPoolHero}
            alt="Offer pool"
            className="w-full max-w-md mx-auto mb-4"
          />
          <h2 className="text-xl font-bold text-primary mb-2">Create your pool</h2>
          <p className="text-muted-foreground text-sm">
            Share your car journey with co-travellers just like you and cover all fuel costs
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

        {/* Recurring Ride */}
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-3">
            <Checkbox
              id="recurring"
              checked={recurringRide}
              onCheckedChange={(checked) => setRecurringRide(checked as boolean)}
            />
            <label
              htmlFor="recurring"
              className="text-foreground font-medium cursor-pointer"
            >
              Recurring ride
            </label>
          </div>

          {/* Day Selector */}
          <div className="flex gap-2">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => toggleDay(day)}
                className={`flex-1 h-12 rounded-lg font-medium text-sm transition-colors ${
                  selectedDays.includes(day)
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-muted-foreground border border-border"
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Continue Button */}
        <Button
          onClick={handleContinue}
          className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-semibold rounded-xl"
        >
          Continue
        </Button>
      </div>

      {/* Modal */}
      <DateTimePickerModal
        open={showDateTimePicker}
        onClose={() => setShowDateTimePicker(false)}
        onConfirm={setSelectedDateTime}
        initialDate={selectedDateTime || new Date()}
      />
    </PageLayout>
  );
};

export default OfferPool;