
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LineChart } from '@/components/ui/charts';
import { AdminStats } from '@/utils/adminMetrics';

interface FinancialOverviewProps {
  stats: AdminStats;
  revenueData: any;
}

const FinancialOverview = ({ stats, revenueData }: FinancialOverviewProps) => {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Revenue Trends</CardTitle>
        <CardDescription>
          Monthly revenue over the last 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <LineChart data={revenueData} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Annual Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.annualRevenue.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Customer LTV</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.lifetimeValue.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Acquisition Cost</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${stats.customerAcquisitionCost.toLocaleString()}</div>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default FinancialOverview;
