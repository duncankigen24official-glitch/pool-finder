import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PoolCardProps {
  driver: {
    name: string;
    avatar: string;
    verified?: boolean;
  };
  date: string;
  time: string;
  source: string;
  destination: string;
  buttonText: string;
  onButtonClick?: () => void;
}

const PoolCard = ({
  driver,
  date,
  time,
  source,
  destination,
  buttonText,
  onButtonClick,
}: PoolCardProps) => {
  return (
    <div className="bg-card rounded-xl p-4 shadow-sm mb-4">
      <div className="flex items-start gap-3">
        {/* Driver Avatar */}
        <div className="relative">
          <Avatar className="h-14 w-14">
            <AvatarImage src={driver.avatar} alt={driver.name} />
            <AvatarFallback>{driver.name.charAt(0)}</AvatarFallback>
          </Avatar>
          {driver.verified && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-success rounded-full border-2 border-card flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>

        {/* Trip Info */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <p className="font-semibold text-foreground">{driver.name}</p>
          </div>
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

        {/* Action Button */}
        <Button
          onClick={onButtonClick}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 h-auto rounded-lg text-sm font-medium whitespace-nowrap"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default PoolCard;
