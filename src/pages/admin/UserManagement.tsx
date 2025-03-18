
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  UserCog, 
  MoreHorizontal, 
  Search, 
  UserPlus, 
  Mail, 
  Shield, 
  UserX 
} from 'lucide-react';
import { AdminUser, getUsers } from '@/utils/adminUtils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';

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
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>User Accounts ({filteredUsers.length})</CardTitle>
                  <div className="relative w-64">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      className="pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                <CardDescription>
                  View and manage all registered user accounts.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Country</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <Badge variant={user.plan === 'premium' ? 'default' : 'outline'}>
                            {user.plan === 'premium' ? 'Premium' : 'Free'}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.country}</TableCell>
                        <TableCell>{user.joinDate}</TableCell>
                        <TableCell>
                          <Badge variant={user.status === 'active' ? 'success' : 'destructive'}>
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
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
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="premium" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Premium Users</CardTitle>
                <CardDescription>
                  Manage users on premium subscription plans.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Country</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers
                      .filter(user => user.plan === 'premium')
                      .map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.country}</TableCell>
                          <TableCell>{user.joinDate}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => handleSendEmail(user.email)}>
                              <Mail className="mr-2 h-4 w-4" />
                              Contact
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="free" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Free Tier Users</CardTitle>
                <CardDescription>
                  View and manage users on the free plan.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Country</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers
                      .filter(user => user.plan === 'free')
                      .map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.country}</TableCell>
                          <TableCell>{user.joinDate}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => handleSendEmail(user.email)}>
                              <Mail className="mr-2 h-4 w-4" />
                              Contact
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="inactive" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Inactive Users</CardTitle>
                <CardDescription>
                  View and manage inactive or suspended accounts.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Plan</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers
                      .filter(user => user.status === 'inactive')
                      .map((user) => (
                        <TableRow key={user.id}>
                          <TableCell className="font-medium">{user.name}</TableCell>
                          <TableCell>{user.email}</TableCell>
                          <TableCell>{user.plan}</TableCell>
                          <TableCell>{user.lastActive}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm" onClick={() => handleToggleAccess(user.id, user.status)}>
                              <UserCog className="mr-2 h-4 w-4" />
                              Reactivate
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
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
