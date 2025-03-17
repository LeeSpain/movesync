
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AdminLayout from '@/components/admin/AdminLayout';
import { LineChart, BarChart, PieChart } from '@/components/ui/charts';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Clock, 
  MousePointerClick, 
  ArrowUpRight,
  Globe,
  Smartphone,
  Activity
} from 'lucide-react';
import { getMockStats } from '@/utils/adminMetrics';

const AnalyticsManagement = () => {
  const stats = getMockStats();
  
  // User engagement data
  const engagementData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Average Session Duration (min)',
        data: [4.2, 4.8, 5.1, 5.4, 5.8, 6.2],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
      },
      {
        label: 'Pages Per Session',
        data: [3.8, 4.1, 4.3, 4.5, 4.7, 5.0],
        borderColor: 'rgb(139, 92, 246)',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        fill: true,
      }
    ],
  };
  
  // Feature usage data
  const featureUsageData = {
    labels: ['AI Assistant', 'Property Search', 'Job Listings', 'Visa Info', 'Cost Calculator', 'Document Manager'],
    datasets: [
      {
        label: 'Usage Frequency',
        data: [82, 68, 54, 47, 42, 28],
        backgroundColor: [
          'rgb(59, 130, 246)',
          'rgb(139, 92, 246)',
          'rgb(52, 211, 153)',
          'rgb(251, 191, 36)',
          'rgb(248, 113, 113)',
          'rgb(209, 213, 219)',
        ],
      },
    ],
  };
  
  // Geographic data
  const geographicData = {
    labels: ['United States', 'United Kingdom', 'Canada', 'Australia', 'Germany', 'India', 'Others'],
    datasets: [
      {
        label: 'User Distribution',
        data: [32, 18, 14, 12, 8, 7, 9],
        backgroundColor: [
          'rgb(59, 130, 246)',
          'rgb(139, 92, 246)',
          'rgb(52, 211, 153)',
          'rgb(251, 191, 36)',
          'rgb(248, 113, 113)',
          'rgb(16, 185, 129)',
          'rgb(209, 213, 219)',
        ],
      },
    ],
  };
  
  // Device distribution data
  const deviceData = {
    labels: ['Desktop', 'Mobile', 'Tablet'],
    datasets: [
      {
        label: 'Device Distribution',
        data: [45, 48, 7],
        backgroundColor: [
          'rgb(59, 130, 246)',
          'rgb(139, 92, 246)',
          'rgb(52, 211, 153)',
        ],
      },
    ],
  };

  return (
    <AdminLayout title="Analytics Dashboard">
      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">842</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 inline-flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +12.5% from last week
              </span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Session Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6.2 min</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 inline-flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +0.4 min from last week
              </span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Bounce Rate</CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28.4%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 inline-flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                -2.1% from last week
              </span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.conversionRate}%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 inline-flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +0.8% from last week
              </span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        <Tabs defaultValue="engagement">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="engagement">User Engagement</TabsTrigger>
            <TabsTrigger value="features">Feature Usage</TabsTrigger>
            <TabsTrigger value="geographic">Geographic</TabsTrigger>
            <TabsTrigger value="devices">Devices & Platforms</TabsTrigger>
          </TabsList>
          
          <TabsContent value="engagement" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Engagement Metrics</CardTitle>
                <CardDescription>Session duration and pages per session over time</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <LineChart data={engagementData} />
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Daily Active Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">458</div>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">+8.2% WoW</Badge>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Return Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">72.5%</div>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">+1.8% WoW</Badge>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">User Stickiness</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">54.4%</div>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">+2.3% WoW</Badge>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="features" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Feature Usage Distribution</CardTitle>
                <CardDescription>Percentage of users engaging with each feature</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <BarChart data={featureUsageData} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Most Used Feature</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">AI Assistant</div>
                      <p className="text-xs text-muted-foreground">82% of users</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Fastest Growing</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">Property Search</div>
                      <p className="text-xs text-muted-foreground">+14.2% MoM</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Least Used Feature</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">Document Manager</div>
                      <p className="text-xs text-muted-foreground">Opportunity for improvement</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="geographic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Geographic Distribution</CardTitle>
                <CardDescription>Distribution of users by country</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <PieChart data={geographicData} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Top Country</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center">
                      <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                      <div>
                        <div className="text-xl font-bold">United States</div>
                        <p className="text-xs text-muted-foreground">32% of users</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Fastest Growing</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center">
                      <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
                      <div>
                        <div className="text-xl font-bold">India</div>
                        <p className="text-xs text-muted-foreground">+24.8% MoM</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Languages Used</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl font-bold">6 languages</div>
                      <p className="text-xs text-muted-foreground">87% use English</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="devices" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Device Distribution</CardTitle>
                <CardDescription>Distribution of users by device type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <PieChart data={deviceData} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Mobile Users</CardTitle>
                    </CardHeader>
                    <CardContent className="flex items-center">
                      <Smartphone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <div>
                        <div className="text-xl font-bold">48%</div>
                        <p className="text-xs text-muted-foreground">+3.2% from last month</p>
                      </div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Browser Share</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl font-bold">Chrome (64%)</div>
                      <p className="text-xs text-muted-foreground">Safari (21%), Others (15%)</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">OS Distribution</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl font-bold">iOS (42%)</div>
                      <p className="text-xs text-muted-foreground">Android (38%), Windows (15%), macOS (5%)</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AnalyticsManagement;
