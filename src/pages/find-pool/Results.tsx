import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import RideCard from "@/components/find-pool/RideCard";
import { Calendar, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { supabase } from "@/integrations/supabase/client";
import { haversineDistance } from "@/lib/geo";

interface Pool {
  id: string;
  driver_id: string;
  source_address: string;
  destination_address: string;
  source_lat: number;
  source_lng: number;
  destination_lat: number;
  destination_lng: number;
  departure_time: string;
  price: number;
  currency: string;
  available_seats: number;
  total_seats: number;
  driver: {
    id: string;
    full_name: string;
    avatar_url: string | null;
  } | null;
  vehicle: {
    vehicle_name: string;
    vehicle_type: string;
  } | null;
  // Calculated fields
  sourceDistance?: number;
  destDistance?: number;
  score?: number;
}

const SOURCE_RADIUS_KM = 10; // Max distance from user's pickup
const DEST_RADIUS_KM = 15;   // Max distance from user's destination

const Results = () => {
  const location = useLocation();
  const { source, destination, sourceCoords, destinationCoords, dateTime, seats } = location.state || {};
  const [pools, setPools] = useState<Pool[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewCounts, setReviewCounts] = useState<Record<string, { avg: number; count: number }>>({});

  useEffect(() => {
    fetchPools();
  }, []);

  const fetchPools = async () => {
    try {
      const { data, error } = await supabase
        .from('pools')
        .select(`
          id,
          driver_id,
          source_address,
          destination_address,
          source_lat,
          source_lng,
          destination_lat,
          destination_lng,
          departure_time,
          price,
          currency,
          available_seats,
          total_seats,
          driver:profiles!driver_id(id, full_name, avatar_url),
          vehicle:vehicles!vehicle_id(vehicle_name, vehicle_type)
        `)
        .eq('status', 'active')
        .gte('departure_time', new Date().toISOString())
        .gte('available_seats', seats || 1)
        .order('departure_time', { ascending: true });

      if (error) throw error;

      // Transform the data to handle the array response from joins
      let transformedData = (data || []).map(pool => ({
        ...pool,
        driver: Array.isArray(pool.driver) ? pool.driver[0] : pool.driver,
        vehicle: Array.isArray(pool.vehicle) ? pool.vehicle[0] : pool.vehicle,
      })) as Pool[];

      // If user provided coordinates, calculate distances and filter by proximity
      if (sourceCoords && destinationCoords) {
        transformedData = transformedData
          .map(pool => {
            const sourceDistance = haversineDistance(
              sourceCoords.lat,
              sourceCoords.lng,
              Number(pool.source_lat),
              Number(pool.source_lng)
            );
            const destDistance = haversineDistance(
              destinationCoords.lat,
              destinationCoords.lng,
              Number(pool.destination_lat),
              Number(pool.destination_lng)
            );
            const score = sourceDistance + destDistance;
            
            return { ...pool, sourceDistance, destDistance, score };
          })
          .filter(pool => 
            pool.sourceDistance! <= SOURCE_RADIUS_KM && 
            pool.destDistance! <= DEST_RADIUS_KM
          )
          .sort((a, b) => a.score! - b.score!); // Best matches first
      }
      // If no coordinates provided, show all pools sorted by departure time (already sorted by query)

      setPools(transformedData);

      // Fetch review counts for all drivers
      const driverIds = [...new Set(transformedData.map(p => p.driver_id))];
      if (driverIds.length > 0) {
        const reviewData: Record<string, { avg: number; count: number }> = {};
        
        for (const driverId of driverIds) {
          const { data: ratingData } = await supabase
            .rpc('get_user_rating', { user_uuid: driverId });
          
          if (ratingData && ratingData[0]) {
            reviewData[driverId] = {
              avg: Number(ratingData[0].average_rating) || 0,
              count: Number(ratingData[0].review_count) || 0
            };
          }
        }
        setReviewCounts(reviewData);
      }
    } catch (error) {
      console.error('Error fetching pools:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageLayout title="Find pool" hideBottomNav showBackButton>
      <div className="p-4 space-y-4">
        {/* Route Summary */}
        <div className="bg-card rounded-xl p-4 shadow-sm border border-border">
          <div className="flex items-start gap-3 mb-2">
            <div className="h-3 w-3 rounded-full bg-success mt-1.5" />
            <p className="text-sm text-foreground flex-1">
              {source || "Select pickup location"}
            </p>
          </div>
          <div className="flex items-start gap-3 mb-3">
            <div className="h-3 w-3 rounded-full bg-primary mt-1.5" />
            <p className="text-sm text-foreground flex-1">
              {destination || "Select destination"}
            </p>
          </div>
          <div className="flex items-center gap-2 pt-2 border-t border-border">
            <Calendar className="h-4 w-4 text-primary" />
            <span className="text-sm text-muted-foreground">
              {dateTime ? format(new Date(dateTime), "dd/MM/yyyy, h:mm a") : "Any time"}
            </span>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : pools.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No pools available at the moment</p>
            <p className="text-sm text-muted-foreground mt-1">Try adjusting your search criteria</p>
          </div>
        ) : (
          /* Ride Cards */
          <div className="space-y-3">
            {pools.map((pool) => {
              const driverRating = reviewCounts[pool.driver_id];
              return (
                <RideCard
                  key={pool.id}
                  id={pool.id}
                  driverName={pool.driver?.full_name || "Unknown Driver"}
                  driverImage={pool.driver?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${pool.driver_id}`}
                  verified={true}
                  rating={driverRating?.avg || 0}
                  reviewCount={driverRating?.count || 0}
                  price={pool.price}
                  sourceAddress={pool.source_address}
                  destinationAddress={pool.destination_address}
                  availableSeats={pool.available_seats}
                  totalSeats={pool.total_seats}
                  dateTime={format(new Date(pool.departure_time), "dd/MM/yyyy, h:mm a")}
                  sourceDistance={pool.sourceDistance}
                  destDistance={pool.destDistance}
                />
              );
            })}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Results;