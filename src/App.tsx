import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import Splash from "./pages/auth/Splash";
import Onboarding from "./pages/auth/Onboarding";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import ForgotPassword from "./pages/auth/ForgotPassword";
import Terms from "./pages/auth/Terms";
import Privacy from "./pages/auth/Privacy";
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
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/splash" element={<Splash />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />

            {/* Protected routes */}
            <Route path="/find-pool" element={<ProtectedRoute><FindPool /></ProtectedRoute>} />
            <Route path="/find-pool/location-picker" element={<ProtectedRoute><LocationPicker /></ProtectedRoute>} />
            <Route path="/find-pool/results" element={<ProtectedRoute><Results /></ProtectedRoute>} />
            <Route path="/find-pool/rider/:id" element={<ProtectedRoute><RiderProfile /></ProtectedRoute>} />
            <Route path="/find-pool/map-view" element={<ProtectedRoute><MapView /></ProtectedRoute>} />
            <Route path="/find-pool/reviews/:id" element={<ProtectedRoute><AllReviews /></ProtectedRoute>} />
            <Route path="/find-pool/chat/:id" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
            <Route path="/offer-pool" element={<ProtectedRoute><OfferPool /></ProtectedRoute>} />
            <Route path="/offer-pool/details" element={<ProtectedRoute><OfferPoolDetails /></ProtectedRoute>} />
            <Route path="/my-trip" element={<ProtectedRoute><MyTrip /></ProtectedRoute>} />
            <Route path="/my-trip/requests" element={<ProtectedRoute><PoolTakerRequests /></ProtectedRoute>} />
            <Route path="/my-trip/active-map-view" element={<ProtectedRoute><ActiveTripMapView /></ProtectedRoute>} />
            <Route path="/my-trip/roadmap" element={<ProtectedRoute><TripRoadmap /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/profile/edit" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
            <Route path="/profile/my-car" element={<ProtectedRoute><MyCar /></ProtectedRoute>} />
            <Route path="/profile/add-car" element={<ProtectedRoute><AddCar /></ProtectedRoute>} />
            <Route path="/profile/ride-history" element={<ProtectedRoute><RideHistory /></ProtectedRoute>} />
            <Route path="/profile/language" element={<ProtectedRoute><Language /></ProtectedRoute>} />
            <Route path="/profile/terms" element={<ProtectedRoute><TermsCondition /></ProtectedRoute>} />
            <Route path="/profile/privacy" element={<ProtectedRoute><PrivacyPolicy /></ProtectedRoute>} />
            <Route path="/profile/help" element={<ProtectedRoute><HelpSupport /></ProtectedRoute>} />
            
            {/* Root redirects to splash screen */}
            <Route path="/" element={<Navigate to="/splash" replace />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
