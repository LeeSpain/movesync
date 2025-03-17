
import { Route, Navigate } from "react-router-dom";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";

// Authentication guard component
const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = localStorage.getItem('moveSync_user') !== null;
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
};

const AuthRoutes = () => {
  return (
    <>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={
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
    </>
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
