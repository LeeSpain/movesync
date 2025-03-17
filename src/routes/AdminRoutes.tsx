
import { Routes, Route, Navigate } from "react-router-dom";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import UserManagement from "@/pages/admin/UserManagement";
import CountryManagement from "@/pages/admin/CountryManagement";
import AdminSettings from "@/pages/admin/AdminSettings";
import { FeaturePlaceholder } from "./AuthRoutes";

// Admin guard component
const RequireAdmin = ({ children }: { children: React.ReactNode }) => {
  const user = localStorage.getItem('moveSync_user') ? JSON.parse(localStorage.getItem('moveSync_user') || '{}') : null;
  const isAdmin = user && user.isAdmin === true; // Check specifically for isAdmin property
  
  return isAdmin ? <>{children}</> : <Navigate to="/dashboard" replace />;
};

const AdminRoutes = () => {
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
