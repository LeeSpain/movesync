
import React from 'react';
import InvestorLayout from '@/components/investor/InvestorLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart } from '@/components/ui/charts';
import { getRevenueData } from '@/utils/adminChartData';

const InvestorFinancial = () => {
  const revenueData = getRevenueData();
  
  return (
    <InvestorLayout title="Financial Performance">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Financial Performance</CardTitle>
            <CardDescription>Revenue and profitability metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <LineChart data={revenueData} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Current ROI</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12.3%</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Profit Margin</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">31.3%</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Revenue Growth</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8.4%</div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </InvestorLayout>
  );
};

export default InvestorFinancial;
