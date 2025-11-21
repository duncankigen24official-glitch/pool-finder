import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PassengerStop {
  name: string;
  avatar: string;
  pickupAddress: string;
  dropAddress: string;
  status: "pending" | "picked" | "dropped";
}

const TripRoadmap = () => {
  const navigate = useNavigate();
  const [passengers, setPassengers] = useState<PassengerStop[]>([
    {
      name: "Brooklyn Simmons",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      pickupAddress: "2715 Ash Dr. San Jose, South Dakota 83475",
      dropAddress: "2464 Royal Ln. Mesa, New Jersey 45463",
      status: "picked",
    },
    {
      name: "Jenny Wilson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      pickupAddress: "2715 Ash Dr. San Jose, South Dakota 83475",
      dropAddress: "2464 Royal Ln. Mesa, New Jersey 45463",
      status: "pending",
    },
    {
      name: "Leslie Alexander",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
      pickupAddress: "2715 Ash Dr. San Jose, South Dakota 83475",
      dropAddress: "2464 Royal Ln. Mesa, New Jersey 45463",
      status: "pending",
    },
    {
      name: "Robert Fox",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      pickupAddress: "2715 Ash Dr. San Jose, South Dakota 83475",
      dropAddress: "2464 Royal Ln. Mesa, New Jersey 45463",
      status: "pending",
    },
  ]);

  const handlePick = (index: number) => {
    const updated = [...passengers];
    updated[index].status = "picked";
    setPassengers(updated);
  };

  const handleDrop = (index: number) => {
    const updated = [...passengers];
    updated[index].status = "dropped";
    setPassengers(updated);
  };

  const handleEndRide = () => {
    navigate("/my-trip");
  };

  return (
    <PageLayout title="Trip roadmap" hideBottomNav showBackButton>
      <div className="h-screen relative">
        {/* Map Background */}
        <div className="h-[35vh] w-full bg-[#1a3a3a]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white/50 text-center">
              <MapPin className="h-12 w-12 mx-auto mb-2" />
              <p className="text-xs">Map integration required</p>
            </div>
          </div>
        </div>

        {/* Trip Roadmap Content */}
        <div className="bg-background rounded-t-3xl -mt-6 relative z-10 min-h-[65vh]">
          <div className="p-4 pb-24">
            <h2 className="text-primary font-semibold text-lg mb-4">Trip roadmap</h2>

            <div className="space-y-4">
              {passengers.map((passenger, index) => (
                <div key={index} className="space-y-3">
                  {/* Passenger Card */}
                  <div className="flex items-center gap-3 bg-card p-3 rounded-lg shadow-sm">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={passenger.avatar} alt={passenger.name} />
                      <AvatarFallback>{passenger.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{passenger.name}</h3>
                    </div>
                    <Button
                      onClick={() =>
                        passenger.status === "pending"
                          ? handlePick(index)
                          : passenger.status === "picked"
                          ? handleDrop(index)
                          : null
                      }
                      disabled={passenger.status === "dropped"}
                      className={`px-6 rounded-lg font-medium ${
                        passenger.status === "dropped"
                          ? "bg-muted text-muted-foreground"
                          : passenger.status === "picked"
                          ? "bg-success hover:bg-success/90 text-white"
                          : "bg-primary hover:bg-primary/90 text-primary-foreground"
                      }`}
                    >
                      {passenger.status === "dropped"
                        ? "Dropped"
                        : passenger.status === "picked"
                        ? "Drop"
                        : "Pick"}
                    </Button>
                  </div>

                  {/* Location Details */}
                  <div className="ml-4 space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="h-3 w-3 rounded-full bg-success mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-muted-foreground">
                        {passenger.pickupAddress}
                      </p>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="h-3 w-3 rounded-full bg-primary mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-muted-foreground">
                        {passenger.dropAddress}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Fixed End Ride Button */}
          <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
            <Button
              onClick={handleEndRide}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-14 rounded-xl font-semibold text-base"
            >
              End ride
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default TripRoadmap;
