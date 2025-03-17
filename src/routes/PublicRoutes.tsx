
import { Route } from "react-router-dom";
import Index from "@/pages/Index";
import Countries from "@/pages/Countries";
import Investment from "@/pages/Investment";

const PublicRoutes = () => {
  return (
    <>
      <Route path="/" element={<Index />} />
      <Route path="/countries" element={<Countries />} />
      <Route path="/investment" element={<Investment />} />
    </>
  );
};

export default PublicRoutes;
