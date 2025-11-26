import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface Vehicle {
  id: string;
  vehicle_name: string;
  vehicle_type: string;
  seat_capacity: number;
  facilities: string[];
  instructions: string;
}

interface CarSelectorModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (vehicleId: string, vehicle?: Vehicle) => void;
  initialCar?: string;
}

const CarSelectorModal = ({
  open,
  onClose,
  onConfirm,
  initialCar = "",
}: CarSelectorModalProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedCar, setSelectedCar] = useState(initialCar);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open && user) {
      fetchVehicles();
    }
  }, [open, user]);

  const fetchVehicles = async () => {
    try {
      const { data, error } = await supabase
        .from('vehicles')
        .select('id, vehicle_name, vehicle_type, seat_capacity, facilities, instructions')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVehicles(data || []);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
      toast.error('Failed to load vehicles');
    } finally {
      setLoading(false);
    }
  };

  const handleConfirm = () => {
    if (!selectedCar) {
      toast.error("Please select a vehicle");
      return;
    }
    const vehicle = vehicles.find(v => v.id === selectedCar);
    onConfirm(selectedCar, vehicle);
    onClose();
  };

  const handleAddCar = () => {
    onClose();
    navigate("/profile/add-car");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-primary text-xl">
            Select car
          </DialogTitle>
        </DialogHeader>

        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : vehicles.length === 0 ? (
          <div className="py-8 space-y-4 text-center">
            <p className="text-muted-foreground">No vehicles available</p>
            <Button onClick={handleAddCar} className="w-full">
              Add your first car
            </Button>
          </div>
        ) : (
          <>
            <RadioGroup value={selectedCar} onValueChange={setSelectedCar} className="gap-0">
              {vehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  className="flex items-center space-x-3 py-4 px-4 hover:bg-muted/50 cursor-pointer border-b last:border-b-0"
                  onClick={() => setSelectedCar(vehicle.id)}
                >
                  <RadioGroupItem value={vehicle.id} id={`car-${vehicle.id}`} />
                  <Label
                    htmlFor={`car-${vehicle.id}`}
                    className="flex-1 cursor-pointer text-base"
                  >
                    {vehicle.vehicle_name} - {vehicle.vehicle_type.charAt(0).toUpperCase() + vehicle.vehicle_type.slice(1)} ({vehicle.seat_capacity} seats)
                  </Label>
                </div>
              ))}
            </RadioGroup>

            <Button
              variant="outline"
              onClick={handleAddCar}
              className="w-full"
            >
              Add another car
            </Button>

            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleConfirm} className="flex-1 bg-primary hover:bg-primary/90">
                Okay
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CarSelectorModal;
