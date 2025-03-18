
import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RequireAuth } from './AuthRoutes';

// Lazy load investor pages
const InvestorDashboard = lazy(() => import('@/pages/admin/InvestorDashboard'));
const InvestorFinancial = lazy(() => import('@/pages/investor/InvestorFinancial'));
const InvestorGrowth = lazy(() => import('@/pages/investor/InvestorGrowth'));
const InvestorUsers = lazy(() => import('@/pages/investor/InvestorUsers'));
const InvestorReports = lazy(() => import('@/pages/investor/InvestorReports'));
const InvestorProjections = lazy(() => import('@/pages/investor/InvestorProjections'));

const InvestorRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuth>
            <Suspense fallback={<div>Loading...</div>}>
              <InvestorDashboard />
            </Suspense>
          </RequireAuth>
        }
      />
      <Route
        path="/financial"
        element={
          <RequireAuth>
            <Suspense fallback={<div>Loading...</div>}>
              <InvestorFinancial />
            </Suspense>
          </RequireAuth>
        }
      />
      <Route
        path="/growth"
        element={
          <RequireAuth>
            <Suspense fallback={<div>Loading...</div>}>
              <InvestorGrowth />
            </Suspense>
          </RequireAuth>
        }
      />
      <Route
        path="/users"
        element={
          <RequireAuth>
            <Suspense fallback={<div>Loading...</div>}>
              <InvestorUsers />
            </Suspense>
          </RequireAuth>
        }
      />
      <Route
        path="/reports"
        element={
          <RequireAuth>
            <Suspense fallback={<div>Loading...</div>}>
              <InvestorReports />
            </Suspense>
          </RequireAuth>
        }
      />
      <Route
        path="/projections"
        element={
          <RequireAuth>
            <Suspense fallback={<div>Loading...</div>}>
              <InvestorProjections />
            </Suspense>
          </RequireAuth>
        }
      />
    </Routes>
  );
};

export default InvestorRoutes;
