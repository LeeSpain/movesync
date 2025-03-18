
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

interface InactiveUsersTabProps {
  users: AdminUser[];
  handleSendEmail: (email: string) => void;
  handleResetPassword: (userId: string) => void;
  handleToggleAccess: (userId: string, currentStatus: string) => void;
}

const InactiveUsersTab: React.FC<InactiveUsersTabProps> = ({
  users,
  handleSendEmail,
  handleResetPassword,
  handleToggleAccess
}) => {
  // Filter for inactive users only
  const inactiveUsers = users.filter(user => user.status === 'inactive');

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inactive Users</CardTitle>
        <CardDescription>
          View and manage inactive or suspended accounts.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UserTable 
          users={inactiveUsers} 
          handleSendEmail={handleSendEmail}
          handleResetPassword={handleResetPassword}
          handleToggleAccess={handleToggleAccess}
          showLastActive={true}
          variant="compact"
        />
      </CardContent>
    </Card>
  );
};

export default InactiveUsersTab;
