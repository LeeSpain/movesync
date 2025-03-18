
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { RequireAuth } from "./AuthRoutes";
import PublicRoutes from "./PublicRoutes";
import AuthRoutes from "./AuthRoutes";
import AdminRoutes from "./AdminRoutes";
import FreeDashboardRoutes from "./FreeDashboardRoutes";
import PremiumDashboardRoutes from "./PremiumDashboardRoutes";
import InvestorRoutes from "./InvestorRoutes";
import NotFound from "@/pages/NotFound";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import Countries from "@/pages/Countries";
import CountrySelection from "@/pages/CountrySelection";
import Investment from "@/pages/Investment";
import { InvestmentProvider } from "@/components/investment/InvestmentContext";
import Checkout from "@/pages/Checkout";
import CheckoutSuccess from "@/pages/CheckoutSuccess";
import CheckoutCancel from "@/pages/CheckoutCancel";
import StripeWrapper from "@/components/checkout/StripeWrapper";
import ChoosePlan from "@/pages/ChoosePlan";
import VerifyPending from "@/pages/VerifyPending";
import VerifyEmail from "@/pages/VerifyEmail";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import RelocationGuide from "@/pages/RelocationGuide";
import CostCalculator from "@/pages/CostCalculator";

const AppRoutes = () => {
  console.log("Rendering AppRoutes");
  
  return (
    <AuthProvider>
      <Routes>
        {/* Initial Landing Page - Country Selection */}
        <Route path="/" element={<CountrySelection />} />
        
        {/* Public Routes - accessed after country selection */}
        <Route path="/home/*" element={<PublicRoutes />} />
        
        {/* Country selection page - can be accessed directly */}
        <Route path="/countries" element={<Countries />} />
        
        {/* Investment page */}
        <Route path="/investment" element={
          <InvestmentProvider>
            <Investment />
          </InvestmentProvider>
        } />
        
        {/* Additional pages */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/relocation-guide" element={<RelocationGuide />} />
        <Route path="/cost-calculator" element={<CostCalculator />} />
        
        {/* Plan selection page */}
        <Route path="/choose-plan" element={<ChoosePlan />} />
        
        {/* Checkout Pages */}
        <Route path="/checkout" element={
          <StripeWrapper>
            <Checkout />
          </StripeWrapper>
        } />
        <Route path="/checkout/success" element={<CheckoutSuccess />} />
        <Route path="/checkout/cancel" element={<CheckoutCancel />} />
        
        {/* Login Route - directly accessible */}
        <Route path="/login" element={<Login />} />
        
        {/* Authentication Routes */}
        <Route path="/auth/*" element={<AuthRoutes />} />
        
        {/* Main Dashboard Route for redirection */}
        <Route path="/dashboard" element={<Dashboard />} />
        
        {/* Free Dashboard Routes */}
        <Route path="/dashboard/free/*" element={<FreeDashboardRoutes />} />
        
        {/* Premium Dashboard Routes */}
        <Route path="/dashboard/premium/*" element={<PremiumDashboardRoutes />} />
        
        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminRoutes />} />
        
        {/* Email Verification Routes */}
        <Route path="/verify-pending" element={<VerifyPending />} />
        <Route path="/verify/:userId/:token" element={<VerifyEmail />} />
        
        {/* Investor Routes */}
        <Route path="/investor/*" element={
          <RequireAuth>
            <InvestorRoutes />
          </RequireAuth>
        } />
        
        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
};

export default AppRoutes;
