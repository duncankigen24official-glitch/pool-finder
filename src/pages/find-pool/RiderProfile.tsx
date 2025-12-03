import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, MessageCircle, User, Loader2 } from "lucide-react";
import RatingBreakdown from "@/components/find-pool/RatingBreakdown";
import ReviewItem from "@/components/find-pool/ReviewItem";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { format } from "date-fns";

interface PoolData {
  id: string;
  driver_id: string;
  source_address: string;
  destination_address: string;
  departure_time: string;
  price: number;
  currency: string;
  available_seats: number;
  total_seats: number;
  facilities: string[];
  instructions: string | null;
  driver: {
    id: string;
    full_name: string;
    avatar_url: string | null;
    phone_number: string | null;
    created_at: string;
  } | null;
  vehicle: {
    vehicle_name: string;
    vehicle_type: string;
    registration_number: string;
  } | null;
}

interface CoPassenger {
  id: string;
  name: string;
  image: string;
}

interface Review {
  id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  reviewer: {
    full_name: string;
    avatar_url: string | null;
  } | null;
}

const RiderProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("about");
  const [pool, setPool] = useState<PoolData | null>(null);
  const [coPassengers, setCoPassengers] = useState<CoPassenger[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [ratingData, setRatingData] = useState({ avg: 0, count: 0, breakdown: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } });
  const [loading, setLoading] = useState(true);
  const [requesting, setRequesting] = useState(false);
  const [hasRequested, setHasRequested] = useState(false);
  const [totalRides, setTotalRides] = useState(0);

  useEffect(() => {
    if (id) {
      fetchPoolData();
    }
  }, [id]);

  const fetchPoolData = async () => {
    try {
      // Fetch pool details
      const { data: poolData, error: poolError } = await supabase
        .from('pools')
        .select(`
          id,
          driver_id,
          source_address,
          destination_address,
          departure_time,
          price,
          currency,
          available_seats,
          total_seats,
          facilities,
          instructions,
          driver:profiles!driver_id(id, full_name, avatar_url, phone_number, created_at),
          vehicle:vehicles!vehicle_id(vehicle_name, vehicle_type, registration_number)
        `)
        .eq('id', id)
        .single();

      if (poolError) throw poolError;

      const transformedPool = {
        ...poolData,
        driver: Array.isArray(poolData.driver) ? poolData.driver[0] : poolData.driver,
        vehicle: Array.isArray(poolData.vehicle) ? poolData.vehicle[0] : poolData.vehicle,
      };

      setPool(transformedPool);

      // Fetch co-passengers (accepted requests)
      const { data: passengers } = await supabase
        .from('pool_requests')
        .select(`
          rider:profiles!rider_id(id, full_name, avatar_url)
        `)
        .eq('pool_id', id)
        .eq('status', 'accepted');

      if (passengers) {
        const coPassengerList = passengers.map(p => {
          const rider = Array.isArray(p.rider) ? p.rider[0] : p.rider;
          return {
            id: rider?.id || '',
            name: rider?.full_name || 'Unknown',
            image: rider?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${rider?.id}`
          };
        });
        setCoPassengers(coPassengerList);
      }

      // Check if current user has already requested
      if (user) {
        const { data: existingRequest } = await supabase
          .from('pool_requests')
          .select('id')
          .eq('pool_id', id)
          .eq('rider_id', user.id)
          .maybeSingle();

        setHasRequested(!!existingRequest);
      }

      // Fetch reviews for the driver
      if (transformedPool.driver_id) {
        const { data: reviewsData } = await supabase
          .from('reviews')
          .select(`
            id,
            rating,
            comment,
            created_at,
            reviewer:profiles!reviewer_id(full_name, avatar_url)
          `)
          .eq('reviewee_id', transformedPool.driver_id)
          .order('created_at', { ascending: false })
          .limit(10);

        if (reviewsData) {
          const transformedReviews = reviewsData.map(r => ({
            ...r,
            reviewer: Array.isArray(r.reviewer) ? r.reviewer[0] : r.reviewer
          }));
          setReviews(transformedReviews);
        }

        // Fetch rating stats
        const { data: ratingStats } = await supabase
          .rpc('get_user_rating', { user_uuid: transformedPool.driver_id });

        if (ratingStats && ratingStats[0]) {
          // Get breakdown
          const { data: allReviews } = await supabase
            .from('reviews')
            .select('rating')
            .eq('reviewee_id', transformedPool.driver_id);

          const breakdown = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
          if (allReviews) {
            allReviews.forEach(r => {
              if (r.rating >= 1 && r.rating <= 5) {
                breakdown[r.rating as keyof typeof breakdown]++;
              }
            });
          }

          setRatingData({
            avg: Number(ratingStats[0].average_rating) || 0,
            count: Number(ratingStats[0].review_count) || 0,
            breakdown
          });
        }

        // Fetch total rides count
        const { count } = await supabase
          .from('pool_requests')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'accepted');
        
        setTotalRides(count || 0);
      }
    } catch (error) {
      console.error('Error fetching pool data:', error);
      toast.error('Failed to load pool details');
    } finally {
      setLoading(false);
    }
  };

  const handleRequestPool = async () => {
    if (!user) {
      toast.error('Please login to request a pool');
      navigate('/login');
      return;
    }

    if (!pool) return;

    if (pool.driver_id === user.id) {
      toast.error("You can't request your own pool");
      return;
    }

    setRequesting(true);
    try {
      const { error } = await supabase
        .from('pool_requests')
        .insert({
          pool_id: pool.id,
          rider_id: user.id,
          seats_requested: 1,
          status: 'pending'
        });

      if (error) throw error;

      setHasRequested(true);
      toast.success('Pool request sent!');
    } catch (error: any) {
      console.error('Error requesting pool:', error);
      if (error.code === '23505') {
        toast.error('You have already requested this pool');
        setHasRequested(true);
      } else {
        toast.error('Failed to send request');
      }
    } finally {
      setRequesting(false);
    }
  };

  const handleCallRider = () => {
    if (pool?.driver?.phone_number) {
      window.location.href = `tel:${pool.driver.phone_number}`;
    } else {
      toast.error('Phone number not available');
    }
  };

  const getCurrencySymbol = (currency: string) => {
    const symbols: Record<string, string> = { USD: '$', EUR: '€', GBP: '£', KES: 'KSh' };
    return symbols[currency] || currency;
  };

  const getJoinYear = (dateString: string | null) => {
    if (!dateString) return new Date().getFullYear();
    return new Date(dateString).getFullYear();
  };

  const renderStars = (rating: number) => {
    return '★'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));
  };

  if (loading) {
    return (
      <PageLayout title="Pool details" hideBottomNav showBackButton>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </PageLayout>
    );
  }

  if (!pool) {
    return (
      <PageLayout title="Pool details" hideBottomNav showBackButton>
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Pool not found</p>
        </div>
      </PageLayout>
    );
  }

  const emptySeats = pool.available_seats - coPassengers.length;

  return (
    <PageLayout title="Driver profile" hideBottomNav showBackButton>
      <div className="pb-24">
        {/* Profile Header */}
        <div className="bg-card p-6 border-b border-border">
          <div className="flex items-start gap-4">
            <img
              src={pool.driver?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${pool.driver_id}`}
              alt={pool.driver?.full_name || 'Driver'}
              className="h-20 w-20 rounded-full object-cover"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-bold text-foreground">{pool.driver?.full_name || 'Unknown Driver'}</h2>
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <div className="flex items-center gap-1 text-sm mb-1">
                <span className="text-warning">{renderStars(ratingData.avg)}</span>
                <span className="text-muted-foreground ml-1">({ratingData.count} review{ratingData.count !== 1 ? 's' : ''})</span>
              </div>
              <p className="text-sm text-muted-foreground">Joined {getJoinYear(pool.driver?.created_at || null)}</p>
            </div>
            <span className="text-primary font-bold text-xl">
              {getCurrencySymbol(pool.currency)}{pool.price.toFixed(2)}
            </span>
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
                <button 
                  onClick={() => navigate("/find-pool/map-view", { state: { rideData: pool } })}
                  className="text-success text-sm font-medium"
                >
                  View in map
                </button>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2">
                  <div className="h-3 w-3 rounded-full bg-success mt-1.5" />
                  <p className="text-sm text-foreground">{pool.source_address}</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="h-3 w-3 rounded-full bg-primary mt-1.5" />
                  <p className="text-sm text-foreground">{pool.destination_address}</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Departure</p>
                  <p className="text-xs font-medium">{format(new Date(pool.departure_time), "dd MMM, h:mm a")}</p>
                </div>
                <div className="border-x border-border">
                  <p className="text-xs text-muted-foreground mb-1">Seats left</p>
                  <p className="text-xs font-medium">{pool.available_seats} of {pool.total_seats}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Ride with</p>
                  <p className="text-xs font-medium">{totalRides} people</p>
                </div>
              </div>
            </div>

            {/* Co-passengers */}
            <div>
              <h3 className="text-primary font-semibold mb-3">
                Co passengers <span className="text-muted-foreground text-sm">({emptySeats} seat{emptySeats !== 1 ? 's' : ''} left)</span>
              </h3>
              <div className="grid grid-cols-4 gap-4">
                {coPassengers.map((passenger) => (
                  <div key={passenger.id} className="text-center">
                    <img
                      src={passenger.image}
                      alt={passenger.name}
                      className="h-16 w-16 rounded-full object-cover mx-auto mb-2"
                    />
                    <p className="text-xs text-foreground truncate">{passenger.name}</p>
                  </div>
                ))}
                {[...Array(Math.max(0, Math.min(emptySeats, 4 - coPassengers.length)))].map((_, i) => (
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
            {pool.vehicle && (
              <div>
                <h3 className="text-primary font-semibold mb-3">Vehicle info</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-foreground mb-1">Vehicle</p>
                    <p className="text-sm text-muted-foreground">
                      {pool.vehicle.vehicle_name} | {pool.vehicle.vehicle_type} | {pool.vehicle.registration_number}
                    </p>
                  </div>
                  {pool.facilities && pool.facilities.length > 0 && (
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">Facilities</p>
                      <p className="text-sm text-muted-foreground">{pool.facilities.join(", ")}</p>
                    </div>
                  )}
                  {pool.instructions && (
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">Instructions</p>
                      <p className="text-sm text-muted-foreground">{pool.instructions}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Contact Info */}
            {pool.driver?.phone_number && (
              <div>
                <h3 className="text-primary font-semibold mb-3">Contact info</h3>
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">Phone number</p>
                  <p className="text-sm text-muted-foreground">{pool.driver.phone_number}</p>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="review" className="p-4">
            <RatingBreakdown
              overallRating={ratingData.avg}
              totalReviews={ratingData.count}
              breakdown={ratingData.breakdown}
            />

            <div className="flex items-center justify-between mb-4">
              <h3 className="text-foreground font-semibold">Review({ratingData.count})</h3>
              {ratingData.count > 2 && (
                <button 
                  onClick={() => navigate(`/find-pool/reviews/${pool.driver_id}`)}
                  className="text-primary text-sm font-medium"
                >
                  View all
                </button>
              )}
            </div>

            <div className="space-y-0">
              {reviews.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">No reviews yet</p>
              ) : (
                reviews.slice(0, 3).map((review) => (
                  <ReviewItem
                    key={review.id}
                    userName={review.reviewer?.full_name || 'Anonymous'}
                    userImage={review.reviewer?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${review.id}`}
                    rating={review.rating}
                    date={format(new Date(review.created_at), "d MMMM yyyy")}
                    comment={review.comment || ''}
                  />
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Fixed Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 flex gap-3">
        <Button
          size="icon"
          variant="outline"
          onClick={() => navigate(`/find-pool/chat/${id}`)}
          className="h-14 w-14 rounded-full flex-shrink-0"
        >
          <MessageCircle className="h-5 w-5" />
        </Button>
        {user?.id === pool.driver_id ? (
          <Button
            onClick={handleCallRider}
            className="flex-1 h-14 rounded-xl font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Call rider
          </Button>
        ) : hasRequested ? (
          <Button
            disabled
            className="flex-1 h-14 rounded-xl font-semibold bg-muted text-muted-foreground"
          >
            Request sent
          </Button>
        ) : (
          <Button
            onClick={handleRequestPool}
            disabled={requesting || pool.available_seats === 0}
            className="flex-1 h-14 rounded-xl font-semibold bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {requesting ? "Requesting..." : pool.available_seats === 0 ? "Pool is full" : "Request pool"}
          </Button>
        )}
      </div>
    </PageLayout>
  );
};

export default RiderProfile;