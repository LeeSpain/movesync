
import React, { useState } from 'react';
import { LineChart } from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

interface CityComparisonTabProps {
  costOfLivingData: any[];
  compareData: any[];
}

const CityComparisonTab = ({ costOfLivingData, compareData }: CityComparisonTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>City-to-City Comparison</CardTitle>
        <CardDescription>Compare cost of living between different locations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6 flex items-center space-x-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Primary City</label>
            <Select defaultValue="Sydney">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                {costOfLivingData.map((entry) => (
                  <SelectItem key={entry.id} value={entry.city}>{entry.city}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Compare With</label>
            <Select defaultValue="Melbourne">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                {costOfLivingData.map((entry) => (
                  <SelectItem key={entry.id} value={entry.city}>{entry.city}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button variant="outline" className="mt-6">Compare</Button>
        </div>
        
        <div className="relative">
          <div className="h-80 flex items-center justify-center">
            <div className="text-center text-muted-foreground">
              <LineChart className="mx-auto h-12 w-12 opacity-50" />
              <p>Interactive comparison chart would be displayed here</p>
              <p className="text-sm">Showing differences between selected cities</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          <h3 className="font-medium mb-4">Category-by-Category Comparison</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Expense Category</TableHead>
                <TableHead>Sydney</TableHead>
                <TableHead>Melbourne</TableHead>
                <TableHead>Difference</TableHead>
                <TableHead>Percentage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {compareData.map((item, index) => {
                const diff = item.Sydney - item.Melbourne;
                const percentage = ((diff / item.Melbourne) * 100).toFixed(1);
                return (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.category}</TableCell>
                    <TableCell>${item.Sydney}</TableCell>
                    <TableCell>${item.Melbourne}</TableCell>
                    <TableCell className={diff > 0 ? 'text-red-500' : 'text-green-500'}>
                      {diff > 0 ? `+$${diff}` : `-$${Math.abs(diff)}`}
                    </TableCell>
                    <TableCell>
                      <Badge variant={diff > 0 ? 'destructive' : 'secondary'} className={diff > 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                        {diff > 0 ? `+${percentage}%` : `${percentage}%`}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
              <TableRow className="font-bold">
                <TableCell>Total Monthly Cost</TableCell>
                <TableCell>${compareData.reduce((acc, curr) => acc + curr.Sydney, 0)}</TableCell>
                <TableCell>${compareData.reduce((acc, curr) => acc + curr.Melbourne, 0)}</TableCell>
                <TableCell className={compareData.reduce((acc, curr) => acc + curr.Sydney, 0) - compareData.reduce((acc, curr) => acc + curr.Melbourne, 0) > 0 ? 'text-red-500' : 'text-green-500'}>
                  {compareData.reduce((acc, curr) => acc + curr.Sydney, 0) - compareData.reduce((acc, curr) => acc + curr.Melbourne, 0) > 0 
                    ? `+$${compareData.reduce((acc, curr) => acc + curr.Sydney, 0) - compareData.reduce((acc, curr) => acc + curr.Melbourne, 0)}` 
                    : `-$${Math.abs(compareData.reduce((acc, curr) => acc + curr.Sydney, 0) - compareData.reduce((acc, curr) => acc + curr.Melbourne, 0))}`}
                </TableCell>
                <TableCell>
                  <Badge variant={compareData.reduce((acc, curr) => acc + curr.Sydney, 0) - compareData.reduce((acc, curr) => acc + curr.Melbourne, 0) > 0 ? 'destructive' : 'secondary'} 
                    className={compareData.reduce((acc, curr) => acc + curr.Sydney, 0) - compareData.reduce((acc, curr) => acc + curr.Melbourne, 0) > 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                    {((compareData.reduce((acc, curr) => acc + curr.Sydney, 0) - compareData.reduce((acc, curr) => acc + curr.Melbourne, 0)) / compareData.reduce((acc, curr) => acc + curr.Melbourne, 0) * 100).toFixed(1)}%
                  </Badge>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default CityComparisonTab;
