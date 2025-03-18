
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

interface PremiumUsersTabProps {
  users: AdminUser[];
  handleSendEmail: (email: string) => void;
  handleResetPassword: (userId: string) => void;
  handleToggleAccess: (userId: string, currentStatus: string) => void;
}

const PremiumUsersTab: React.FC<PremiumUsersTabProps> = ({
  users,
  handleSendEmail,
  handleResetPassword,
  handleToggleAccess
}) => {
  // Filter for premium users only
  const premiumUsers = users.filter(user => user.plan === 'premium');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Premium Users</CardTitle>
        <CardDescription>
          Manage users on premium subscription plans.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UserTable 
          users={premiumUsers} 
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

export default PremiumUsersTab;
