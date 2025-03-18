
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import UserTable from '../UserTable';
import UserSearch from '../UserSearch';
import { AdminUser } from '@/utils/adminUtils';

interface AllUsersTabProps {
  users: AdminUser[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSendEmail: (email: string) => void;
  handleResetPassword: (userId: string) => void;
  handleToggleAccess: (userId: string, currentStatus: string) => void;
}

const AllUsersTab: React.FC<AllUsersTabProps> = ({
  users,
  searchQuery,
  setSearchQuery,
  handleSendEmail,
  handleResetPassword,
  handleToggleAccess
}) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>User Accounts ({users.length})</CardTitle>
          <UserSearch 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
          />
        </div>
        <CardDescription>
          View and manage all registered user accounts.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <UserTable 
          users={users} 
          handleSendEmail={handleSendEmail}
          handleResetPassword={handleResetPassword}
          handleToggleAccess={handleToggleAccess}
          variant="full"
        />
      </CardContent>
    </Card>
  );
};

export default AllUsersTab;
