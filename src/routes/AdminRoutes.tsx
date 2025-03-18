
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

const RevenueManagement = lazy(() => import('@/pages/admin/RevenueManagement'));
const FinancialReportsManagement = lazy(() => import('@/pages/admin/FinancialReportsManagement'));
const GrowthMetricsManagement = lazy(() => import('@/pages/admin/GrowthMetricsManagement'));
const EmailManager = lazy(() => import('@/components/admin/EmailManager'));
const InvestorDashboard = lazy(() => import('@/pages/admin/InvestorDashboard'));

const AdminRoutes = () => {
  return (
    <Routes>
      <Route
        path="revenue"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <RevenueManagement />
          </Suspense>
        }
      />
      <Route
        path="financial-reports"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <FinancialReportsManagement />
          </Suspense>
        }
      />
      <Route
        path="growth-metrics"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <GrowthMetricsManagement />
          </Suspense>
        }
      />
      <Route
        path="email-manager"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <EmailManager />
          </Suspense>
        }
      />
      <Route
        path="investor"
        element={
          <Suspense fallback={<div>Loading...</div>}>
            <InvestorDashboard />
          </Suspense>
        }
      />
    </Routes>
  );
};

export default AdminRoutes;
