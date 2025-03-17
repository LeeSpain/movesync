
import React from 'react';
import { CreditCard } from 'lucide-react';
import AdminPlaceholder from '@/components/admin/AdminPlaceholder';

const CostOfLivingManagement = () => {
  return (
    <AdminPlaceholder
      title="Cost of Living Management"
      description="Manage cost of living data for all supported locations"
      icon={<CreditCard className="h-6 w-6 text-blue-600" />}
      items={[
        "Housing costs by city and neighborhood",
        "Daily expenses and utility costs",
        "Healthcare and education expenses",
        "Transportation costs",
        "Cost comparison tools and calculators"
      ]}
    />
  );
};

export default CostOfLivingManagement;
