
import { Routes, Route } from "react-router-dom";
import FreeDashboard from "@/pages/FreeDashboard";
import { RequireAuth, FeaturePlaceholder } from "./AuthRoutes";

const FreeDashboardRoutes = () => {
  return (
    <Routes>
      {/* Free dashboard routes */}
      <Route path="/" element={
        <RequireAuth>
          <FreeDashboard />
        </RequireAuth>
      } />
      <Route path="/assistant" element={
        <RequireAuth>
          <FeaturePlaceholder feature="AI Assistant" />
        </RequireAuth>
      } />
      <Route path="/property" element={
        <RequireAuth>
          <FeaturePlaceholder feature="Property Search" />
        </RequireAuth>
      } />
      <Route path="/visa" element={
        <RequireAuth>
          <FeaturePlaceholder feature="Visa Application" />
        </RequireAuth>
      } />
      <Route path="/cost-living" element={
        <RequireAuth>
          <FeaturePlaceholder feature="Cost of Living" />
        </RequireAuth>
      } />
    </Routes>
  );
};

export default FreeDashboardRoutes;
