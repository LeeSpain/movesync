
import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminKPICards from '@/components/admin/AdminKPICards';
import FinancialOverview from '@/components/admin/FinancialOverview';
import SubscriptionMetrics from '@/components/admin/SubscriptionMetrics';
import GrowthAnalytics from '@/components/admin/GrowthAnalytics';
import CostBreakdown from '@/components/admin/CostBreakdown';
import { getInitialStats, getMockStats, AdminStats } from '@/utils/adminMetrics';
import { 
  getRevenueData, 
  getSubscriptionData, 
  getCostBreakdownData, 
  getGrowthMetricsData 
} from '@/utils/adminChartData';

const AdminDashboard = () => {
  // This would normally come from an API
  const [stats, setStats] = useState<AdminStats>(getInitialStats());

  // Mock data loading
  useEffect(() => {
    // In a real app, this would be an API call
    setTimeout(() => {
      setStats(getMockStats());
    }, 1000);
  }, []);

  const revenueData = getRevenueData();
  const subscriptionData = getSubscriptionData();
  const costBreakdownData = getCostBreakdownData();
  const growthMetricsData = getGrowthMetricsData();

  return (
    <>
      <AdminKPICards stats={stats} />

      <div className="mt-6">
        <Tabs defaultValue="financials">
          <TabsList>
            <TabsTrigger value="financials">Financial Overview</TabsTrigger>
            <TabsTrigger value="subscriptions">Subscription Metrics</TabsTrigger>
            <TabsTrigger value="growth">Growth Analytics</TabsTrigger>
            <TabsTrigger value="costs">Cost Breakdown</TabsTrigger>
          </TabsList>
          <TabsContent value="financials" className="space-y-6">
            <FinancialOverview stats={stats} revenueData={revenueData} />
          </TabsContent>
          <TabsContent value="subscriptions" className="space-y-6">
            <SubscriptionMetrics stats={stats} subscriptionData={subscriptionData} />
          </TabsContent>
          <TabsContent value="growth" className="space-y-6">
            <GrowthAnalytics stats={stats} growthMetricsData={growthMetricsData} />
          </TabsContent>
          <TabsContent value="costs" className="space-y-6">
            <CostBreakdown costBreakdownData={costBreakdownData} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default AdminDashboard;
