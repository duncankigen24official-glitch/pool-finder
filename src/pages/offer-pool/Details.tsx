import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Minus, Plus } from "lucide-react";

const OfferPoolDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { source, destination } = location.state || {};

  const [price, setPrice] = useState(10);
  const [selectedCar, setSelectedCar] = useState("");
  const [availableSeats, setAvailableSeats] = useState("");
  const [facilities, setFacilities] = useState("");
  const [instructions, setInstructions] = useState("");

  const handleContinue = () => {
    // Handle pool creation
    console.log({
      price,
      selectedCar,
      availableSeats,
      facilities,
      instructions,
    });
    navigate("/my-trip");
  };

  return (
    <PageLayout title="Offer pool" hideBottomNav showBackButton>
      <div className="p-4 space-y-6">
        {/* Set Price */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">Set Price</h3>
          <div className="bg-card rounded-xl p-4 shadow-sm">
            <div className="flex items-start gap-3 mb-3">
              <div className="flex-1">
                <div className="flex items-start gap-2 mb-2">
                  <div className="h-3 w-3 rounded-full bg-success mt-1.5" />
                  <p className="text-sm text-foreground">{source || "6391 Elgin St. Celina,"}</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-3 w-3 rounded-full bg-primary mt-1.5" />
                  <p className="text-sm text-foreground">{destination || "2464 Royal Ln. Mesa,"}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-muted rounded-lg px-3 py-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setPrice(Math.max(1, price - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="text-primary font-bold text-lg min-w-[60px] text-center">
                  ${price}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setPrice(price + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Your Car */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">Your car</h3>
          <Select value={selectedCar} onValueChange={setSelectedCar}>
            <SelectTrigger className="w-full h-12 bg-card rounded-xl">
              <SelectValue placeholder="Select your car" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="audi-a4">Audi A4 - Black - NYC 5514</SelectItem>
              <SelectItem value="honda-civic">Honda Civic - White - ABC 1234</SelectItem>
              <SelectItem value="toyota-camry">Toyota Camry - Silver - XYZ 9876</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Seat Offering */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">Seat offering</h3>
          <Input
            type="number"
            min="1"
            max="6"
            value={availableSeats}
            onChange={(e) => setAvailableSeats(e.target.value)}
            placeholder="Enter available seat"
            className="h-12 bg-card rounded-xl"
          />
        </div>

        {/* Facilities */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-3">
            Facilities<span className="text-muted-foreground text-sm font-normal">(i.e AC,Extra luggage etc.)</span>
          </h3>
          <Textarea
            value={facilities}
            onChange={(e) => setFacilities(e.target.value)}
            placeholder="Enter facilities"
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
          className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-semibold rounded-xl"
        >
          Continue
        </Button>
      </div>
    </PageLayout>
  );
};

export default OfferPoolDetails;
