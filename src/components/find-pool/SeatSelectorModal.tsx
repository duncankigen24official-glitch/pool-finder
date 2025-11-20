import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface SeatSelectorModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (seats: number) => void;
  initialSeats?: number;
}

const SeatSelectorModal = ({
  open,
  onClose,
  onConfirm,
  initialSeats = 1,
}: SeatSelectorModalProps) => {
  const [selectedSeats, setSelectedSeats] = useState(initialSeats.toString());

  const handleConfirm = () => {
    onConfirm(parseInt(selectedSeats));
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-primary text-xl">
            Select seat
          </DialogTitle>
        </DialogHeader>

        <RadioGroup value={selectedSeats} onValueChange={setSelectedSeats} className="gap-0">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div
              key={num}
              className="flex items-center space-x-3 py-4 px-4 hover:bg-muted/50 cursor-pointer border-b last:border-b-0"
              onClick={() => setSelectedSeats(num.toString())}
            >
              <RadioGroupItem value={num.toString()} id={`seat-${num}`} />
              <Label
                htmlFor={`seat-${num}`}
                className="flex-1 cursor-pointer text-base"
              >
                {num} seat
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

export default SeatSelectorModal;
