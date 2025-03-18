
import { Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Countries from "@/pages/Countries";
import Investment from "@/pages/Investment";
import { InvestmentProvider } from "@/components/investment/InvestmentContext";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import RelocationGuide from "@/pages/RelocationGuide";
import CostCalculator from "@/pages/CostCalculator";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/countries" element={<Countries />} />
      <Route path="/investment" element={
        <InvestmentProvider>
          <Investment />
        </InvestmentProvider>
      } />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/relocation-guide" element={<RelocationGuide />} />
      <Route path="/cost-calculator" element={<CostCalculator />} />
    </Routes>
  );
};

export default PublicRoutes;
