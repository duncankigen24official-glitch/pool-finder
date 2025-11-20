import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";

interface DateTimePickerModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: (date: Date) => void;
  initialDate?: Date;
}

const DateTimePickerModal = ({
  open,
  onClose,
  onConfirm,
  initialDate = new Date(),
}: DateTimePickerModalProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);
  const [hour, setHour] = useState(initialDate.getHours() % 12 || 12);
  const [minute, setMinute] = useState(initialDate.getMinutes());
  const [period, setPeriod] = useState(initialDate.getHours() >= 12 ? "PM" : "AM");

  const handleConfirm = () => {
    const finalHour = period === "PM" ? (hour === 12 ? 12 : hour + 12) : (hour === 12 ? 0 : hour);
    const finalDate = new Date(selectedDate);
    finalDate.setHours(finalHour, minute);
    onConfirm(finalDate);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0">
        <DialogHeader className="px-6 pt-6">
          <DialogTitle className="text-center text-primary text-xl">
            Select date & time
          </DialogTitle>
        </DialogHeader>

        <div className="px-6 pb-6">
          {/* Calendar */}
          <div className="flex flex-col items-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="rounded-md"
            />
          </div>

          {/* Time Picker */}
          <div className="flex items-center justify-center gap-2 mt-4 pb-4 border-b">
            <input
              type="number"
              min="1"
              max="12"
              value={hour.toString().padStart(2, "0")}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (val >= 1 && val <= 12) setHour(val);
              }}
              className="w-16 text-center text-2xl font-semibold bg-muted rounded-lg py-2"
            />
            <span className="text-2xl font-semibold">:</span>
            <input
              type="number"
              min="0"
              max="59"
              value={minute.toString().padStart(2, "0")}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (val >= 0 && val <= 59) setMinute(val);
              }}
              className="w-16 text-center text-2xl font-semibold bg-muted rounded-lg py-2"
            />
            <div className="flex gap-2 ml-2">
              <Button
                variant={period === "AM" ? "default" : "outline"}
                size="sm"
                onClick={() => setPeriod("AM")}
                className="w-14"
              >
                AM
              </Button>
              <Button
                variant={period === "PM" ? "default" : "outline"}
                size="sm"
                onClick={() => setPeriod("PM")}
                className="w-14"
              >
                PM
              </Button>
            </div>
          </div>

          {/* Selected DateTime Display */}
          <p className="text-center text-sm text-muted-foreground mt-4">
            {format(selectedDate, "dd/MM/yyyy")},{hour.toString().padStart(2, "0")}:{minute.toString().padStart(2, "0")} {period}
          </p>

          {/* Action Buttons */}
          <div className="flex gap-3 mt-6">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              Okay
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DateTimePickerModal;
