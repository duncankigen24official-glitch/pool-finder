import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { MapPin, ChevronDown, ChevronUp } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ActiveTripMapView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tripInfo } = location.state || {};
  const [modalHeight, setModalHeight] = useState<"min" | "mid" | "max">("mid");

  // Mock co-passengers data
  const coPassengers = [
    {
      name: "Brooklyn Simmons",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    {
      name: "Leslie Alexander",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
    {
      name: "Jenny Wilson",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    },
    {
      name: "Robert Fox",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
  ];

  const pickupPoints = [
    { name: "Brooklyn", address: "1901 Thornridge Cir. Shiloh, Hawaii 81063" },
    { name: "Leslie", address: "1901 Thornridge Cir. Shiloh, Hawaii 81063" },
    { name: "Jenny", address: "42km drive" },
    { name: "Robert", address: "8502 Preston Rd. Inglewood, Maine 98380" },
  ];

  const toggleHeight = () => {
    if (modalHeight === "min") setModalHeight("mid");
    else if (modalHeight === "mid") setModalHeight("max");
    else setModalHeight("min");
  };

  const getModalHeightClass = () => {
    switch (modalHeight) {
      case "min":
        return "h-[25vh]";
      case "mid":
        return "h-[50vh]";
      case "max":
        return "h-[75vh]";
      default:
        return "h-[50vh]";
    }
  };

  return (
    <PageLayout title="Map view" hideBottomNav showBackButton>
      <div className="h-screen relative">
        {/* Map Background */}
        <div className="absolute inset-0 bg-[#1a3a3a]">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white/50 text-center">
              <MapPin className="h-16 w-16 mx-auto mb-2" />
              <p className="text-sm">Map integration required</p>
              <p className="text-xs mt-1">Add Mapbox or Google Maps API</p>
            </div>
          </div>
        </div>

        {/* Resizable Modal */}
        <div
          className={`absolute bottom-0 left-0 right-0 bg-background rounded-t-3xl shadow-lg transition-all duration-300 ${getModalHeightClass()} overflow-hidden`}
        >
          {/* Drag Handle */}
          <button
            onClick={toggleHeight}
            className="w-full py-3 flex items-center justify-center border-b border-border"
          >
            {modalHeight === "max" ? (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            )}
          </button>

          {/* Scrollable Content */}
          <div className="p-4 overflow-y-auto h-full pb-24">
            <h3 className="text-base font-semibold text-foreground mb-4">
              Ride starts on 12 June, 10:30 am
            </h3>

            {/* Timeline */}
            <div className="space-y-4 mb-6">
              {/* Source location */}
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div className="h-8 w-8 rounded-full bg-success flex items-center justify-center">
                    <div className="h-3 w-3 rounded-full bg-white" />
                  </div>
                  <div className="w-0.5 h-8 bg-border" />
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-sm font-medium text-success">Source location</p>
                  <p className="text-sm text-foreground mt-1">
                    {tripInfo?.source || "Washington sq.park, New Jersey"}
                  </p>
                </div>
              </div>

              {/* Pick up points */}
              {pickupPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={coPassengers[index]?.avatar}
                        alt={point.name}
                      />
                      <AvatarFallback>{point.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {index < pickupPoints.length - 1 && (
                      <div className="w-0.5 h-8 bg-border" />
                    )}
                  </div>
                  <div className="flex-1 pt-1">
                    <p className="text-sm font-medium text-muted-foreground">
                      Pick up {point.name.toLowerCase()}
                    </p>
                    <p className="text-sm text-foreground mt-1">{point.address}</p>
                  </div>
                </div>
              ))}

              {/* Destination location */}
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-white" />
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-sm font-medium text-primary">Destination location</p>
                  <p className="text-sm text-foreground mt-1">
                    {tripInfo?.destination || "2464 Royal Ln. Mesa, New Jersey 45463"}
                  </p>
                </div>
              </div>
            </div>

            {/* Co-passengers */}
            <div>
              <h3 className="text-base font-semibold text-foreground mb-3">
                Co-passengers
              </h3>
              <div className="grid grid-cols-4 gap-4">
                {coPassengers.map((passenger, index) => (
                  <div key={index} className="text-center">
                    <Avatar className="h-14 w-14 mx-auto mb-2">
                      <AvatarImage src={passenger.avatar} alt={passenger.name} />
                      <AvatarFallback>{passenger.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <p className="text-xs text-foreground truncate">
                      {passenger.name.split(" ")[0]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Fixed Start Ride Button */}
          <div className="absolute bottom-0 left-0 right-0 bg-background border-t border-border p-4">
            <Button
              onClick={() => navigate("/my-trip/roadmap")}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-14 rounded-xl font-semibold text-base"
            >
              Start ride
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default ActiveTripMapView;
