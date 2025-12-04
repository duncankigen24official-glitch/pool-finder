import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageLayout from "@/components/layout/PageLayout";
import PoolCard from "@/components/my-trip/PoolCard";
import RequestCard from "@/components/my-trip/RequestCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";

interface PoolData {
  id: string;
  source_address: string;
  destination_address: string;
  departure_time: string;
  driver: {
    full_name: string;
    avatar_url: string | null;
  } | null;
}

interface MyRide {
  id: string;
  pool: PoolData;
}

interface PoolRequest {
  pool_id: string;
  departure_time: string;
  source_address: string;
  destination_address: string;
  riders: {
    id: string;
    name: string;
    avatar: string;
  }[];
  requestCount: number;
}

const MyTrip = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("my-pool");
  const [myRides, setMyRides] = useState<MyRide[]>([]);
  const [myPoolRequests, setMyPoolRequests] = useState<PoolRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user, activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === "my-pool") {
        await fetchMyRides();
      } else {
        await fetchPoolRequests();
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyRides = async () => {
    // Fetch pools where user is a rider (accepted requests)
    const { data: riderPools, error: riderError } = await supabase
      .from('pool_requests')
      .select(`
        id,
        pool:pools(
          id,
          source_address,
          destination_address,
          departure_time,
          driver:profiles!driver_id(full_name, avatar_url)
        )
      `)
      .eq('rider_id', user?.id)
      .eq('status', 'accepted');

    if (riderError) {
      console.error("Error fetching rider pools:", riderError);
    }

    // Also fetch pools where user is a driver
    const { data: driverPools, error: driverError } = await supabase
      .from('pools')
      .select(`
        id,
        source_address,
        destination_address,
        departure_time,
        driver:profiles!driver_id(full_name, avatar_url)
      `)
      .eq('driver_id', user?.id)
      .eq('status', 'active')
      .gte('departure_time', new Date().toISOString());

    if (driverError) {
      console.error("Error fetching driver pools:", driverError);
    }

    // Combine and transform data
    const ridesFromRequests = (riderPools || []).map(item => {
      const pool = Array.isArray(item.pool) ? item.pool[0] : item.pool;
      return {
        id: item.id,
        pool: {
          ...pool,
          driver: Array.isArray(pool?.driver) ? pool.driver[0] : pool?.driver
        }
      };
    }).filter(item => item.pool);

    const ridesAsDriver = (driverPools || []).map(pool => ({
      id: pool.id,
      pool: {
        id: pool.id,
        source_address: pool.source_address,
        destination_address: pool.destination_address,
        departure_time: pool.departure_time,
        driver: Array.isArray(pool.driver) ? pool.driver[0] : pool.driver
      }
    }));

    setMyRides([...ridesAsDriver, ...ridesFromRequests]);
  };

  const fetchPoolRequests = async () => {
    // Fetch ALL pools where user is the driver
    const { data: pools, error: poolsError } = await supabase
      .from('pools')
      .select(`
        id,
        source_address,
        destination_address,
        departure_time
      `)
      .eq('driver_id', user?.id)
      .eq('status', 'active')
      .gte('departure_time', new Date().toISOString())
      .order('departure_time', { ascending: true });

    if (poolsError) {
      console.error("Error fetching pools:", poolsError);
      return;
    }

    const poolRequests: PoolRequest[] = [];

    for (const pool of pools || []) {
      // Get requests for this pool (if any)
      const { data: requests, error: reqError } = await supabase
        .from('pool_requests')
        .select(`
          id,
          rider:profiles!rider_id(id, full_name, avatar_url)
        `)
        .eq('pool_id', pool.id);

      if (reqError) {
        console.error("Error fetching requests:", reqError);
      }

      const riders = (requests || []).map(req => {
        const rider = Array.isArray(req.rider) ? req.rider[0] : req.rider;
        return {
          id: rider?.id || '',
          name: rider?.full_name || 'Unknown',
          avatar: rider?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${rider?.id}`
        };
      });

      // Show ALL pools, not just those with requests
      poolRequests.push({
        pool_id: pool.id,
        departure_time: pool.departure_time,
        source_address: pool.source_address,
        destination_address: pool.destination_address,
        riders: riders.slice(0, 4), // Show max 4 avatars
        requestCount: requests?.length || 0
      });
    }

    setMyPoolRequests(poolRequests);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    
    if (isToday) return "Today";
    return format(date, "dd MMM");
  };

  const formatTime = (dateString: string) => {
    return format(new Date(dateString), "h:mm a");
  };

  return (
    <PageLayout>
      <div className="px-4 py-6">
        {/* Header */}
        <h1 className="text-center text-primary font-bold text-xl mb-6 uppercase tracking-wide">
          MY TRIP
        </h1>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-transparent gap-4">
            <TabsTrigger
              value="my-pool"
              className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-2 text-muted-foreground"
            >
              My pool
            </TabsTrigger>
            <TabsTrigger
              value="request-for-pool"
              className="data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none pb-2 text-muted-foreground"
            >
              Request for pool
            </TabsTrigger>
          </TabsList>

          <TabsContent value="my-pool" className="mt-0">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : myRides.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No active pools</p>
                <p className="text-sm text-muted-foreground mt-1">Create a pool or join one to get started</p>
              </div>
            ) : (
              myRides.map((ride) => (
                <PoolCard
                  key={ride.id}
                  driver={{
                    name: ride.pool.driver?.full_name || "Unknown",
                    avatar: ride.pool.driver?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${ride.id}`,
                    verified: true,
                  }}
                  date={formatDate(ride.pool.departure_time)}
                  time={formatTime(ride.pool.departure_time)}
                  source={ride.pool.source_address}
                  destination={ride.pool.destination_address}
                  buttonText="Pool info"
                  onButtonClick={() => navigate(`/find-pool/rider/${ride.pool.id}`)}
                />
              ))
            )}
          </TabsContent>

          <TabsContent value="request-for-pool" className="mt-0">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : myPoolRequests.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No pool requests</p>
                <p className="text-sm text-muted-foreground mt-1">When riders request to join your pool, they'll appear here</p>
              </div>
            ) : (
              myPoolRequests.map((request) => (
                <RequestCard
                  key={request.pool_id}
                  riders={request.riders}
                  date={formatDate(request.departure_time)}
                  time={formatTime(request.departure_time)}
                  source={request.source_address}
                  destination={request.destination_address}
                  requestCount={request.requestCount}
                  onRequestsClick={() => navigate(`/my-trip/requests?poolId=${request.pool_id}`)}
                />
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </PageLayout>
  );
};

export default MyTrip;