import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import RequesterDetailsModal from "@/components/my-trip/RequesterDetailsModal";

interface Requester {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  reviewCount: number;
  verified: boolean;
  pickupLocation: string;
  dropLocation: string;
  seats: number;
  price: number;
  phoneNumber?: string;
}

const PoolTakerRequests = () => {
  const navigate = useNavigate();
  const [selectedRequester, setSelectedRequester] = useState<Requester | null>(null);
  const [requests, setRequests] = useState<Requester[]>([
    {
      id: "1",
      name: "Jenny Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jenny1",
      rating: 4.8,
      reviewCount: 45,
      verified: true,
      pickupLocation: "6391 Elgin St. Celina,",
      dropLocation: "2464 Royal Ln. Mesa,",
      seats: 1,
      price: 13.50,
      phoneNumber: "+1 234 567 8901",
    },
    {
      id: "2",
      name: "Jenny Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jenny2",
      rating: 4.9,
      reviewCount: 67,
      verified: true,
      pickupLocation: "6391 Elgin St. Celina,",
      dropLocation: "2464 Royal Ln. Mesa,",
      seats: 2,
      price: 20.50,
      phoneNumber: "+1 234 567 8902",
    },
    {
      id: "3",
      name: "Jenny Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jenny3",
      rating: 4.7,
      reviewCount: 32,
      verified: true,
      pickupLocation: "6391 Elgin St. Celina,",
      dropLocation: "2464 Royal Ln. Mesa,",
      seats: 1,
      price: 10.50,
      phoneNumber: "+1 234 567 8903",
    },
    {
      id: "4",
      name: "Jenny Wilson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jenny4",
      rating: 5.0,
      reviewCount: 89,
      verified: true,
      pickupLocation: "6391 Elgin St. Celina,",
      dropLocation: "2464 Royal Ln. Mesa,",
      seats: 1,
      price: 12.50,
      phoneNumber: "+1 234 567 8904",
    },
  ]);

  const tripInfo = {
    date: "Today",
    time: "10:30 pm",
    source: "6391 Elgin St. Celina,",
    destination: "2464 Royal Ln. Mesa,",
  };

  const handleAccept = (id: string) => {
    setRequests(requests.filter((r) => r.id !== id));
  };

  const handleDecline = (id: string) => {
    setRequests(requests.filter((r) => r.id !== id));
  };

  const handleProceed = () => {
    navigate("/my-trip/active-map-view", { state: { tripInfo } });
  };

  return (
    <PageLayout title="Pool taker request" hideBottomNav showBackButton>
      <div className="p-4 pb-24">
        {/* Trip Info */}
        <div className="bg-card rounded-xl p-4 shadow-sm mb-4">
          <div className="text-sm text-muted-foreground mb-3">
            {tripInfo.date} | {tripInfo.time}
          </div>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <div className="h-3 w-3 rounded-full bg-success mt-0.5 flex-shrink-0" />
              <p className="text-sm text-foreground">{tripInfo.source}</p>
            </div>
            <div className="flex items-start gap-2">
              <div className="h-3 w-3 rounded-full bg-primary mt-0.5 flex-shrink-0" />
              <p className="text-sm text-foreground">{tripInfo.destination}</p>
            </div>
          </div>
        </div>

        {/* Requests List */}
        <div className="space-y-3">
          {requests.map((requester) => (
            <div
              key={requester.id}
              className="bg-card rounded-xl p-4 shadow-sm"
            >
              <div className="flex items-start gap-3 mb-3">
                <Avatar
                  className="h-14 w-14 cursor-pointer"
                  onClick={() => setSelectedRequester(requester)}
                >
                  <AvatarImage src={requester.avatar} alt={requester.name} />
                  <AvatarFallback>{requester.name.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <h3
                    className="font-semibold text-foreground cursor-pointer"
                    onClick={() => setSelectedRequester(requester)}
                  >
                    {requester.name}
                  </h3>
                  <div className="flex items-start gap-2 mt-1">
                    <div className="h-2 w-2 rounded-full bg-success mt-1 flex-shrink-0" />
                    <p className="text-xs text-muted-foreground">{requester.pickupLocation}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary mt-1 flex-shrink-0" />
                    <p className="text-xs text-muted-foreground">{requester.dropLocation}</p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-primary font-bold text-lg">${requester.price.toFixed(2)}</p>
                  <p className="text-xs text-muted-foreground">{requester.seats} seat</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  onClick={() => handleDecline(requester.id)}
                  className="w-full border-muted-foreground/20 text-foreground hover:bg-muted"
                >
                  Decline
                </Button>
                <Button
                  onClick={() => handleAccept(requester.id)}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  Accept
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* No requests message */}
        {requests.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">All requests have been processed</p>
          </div>
        )}
      </div>

      {/* Fixed Proceed Button */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
        <Button
          onClick={handleProceed}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-14 rounded-xl font-semibold text-base"
        >
          Proceed
        </Button>
      </div>

      {/* Requester Details Modal */}
      {selectedRequester && (
        <RequesterDetailsModal
          requester={selectedRequester}
          onClose={() => setSelectedRequester(null)}
        />
      )}
    </PageLayout>
  );
};

export default PoolTakerRequests;
