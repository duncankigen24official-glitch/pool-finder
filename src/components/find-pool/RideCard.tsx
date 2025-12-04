import { CheckCircle, MapPin, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface RideCardProps {
  id: string;
  driverName: string;
  driverImage: string;
  verified: boolean;
  rating: number;
  reviewCount: number;
  price: number;
  sourceAddress: string;
  destinationAddress: string;
  availableSeats: number;
  totalSeats: number;
  dateTime: string;
  sourceDistance?: number;
  destDistance?: number;
}

const RideCard = ({
  id,
  driverName,
  driverImage,
  verified,
  rating,
  reviewCount,
  price,
  sourceAddress,
  destinationAddress,
  availableSeats,
  totalSeats,
  dateTime,
  sourceDistance,
  destDistance,
}: RideCardProps) => {
  const navigate = useNavigate();
  const filledSeats = totalSeats - availableSeats;

  return (
    <div
      onClick={() => navigate(`/find-pool/rider/${id}`)}
      className="bg-card rounded-xl p-4 shadow-sm border border-border hover:shadow-md transition-shadow cursor-pointer"
    >
      {/* Driver Info */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <img
            src={driverImage}
            alt={driverName}
            className="h-12 w-12 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-foreground">{driverName}</span>
              {verified && <CheckCircle className="h-4 w-4 text-success" />}
            </div>
            <div className="flex items-center gap-1 text-xs">
              <span className="text-warning">
                {'★'.repeat(Math.round(rating))}{'☆'.repeat(5 - Math.round(rating))}
              </span>
              <span className="text-muted-foreground ml-1">({reviewCount} review{reviewCount !== 1 ? 's' : ''})</span>
            </div>
          </div>
        </div>
        <span className="text-primary font-bold text-lg">${price.toFixed(2)}</span>
      </div>

      {/* Route */}
      <div className="space-y-2 mb-3">
        <div className="flex items-start gap-2">
          <div className="h-3 w-3 rounded-full bg-success mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-foreground">{sourceAddress}</p>
            {sourceDistance !== undefined && (
              <p className="text-xs text-muted-foreground">{sourceDistance.toFixed(1)} km from your pickup</p>
            )}
          </div>
        </div>
        <div className="flex items-start gap-2">
          <div className="h-3 w-3 rounded-full bg-primary mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-foreground">{destinationAddress}</p>
            {destDistance !== undefined && (
              <p className="text-xs text-muted-foreground">{destDistance.toFixed(1)} km from your destination</p>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center gap-1">
          {Array.from({ length: totalSeats }).map((_, i) => (
            <div
              key={i}
              className={`h-7 w-7 rounded-full flex items-center justify-center ${
                i < filledSeats ? "bg-primary/20" : "bg-muted"
              }`}
            >
              <User className="h-4 w-4 text-muted-foreground" />
            </div>
          ))}
          <span className="text-xs text-muted-foreground ml-2">
            {availableSeats} seat
          </span>
        </div>
        <span className="text-xs text-muted-foreground">{dateTime}</span>
      </div>
    </div>
  );
};

export default RideCard;
