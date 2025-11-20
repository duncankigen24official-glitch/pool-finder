import { useNavigate, useLocation } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { MapPin } from "lucide-react";

const MapView = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { rideData } = location.state || {};

  // Mock data
  const tripDetails = {
    rideStartDate: "12 June, 10:30 am",
    pickupPoint: "1901 Thornridge Cir. Shiloh, Hawaii 81063",
    sourceLocation: "Washinton sq.park, New Jersey",
    sourceTime: "5:25 pm",
    driveDistance: "42km drive",
    destinationLocation: "2464 Royal Ln. Mesa, New Jersey 45463",
    destinationTime: "6:15 pm",
    dropUpPoint: "8502 Preston Rd. Inglewood, Maine 98380",
  };

  return (
    <PageLayout title="Map view" hideBottomNav showBackButton>
      <div className="h-screen relative">
        {/* Map Placeholder */}
        <div className="h-[45vh] w-full bg-[#1a3a3a] relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white/50 text-center">
              <MapPin className="h-16 w-16 mx-auto mb-2" />
              <p className="text-sm">Map integration required</p>
              <p className="text-xs mt-1">Add Mapbox or Google Maps API</p>
            </div>
          </div>
        </div>

        {/* Trip Details */}
        <div className="bg-background p-4 space-y-4">
          <h3 className="text-base font-semibold text-foreground">
            Ride starts on {tripDetails.rideStartDate}
          </h3>

          {/* Timeline */}
          <div className="space-y-4">
            {/* Pick up point */}
            <div className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="w-0.5 h-8 bg-border" />
              </div>
              <div className="flex-1 pt-1">
                <p className="text-sm font-medium text-muted-foreground">Pick up point</p>
                <p className="text-sm text-foreground mt-1">{tripDetails.pickupPoint}</p>
              </div>
            </div>

            {/* Source location */}
            <div className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div className="h-8 w-8 rounded-full bg-success flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-white" />
                </div>
                <div className="w-0.5 h-8 bg-border" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-success">Source location</p>
                  <span className="text-sm text-primary font-medium">{tripDetails.sourceTime}</span>
                </div>
                <p className="text-sm text-foreground mt-1">{tripDetails.sourceLocation}</p>
              </div>
            </div>

            {/* Drive */}
            <div className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="w-0.5 h-8 bg-border" />
              </div>
              <div className="flex-1 pt-1">
                <p className="text-sm font-medium text-muted-foreground">Drive</p>
                <p className="text-sm text-foreground mt-1">{tripDetails.driveDistance}</p>
              </div>
            </div>

            {/* Destination location */}
            <div className="flex items-start gap-3">
              <div className="flex flex-col items-center">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                  <div className="h-3 w-3 rounded-full bg-white" />
                </div>
                <div className="w-0.5 h-8 bg-border" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-primary">Destination location</p>
                  <span className="text-sm text-primary font-medium">{tripDetails.destinationTime}</span>
                </div>
                <p className="text-sm text-foreground mt-1">{tripDetails.destinationLocation}</p>
              </div>
            </div>

            {/* Drop up point */}
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex-1 pt-1">
                <p className="text-sm font-medium text-muted-foreground">Drop up point</p>
                <p className="text-sm text-foreground mt-1">{tripDetails.dropUpPoint}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default MapView;
