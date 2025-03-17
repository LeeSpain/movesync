
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import FreeDashboard from "./pages/FreeDashboard";
import PremiumDashboard from "./pages/PremiumDashboard";
import PremiumAIAssistant from "./pages/premium-dashboard/AIAssistant";
import PropertySearch from "./pages/premium-dashboard/PropertySearch";
import VisaServices from "./pages/premium-dashboard/VisaServices";
import CostOfLiving from "./pages/premium-dashboard/CostOfLiving";
import JobSearch from "./pages/premium-dashboard/JobSearch";
import ServicesFinder from "./pages/premium-dashboard/ServicesFinder";

// Create a placeholder component for feature pages that aren't fully implemented yet
const FeaturePlaceholder = ({ feature, isPremium = false }: { feature: string; isPremium?: boolean }) => (
  <div className="flex flex-col items-center justify-center p-8">
    <h1 className="text-2xl font-bold mb-4">
      {isPremium ? "Premium " : ""}{feature} Feature
    </h1>
    <p className="text-center mb-8">
      This page is under development. Check back soon for the complete {feature.toLowerCase()} functionality.
    </p>
    <a href={isPremium ? "/dashboard/premium" : "/dashboard/free"} className="bg-movesync-blue text-white px-6 py-3 rounded-md">
      Return to Dashboard
    </a>
  </div>
);

// Authentication guard component
const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('moveSync_user') !== null;
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            } />
            
            {/* Free dashboard routes */}
            <Route path="/dashboard/free" element={
              <RequireAuth>
                <FreeDashboard />
              </RequireAuth>
            } />
            <Route path="/dashboard/free/assistant" element={
              <RequireAuth>
                <FeaturePlaceholder feature="AI Assistant" />
              </RequireAuth>
            } />
            <Route path="/dashboard/free/property" element={
              <RequireAuth>
                <FeaturePlaceholder feature="Property Search" />
              </RequireAuth>
            } />
            <Route path="/dashboard/free/visa" element={
              <RequireAuth>
                <FeaturePlaceholder feature="Visa Application" />
              </RequireAuth>
            } />
            <Route path="/dashboard/free/cost-living" element={
              <RequireAuth>
                <FeaturePlaceholder feature="Cost of Living" />
              </RequireAuth>
            } />
            
            {/* Premium dashboard routes */}
            <Route path="/dashboard/premium" element={
              <RequireAuth>
                <PremiumDashboard />
              </RequireAuth>
            } />
            <Route path="/dashboard/premium/assistant" element={
              <RequireAuth>
                <PremiumAIAssistant />
              </RequireAuth>
            } />
            <Route path="/dashboard/premium/property" element={
              <RequireAuth>
                <PropertySearch />
              </RequireAuth>
            } />
            <Route path="/dashboard/premium/visa" element={
              <RequireAuth>
                <VisaServices />
              </RequireAuth>
            } />
            <Route path="/dashboard/premium/cost-living" element={
              <RequireAuth>
                <CostOfLiving />
              </RequireAuth>
            } />
            <Route path="/dashboard/premium/jobs" element={
              <RequireAuth>
                <JobSearch />
              </RequireAuth>
            } />
            <Route path="/dashboard/premium/services" element={
              <RequireAuth>
                <ServicesFinder />
              </RequireAuth>
            } />
            
            {/* Settings route */}
            <Route path="/settings" element={
              <RequireAuth>
                <FeaturePlaceholder feature="Account Settings" />
              </RequireAuth>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
