import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import LocationInput from "@/components/find-pool/LocationInput";
import DateTimePickerModal from "@/components/find-pool/DateTimePickerModal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import offerPoolHero from "@/assets/offer-pool-hero.png";

const OfferPool = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sourceAddress, setSourceAddress] = useState("Source location");
  const [destinationAddress, setDestinationAddress] = useState("Destination location");
  const [selectedDateTime, setSelectedDateTime] = useState<Date | null>(null);
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [recurringRide, setRecurringRide] = useState(false);
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  // Handle location updates from LocationPicker
  useEffect(() => {
    if (location.state?.source) {
      setSourceAddress(location.state.source.address);
    }
    if (location.state?.destination) {
      setDestinationAddress(location.state.destination.address);
    }
  }, [location.state]);

  const days = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleContinue = () => {
    navigate("/offer-pool/details", {
      state: {
        source: sourceAddress,
        destination: destinationAddress,
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
            address={sourceAddress}
            onClick={() => navigate("/find-pool/location-picker", { state: { type: "source", returnPath: "/offer-pool" } })}
          />
          <div className="h-px bg-border my-2" />
          <LocationInput
            type="destination"
            address={destinationAddress}
            onClick={() => navigate("/find-pool/location-picker", { state: { type: "destination", returnPath: "/offer-pool" } })}
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
