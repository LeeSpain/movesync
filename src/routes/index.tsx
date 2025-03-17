
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import PublicRoutes from "./PublicRoutes";
import AuthRoutes from "./AuthRoutes";
import AdminRoutes from "./AdminRoutes";
import FreeDashboardRoutes from "./FreeDashboardRoutes";
import PremiumDashboardRoutes from "./PremiumDashboardRoutes";
import NotFound from "@/pages/NotFound";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import Countries from "@/pages/Countries";
import CountrySelection from "@/pages/CountrySelection";

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
        
        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
};

export default AppRoutes;
