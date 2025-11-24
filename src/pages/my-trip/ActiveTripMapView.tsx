import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MapContainer } from "@/components/map/MapContainer";
import { DraggableMapModal } from "@/components/map/DraggableMapModal";

const ActiveTripMapView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tripInfo } = location.state || {};

  const coPassengers = [
    { name: "Brooklyn Simmons", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
    { name: "Leslie Alexander", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
    { name: "Jenny Wilson", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop" },
    { name: "Robert Fox", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
  ];

  return (
    <PageLayout title="Map view" hideBottomNav showBackButton>
      <div className="h-screen relative">
        <div className="absolute inset-0">
          <MapContainer
            center={{ latitude: 51.5074, longitude: -0.1278 }}
            zoom={12}
            showUserLocation
            markers={[
              { latitude: 51.5074, longitude: -0.1278, label: "S", color: "#10b981" },
              { latitude: 51.5154, longitude: -0.1419, label: "P", color: "#6366f1" },
            ]}
          />
        </div>

        <DraggableMapModal initialHeight="mid">
          <div className="space-y-4">
            <h3 className="text-base font-semibold">Ride starts on 12 June, 10:30 am</h3>
            <div className="space-y-3">
              <h3 className="font-semibold">Co-passengers</h3>
              <div className="grid grid-cols-4 gap-4">
                {coPassengers.map((passenger, index) => (
                  <div key={index} className="text-center">
                    <Avatar className="h-14 w-14 mx-auto mb-2">
                      <AvatarImage src={passenger.avatar} />
                      <AvatarFallback>{passenger.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <p className="text-xs truncate">{passenger.name.split(" ")[0]}</p>
                  </div>
                ))}
              </div>
            </div>
            <Button
              onClick={() => navigate("/my-trip/roadmap")}
              className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-semibold rounded-xl"
            >
              Start ride
            </Button>
          </div>
        </DraggableMapModal>
      </div>
    </PageLayout>
  );
};

export default ActiveTripMapView;
