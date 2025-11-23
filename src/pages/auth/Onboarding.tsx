import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Car, MapPin, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const Onboarding = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const { user } = useAuth();

  const slides = [
    {
      icon: Users,
      title: "Travel, but not alone",
      description: "Connect with like-minded travelers heading in the same direction. Share the journey, share the experience.",
      color: "text-primary",
    },
    {
      icon: Car,
      title: "Share your ride",
      description: "Have empty seats? Offer rides to fellow travelers and help them reach their destination while enjoying great company.",
      color: "text-green-500",
    },
    {
      icon: MapPin,
      title: "Find your ride",
      description: "Looking for a ride? Find drivers going your way and travel together safely and conveniently.",
      color: "text-amber-500",
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleGetStarted = async () => {
    if (user) {
      // Mark onboarding as complete
      await supabase
        .from("profiles")
        .update({ has_completed_onboarding: true })
        .eq("id", user.id);
      navigate("/find-pool", { replace: true });
    } else {
      navigate("/signup", { replace: true });
    }
  };

  const handleSkip = () => {
    navigate("/login", { replace: true });
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Skip button */}
      <div className="p-4 flex justify-end">
        <Button variant="ghost" onClick={handleSkip}>
          Skip
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        <div className="text-center max-w-md animate-fade-in">
          <div className={`mb-8 ${slide.color}`}>
            <Icon className="h-32 w-32 mx-auto" />
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-4">{slide.title}</h2>
          <p className="text-muted-foreground text-lg">{slide.description}</p>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="p-6 space-y-4">
        {/* Dots indicator */}
        <div className="flex justify-center gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide ? "w-8 bg-primary" : "w-2 bg-muted"
              }`}
            />
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="flex gap-3">
          {currentSlide > 0 && (
            <Button variant="outline" onClick={handlePrevious} className="flex-1">
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
          )}
          
          {currentSlide < slides.length - 1 ? (
            <Button onClick={handleNext} className="flex-1">
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleGetStarted} className="flex-1">
              Get Started
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
