
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { AdminPlaceholder } from '@/components/admin/AdminPlaceholder';

const UserManagement = () => {
  return (
    <AdminLayout title="User Management">
      <AdminPlaceholder featureName="User Management" />
    </AdminLayout>
  );
};

export default UserManagement;
