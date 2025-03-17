
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart } from '@/components/ui/charts';

interface ConversionFunnelTabProps {
  conversionFunnelData: any;
}

const ConversionFunnelTab = ({ conversionFunnelData }: ConversionFunnelTabProps) => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default ConversionFunnelTab;
