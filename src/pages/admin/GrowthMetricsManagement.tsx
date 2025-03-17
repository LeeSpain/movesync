
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminLayout from '@/components/admin/AdminLayout';
import { LineChart, BarChart, PieChart } from '@/components/ui/charts';
import { ArrowUpRight, TrendingUp, Users, BarChart3, Percent } from 'lucide-react';
import { getMockStats } from '@/utils/adminMetrics';
import { getGrowthMetricsData } from '@/utils/adminChartData';

const GrowthMetricsManagement = () => {
  const stats = getMockStats();
  const growthMetricsData = getGrowthMetricsData();
  
  const acquisitionChannelsData = {
    labels: ['Organic Search', 'Direct', 'Referral', 'Social Media', 'Email', 'Paid Ads'],
    datasets: [
      {
        label: 'User Acquisition by Channel',
        data: [32, 24, 18, 14, 8, 4],
        backgroundColor: [
          'rgb(59, 130, 246)',
          'rgb(139, 92, 246)',
          'rgb(248, 113, 113)',
          'rgb(52, 211, 153)',
          'rgb(251, 191, 36)',
          'rgb(209, 213, 219)',
        ],
      },
    ],
  };
  
  const conversionFunnelData = {
    labels: ['Visitors', 'Sign-ups', 'Activation', 'Premium Trial', 'Paid Users'],
    datasets: [
      {
        label: 'Conversion Funnel',
        data: [10000, 2500, 1800, 750, 384],
        backgroundColor: 'rgb(59, 130, 246)',
      },
    ],
  };
  
  const retentionData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Monthly Retention Rate',
        data: [92, 91, 93, 94, 95, 96],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
      },
    ],
  };

  return (
    <AdminLayout title="Growth Metrics">
      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">User Growth Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.growthRate}%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 inline-flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +1.2% from last month
              </span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.conversionRate}%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 inline-flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +0.8% from last month
              </span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Acquisition Cost</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.customerAcquisitionCost}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 inline-flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                -$2.50 from last month
              </span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Signups</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.recentSignups}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 inline-flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +12.5% from yesterday
              </span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        <Tabs defaultValue="overview">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="overview">Growth Overview</TabsTrigger>
            <TabsTrigger value="acquisition">Acquisition Channels</TabsTrigger>
            <TabsTrigger value="conversion">Conversion Funnel</TabsTrigger>
            <TabsTrigger value="retention">Retention Metrics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Growth Trends</CardTitle>
                <CardDescription>User and revenue growth rates over time</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <LineChart data={growthMetricsData} />
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Growth Efficiency Ratio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3.2x</div>
                  <p className="text-xs text-muted-foreground">ARR growth ÷ spend</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">LTV:CAC Ratio</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{(stats.lifetimeValue / stats.customerAcquisitionCost).toFixed(1)}x</div>
                  <p className="text-xs text-muted-foreground">Target > 3.0</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Payback Period</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.8 months</div>
                  <p className="text-xs text-muted-foreground">Time to recover CAC</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="acquisition" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Acquisition by Channel</CardTitle>
                <CardDescription>Distribution of new users across acquisition channels</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <PieChart data={acquisitionChannelsData} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Top Acquisition Channel</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">Organic Search</div>
                      <p className="text-xs text-muted-foreground">32% of new users</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Best CAC</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$28</div>
                      <p className="text-xs text-muted-foreground">From direct traffic</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Highest ROI Channel</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">Email</div>
                      <p className="text-xs text-muted-foreground">580% return</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="conversion" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Conversion Funnel</CardTitle>
                <CardDescription>User journey from visitors to paying customers</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <BarChart data={conversionFunnelData} />
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Visitor-to-Signup</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">25.0%</div>
                  <p className="text-xs text-muted-foreground">+2.3% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Signup-to-Active</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">72.0%</div>
                  <p className="text-xs text-muted-foreground">+1.5% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Trial-to-Paid</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">51.2%</div>
                  <p className="text-xs text-muted-foreground">+3.8% from last month</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="retention" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Retention</CardTitle>
                <CardDescription>Monthly retention rate over time</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <LineChart data={retentionData} />
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Monthly Churn Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.0%</div>
                  <p className="text-xs text-muted-foreground">-0.7% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">6-Month Retention</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">76.5%</div>
                  <p className="text-xs text-muted-foreground">+2.1% YoY</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Average User Lifespan</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">25 months</div>
                  <p className="text-xs text-muted-foreground">+3 months YoY</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default GrowthMetricsManagement;
