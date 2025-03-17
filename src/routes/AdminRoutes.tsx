
import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import UserManagement from "@/pages/admin/UserManagement";
import CountryManagement from "@/pages/admin/CountryManagement";
import PropertyManagement from "@/pages/admin/PropertyManagement";
import VisaManagement from "@/pages/admin/VisaManagement";
import CostOfLivingManagement from "@/pages/admin/CostOfLivingManagement";
import JobManagement from "@/pages/admin/JobManagement";
import ServicesManagement from "@/pages/admin/ServicesManagement";
import AIAssistantManagement from "@/pages/admin/AIAssistantManagement";
import AnalyticsManagement from "@/pages/admin/AnalyticsManagement";
import AdminSettings from "@/pages/admin/AdminSettings";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

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
      <Route path="/countries" element={
        <RequireAdmin>
          <CountryManagement />
        </RequireAdmin>
      } />
      <Route path="/properties" element={
        <RequireAdmin>
          <PropertyManagement />
        </RequireAdmin>
      } />
      <Route path="/visa" element={
        <RequireAdmin>
          <VisaManagement />
        </RequireAdmin>
      } />
      <Route path="/cost-living" element={
        <RequireAdmin>
          <CostOfLivingManagement />
        </RequireAdmin>
      } />
      <Route path="/jobs" element={
        <RequireAdmin>
          <JobManagement />
        </RequireAdmin>
      } />
      <Route path="/services" element={
        <RequireAdmin>
          <ServicesManagement />
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
