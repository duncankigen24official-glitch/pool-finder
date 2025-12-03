import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import RequesterDetailsModal from "@/components/my-trip/RequesterDetailsModal";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";

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
  const [searchParams] = useSearchParams();
  const poolId = searchParams.get("poolId");
  const { user } = useAuth();
  
  const [selectedRequester, setSelectedRequester] = useState<Requester | null>(null);
  const [requests, setRequests] = useState<Requester[]>([]);
  const [loading, setLoading] = useState(true);
  const [tripInfo, setTripInfo] = useState({ date: "", time: "", source: "", destination: "" });

  useEffect(() => {
    if (poolId) {
      fetchRequests();
    }
  }, [poolId]);

  const fetchRequests = async () => {
    try {
      // Fetch pool info
      const { data: pool } = await supabase
        .from('pools')
        .select('source_address, destination_address, departure_time, price')
        .eq('id', poolId)
        .single();

      if (pool) {
        const date = new Date(pool.departure_time);
        const isToday = date.toDateString() === new Date().toDateString();
        setTripInfo({
          date: isToday ? "Today" : format(date, "dd MMM"),
          time: format(date, "h:mm a"),
          source: pool.source_address,
          destination: pool.destination_address,
        });
      }

      // Fetch pending requests
      const { data, error } = await supabase
        .from('pool_requests')
        .select(`
          id,
          seats_requested,
          pickup_address,
          dropoff_address,
          rider:profiles!rider_id(id, full_name, avatar_url, phone_number)
        `)
        .eq('pool_id', poolId)
        .eq('status', 'pending');

      if (error) throw error;

      const formattedRequests: Requester[] = (data || []).map(req => {
        const rider = Array.isArray(req.rider) ? req.rider[0] : req.rider;
        return {
          id: req.id,
          name: rider?.full_name || 'Unknown',
          avatar: rider?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${rider?.id}`,
          rating: 4.5,
          reviewCount: 0,
          verified: true,
          pickupLocation: req.pickup_address || pool?.source_address || '',
          dropLocation: req.dropoff_address || pool?.destination_address || '',
          seats: req.seats_requested || 1,
          price: pool?.price || 0,
          phoneNumber: rider?.phone_number || undefined,
        };
      });

      setRequests(formattedRequests);
    } catch (error) {
      console.error('Error fetching requests:', error);
      toast.error('Failed to load requests');
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (requestId: string) => {
    try {
      const { error } = await supabase
        .from('pool_requests')
        .update({ status: 'accepted' })
        .eq('id', requestId);

      if (error) throw error;

      // Decrement available seats
      const request = requests.find(r => r.id === requestId);
      if (request && poolId) {
        const { data: pool } = await supabase
          .from('pools')
          .select('available_seats')
          .eq('id', poolId)
          .single();
        
        if (pool) {
          await supabase
            .from('pools')
            .update({ available_seats: Math.max(0, pool.available_seats - (request.seats || 1)) })
            .eq('id', poolId);
        }
      }
      
      setRequests(requests.filter((r) => r.id !== requestId));
      toast.success('Request accepted');
    } catch (error) {
      console.error('Error accepting request:', error);
      toast.error('Failed to accept request');
    }
  };

  const handleDecline = async (requestId: string) => {
    try {
      const { error } = await supabase
        .from('pool_requests')
        .update({ status: 'rejected' })
        .eq('id', requestId);

      if (error) throw error;
      
      setRequests(requests.filter((r) => r.id !== requestId));
      toast.success('Request declined');
    } catch (error) {
      console.error('Error declining request:', error);
      toast.error('Failed to decline request');
    }
  };

  const handleProceed = () => {
    navigate("/my-trip/active-map-view", { state: { tripInfo, poolId } });
  };

  if (loading) {
    return (
      <PageLayout title="Pool taker request" hideBottomNav showBackButton>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </PageLayout>
    );
  }

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
            <div key={requester.id} className="bg-card rounded-xl p-4 shadow-sm">
              <div className="flex items-start gap-3 mb-3">
                <Avatar className="h-14 w-14 cursor-pointer" onClick={() => setSelectedRequester(requester)}>
                  <AvatarImage src={requester.avatar} alt={requester.name} />
                  <AvatarFallback>{requester.name.charAt(0)}</AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <h3 className="font-semibold text-foreground cursor-pointer" onClick={() => setSelectedRequester(requester)}>
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
                  <p className="text-xs text-muted-foreground">{requester.seats} seat{requester.seats > 1 ? 's' : ''}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" onClick={() => handleDecline(requester.id)} className="w-full border-muted-foreground/20 text-foreground hover:bg-muted">
                  Decline
                </Button>
                <Button onClick={() => handleAccept(requester.id)} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                  Accept
                </Button>
              </div>
            </div>
          ))}
        </div>

        {requests.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No pending requests</p>
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4">
        <Button onClick={handleProceed} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground h-14 rounded-xl font-semibold text-base">
          Proceed
        </Button>
      </div>

      {selectedRequester && (
        <RequesterDetailsModal requester={selectedRequester} onClose={() => setSelectedRequester(null)} />
      )}
    </PageLayout>
  );
};

export default PoolTakerRequests;