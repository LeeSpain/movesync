
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

// Authentication guard component
const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, user } = useAuth();
  
  useEffect(() => {
    console.log("RequireAuth check:", { isAuthenticated, user });
  }, [isAuthenticated, user]);
  
  if (!isAuthenticated) {
    console.log("Not authenticated, redirecting to login");
    return <Navigate to="/login" replace />;
  }
  
  console.log("Authentication verified, rendering protected content");
  return <>{children}</>;
};

const AuthRoutes = () => {
  return (
    <Routes>
      {/* Main dashboard route - will redirect to free or premium based on user plan */}
      <Route path="/" element={
        <RequireAuth>
          <Dashboard />
        </RequireAuth>
      } />
      
      {/* Settings route */}
      <Route path="/settings" element={
        <RequireAuth>
          <FeaturePlaceholder feature="Account Settings" />
        </RequireAuth>
      } />
      
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

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

export default AuthRoutes;
export { RequireAuth, FeaturePlaceholder };
