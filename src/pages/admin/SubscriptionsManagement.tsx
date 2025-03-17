
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import AdminLayout from '@/components/admin/AdminLayout';
import { LineChart, BarChart, PieChart } from '@/components/ui/charts';
import { 
  Users, 
  UserPlus, 
  UserMinus, 
  BadgePercent,
  ArrowUpRight,
  Clock
} from 'lucide-react';
import { getMockStats } from '@/utils/adminMetrics';

const SubscriptionsManagement = () => {
  const stats = getMockStats();

  const subscriptionTrendsData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Premium Subscribers',
        data: [215, 245, 270, 310, 345, 384, 415, 440, 472, 505, 540, 580],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
      },
      {
        label: 'Free Users',
        data: [680, 710, 750, 795, 830, 861, 890, 915, 940, 965, 985, 1000],
        borderColor: 'rgb(148, 163, 184)',
        backgroundColor: 'rgba(148, 163, 184, 0.1)',
        fill: true,
      }
    ],
  };

  const conversionRateData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Conversion Rate (%)',
        data: [25.1, 26.4, 27.5, 28.3, 29.5, 30.8, 31.4, 32.0, 32.8, 33.5, 34.3, 35.1],
        borderColor: 'rgb(52, 211, 153)',
        backgroundColor: 'rgba(52, 211, 153, 0.1)',
        fill: true,
      }
    ],
  };

  const churnRateData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Churn Rate (%)',
        data: [3.8, 3.5, 3.2, 2.9, 2.7, 2.4, 2.2, 2.0, 1.9, 1.8, 1.7, 1.6],
        borderColor: 'rgb(248, 113, 113)',
        backgroundColor: 'rgba(248, 113, 113, 0.1)',
        fill: true,
      }
    ],
  };

  const subscriptionTypeData = {
    labels: ['Monthly Plan', 'Annual Plan', 'Premium Plus', 'Family Plan', 'Student Plan'],
    datasets: [
      {
        data: [45, 30, 15, 8, 2],
        backgroundColor: [
          'rgb(59, 130, 246)',
          'rgb(139, 92, 246)',
          'rgb(248, 113, 113)',
          'rgb(52, 211, 153)',
          'rgb(251, 191, 36)',
        ],
      },
    ],
  };

  return (
    <AdminLayout title="Subscriptions Management">
      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 inline-flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +{stats.recentSignups} new this week
              </span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Premium Subscribers</CardTitle>
            <BadgePercent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.premiumUsers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              {((stats.premiumUsers / stats.totalUsers) * 100).toFixed(1)}% of total users
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Free Users</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(stats.totalUsers - stats.premiumUsers).toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              Target for conversion: {Math.round((stats.totalUsers - stats.premiumUsers) * 0.15)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Churn Rate</CardTitle>
            <UserMinus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.4%</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600 inline-flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                -0.3% from last month
              </span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="space-y-6">
        <Tabs defaultValue="trends">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="trends">Subscription Trends</TabsTrigger>
            <TabsTrigger value="conversion">Conversion Funnel</TabsTrigger>
            <TabsTrigger value="retention">Retention & Churn</TabsTrigger>
            <TabsTrigger value="plans">Subscription Plans</TabsTrigger>
          </TabsList>
          
          <TabsContent value="trends" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Growth Trends</CardTitle>
                <CardDescription>Premium vs. free user growth over the past 12 months</CardDescription>
              </CardHeader>
              <CardContent className="h-96">
                <LineChart data={subscriptionTrendsData} />
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Premium Growth Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">11.3%</div>
                  <p className="text-xs text-muted-foreground">Month-over-month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Free User Growth Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3.7%</div>
                  <p className="text-xs text-muted-foreground">Month-over-month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Average Subscription Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">${Math.round(stats.monthlyRevenue / stats.premiumUsers)}</div>
                  <p className="text-xs text-muted-foreground">Per premium user</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="conversion" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Conversion Rate Trends</CardTitle>
                <CardDescription>Percentage of free users converting to premium over time</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <LineChart data={conversionRateData} />
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="col-span-1 md:col-span-3">
                <CardHeader>
                  <CardTitle>Conversion Funnel</CardTitle>
                  <CardDescription>User journey from signup to premium conversion</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Website Visitors</span>
                        <span>5,280</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Account Creation</span>
                        <span>1,245 (23.6%)</span>
                      </div>
                      <Progress value={23.6} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Feature Exploration</span>
                        <span>845 (16.0%)</span>
                      </div>
                      <Progress value={16.0} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Free Trial Activation</span>
                        <span>520 (9.8%)</span>
                      </div>
                      <Progress value={9.8} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Premium Conversion</span>
                        <span>384 (7.3%)</span>
                      </div>
                      <Progress value={7.3} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="retention" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Churn Rate Analysis</CardTitle>
                <CardDescription>Monthly churn rate over the past 12 months</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <LineChart data={churnRateData} />
              </CardContent>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Subscriber Retention by Cohort</CardTitle>
                  <CardDescription>Retention rate after signup by month</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>1 Month</span>
                        <span>93%</span>
                      </div>
                      <Progress value={93} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>3 Months</span>
                        <span>85%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>6 Months</span>
                        <span>76%</span>
                      </div>
                      <Progress value={76} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>12 Months</span>
                        <span>62%</span>
                      </div>
                      <Progress value={62} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Top Reasons for Cancellation</CardTitle>
                  <CardDescription>Based on exit surveys</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Price too high</span>
                        <span>34%</span>
                      </div>
                      <Progress value={34} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Not using enough</span>
                        <span>28%</span>
                      </div>
                      <Progress value={28} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Missing features</span>
                        <span>18%</span>
                      </div>
                      <Progress value={18} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Technical issues</span>
                        <span>12%</span>
                      </div>
                      <Progress value={12} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Other</span>
                        <span>8%</span>
                      </div>
                      <Progress value={8} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Actions to Improve Retention</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card className="bg-blue-50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center">
                        <Clock className="h-4 w-4 mr-2" />
                        Re-engagement Campaign
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">Target inactive users before they churn with personalized content</p>
                      <Badge className="mt-2 bg-blue-100 text-blue-800 hover:bg-blue-100">High Impact</Badge>
                    </CardContent>
                  </Card>
                  <Card className="bg-purple-50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center">
                        <BadgePercent className="h-4 w-4 mr-2" />
                        Loyalty Discounts
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">Offer special rates for 12+ month subscribers</p>
                      <Badge className="mt-2 bg-purple-100 text-purple-800 hover:bg-purple-100">Medium Impact</Badge>
                    </CardContent>
                  </Card>
                  <Card className="bg-green-50">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        Community Building
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">Enhance user connection through forums and events</p>
                      <Badge className="mt-2 bg-green-100 text-green-800 hover:bg-green-100">High Impact</Badge>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="plans" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Plan Distribution</CardTitle>
                <CardDescription>Breakdown of subscribers by plan type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <PieChart data={subscriptionTypeData} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Most Popular Plan</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl font-bold">Monthly Premium</div>
                      <p className="text-xs text-muted-foreground">
                        45% of subscribers
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Highest Value Plan</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl font-bold">Annual Premium</div>
                      <p className="text-xs text-muted-foreground">
                        $149/year ($12.42/month)
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Fastest Growing Plan</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-xl font-bold">Family Plan</div>
                      <p className="text-xs text-muted-foreground">
                        +24% growth MoM
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Plan Comparison</CardTitle>
                <CardDescription>Performance metrics for each subscription plan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left pb-2">Plan</th>
                        <th className="text-left pb-2">Price</th>
                        <th className="text-left pb-2">Users</th>
                        <th className="text-left pb-2">Retention</th>
                        <th className="text-left pb-2">Revenue</th>
                        <th className="text-left pb-2">Growth</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3">Monthly Premium</td>
                        <td>$14.99/mo</td>
                        <td>173</td>
                        <td>78%</td>
                        <td>$2,593/mo</td>
                        <td className="text-green-600">+8.2%</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3">Annual Premium</td>
                        <td>$149/year</td>
                        <td>115</td>
                        <td>92%</td>
                        <td>$1,429/mo</td>
                        <td className="text-green-600">+12.6%</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3">Premium Plus</td>
                        <td>$24.99/mo</td>
                        <td>58</td>
                        <td>85%</td>
                        <td>$1,449/mo</td>
                        <td className="text-green-600">+15.8%</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3">Family Plan</td>
                        <td>$29.99/mo</td>
                        <td>31</td>
                        <td>89%</td>
                        <td>$930/mo</td>
                        <td className="text-green-600">+24.0%</td>
                      </tr>
                      <tr>
                        <td className="py-3">Student Plan</td>
                        <td>$7.99/mo</td>
                        <td>7</td>
                        <td>72%</td>
                        <td>$56/mo</td>
                        <td className="text-green-600">+4.5%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default SubscriptionsManagement;
