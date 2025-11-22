import { useState } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Star, MapPin } from "lucide-react";
import { toast } from "sonner";

const RideHistory = () => {
  const [selectedRide, setSelectedRide] = useState<number | null>(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const rides = [
    {
      id: 1,
      name: "Wilson",
      date: "22 June | 10:30 pm",
      from: "6391 Elgin St. Celina,",
      to: "2464 Royal Ln. Mesa,",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    {
      id: 2,
      name: "Elenora",
      date: "23 June | 11:30 pm",
      from: "1901 Thornridge Cir.",
      to: "4517 Washington Ave.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    {
      id: 3,
      name: "Elenora",
      date: "24 june | 9:30 am",
      from: "Gray St. Utica, Pennsylvania",
      to: "Elgin St. Celina, Delaware",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    {
      id: 4,
      name: "Jenny",
      date: "25 June | 8:30 am",
      from: "Elgin St. Celina, Delaware",
      to: "Washington Ave. Manchester",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
  ];

  const handleRatingSubmit = () => {
    toast.success("Rating submitted successfully");
    setSelectedRide(null);
    setRating(0);
    setComment("");
  };

  return (
    <PageLayout title="Ride history" showBackButton>
      <div className="px-4 py-6 space-y-4">
        {rides.map((ride) => (
          <div key={ride.id} className="bg-card border border-border rounded-lg p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3">
                <div className="relative">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={ride.avatar} />
                    <AvatarFallback>{ride.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-0.5">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{ride.name}</h3>
                </div>
              </div>
              <Button
                onClick={() => setSelectedRide(ride.id)}
                variant="default"
                size="sm"
                className="text-xs"
              >
                Give rate
              </Button>
            </div>

            <div className="space-y-2 ml-15">
              <div className="flex items-start gap-2 text-sm">
                <div className="text-green-600 mt-1">
                  <MapPin className="h-4 w-4 fill-current" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{ride.date}</p>
                  <p className="text-muted-foreground">{ride.from}</p>
                </div>
              </div>
              <div className="flex items-start gap-2 text-sm ml-0.5">
                <div className="text-red-600 mt-0.5">
                  <MapPin className="h-4 w-4 fill-current" />
                </div>
                <p className="text-muted-foreground">{ride.to}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Rating Modal */}
      <Dialog open={selectedRide !== null} onOpenChange={() => setSelectedRide(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center text-primary text-xl">
              Give your rate
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-center text-sm text-muted-foreground">
              How was your ride with wilson johan share your review with us
            </p>

            {/* Star Rating */}
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-10 w-10 ${
                      star <= rating ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"
                    }`}
                  />
                </button>
              ))}
            </div>

            {/* Comment Box */}
            <Textarea
              placeholder="Say something"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="min-h-32 resize-none"
            />

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setSelectedRide(null)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button onClick={handleRatingSubmit} className="flex-1">
                Send
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
};

export default RideHistory;
