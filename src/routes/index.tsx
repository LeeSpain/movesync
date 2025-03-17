
import { Route, Routes } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import AuthRoutes from "./AuthRoutes";
import AdminRoutes from "./AdminRoutes";
import FreeDashboardRoutes from "./FreeDashboardRoutes";
import PremiumDashboardRoutes from "./PremiumDashboardRoutes";
import NotFound from "@/pages/NotFound";
import Dashboard from "@/pages/Dashboard";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/*" element={<PublicRoutes />} />
      
      {/* Authentication Routes */}
      <Route path="/auth/*" element={<AuthRoutes />} />
      
      {/* Main Dashboard Route */}
      <Route path="/dashboard" element={<Dashboard />} />
      
      {/* Free Dashboard Routes */}
      <Route path="/dashboard/free/*" element={<FreeDashboardRoutes />} />
      
      {/* Premium Dashboard Routes */}
      <Route path="/dashboard/premium/*" element={<PremiumDashboardRoutes />} />
      
      {/* Admin Routes */}
      <Route path="/admin/*" element={<AdminRoutes />} />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
