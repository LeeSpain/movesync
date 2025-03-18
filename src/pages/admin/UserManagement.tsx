import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { UserPlus } from 'lucide-react';
import { AdminUser, getUsers } from '@/utils/adminUtils';
import { toast } from '@/components/ui/use-toast';

// Import the new components
import AllUsersTab from '@/components/admin/user-management/tabs/AllUsersTab';
import PremiumUsersTab from '@/components/admin/user-management/tabs/PremiumUsersTab';
import FreeUsersTab from '@/components/admin/user-management/tabs/FreeUsersTab';
import InactiveUsersTab from '@/components/admin/user-management/tabs/InactiveUsersTab';

const UserManagement = () => {
  const [users, setUsers] = useState<AdminUser[]>(getUsers() || getMockUsers());
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter users based on search query
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.country.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const handleSendEmail = (email: string) => {
    toast({
      title: "Email Action",
      description: `Sending email to ${email}`,
    });
  };
  
  const handleResetPassword = (userId: string) => {
    toast({
      title: "Password Reset",
      description: `Password reset link sent to user ID: ${userId}`,
    });
  };
  
  const handleToggleAccess = (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    const updatedUsers = users.map(user => 
      user.id === userId ? {...user, status: newStatus as 'active' | 'inactive'} : user
    );
    setUsers(updatedUsers);
    
    toast({
      title: `User ${newStatus === 'active' ? 'Activated' : 'Deactivated'}`,
      description: `User ID: ${userId} is now ${newStatus}`,
    });
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
          <p className="text-muted-foreground">
            Manage user accounts, permissions and communication
          </p>
        </div>
        <Button className="flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Add New User
        </Button>
      </div>
      
      <div className="mb-6">
        <Tabs defaultValue="all-users">
          <TabsList>
            <TabsTrigger value="all-users">All Users</TabsTrigger>
            <TabsTrigger value="premium">Premium Users</TabsTrigger>
            <TabsTrigger value="free">Free Users</TabsTrigger>
            <TabsTrigger value="inactive">Inactive Users</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all-users" className="space-y-4">
            <AllUsersTab 
              users={filteredUsers}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              handleSendEmail={handleSendEmail}
              handleResetPassword={handleResetPassword}
              handleToggleAccess={handleToggleAccess}
            />
          </TabsContent>
          
          <TabsContent value="premium" className="space-y-4">
            <PremiumUsersTab 
              users={filteredUsers}
              handleSendEmail={handleSendEmail}
              handleResetPassword={handleResetPassword}
              handleToggleAccess={handleToggleAccess}
            />
          </TabsContent>
          
          <TabsContent value="free" className="space-y-4">
            <FreeUsersTab 
              users={filteredUsers}
              handleSendEmail={handleSendEmail}
              handleResetPassword={handleResetPassword}
              handleToggleAccess={handleToggleAccess}
            />
          </TabsContent>
          
          <TabsContent value="inactive" className="space-y-4">
            <InactiveUsersTab 
              users={filteredUsers}
              handleSendEmail={handleSendEmail}
              handleResetPassword={handleResetPassword}
              handleToggleAccess={handleToggleAccess}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

// Helper function to provide mock user data if none exists
function getMockUsers(): AdminUser[] {
  return [
    {
      id: '1',
      name: 'Alex Smith',
      email: 'alex@example.com',
      plan: 'premium',
      country: 'United States',
      joinDate: '2023-01-15',
      lastActive: '2023-06-22',
      status: 'active'
    },
    {
      id: '2',
      name: 'Emily Johnson',
      email: 'emily@example.com',
      plan: 'premium',
      country: 'Canada',
      joinDate: '2023-02-18',
      lastActive: '2023-06-20',
      status: 'active'
    },
    {
      id: '3',
      name: 'Michael Chen',
      email: 'michael@example.com',
      plan: 'free',
      country: 'Australia',
      joinDate: '2023-03-05',
      lastActive: '2023-05-30',
      status: 'inactive'
    },
    {
      id: '4',
      name: 'Sophia Kim',
      email: 'sophia@example.com',
      plan: 'free',
      country: 'South Korea',
      joinDate: '2023-03-22',
      lastActive: '2023-06-18',
      status: 'active'
    },
    {
      id: '5',
      name: 'James Wilson',
      email: 'james@example.com',
      plan: 'premium',
      country: 'United Kingdom',
      joinDate: '2023-04-10',
      lastActive: '2023-06-15',
      status: 'active'
    },
    {
      id: '6',
      name: 'Emma Garcia',
      email: 'emma@example.com',
      plan: 'free',
      country: 'Spain',
      joinDate: '2023-04-28',
      lastActive: '2023-05-10',
      status: 'inactive'
    },
    {
      id: '7',
      name: 'Liam Brown',
      email: 'liam@example.com',
      plan: 'premium',
      country: 'Germany',
      joinDate: '2023-05-05',
      lastActive: '2023-06-21',
      status: 'active'
    }
  ];
}

export default UserManagement;
