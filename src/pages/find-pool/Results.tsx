import { useLocation } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import RideCard from "@/components/find-pool/RideCard";
import { Calendar } from "lucide-react";
import { format } from "date-fns";

// Mock data for demonstration
const mockRides = [
  {
    id: "1",
    driverName: "David johanson",
    driverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    verified: true,
    rating: 5,
    reviewCount: 120,
    price: 15.00,
    sourceAddress: "World trade point, new jersey",
    destinationAddress: "2464 Royal Ln. Mesa, New Jersey 45463",
    availableSeats: 2,
    totalSeats: 4,
    dateTime: "10/6/2023, 3PM",
  },
  {
    id: "2",
    driverName: "Ronald Richards",
    driverImage: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    verified: true,
    rating: 4,
    reviewCount: 120,
    price: 10.00,
    sourceAddress: "World trade point, new jersey",
    destinationAddress: "2464 Royal Ln. Mesa, New Jersey 45463",
    availableSeats: 2,
    totalSeats: 4,
    dateTime: "10/6/2023, 3PM",
  },
  {
    id: "3",
    driverName: "Leslie Alexander",
    driverImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    verified: true,
    rating: 5,
    reviewCount: 120,
    price: 19.00,
    sourceAddress: "Gray St. Utica, Pennsylvania 57867",
    destinationAddress: "6391 Elgin St. Celina, Delaware 10299",
    availableSeats: 2,
    totalSeats: 4,
    dateTime: "10/6/2023, 3PM",
  },
  {
    id: "4",
    driverName: "Jenny Wilson",
    driverImage: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    verified: true,
    rating: 4,
    reviewCount: 120,
    price: 14.00,
    sourceAddress: "World trade point, new jersey",
    destinationAddress: "Harvard law school, new jersey",
    availableSeats: 1,
    totalSeats: 4,
    dateTime: "10/6/2023, 3PM",
  },
];

const Results = () => {
  const location = useLocation();
  const { source, destination, dateTime } = location.state || {};

  return (
    <PageLayout title="Find pool" hideBottomNav showBackButton>
      <div className="p-4 space-y-4">
        {/* Route Summary */}
        <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
          <div className="flex items-start gap-3 mb-2">
            <div className="h-3 w-3 rounded-full bg-success mt-1.5" />
            <p className="text-sm text-foreground flex-1">
              {source || "World trade point, new jersey"}
            </p>
          </div>
          <div className="flex items-start gap-3 mb-3">
            <div className="h-3 w-3 rounded-full bg-primary mt-1.5" />
            <p className="text-sm text-foreground flex-1">
              {destination || "Harvard law school, new jersey"}
            </p>
          </div>
          <div className="flex items-center gap-2 pt-2 border-t border-border">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              {dateTime ? format(dateTime, "dd/MM/yyyy, h:mm a") : "10/6/2023, 3PM"}
            </span>
          </div>
        </div>

        {/* Ride Cards */}
        <div className="space-y-3">
          {mockRides.map((ride) => (
            <RideCard key={ride.id} {...ride} />
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default Results;
