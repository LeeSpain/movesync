
import React from 'react';
import InvestorLayout from '@/components/investor/InvestorLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart } from '@/components/ui/charts';
import { getSubscriptionData } from '@/utils/adminChartData';

const InvestorUsers = () => {
  const subscriptionData = getSubscriptionData();
  
  return (
    <InvestorLayout title="User Analytics">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>User Analytics</CardTitle>
            <CardDescription>User acquisition and retention metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <BarChart data={subscriptionData} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Conversion Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">30.8%</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Retention Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">85.2%</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">User LTV</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$850</div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </InvestorLayout>
  );
};

export default InvestorUsers;
