
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
import AdminLayout from "@/components/admin/AdminLayout";

const AdminRoutes = () => {
  return (
    <RequireAuth>
      <Routes>
        <Route path="/" element={<AdminLayout title="Dashboard"><AdminDashboard /></AdminLayout>} />
        <Route path="/dashboard" element={<Navigate to="/admin" replace />} />
        <Route path="/users" element={<AdminLayout title="User Management"><UserManagement /></AdminLayout>} />
        <Route path="/countries" element={<AdminLayout title="Country Management"><CountryManagement /></AdminLayout>} />
        <Route path="/properties" element={<AdminLayout title="Property Management"><PropertyManagement /></AdminLayout>} />
        <Route path="/jobs" element={<AdminLayout title="Job Management"><JobManagement /></AdminLayout>} />
        <Route path="/visas" element={<AdminLayout title="Visa Management"><VisaManagement /></AdminLayout>} />
        <Route path="/cost-of-living" element={<AdminLayout title="Cost of Living Management"><CostOfLivingManagement /></AdminLayout>} />
        <Route path="/ai-assistant" element={<AdminLayout title="AI Assistant Management"><AIAssistantManagement /></AdminLayout>} />
        <Route path="/analytics" element={<AdminLayout title="Analytics Management"><AnalyticsManagement /></AdminLayout>} />
        <Route path="/subscriptions" element={<AdminLayout title="Subscriptions Management"><SubscriptionsManagement /></AdminLayout>} />
        <Route path="/revenue" element={<AdminLayout title="Revenue Management"><RevenueManagement /></AdminLayout>} />
        <Route path="/financial-reports" element={<AdminLayout title="Financial Reports"><FinancialReportsManagement /></AdminLayout>} />
        <Route path="/growth-metrics" element={<AdminLayout title="Growth Metrics"><GrowthMetricsManagement /></AdminLayout>} />
        <Route path="/services" element={<AdminLayout title="Services Management"><ServicesManagement /></AdminLayout>} />
        <Route path="/settings" element={<AdminLayout title="Admin Settings"><AdminSettings /></AdminLayout>} />
        <Route path="/service-setup" element={<AdminLayout title="Service Setup"><ServiceSetup /></AdminLayout>} />
        <Route path="/email" element={<AdminLayout title="Email Manager"><EmailManager /></AdminLayout>} />
        <Route path="/email-manager" element={<Navigate to="/admin/email" replace />} />
      </Routes>
    </RequireAuth>
  );
};

export default AdminRoutes;
