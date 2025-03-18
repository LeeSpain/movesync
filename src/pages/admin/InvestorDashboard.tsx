
import React from 'react';
import InvestorLayout from '@/components/investor/InvestorLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FinancialOverview from '@/components/admin/FinancialOverview';
import GrowthAnalytics from '@/components/admin/GrowthAnalytics';
import { getMockStats } from '@/utils/adminMetrics';
import { getGrowthMetricsData } from '@/utils/adminChartData';

const InvestorDashboard = () => {
  const stats = getMockStats();
  const growthMetricsData = getGrowthMetricsData();
  
  return (
    <InvestorLayout title="Investor Dashboard">
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Total Investment</h3>
            <p className="text-2xl font-bold">${stats.totalInvestment.toLocaleString()}</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Company Valuation</h3>
            <p className="text-2xl font-bold">${stats.companyValuation.toLocaleString()}</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="text-sm font-medium text-gray-500">Equity Share</h3>
            <p className="text-2xl font-bold">{stats.equityShare}%</p>
          </div>
        </div>

        <Tabs defaultValue="financial" className="w-full">
          <TabsList>
            <TabsTrigger value="financial">Financial Overview</TabsTrigger>
            <TabsTrigger value="growth">Growth Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="financial">
            <FinancialOverview stats={stats} revenueData={growthMetricsData} />
          </TabsContent>

          <TabsContent value="growth">
            <GrowthAnalytics stats={stats} growthMetricsData={growthMetricsData} />
          </TabsContent>
        </Tabs>
      </div>
    </InvestorLayout>
  );
};

export default InvestorDashboard;
