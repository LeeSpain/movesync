
import React from 'react';
import { PieChart } from 'lucide-react';
import AdminPlaceholder from '@/components/admin/AdminPlaceholder';

const FinancialReportsManagement = () => {
  return (
    <AdminPlaceholder
      title="Financial Reports"
      description="Comprehensive financial reporting and analysis tools"
      icon={<PieChart className="h-6 w-6 text-blue-600" />}
      items={[
        "Profit and loss statements",
        "Cash flow analysis and projections",
        "Operational cost breakdowns",
        "Budget allocation and management",
        "Return on investment calculations for key initiatives"
      ]}
    />
  );
};

export default FinancialReportsManagement;
