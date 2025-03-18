
import { Routes, Route, Navigate } from "react-router-dom";
import { RequireAuth } from "./AuthRoutes";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import UserManagement from "@/pages/admin/UserManagement";
import CountryManagement from "@/pages/admin/CountryManagement";
import PropertyManagement from "@/pages/admin/PropertyManagement";
import JobManagement from "@/pages/admin/JobManagement";
import VisaManagement from "@/pages/admin/VisaManagement";
import CostOfLivingManagement from "@/pages/admin/CostOfLivingManagement";
import AIAssistantManagement from "@/pages/admin/AIAssistantManagement";
import AnalyticsManagement from "@/pages/admin/AnalyticsManagement";
import SubscriptionsManagement from "@/pages/admin/SubscriptionsManagement";
import RevenueManagement from "@/pages/admin/RevenueManagement";
import FinancialReportsManagement from "@/pages/admin/FinancialReportsManagement";
import GrowthMetricsManagement from "@/pages/admin/GrowthMetricsManagement";
import ServicesManagement from "@/pages/admin/ServicesManagement";
import AdminSettings from "@/pages/admin/AdminSettings";
import ServiceSetup from "@/components/admin/ServiceSetup";
import EmailManager from "@/components/admin/EmailManager";
import { useAuth } from "@/contexts/AuthContext";

const AdminRoutes = () => {
  const { isAdmin } = useAuth();

  // Redirect to home if not an admin
  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return (
    <RequireAuth>
      <Routes>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="/dashboard" element={<Navigate to="/admin" replace />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/countries" element={<CountryManagement />} />
        <Route path="/properties" element={<PropertyManagement />} />
        <Route path="/jobs" element={<JobManagement />} />
        <Route path="/visas" element={<VisaManagement />} />
        <Route path="/cost-of-living" element={<CostOfLivingManagement />} />
        <Route path="/ai-assistant" element={<AIAssistantManagement />} />
        <Route path="/analytics" element={<AnalyticsManagement />} />
        <Route path="/subscriptions" element={<SubscriptionsManagement />} />
        <Route path="/revenue" element={<RevenueManagement />} />
        <Route path="/financial-reports" element={<FinancialReportsManagement />} />
        <Route path="/growth-metrics" element={<GrowthMetricsManagement />} />
        <Route path="/services" element={<ServicesManagement />} />
        <Route path="/settings" element={<AdminSettings />} />
        <Route path="/service-setup" element={<ServiceSetup />} />
        <Route path="/email-manager" element={<Navigate to="/admin/email" replace />} />
        <Route path="/email" element={<EmailManager />} />
      </Routes>
    </RequireAuth>
  );
};

export default AdminRoutes;
