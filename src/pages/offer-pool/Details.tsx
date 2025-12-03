import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import CarSelectorModal from "@/components/offer-pool/CarSelectorModal";
import SuccessModal from "@/components/offer-pool/SuccessModal";
import { PriceInput } from "@/components/forms/PriceInput";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface LocationState {
  sourceAddress: string;
  destinationAddress: string;
  sourceCoords: { lat: number; lng: number };
  destinationCoords: { lat: number; lng: number };
  dateTime: Date;
  recurring: boolean;
  days: string[];
}

const OfferPoolDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;
  const { user } = useAuth();

  const [price, setPrice] = useState(10);
  const [currency, setCurrency] = useState("USD");
  const [selectedCar, setSelectedCar] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState<any>(null);
  const [availableSeats, setAvailableSeats] = useState("");
  const [facilities, setFacilities] = useState("");
  const [instructions, setInstructions] = useState("");
  const [showCarSelector, setShowCarSelector] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!state) {
      toast.error("Missing pool details");
      navigate("/offer-pool");
      return;
    }
    if (user) {
      fetchUserCurrency();
    }
  }, [user, state, navigate]);

  const fetchUserCurrency = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('preferred_currency')
        .eq('id', user?.id)
        .single();

      if (error) throw error;
      setCurrency(data?.preferred_currency || "USD");
    } catch (error) {
      console.error('Error fetching currency:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCarSelect = (carId: string, vehicle?: any) => {
    setSelectedCar(carId);
    setSelectedVehicle(vehicle);
    if (vehicle) {
      // Populate facilities and instructions from the selected car
      if (vehicle.facilities && vehicle.facilities.length > 0) {
        setFacilities(vehicle.facilities.join(', '));
      }
      if (vehicle.instructions) {
        setInstructions(vehicle.instructions);
      }
      // Set max seats based on vehicle capacity
      if (vehicle.seat_capacity && !availableSeats) {
        setAvailableSeats(String(vehicle.seat_capacity - 1)); // -1 for driver
      }
    }
  };

  const handleContinue = async () => {
    if (!selectedCar) {
      toast.error("Please select a vehicle");
      return;
    }
    if (!availableSeats || parseInt(availableSeats) < 1) {
      toast.error("Please enter available seats");
      return;
    }
    if (price <= 0) {
      toast.error("Please set a valid price");
      return;
    }
    if (!user) {
      toast.error("You must be logged in to offer a pool");
      return;
    }
    if (!state) {
      toast.error("Missing pool details");
      return;
    }

    setSubmitting(true);
    try {
      const totalSeats = selectedVehicle?.seat_capacity || parseInt(availableSeats) + 1;
      
      const { error } = await supabase
        .from('pools')
        .insert({
          driver_id: user.id,
          vehicle_id: selectedCar,
          source_address: state.sourceAddress,
          source_lat: state.sourceCoords.lat,
          source_lng: state.sourceCoords.lng,
          destination_address: state.destinationAddress,
          destination_lat: state.destinationCoords.lat,
          destination_lng: state.destinationCoords.lng,
          departure_time: state.dateTime.toISOString(),
          is_recurring: state.recurring,
          recurring_days: state.days.length > 0 ? state.days : null,
          price: price,
          currency: currency,
          total_seats: totalSeats,
          available_seats: parseInt(availableSeats),
          facilities: facilities ? facilities.split(',').map(f => f.trim()).filter(f => f) : [],
          instructions: instructions || null,
          status: 'active'
        });

      if (error) throw error;
      
      setShowSuccess(true);
    } catch (error: any) {
      console.error('Error creating pool:', error);
      toast.error(error.message || "Failed to create pool");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    navigate("/my-trip");
  };

  if (!state) {
    return null;
  }

  return (
    <PageLayout title="Offer pool" hideBottomNav showBackButton>
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="p-4 space-y-6">
          {/* Set Price */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Set Price</h3>
            <div className="bg-card rounded-xl p-4 shadow-sm">
              <div className="flex items-start gap-3 mb-4">
                <div className="flex-1">
                  <div className="flex items-start gap-2 mb-2">
                    <div className="h-3 w-3 rounded-full bg-success mt-1.5" />
                    <p className="text-sm text-foreground">{state.sourceAddress}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-3 w-3 rounded-full bg-primary mt-1.5" />
                    <p className="text-sm text-foreground">{state.destinationAddress}</p>
                  </div>
                </div>
              </div>
              <PriceInput
                value={price}
                onChange={setPrice}
                currency={currency}
                label=""
                placeholder="Enter price"
                required
              />
            </div>
          </div>

        {/* Your Car */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">Your car</h3>
          <button
            onClick={() => setShowCarSelector(true)}
            className="w-full h-12 bg-card rounded-xl px-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
          >
            <span className={selectedVehicle ? "text-foreground" : "text-muted-foreground"}>
              {selectedVehicle ? selectedVehicle.vehicle_name : "Select your car"}
            </span>
            <svg
              className="h-4 w-4 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Seat Offering */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">Seat offering</h3>
          <Input
            type="number"
            min="1"
            max={selectedVehicle ? selectedVehicle.seat_capacity - 1 : 6}
            value={availableSeats}
            onChange={(e) => setAvailableSeats(e.target.value)}
            placeholder="Enter available seat"
            className="h-12 bg-card rounded-xl"
          />
          {selectedVehicle && (
            <p className="text-xs text-muted-foreground mt-1">
              Max: {selectedVehicle.seat_capacity - 1} seats (excluding driver)
            </p>
          )}
        </div>

        {/* Facilities */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">
            Facilities<span className="text-muted-foreground text-sm font-normal">(i.e AC,Extra luggage etc.)</span>
          </h3>
          <Textarea
            value={facilities}
            onChange={(e) => setFacilities(e.target.value)}
            placeholder="Enter facilities (comma separated)"
            className="min-h-[120px] bg-card rounded-xl resize-none"
          />
        </div>

        {/* Instruction */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">
            Instruction<span className="text-muted-foreground text-sm font-normal">(i.e no smoking, pet,etc.)</span>
          </h3>
          <Textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="Enter instruction"
            className="min-h-[120px] bg-card rounded-xl resize-none"
          />
        </div>

        {/* Continue Button */}
        <Button
          onClick={handleContinue}
          disabled={submitting}
          className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-semibold rounded-xl"
        >
          {submitting ? "Creating pool..." : "Continue"}
        </Button>
      </div>
      )}

      {/* Modals */}
      <CarSelectorModal
        open={showCarSelector}
        onClose={() => setShowCarSelector(false)}
        onConfirm={handleCarSelect}
        initialCar={selectedCar}
      />

      <SuccessModal open={showSuccess} onClose={handleSuccessClose} />
    </PageLayout>
  );
};

export default OfferPoolDetails;