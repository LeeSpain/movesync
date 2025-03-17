
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
      <Route>
        <PublicRoutes />
      </Route>
      
      {/* Authentication Routes */}
      <Route>
        <AuthRoutes />
      </Route>
      
      {/* Free Dashboard Routes */}
      <Route>
        <FreeDashboardRoutes />
      </Route>
      
      {/* Premium Dashboard Routes */}
      <Route>
        <PremiumDashboardRoutes />
      </Route>
      
      {/* Admin Routes */}
      <Route>
        <AdminRoutes />
      </Route>
      
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
