
import { Routes, Route } from "react-router-dom";
import PremiumDashboard from "@/pages/PremiumDashboard";
import PremiumAIAssistant from "@/pages/premium-dashboard/AIAssistant";
import PropertySearch from "@/pages/premium-dashboard/PropertySearch";
import VisaServices from "@/pages/premium-dashboard/VisaServices";
import CostOfLiving from "@/pages/premium-dashboard/CostOfLiving";
import JobSearch from "@/pages/premium-dashboard/JobSearch";
import ServicesFinder from "@/pages/premium-dashboard/ServicesFinder";
import { RequireAuth } from "./AuthRoutes";

const PremiumDashboardRoutes = () => {
  return (
    <Routes>
      {/* Premium dashboard routes */}
      <Route path="/" element={
        <RequireAuth>
          <PremiumDashboard />
        </RequireAuth>
      } />
      <Route path="/assistant" element={
        <RequireAuth>
          <PremiumAIAssistant />
        </RequireAuth>
      } />
      <Route path="/property" element={
        <RequireAuth>
          <PropertySearch />
        </RequireAuth>
      } />
      <Route path="/visa" element={
        <RequireAuth>
          <VisaServices />
        </RequireAuth>
      } />
      <Route path="/cost-living" element={
        <RequireAuth>
          <CostOfLiving />
        </RequireAuth>
      } />
      <Route path="/jobs" element={
        <RequireAuth>
          <JobSearch />
        </RequireAuth>
      } />
      <Route path="/services" element={
        <RequireAuth>
          <ServicesFinder />
        </RequireAuth>
      } />
    </Routes>
  );
};

export default PremiumDashboardRoutes;
