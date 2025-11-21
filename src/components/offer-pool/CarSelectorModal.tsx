import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface CarSelectorModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (car: string) => void;
  initialCar?: string;
}

const cars = [
  { id: "audi-a4", label: "Audi A4 seat" },
  { id: "toyota-matrix", label: "Toyota matrix seat" },
  { id: "bmw", label: "Bmw seat" },
  { id: "mercedes", label: "Mercedes Benz seat" },
  { id: "maruti", label: "Maruti Suzuki seat" },
  { id: "ford", label: "Ford seat" },
];

const CarSelectorModal = ({
  open,
  onClose,
  onConfirm,
  initialCar = "",
}: CarSelectorModalProps) => {
  const [selectedCar, setSelectedCar] = useState(initialCar);

  const handleConfirm = () => {
    onConfirm(selectedCar);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-primary text-xl">
            Select car
          </DialogTitle>
        </DialogHeader>

        <RadioGroup value={selectedCar} onValueChange={setSelectedCar} className="gap-0">
          {cars.map((car) => (
            <div
              key={car.id}
              className="flex items-center space-x-3 py-4 px-4 hover:bg-muted/50 cursor-pointer border-b last:border-b-0"
              onClick={() => setSelectedCar(car.id)}
            >
              <RadioGroupItem value={car.id} id={`car-${car.id}`} />
              <Label
                htmlFor={`car-${car.id}`}
                className="flex-1 cursor-pointer text-base"
              >
                {car.label}
              </Label>
            </div>
          ))}
        </RadioGroup>

        <div className="flex gap-3 mt-4">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button onClick={handleConfirm} className="flex-1 bg-primary hover:bg-primary/90">
            Okay
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CarSelectorModal;
