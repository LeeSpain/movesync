
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import AdminPlaceholder from '@/components/admin/AdminPlaceholder';

const UserManagement = () => {
  return (
    <AdminLayout title="User Management">
      <AdminPlaceholder 
        title="User Management"
        description="Manage your platform users"
        icon={<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>}
        items={[
          'User accounts and profiles',
          'Access control and permissions',
          'User activity and engagement metrics',
          'Account verification and security'
        ]}
      />
    </AdminLayout>
  );
};

export default UserManagement;
