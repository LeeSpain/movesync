
import React from 'react';
import InvestorLayout from '@/components/investor/InvestorLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart } from '@/components/ui/charts';

const projectionData = {
  labels: ['2024', '2025', '2026', '2027', '2028'],
  datasets: [
    {
      label: 'Conservative',
      data: [350000, 520000, 780000, 1120000, 1450000],
      borderColor: 'rgb(148, 163, 184)',
      backgroundColor: 'rgba(148, 163, 184, 0.1)',
      fill: true,
    },
    {
      label: 'Expected',
      data: [350000, 620000, 980000, 1520000, 2150000],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true,
    },
    {
      label: 'Optimistic',
      data: [350000, 720000, 1280000, 2120000, 3250000],
      borderColor: 'rgb(16, 185, 129)',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      fill: true,
    },
  ],
};

const InvestorProjections = () => {
  return (
    <InvestorLayout title="Revenue Projections">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>5-Year Revenue Projections</CardTitle>
            <CardDescription>Annual revenue forecast scenarios</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <LineChart data={projectionData} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Expected ROI (5 Year)</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">215%</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Projected Valuation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$10.5M</div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Equity Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$2.1M</div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </InvestorLayout>
  );
};

export default InvestorProjections;
