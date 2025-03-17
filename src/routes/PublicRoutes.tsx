
import { Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import Countries from "@/pages/Countries";
import Investment from "@/pages/Investment";

const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/countries" element={<Countries />} />
      <Route path="/investment" element={<Investment />} />
    </Routes>
  );
};

export default PublicRoutes;
