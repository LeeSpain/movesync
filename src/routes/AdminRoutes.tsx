
import { Route, Navigate } from "react-router-dom";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import UserManagement from "@/pages/admin/UserManagement";
import CountryManagement from "@/pages/admin/CountryManagement";
import AdminSettings from "@/pages/admin/AdminSettings";
import { FeaturePlaceholder } from "./AuthRoutes";

// Admin guard component
const RequireAdmin = ({ children }: { children: React.ReactNode }) => {
  const user = localStorage.getItem('moveSync_user') ? JSON.parse(localStorage.getItem('moveSync_user') || '{}') : null;
  const isAdmin = user && user.id === '1'; // For demo purposes, assume user with ID 1 is admin
  
  return isAdmin ? <>{children}</> : <Navigate to="/dashboard" replace />;
};

const AdminRoutes = () => {
  return (
    <>
      <Route path="/admin" element={
        <RequireAdmin>
          <AdminDashboard />
        </RequireAdmin>
      } />
      <Route path="/admin/users" element={
        <RequireAdmin>
          <UserManagement />
        </RequireAdmin>
      } />
      <Route path="/admin/countries" element={
        <RequireAdmin>
          <CountryManagement />
        </RequireAdmin>
      } />
      <Route path="/admin/properties" element={
        <RequireAdmin>
          <FeaturePlaceholder feature="Property Management" />
        </RequireAdmin>
      } />
      <Route path="/admin/visa" element={
        <RequireAdmin>
          <FeaturePlaceholder feature="Visa Service Management" />
        </RequireAdmin>
      } />
      <Route path="/admin/cost-living" element={
        <RequireAdmin>
          <FeaturePlaceholder feature="Cost of Living Management" />
        </RequireAdmin>
      } />
      <Route path="/admin/jobs" element={
        <RequireAdmin>
          <FeaturePlaceholder feature="Job Management" />
        </RequireAdmin>
      } />
      <Route path="/admin/services" element={
        <RequireAdmin>
          <FeaturePlaceholder feature="Services Management" />
        </RequireAdmin>
      } />
      <Route path="/admin/ai-assistant" element={
        <RequireAdmin>
          <FeaturePlaceholder feature="AI Assistant Management" />
        </RequireAdmin>
      } />
      <Route path="/admin/analytics" element={
        <RequireAdmin>
          <FeaturePlaceholder feature="Analytics" />
        </RequireAdmin>
      } />
      <Route path="/admin/settings" element={
        <RequireAdmin>
          <AdminSettings />
        </RequireAdmin>
      } />
    </>
  );
};

export default AdminRoutes;
export { RequireAdmin };
