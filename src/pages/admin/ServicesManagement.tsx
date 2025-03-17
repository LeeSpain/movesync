
import React from 'react';
import { Database } from 'lucide-react';
import AdminPlaceholder from '@/components/admin/AdminPlaceholder';

const ServicesManagement = () => {
  return (
    <AdminPlaceholder
      title="Services Management"
      description="Manage service providers and relocation services"
      icon={<Database className="h-6 w-6 text-blue-600" />}
      items={[
        "Relocation service providers",
        "Banking and financial services",
        "Housing and accommodation services",
        "Legal and administrative support",
        "Service provider ratings and reviews"
      ]}
    />
  );
};

export default ServicesManagement;
