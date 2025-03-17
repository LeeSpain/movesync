
import { Route, Routes } from "react-router-dom";
import PublicRoutes from "./PublicRoutes";
import AuthRoutes from "./AuthRoutes";
import AdminRoutes from "./AdminRoutes";
import FreeDashboardRoutes from "./FreeDashboardRoutes";
import PremiumDashboardRoutes from "./PremiumDashboardRoutes";
import NotFound from "@/pages/NotFound";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <PublicRoutes />
      
      {/* Authentication Routes */}
      <AuthRoutes />
      
      {/* Free Dashboard Routes */}
      <FreeDashboardRoutes />
      
      {/* Premium Dashboard Routes */}
      <PremiumDashboardRoutes />
      
      {/* Admin Routes */}
      <AdminRoutes />
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
