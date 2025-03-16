
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import FreeDashboard from "./pages/FreeDashboard";
import PremiumDashboard from "./pages/PremiumDashboard";

// Create a placeholder component for feature pages that aren't fully implemented yet
const FeaturePlaceholder = ({ feature }: { feature: string }) => (
  <div className="flex flex-col items-center justify-center min-h-screen p-8">
    <h1 className="text-2xl font-bold mb-4">
      {feature} Feature
    </h1>
    <p className="text-center mb-8">
      This page is under development. Check back soon for the complete {feature.toLowerCase()} functionality.
    </p>
    <a href="/dashboard" className="bg-movesync-blue text-white px-6 py-3 rounded-md">
      Return to Dashboard
    </a>
  </div>
);

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
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/free" element={<FreeDashboard />} />
            <Route path="/dashboard/premium" element={<PremiumDashboard />} />
            
            {/* Free dashboard feature pages */}
            <Route path="/dashboard/free/property" element={<FeaturePlaceholder feature="Property Search" />} />
            <Route path="/dashboard/free/visa" element={<FeaturePlaceholder feature="Visa Application" />} />
            <Route path="/dashboard/free/cost-living" element={<FeaturePlaceholder feature="Cost of Living" />} />
            
            {/* Premium dashboard feature pages */}
            <Route path="/dashboard/premium/property" element={<FeaturePlaceholder feature="Premium Property Search" />} />
            <Route path="/dashboard/premium/visa" element={<FeaturePlaceholder feature="Premium Visa Services" />} />
            <Route path="/dashboard/premium/cost-living" element={<FeaturePlaceholder feature="Premium Cost of Living" />} />
            <Route path="/dashboard/premium/jobs" element={<FeaturePlaceholder feature="Job Search" />} />
            <Route path="/dashboard/premium/services" element={<FeaturePlaceholder feature="Services Finder" />} />
            <Route path="/dashboard/premium/assistant" element={<FeaturePlaceholder feature="AI Assistant" />} />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
