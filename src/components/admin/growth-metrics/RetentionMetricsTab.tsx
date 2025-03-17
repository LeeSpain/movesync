
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LineChart } from '@/components/ui/charts';

interface RetentionMetricsTabProps {
  retentionData: any;
}

const RetentionMetricsTab = ({ retentionData }: RetentionMetricsTabProps) => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default RetentionMetricsTab;
