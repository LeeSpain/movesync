
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminLayout from '@/components/admin/AdminLayout';
import { getMockStats } from '@/utils/adminMetrics';
import { getGrowthMetricsData } from '@/utils/adminChartData';
import GrowthKPICards from '@/components/admin/growth-metrics/GrowthKPICards';
import GrowthOverviewTab from '@/components/admin/growth-metrics/GrowthOverviewTab';
import AcquisitionChannelsTab from '@/components/admin/growth-metrics/AcquisitionChannelsTab';
import ConversionFunnelTab from '@/components/admin/growth-metrics/ConversionFunnelTab';
import RetentionMetricsTab from '@/components/admin/growth-metrics/RetentionMetricsTab';
import { 
  getAcquisitionChannelsData, 
  getConversionFunnelData, 
  getRetentionData 
} from '@/components/admin/growth-metrics/growthMetricsData';

const GrowthMetricsManagement = () => {
  const stats = getMockStats();
  const growthMetricsData = getGrowthMetricsData();
  
  const acquisitionChannelsData = getAcquisitionChannelsData();
  const conversionFunnelData = getConversionFunnelData();
  const retentionData = getRetentionData();

  return (
    <AdminLayout title="Growth Metrics">
      {/* Top KPI Cards */}
      <GrowthKPICards stats={stats} />

      {/* Main Content */}
      <div className="space-y-6">
        <Tabs defaultValue="overview">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="overview">Growth Overview</TabsTrigger>
            <TabsTrigger value="acquisition">Acquisition Channels</TabsTrigger>
            <TabsTrigger value="conversion">Conversion Funnel</TabsTrigger>
            <TabsTrigger value="retention">Retention Metrics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <GrowthOverviewTab stats={stats} growthMetricsData={growthMetricsData} />
          </TabsContent>
          
          <TabsContent value="acquisition">
            <AcquisitionChannelsTab acquisitionChannelsData={acquisitionChannelsData} />
          </TabsContent>
          
          <TabsContent value="conversion">
            <ConversionFunnelTab conversionFunnelData={conversionFunnelData} />
          </TabsContent>
          
          <TabsContent value="retention">
            <RetentionMetricsTab retentionData={retentionData} />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default GrowthMetricsManagement;
