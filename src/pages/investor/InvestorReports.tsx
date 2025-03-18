
import React from 'react';
import InvestorLayout from '@/components/investor/InvestorLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, FileText } from 'lucide-react';

const reports = [
  {
    name: "Q1 2023 Investor Report",
    date: "March 31, 2023",
    size: "3.2MB"
  },
  {
    name: "Q2 2023 Investor Report",
    date: "June 30, 2023",
    size: "3.5MB"
  },
  {
    name: "Q3 2023 Investor Report",
    date: "September 30, 2023",
    size: "3.8MB"
  },
  {
    name: "Q4 2023 Investor Report",
    date: "December 31, 2023",
    size: "4.1MB"
  },
  {
    name: "Q1 2024 Investor Report",
    date: "March 31, 2024",
    size: "3.9MB"
  }
];

const InvestorReports = () => {
  return (
    <InvestorLayout title="Quarterly Reports">
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Quarterly Reports</CardTitle>
            <CardDescription>Review past quarterly financial reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reports.map((report, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center">
                    <FileText className="h-6 w-6 mr-3 text-blue-500" />
                    <div>
                      <h3 className="font-medium">{report.name}</h3>
                      <p className="text-sm text-gray-500">Published: {report.date} · {report.size}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Download className="h-4 w-4" />
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </InvestorLayout>
  );
};

export default InvestorReports;
