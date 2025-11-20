import { MapPin } from "lucide-react";

interface LocationInputProps {
  type: "source" | "destination";
  address: string;
  onClick: () => void;
}

const LocationInput = ({ type, address, onClick }: LocationInputProps) => {
  const isSource = type === "source";

  return (
    <button
      onClick={onClick}
      className="flex items-start gap-3 w-full text-left p-4 rounded-lg bg-card hover:bg-muted/50 transition-colors"
    >
      <div className="mt-0.5">
        <div
          className={`h-3 w-3 rounded-full ${
            isSource ? "bg-success" : "bg-primary"
          }`}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-foreground truncate">{address}</p>
      </div>
    </button>
  );
};

export default LocationInput;
