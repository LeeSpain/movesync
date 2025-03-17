
import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import UserManagement from "@/pages/admin/UserManagement";
import CountryManagement from "@/pages/admin/CountryManagement";
import AdminSettings from "@/pages/admin/AdminSettings";
import { FeaturePlaceholder } from "./AuthRoutes";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

// Admin guard component
const RequireAdmin = ({ children }: { children: React.ReactNode }) => {
  const { user, isAdmin } = useAuth();
  
  // Use effect to log admin check on component mount and when auth state changes
  useEffect(() => {
    console.log("RequireAdmin component mounted/updated");
    console.log("RequireAdmin check:", { 
      user, 
      isAdmin, 
      userExists: !!user,
      userIsAdmin: user?.isAdmin
    });
    
    const storedUser = localStorage.getItem('moveSync_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        console.log("User from localStorage in RequireAdmin:", parsedUser);
      } catch (e) {
        console.error("Error parsing user from localStorage:", e);
      }
    } else {
      console.log("No user found in localStorage in RequireAdmin");
    }
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
          <FeaturePlaceholder feature="Property Management" />
        </RequireAdmin>
      } />
      <Route path="/visa" element={
        <RequireAdmin>
          <FeaturePlaceholder feature="Visa Service Management" />
        </RequireAdmin>
      } />
      <Route path="/cost-living" element={
        <RequireAdmin>
          <FeaturePlaceholder feature="Cost of Living Management" />
        </RequireAdmin>
      } />
      <Route path="/jobs" element={
        <RequireAdmin>
          <FeaturePlaceholder feature="Job Management" />
        </RequireAdmin>
      } />
      <Route path="/services" element={
        <RequireAdmin>
          <FeaturePlaceholder feature="Services Management" />
        </RequireAdmin>
      } />
      <Route path="/ai-assistant" element={
        <RequireAdmin>
          <FeaturePlaceholder feature="AI Assistant Management" />
        </RequireAdmin>
      } />
      <Route path="/analytics" element={
        <RequireAdmin>
          <FeaturePlaceholder feature="Analytics" />
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
