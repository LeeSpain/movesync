
import { Route } from "react-router-dom";
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
    <>
      {/* Premium dashboard routes */}
      <Route path="/dashboard/premium" element={
        <RequireAuth>
          <PremiumDashboard />
        </RequireAuth>
      } />
      <Route path="/dashboard/premium/assistant" element={
        <RequireAuth>
          <PremiumAIAssistant />
        </RequireAuth>
      } />
      <Route path="/dashboard/premium/property" element={
        <RequireAuth>
          <PropertySearch />
        </RequireAuth>
      } />
      <Route path="/dashboard/premium/visa" element={
        <RequireAuth>
          <VisaServices />
        </RequireAuth>
      } />
      <Route path="/dashboard/premium/cost-living" element={
        <RequireAuth>
          <CostOfLiving />
        </RequireAuth>
      } />
      <Route path="/dashboard/premium/jobs" element={
        <RequireAuth>
          <JobSearch />
        </RequireAuth>
      } />
      <Route path="/dashboard/premium/services" element={
        <RequireAuth>
          <ServicesFinder />
        </RequireAuth>
      } />
    </>
  );
};

export default PremiumDashboardRoutes;
