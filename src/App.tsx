import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FindPool from "./pages/FindPool";
import LocationPicker from "./pages/find-pool/LocationPicker";
import Results from "./pages/find-pool/Results";
import RiderProfile from "./pages/find-pool/RiderProfile";
import MapView from "./pages/find-pool/MapView";
import OfferPool from "./pages/OfferPool";
import MyTrip from "./pages/MyTrip";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<FindPool />} />
          <Route path="/find-pool/location-picker" element={<LocationPicker />} />
          <Route path="/find-pool/results" element={<Results />} />
          <Route path="/find-pool/rider/:id" element={<RiderProfile />} />
          <Route path="/find-pool/map-view" element={<MapView />} />
          <Route path="/offer-pool" element={<OfferPool />} />
          <Route path="/my-trip" element={<MyTrip />} />
          <Route path="/profile" element={<Profile />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
