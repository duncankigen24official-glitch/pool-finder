import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Rider {
  name: string;
  avatar: string;
}

interface RequestCardProps {
  riders: Rider[];
  date: string;
  time: string;
  source: string;
  destination: string;
  requestCount: number;
  onRequestsClick?: () => void;
}

const RequestCard = ({
  riders,
  date,
  time,
  source,
  destination,
  requestCount,
  onRequestsClick,
}: RequestCardProps) => {
  return (
    <div
      onClick={onRequestsClick}
      className="bg-card rounded-xl p-4 shadow-sm mb-4 cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="flex items-start gap-3">
        {/* Rider Avatars or Placeholder */}
        <div className="grid grid-cols-2 gap-1 min-w-[100px]">
          {riders.length > 0 ? (
            riders.slice(0, 4).map((rider, index) => (
              <Avatar key={index} className="h-12 w-12">
                <AvatarImage src={rider.avatar} alt={rider.name} />
                <AvatarFallback>{rider.name.charAt(0)}</AvatarFallback>
              </Avatar>
            ))
          ) : (
            <div className="col-span-2 h-12 w-24 rounded-lg bg-muted/50 flex items-center justify-center">
              <span className="text-xs text-muted-foreground">No requests</span>
            </div>
          )}
        </div>

        {/* Trip Info */}
        <div className="flex-1">
          <div className="text-sm text-muted-foreground mb-2">
            {date} | {time}
          </div>
          <div className="space-y-1">
            <div className="flex items-start gap-2">
              <div className="h-3 w-3 rounded-full bg-success mt-0.5 flex-shrink-0" />
              <p className="text-sm text-foreground">{source}</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="h-3 w-3 rounded-full bg-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm text-foreground">{destination}</p>
            </div>
          </div>
        </div>

        {/* Request Count Badge */}
        <div className="flex items-center justify-center">
          <div className="bg-primary text-primary-foreground px-3 py-1.5 rounded-lg text-xs font-medium">
            {requestCount} {requestCount === 1 ? "Request" : "Requests"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
