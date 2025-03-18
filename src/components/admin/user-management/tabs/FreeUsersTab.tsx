
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import UserTable from '../UserTable';
import { AdminUser } from '@/utils/adminUtils';

interface FreeUsersTabProps {
  users: AdminUser[];
  handleSendEmail: (email: string) => void;
  handleResetPassword: (userId: string) => void;
  handleToggleAccess: (userId: string, currentStatus: string) => void;
}

const FreeUsersTab: React.FC<FreeUsersTabProps> = ({
  users,
  handleSendEmail,
  handleResetPassword,
  handleToggleAccess
}) => {
  // Filter for free users only
  const freeUsers = users.filter(user => user.plan === 'free');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Free Tier Users</CardTitle>
        <CardDescription>
          View and manage users on the free plan.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UserTable 
          users={freeUsers} 
          handleSendEmail={handleSendEmail}
          handleResetPassword={handleResetPassword}
          handleToggleAccess={handleToggleAccess}
          showPlan={false}
          variant="compact"
        />
      </CardContent>
    </Card>
  );
};

export default FreeUsersTab;
