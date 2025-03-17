
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PieChart } from '@/components/ui/charts';

interface AcquisitionChannelsTabProps {
  acquisitionChannelsData: any;
}

const AcquisitionChannelsTab = ({ acquisitionChannelsData }: AcquisitionChannelsTabProps) => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};

export default AcquisitionChannelsTab;
