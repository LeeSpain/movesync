
import React from 'react';
import { BarChart3 } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';

interface CostOfLivingOverviewTabProps {
  costOfLivingData: any[];
  countries: string[];
  getTotalCost: (entry: any) => number;
}

const CostOfLivingOverviewTab = ({ 
  costOfLivingData, 
  countries, 
  getTotalCost 
}: CostOfLivingOverviewTabProps) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Locations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{costOfLivingData.length}</div>
            <p className="text-xs text-muted-foreground">
              Across {countries.length} countries
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Most Expensive City</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {costOfLivingData.sort((a, b) => getTotalCost(b) - getTotalCost(a))[0].city}
            </div>
            <p className="text-xs text-muted-foreground">
              ${getTotalCost(costOfLivingData.sort((a, b) => getTotalCost(b) - getTotalCost(a))[0]).toLocaleString()} monthly total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Most Affordable City</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {costOfLivingData.sort((a, b) => getTotalCost(a) - getTotalCost(b))[0].city}
            </div>
            <p className="text-xs text-muted-foreground">
              ${getTotalCost(costOfLivingData.sort((a, b) => getTotalCost(a) - getTotalCost(b))[0]).toLocaleString()} monthly total
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Cost of Living Breakdown</CardTitle>
            <CardDescription>Average monthly expenses by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80 flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <BarChart3 className="mx-auto h-12 w-12 opacity-50" />
                <p>Interactive chart would be displayed here</p>
                <p className="text-sm">Showing average costs across all cities</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CostOfLivingOverviewTab;
