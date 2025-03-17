
import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import UserManagement from "@/pages/admin/UserManagement";
import AnalyticsManagement from "@/pages/admin/AnalyticsManagement";
import AIAssistantManagement from "@/pages/admin/AIAssistantManagement";
import AdminSettings from "@/pages/admin/AdminSettings";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";
import RevenueManagement from "@/pages/admin/RevenueManagement";
import SubscriptionsManagement from "@/pages/admin/SubscriptionsManagement";
import GrowthMetricsManagement from "@/pages/admin/GrowthMetricsManagement";
import FinancialReportsManagement from "@/pages/admin/FinancialReportsManagement";

// Admin guard component
const RequireAdmin = ({ children }: { children: React.ReactNode }) => {
  const { user, isAdmin } = useAuth();
  
  // Use effect to log admin check on component mount and when auth state changes
  useEffect(() => {
    console.log("RequireAdmin check:", { 
      user, 
      isAdmin, 
      userExists: !!user,
      userIsAdmin: user?.isAdmin
    });
  }, [user, isAdmin]);
  
  if (!isAdmin) {
    console.log("Access denied: Not an admin user, redirecting to dashboard");
    return <Navigate to="/dashboard" replace />;
  }
  
  console.log("Admin access granted");
  return <>{children}</>;
};

const AdminRoutes = () => {
  const { isAdmin, user } = useAuth();
  
  console.log("AdminRoutes rendered with auth state:", { isAdmin, user, userIsAdmin: user?.isAdmin });
  
  return (
    <Routes>
      <Route path="/" element={
        <RequireAdmin>
          <AdminDashboard />
        </RequireAdmin>
      } />
      <Route path="/users" element={
        <RequireAdmin>
          <UserManagement />
        </RequireAdmin>
      } />
      <Route path="/revenue" element={
        <RequireAdmin>
          <RevenueManagement />
        </RequireAdmin>
      } />
      <Route path="/subscriptions" element={
        <RequireAdmin>
          <SubscriptionsManagement />
        </RequireAdmin>
      } />
      <Route path="/growth" element={
        <RequireAdmin>
          <GrowthMetricsManagement />
        </RequireAdmin>
      } />
      <Route path="/finance" element={
        <RequireAdmin>
          <FinancialReportsManagement />
        </RequireAdmin>
      } />
      <Route path="/ai-assistant" element={
        <RequireAdmin>
          <AIAssistantManagement />
        </RequireAdmin>
      } />
      <Route path="/analytics" element={
        <RequireAdmin>
          <AnalyticsManagement />
        </RequireAdmin>
      } />
      <Route path="/settings" element={
        <RequireAdmin>
          <AdminSettings />
        </RequireAdmin>
      } />
    </Routes>
  );
};

export default AdminRoutes;
export { RequireAdmin };
