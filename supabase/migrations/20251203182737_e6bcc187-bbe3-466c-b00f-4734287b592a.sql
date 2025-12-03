-- Create pools table (ride offers)
CREATE TABLE public.pools (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  driver_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  vehicle_id UUID REFERENCES public.vehicles(id) ON DELETE SET NULL,
  
  -- Locations
  source_address TEXT NOT NULL,
  source_lat DECIMAL(10, 8) NOT NULL,
  source_lng DECIMAL(11, 8) NOT NULL,
  destination_address TEXT NOT NULL,
  destination_lat DECIMAL(10, 8) NOT NULL,
  destination_lng DECIMAL(11, 8) NOT NULL,
  
  -- Schedule
  departure_time TIMESTAMPTZ NOT NULL,
  is_recurring BOOLEAN DEFAULT false,
  recurring_days TEXT[],
  
  -- Details
  price DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  total_seats INTEGER NOT NULL,
  available_seats INTEGER NOT NULL,
  facilities TEXT[] DEFAULT '{}',
  instructions TEXT,
  
  -- Status: active, in_progress, completed, cancelled
  status TEXT DEFAULT 'active',
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create pool_requests table (ride bookings)
CREATE TABLE public.pool_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pool_id UUID NOT NULL REFERENCES public.pools(id) ON DELETE CASCADE,
  rider_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  
  seats_requested INTEGER DEFAULT 1,
  -- Status: pending, accepted, rejected, cancelled
  status TEXT DEFAULT 'pending',
  
  -- Rider's pickup/dropoff
  pickup_address TEXT,
  pickup_lat DECIMAL(10, 8),
  pickup_lng DECIMAL(11, 8),
  dropoff_address TEXT,
  dropoff_lat DECIMAL(10, 8),
  dropoff_lng DECIMAL(11, 8),
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(pool_id, rider_id)
);

-- Create reviews table
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reviewer_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  reviewee_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  pool_id UUID REFERENCES public.pools(id) ON DELETE SET NULL,
  
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(reviewer_id, reviewee_id, pool_id)
);

-- Create messages table (for chat)
CREATE TABLE public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pool_id UUID NOT NULL REFERENCES public.pools(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.pools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pool_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Pools RLS Policies
CREATE POLICY "Anyone can view active pools"
ON public.pools FOR SELECT
USING (status = 'active' OR driver_id = auth.uid());

CREATE POLICY "Drivers can create pools"
ON public.pools FOR INSERT
WITH CHECK (auth.uid() = driver_id);

CREATE POLICY "Drivers can update their own pools"
ON public.pools FOR UPDATE
USING (auth.uid() = driver_id);

CREATE POLICY "Drivers can delete their own pools"
ON public.pools FOR DELETE
USING (auth.uid() = driver_id);

-- Pool Requests RLS Policies
CREATE POLICY "Riders can view their own requests"
ON public.pool_requests FOR SELECT
USING (
  rider_id = auth.uid() OR 
  EXISTS (SELECT 1 FROM public.pools WHERE pools.id = pool_requests.pool_id AND pools.driver_id = auth.uid())
);

CREATE POLICY "Riders can create requests"
ON public.pool_requests FOR INSERT
WITH CHECK (auth.uid() = rider_id);

CREATE POLICY "Riders can update their own requests"
ON public.pool_requests FOR UPDATE
USING (
  rider_id = auth.uid() OR 
  EXISTS (SELECT 1 FROM public.pools WHERE pools.id = pool_requests.pool_id AND pools.driver_id = auth.uid())
);

CREATE POLICY "Riders can delete their own requests"
ON public.pool_requests FOR DELETE
USING (rider_id = auth.uid());

-- Reviews RLS Policies
CREATE POLICY "Anyone can view reviews"
ON public.reviews FOR SELECT
USING (true);

CREATE POLICY "Users can create reviews"
ON public.reviews FOR INSERT
WITH CHECK (auth.uid() = reviewer_id);

CREATE POLICY "Users can update their own reviews"
ON public.reviews FOR UPDATE
USING (auth.uid() = reviewer_id);

CREATE POLICY "Users can delete their own reviews"
ON public.reviews FOR DELETE
USING (auth.uid() = reviewer_id);

-- Messages RLS Policies
CREATE POLICY "Users can view their own messages"
ON public.messages FOR SELECT
USING (sender_id = auth.uid() OR receiver_id = auth.uid());

CREATE POLICY "Users can send messages"
ON public.messages FOR INSERT
WITH CHECK (auth.uid() = sender_id);

CREATE POLICY "Users can update their own messages"
ON public.messages FOR UPDATE
USING (sender_id = auth.uid());

-- Create updated_at triggers
CREATE TRIGGER update_pools_updated_at
BEFORE UPDATE ON public.pools
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_pool_requests_updated_at
BEFORE UPDATE ON public.pool_requests
FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Enable realtime for messages
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;

-- Create function to get average rating
CREATE OR REPLACE FUNCTION public.get_user_rating(user_uuid UUID)
RETURNS TABLE(average_rating NUMERIC, review_count BIGINT)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    COALESCE(AVG(rating)::NUMERIC, 0) as average_rating,
    COUNT(*) as review_count
  FROM public.reviews
  WHERE reviewee_id = user_uuid;
$$;