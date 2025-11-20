import { useState } from "react";
import { useParams } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, MessageCircle, User } from "lucide-react";

const RiderProfile = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("about");

  // Mock data
  const rider = {
    name: "David johanson",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    verified: true,
    rating: 5,
    reviewCount: 120,
    price: 15.00,
    joinYear: 2018,
    sourceAddress: "Washinton sq.park, New Jersey 45463",
    destinationAddress: "2464 Royal Ln. Mesa, New Jersey 45463",
    startTime: "24 may, 09:00PM",
    returnTime: "24 may, 10:00PM",
    rideWith: 249,
    coPassengers: [
      { name: "Cameron William", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
      { name: "Brooklyn Simmons", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
    ],
    vehicle: {
      model: "Audi A4",
      color: "Black",
      plate: "NYC 5514",
    },
    facilities: ["AC", "Luggage space", "music system"],
    instruction: "Smoking not allowed, pets are allowed",
  };

  return (
    <PageLayout title="Rider profile" hideBottomNav showBackButton>
      <div className="pb-24">
        {/* Profile Header */}
        <div className="bg-card p-6 border-b border-border">
          <div className="flex items-start gap-4">
            <img
              src={rider.image}
              alt={rider.name}
              className="h-20 w-20 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-bold text-foreground">{rider.name}</h2>
                {rider.verified && <CheckCircle className="h-5 w-5 text-success" />}
              </div>
              <div className="flex items-center gap-1 text-sm mb-1">
                <span className="text-warning">★★★★★</span>
                <span className="text-muted-foreground ml-1">({rider.reviewCount} review)</span>
              </div>
              <p className="text-sm text-muted-foreground">Join {rider.joinYear}</p>
            </div>
            <span className="text-primary font-bold text-xl">${rider.price.toFixed(2)}</span>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
            <TabsTrigger
              value="about"
              className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary"
            >
              About
            </TabsTrigger>
            <TabsTrigger
              value="review"
              className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:text-primary"
            >
              Review
            </TabsTrigger>
          </TabsList>

          <TabsContent value="about" className="p-4 space-y-6">
            {/* Ride Info */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-primary font-semibold">Ride info</h3>
                <button className="text-success text-sm font-medium">View in map</button>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2">
                  <div className="h-3 w-3 rounded-full bg-success mt-1.5" />
                  <p className="text-sm text-foreground">{rider.sourceAddress}</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-3 w-3 rounded-full bg-primary mt-1.5" />
                  <p className="text-sm text-foreground">{rider.destinationAddress}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Start time</p>
                  <p className="text-xs font-medium">{rider.startTime}</p>
                </div>
                <div className="border-x border-border">
                  <p className="text-xs text-muted-foreground mb-1">Return time</p>
                  <p className="text-xs font-medium">{rider.returnTime}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Ride with</p>
                  <p className="text-xs font-medium">{rider.rideWith} people</p>
                </div>
              </div>
            </div>

            {/* Co-passengers */}
            <div>
              <h3 className="text-primary font-semibold mb-3">
                Co passengers <span className="text-muted-foreground text-sm">(2 seat left)</span>
              </h3>
              <div className="grid grid-cols-4 gap-4">
                {rider.coPassengers.map((passenger, i) => (
                  <div key={i} className="text-center">
                    <img
                      src={passenger.image}
                      alt={passenger.name}
                      className="h-16 w-16 rounded-full object-cover mx-auto mb-2"
                    />
                    <p className="text-xs text-foreground truncate">{passenger.name}</p>
                  </div>
                ))}
                {[...Array(2)].map((_, i) => (
                  <div key={`empty-${i}`} className="text-center">
                    <div className="h-16 w-16 rounded-full bg-muted mx-auto mb-2 flex items-center justify-center">
                      <User className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground">Empty seat</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Vehicle Info */}
            <div>
              <h3 className="text-primary font-semibold mb-3">Vehicle info</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">Vehicle info</p>
                  <p className="text-sm text-muted-foreground">
                    {rider.vehicle.model} | {rider.vehicle.color} | {rider.vehicle.plate}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">Facilities</p>
                  <p className="text-sm text-muted-foreground">{rider.facilities.join(", ")}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">Instruction</p>
                  <p className="text-sm text-muted-foreground">{rider.instruction}</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="review" className="p-4">
            <p className="text-muted-foreground text-center py-8">Reviews coming soon...</p>
          </TabsContent>
        </Tabs>
      </div>

      {/* Fixed Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 flex gap-3">
        <Button
          size="icon"
          variant="outline"
          className="h-14 w-14 rounded-full flex-shrink-0"
        >
          <MessageCircle className="h-5 w-5" />
        </Button>
        <Button className="flex-1 h-14 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-semibold">
          Request ride
        </Button>
      </div>
    </PageLayout>
  );
};

export default RiderProfile;
