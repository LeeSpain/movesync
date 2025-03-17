
import React from 'react';
import { Home } from 'lucide-react';
import AdminPlaceholder from '@/components/admin/AdminPlaceholder';

const PropertyManagement = () => {
  return (
    <AdminPlaceholder
      title="Property Management"
      description="Manage property listings across all supported countries"
      icon={<Home className="h-6 w-6 text-blue-600" />}
      items={[
        "Property listings from various sources",
        "Featured properties for premium users",
        "Property verification status",
        "User property favorites and interactions",
        "Property search analytics"
      ]}
    />
  );
};

export default PropertyManagement;
