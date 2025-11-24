-- Create vehicles table
CREATE TABLE IF NOT EXISTS public.vehicles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  vehicle_name TEXT NOT NULL,
  vehicle_type TEXT NOT NULL CHECK (vehicle_type IN ('sedan', 'suv', 'hatchback', 'wagon', 'minivan', 'truck')),
  registration_number TEXT NOT NULL,
  seat_capacity INTEGER NOT NULL CHECK (seat_capacity > 0 AND seat_capacity <= 15),
  facilities TEXT[] DEFAULT '{}',
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.vehicles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for vehicles
CREATE POLICY "Users can view their own vehicles"
  ON public.vehicles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own vehicles"
  ON public.vehicles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own vehicles"
  ON public.vehicles FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own vehicles"
  ON public.vehicles FOR DELETE
  USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_vehicles_updated_at
  BEFORE UPDATE ON public.vehicles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Add preferred_currency to profiles
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS preferred_currency TEXT DEFAULT 'USD' NOT NULL;

-- Add check constraint for valid currencies
ALTER TABLE public.profiles
DROP CONSTRAINT IF EXISTS valid_currency;

ALTER TABLE public.profiles
ADD CONSTRAINT valid_currency CHECK (
  preferred_currency IN (
    'USD', 'EUR', 'GBP', 'KES', 'TZS', 'UGX', 'RWF', 'BIF',
    'ETB', 'ZAR', 'NGN', 'EGP', 'MAD', 'GHS', 'XOF', 'XAF',
    'MWK', 'ZMW', 'BWP', 'SZL', 'LSL', 'MZN', 'AOA', 'SSP',
    'SDG', 'DJF', 'SOS', 'ERN', 'SCR', 'MUR', 'KMF', 'MGA',
    'JPY', 'CNY', 'INR', 'AUD', 'CAD', 'CHF', 'SEK', 'NOK',
    'DKK', 'NZD', 'SGD', 'HKD', 'MXN', 'BRL', 'ARS', 'CLP',
    'TND', 'LYD', 'DZD', 'GMD', 'GNF', 'LRD', 'SLL', 'CVE',
    'STN', 'CDF', 'NAD', 'SHP'
  )
);

-- Create vehicle-images storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('vehicle-images', 'vehicle-images', true)
ON CONFLICT (id) DO NOTHING;

-- RLS policies for vehicle-images storage
CREATE POLICY "Users can upload their vehicle images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'vehicle-images' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can update their vehicle images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'vehicle-images' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

CREATE POLICY "Anyone can view vehicle images"
ON storage.objects FOR SELECT
USING (bucket_id = 'vehicle-images');

CREATE POLICY "Users can delete their vehicle images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'vehicle-images' AND
  auth.uid()::text = (storage.foldername(name))[1]
);