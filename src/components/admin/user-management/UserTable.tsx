
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  UserCog, 
  MoreHorizontal, 
  Mail, 
  Shield, 
  UserX 
} from 'lucide-react';
import { AdminUser } from '@/utils/adminUtils';

interface UserTableProps {
  users: AdminUser[];
  handleSendEmail: (email: string) => void;
  handleResetPassword: (userId: string) => void;
  handleToggleAccess: (userId: string, currentStatus: string) => void;
  showPlan?: boolean;
  showLastActive?: boolean;
  variant?: 'full' | 'compact';
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  handleSendEmail,
  handleResetPassword,
  handleToggleAccess,
  showPlan = true,
  showLastActive = false,
  variant = 'full'
}) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          {showPlan && <TableHead>Plan</TableHead>}
          {variant === 'full' && <TableHead>Country</TableHead>}
          {variant === 'full' ? <TableHead>Joined</TableHead> : null}
          {showLastActive && <TableHead>Last Active</TableHead>}
          {variant === 'full' && <TableHead>Status</TableHead>}
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            {showPlan && (
              <TableCell>
                <Badge variant={user.plan === 'premium' ? 'default' : 'outline'}>
                  {user.plan === 'premium' ? 'Premium' : 'Free'}
                </Badge>
              </TableCell>
            )}
            {variant === 'full' && <TableCell>{user.country}</TableCell>}
            {variant === 'full' ? <TableCell>{user.joinDate}</TableCell> : null}
            {showLastActive && <TableCell>{user.lastActive}</TableCell>}
            {variant === 'full' && (
              <TableCell>
                <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>
                  {user.status}
                </Badge>
              </TableCell>
            )}
            <TableCell className="text-right">
              {variant === 'full' ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleSendEmail(user.email)}>
                      <Mail className="mr-2 h-4 w-4" />
                      <span>Send Email</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleResetPassword(user.id)}>
                      <Shield className="mr-2 h-4 w-4" />
                      <span>Reset Password</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleToggleAccess(user.id, user.status)}
                      className={user.status === 'active' ? "text-destructive" : "text-green-600"}
                    >
                      {user.status === 'active' ? (
                        <>
                          <UserX className="mr-2 h-4 w-4" />
                          <span>Deactivate User</span>
                        </>
                      ) : (
                        <>
                          <UserCog className="mr-2 h-4 w-4" />
                          <span>Activate User</span>
                        </>
                      )}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="ghost" size="sm" onClick={() => handleSendEmail(user.email)}>
                  <Mail className="mr-2 h-4 w-4" />
                  Contact
                </Button>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserTable;
