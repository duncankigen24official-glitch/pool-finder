import { CheckCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface RequesterDetailsModalProps {
  requester: {
    name: string;
    avatar: string;
    rating: number;
    reviewCount: number;
    verified: boolean;
    phoneNumber?: string;
    seats: number;
    price: number;
    pickupLocation: string;
    dropLocation: string;
  };
  onClose: () => void;
}

const RequesterDetailsModal = ({
  requester,
  onClose,
}: RequesterDetailsModalProps) => {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">Requester Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Profile Section */}
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={requester.avatar} alt={requester.name} />
              <AvatarFallback>{requester.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-foreground">{requester.name}</h3>
                {requester.verified && <CheckCircle className="h-4 w-4 text-success" />}
              </div>
              <div className="flex items-center gap-1 text-sm">
                <span className="text-warning">★★★★★</span>
                <span className="text-muted-foreground ml-1">
                  ({requester.reviewCount} reviews)
                </span>
              </div>
            </div>
          </div>

          {/* Trip Details */}
          <div className="space-y-3 pt-2 border-t border-border">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Pickup Location</p>
              <div className="flex items-start gap-2">
                <div className="h-3 w-3 rounded-full bg-success mt-0.5 flex-shrink-0" />
                <p className="text-sm text-foreground">{requester.pickupLocation}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Drop Location</p>
              <div className="flex items-start gap-2">
                <div className="h-3 w-3 rounded-full bg-primary mt-0.5 flex-shrink-0" />
                <p className="text-sm text-foreground">{requester.dropLocation}</p>
              </div>
            </div>
          </div>

          {/* Booking Details */}
          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Seats</p>
              <p className="text-lg font-bold text-foreground">{requester.seats}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Price</p>
              <p className="text-lg font-bold text-primary">${requester.price.toFixed(2)}</p>
            </div>
          </div>

          {/* Contact Info */}
          {requester.phoneNumber && (
            <div className="pt-2 border-t border-border">
              <p className="text-sm font-medium text-muted-foreground mb-1">Contact</p>
              <p className="text-sm text-foreground">{requester.phoneNumber}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RequesterDetailsModal;
