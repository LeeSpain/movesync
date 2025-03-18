
import { lazy, Suspense } from 'react';

const RevenueManagement = lazy(() => import('@/pages/admin/RevenueManagement'));
const FinancialReportsManagement = lazy(() => import('@/pages/admin/FinancialReportsManagement'));
const GrowthMetricsManagement = lazy(() => import('@/pages/admin/GrowthMetricsManagement'));
const EmailManager = lazy(() => import('@/components/admin/EmailManager'));
const InvestorDashboard = lazy(() => import('@/pages/admin/InvestorDashboard'));

const AdminRoutes = () => {
  return [
    {
      path: "revenue",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <RevenueManagement />
        </Suspense>
      ),
    },
    {
      path: "financial-reports",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <FinancialReportsManagement />
        </Suspense>
      ),
    },
    {
      path: "growth-metrics",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <GrowthMetricsManagement />
        </Suspense>
      ),
    },
    {
      path: "email-manager",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <EmailManager />
        </Suspense>
      ),
    },
    {
      path: "investor",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <InvestorDashboard />
        </Suspense>
      ),
    },
  ];
};

export default AdminRoutes;
