import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Car } from "lucide-react";

const Splash = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  useEffect(() => {
    const checkAuthAndOnboarding = async () => {
      if (loading) return;

      // Wait a bit for the splash effect
      await new Promise((resolve) => setTimeout(resolve, 2000));

      if (user) {
        // Check if user has completed onboarding
        const { data: profile } = await supabase
          .from("profiles")
          .select("has_completed_onboarding")
          .eq("id", user.id)
          .single();

        if (profile?.has_completed_onboarding) {
          navigate("/find-pool", { replace: true });
        } else {
          navigate("/onboarding", { replace: true });
        }
      } else {
        // Check localStorage for first-time visit
        const hasVisited = localStorage.getItem("hasVisited");
        if (hasVisited) {
          navigate("/login", { replace: true });
        } else {
          localStorage.setItem("hasVisited", "true");
          navigate("/onboarding", { replace: true });
        }
      }
    };

    checkAuthAndOnboarding();
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary/90 to-primary/80">
      <div className="text-center animate-fade-in">
        <div className="flex items-center justify-center mb-6">
          <div className="relative">
            <Car className="h-24 w-24 text-white animate-pulse" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-white/20 rounded-full animate-ping"></div>
            </div>
          </div>
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">RideShare</h1>
        <p className="text-white/90 text-lg">Your journey starts here</p>
      </div>
    </div>
  );
};

export default Splash;
