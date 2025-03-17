
import { Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Countries from "@/pages/Countries";
import Investment from "@/pages/Investment";
import { InvestmentProvider } from "@/components/investment/InvestmentContext";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route index element={<Index />} />
      <Route path="countries" element={<Countries />} />
      <Route path="investment" element={
        <InvestmentProvider>
          <Investment />
        </InvestmentProvider>
      } />
    </Routes>
  );
};

export default PublicRoutes;
