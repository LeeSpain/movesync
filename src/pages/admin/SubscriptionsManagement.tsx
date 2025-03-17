
import React from 'react';
import { BadgePercent } from 'lucide-react';
import AdminPlaceholder from '@/components/admin/AdminPlaceholder';

const SubscriptionsManagement = () => {
  return (
    <AdminPlaceholder
      title="Subscriptions Management"
      description="Monitor and analyze user subscription metrics and conversion rates"
      icon={<BadgePercent className="h-6 w-6 text-blue-600" />}
      items={[
        "Premium vs. free user distribution",
        "Subscription conversion funnels and drop-off points",
        "Churn analysis and retention strategies",
        "Lifetime value calculations by user segment",
        "Subscription plans optimization and A/B testing"
      ]}
    />
  );
};

export default SubscriptionsManagement;
