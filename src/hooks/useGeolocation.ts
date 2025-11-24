import { useState, useEffect } from 'react';

interface CustomGeolocationPosition {
  latitude: number;
  longitude: number;
  accuracy: number;
  timestamp: number;
}

interface CustomGeolocationError {
  code: number;
  message: string;
}

export const useGeolocation = (watch = false) => {
  const [position, setPosition] = useState<CustomGeolocationPosition | null>(null);
  const [error, setError] = useState<CustomGeolocationError | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError({
        code: 0,
        message: 'Geolocation is not supported by your browser'
      });
      setLoading(false);
      return;
    }

    const onSuccess = (pos: GeolocationPosition) => {
      setPosition({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        accuracy: pos.coords.accuracy,
        timestamp: pos.timestamp
      });
      setLoading(false);
      setError(null);
    };

    const onError = (err: GeolocationPositionError) => {
      setError({
        code: err.code,
        message: err.message
      });
      setLoading(false);
    };

    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    if (watch) {
      const watchId = navigator.geolocation.watchPosition(onSuccess, onError, options);
      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      navigator.geolocation.getCurrentPosition(onSuccess, onError, options);
    }
  }, [watch]);

  return { position, error, loading };
};
