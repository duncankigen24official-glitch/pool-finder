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
import AllReviews from "./pages/find-pool/AllReviews";
import Chat from "./pages/find-pool/Chat";
import OfferPool from "./pages/OfferPool";
import OfferPoolDetails from "./pages/offer-pool/Details";
import MyTrip from "./pages/MyTrip";
import PoolTakerRequests from "./pages/my-trip/PoolTakerRequests";
import ActiveTripMapView from "./pages/my-trip/ActiveTripMapView";
import TripRoadmap from "./pages/my-trip/TripRoadmap";
import Profile from "./pages/Profile";
import EditProfile from "./pages/profile/EditProfile";
import MyCar from "./pages/profile/MyCar";
import AddCar from "./pages/profile/AddCar";
import RideHistory from "./pages/profile/RideHistory";
import Language from "./pages/profile/Language";
import TermsCondition from "./pages/profile/TermsCondition";
import PrivacyPolicy from "./pages/profile/PrivacyPolicy";
import HelpSupport from "./pages/profile/HelpSupport";
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
          <Route path="/find-pool/reviews/:id" element={<AllReviews />} />
          <Route path="/find-pool/chat/:id" element={<Chat />} />
          <Route path="/offer-pool" element={<OfferPool />} />
          <Route path="/offer-pool/details" element={<OfferPoolDetails />} />
          <Route path="/my-trip" element={<MyTrip />} />
          <Route path="/my-trip/requests" element={<PoolTakerRequests />} />
          <Route path="/my-trip/active-map-view" element={<ActiveTripMapView />} />
          <Route path="/my-trip/roadmap" element={<TripRoadmap />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/profile/my-car" element={<MyCar />} />
          <Route path="/profile/add-car" element={<AddCar />} />
          <Route path="/profile/ride-history" element={<RideHistory />} />
          <Route path="/profile/language" element={<Language />} />
          <Route path="/profile/terms" element={<TermsCondition />} />
          <Route path="/profile/privacy" element={<PrivacyPolicy />} />
          <Route path="/profile/help" element={<HelpSupport />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
