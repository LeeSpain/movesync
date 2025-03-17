
import { Route } from "react-router-dom";
import FreeDashboard from "@/pages/FreeDashboard";
import { RequireAuth, FeaturePlaceholder } from "./AuthRoutes";

const FreeDashboardRoutes = () => {
  return (
    <>
      {/* Free dashboard routes */}
      <Route path="/dashboard/free" element={
        <RequireAuth>
          <FreeDashboard />
        </RequireAuth>
      } />
      <Route path="/dashboard/free/assistant" element={
        <RequireAuth>
          <FeaturePlaceholder feature="AI Assistant" />
        </RequireAuth>
      } />
      <Route path="/dashboard/free/property" element={
        <RequireAuth>
          <FeaturePlaceholder feature="Property Search" />
        </RequireAuth>
      } />
      <Route path="/dashboard/free/visa" element={
        <RequireAuth>
          <FeaturePlaceholder feature="Visa Application" />
        </RequireAuth>
      } />
      <Route path="/dashboard/free/cost-living" element={
        <RequireAuth>
          <FeaturePlaceholder feature="Cost of Living" />
        </RequireAuth>
      } />
    </>
  );
};

export default FreeDashboardRoutes;
