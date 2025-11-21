import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Check } from "lucide-react";
import { useEffect } from "react";

interface SuccessModalProps {
  open: boolean;
  onClose: () => void;
}

const SuccessModal = ({ open, onClose }: SuccessModalProps) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [open, onClose]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md border-none shadow-none bg-transparent">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="relative mb-8">
            <div className="w-32 h-32 rounded-full border-4 border-primary/30 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center">
                <Check className="w-12 h-12 text-primary-foreground" strokeWidth={3} />
              </div>
            </div>
          </div>
          <p className="text-center text-lg text-foreground max-w-sm">
            Congratulation your ride offer has been created
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
