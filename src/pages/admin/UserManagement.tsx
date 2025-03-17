
import { useState, useEffect } from 'react';
import { Search, Filter, Plus, Edit, Trash2, CreditCard, CheckCircle, XCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { 
  Dialog, 
  DialogContent,
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import AdminLayout from '@/components/admin/AdminLayout';

// Sample user data
const sampleUsers = [
  {
    id: '1',
    name: 'Alex Smith',
    email: 'alex@example.com',
    plan: 'free',
    country: 'Australia',
    joinDate: '2023-05-12',
    lastActive: '2023-06-28',
    status: 'active',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    plan: 'premium',
    country: 'Canada',
    joinDate: '2023-01-05',
    lastActive: '2023-06-29',
    status: 'active',
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael@example.com',
    plan: 'premium',
    country: 'United Kingdom',
    joinDate: '2023-03-18',
    lastActive: '2023-06-25',
    status: 'active',
  },
  {
    id: '4',
    name: 'Emma Wilson',
    email: 'emma@example.com',
    plan: 'free',
    country: 'United States',
    joinDate: '2023-04-30',
    lastActive: '2023-05-15',
    status: 'inactive',
  },
  {
    id: '5',
    name: 'James Davis',
    email: 'james@example.com',
    plan: 'premium',
    country: 'Australia',
    joinDate: '2023-02-10',
    lastActive: '2023-06-27',
    status: 'active',
  },
  {
    id: '6',
    name: 'Olivia Garcia',
    email: 'olivia@example.com',
    plan: 'free',
    country: 'Germany',
    joinDate: '2023-05-22',
    lastActive: '2023-06-20',
    status: 'active',
  },
];

type User = typeof sampleUsers[0];

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    // In a real app, this would be an API call
    setUsers(sampleUsers);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedUser) {
      setUsers(users.filter(user => user.id !== selectedUser.id));
      toast({
        title: "User deleted",
        description: `${selectedUser.name} has been deleted successfully.`,
      });
      setIsDeleteDialogOpen(false);
    }
  };

  const handleUpgradeToPremium = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, plan: 'premium' } : user
    ));
    
    toast({
      title: "User upgraded",
      description: "User has been upgraded to Premium plan.",
    });
  };

  const handleDowngradeToFree = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId ? { ...user, plan: 'free' } : user
    ));
    
    toast({
      title: "User downgraded",
      description: "User has been downgraded to Free plan.",
    });
  };

  const toggleUserStatus = (userId: string) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' } 
        : user
    ));
    
    const targetUser = users.find(user => user.id === userId);
    const newStatus = targetUser?.status === 'active' ? 'inactive' : 'active';
    
    toast({
      title: `User ${newStatus}`,
      description: `User account has been set to ${newStatus}.`,
    });
  };

  return (
    <AdminLayout title="User Management">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Users</CardTitle>
          <div className="flex space-x-2">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search users..."
                className="pl-8"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add User
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>
                    Create a new user account.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input id="name" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input id="email" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="country" className="text-right">
                      Country
                    </Label>
                    <Input id="country" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="plan" className="text-right">
                      Premium
                    </Label>
                    <div className="col-span-3 flex items-center space-x-2">
                      <Switch id="plan" />
                      <Label htmlFor="plan">Premium plan</Label>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Create User</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Country</TableHead>
                <TableHead>Join Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
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
                  <TableCell>{new Date(user.joinDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'active' ? 'success' : 'destructive'}>
                      {user.status === 'active' ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" onClick={() => handleEdit(user)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => handleDelete(user)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <CreditCard className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem onClick={() => handleUpgradeToPremium(user.id)}>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            <span>Upgrade to Premium</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDowngradeToFree(user.id)}>
                            <XCircle className="mr-2 h-4 w-4" />
                            <span>Downgrade to Free</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => toggleUserStatus(user.id)}
                      >
                        {user.status === 'active' ? 
                          <XCircle className="h-4 w-4" /> : 
                          <CheckCircle className="h-4 w-4" />
                        }
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>
              Make changes to user information.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                Name
              </Label>
              <Input 
                id="edit-name" 
                className="col-span-3" 
                defaultValue={selectedUser?.name} 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-email" className="text-right">
                Email
              </Label>
              <Input 
                id="edit-email" 
                className="col-span-3" 
                defaultValue={selectedUser?.email} 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-country" className="text-right">
                Country
              </Label>
              <Input 
                id="edit-country" 
                className="col-span-3" 
                defaultValue={selectedUser?.country} 
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-plan" className="text-right">
                Premium
              </Label>
              <div className="col-span-3 flex items-center space-x-2">
                <Switch 
                  id="edit-plan" 
                  defaultChecked={selectedUser?.plan === 'premium'} 
                />
                <Label htmlFor="edit-plan">Premium plan</Label>
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-status" className="text-right">
                Active
              </Label>
              <div className="col-span-3 flex items-center space-x-2">
                <Switch 
                  id="edit-status" 
                  defaultChecked={selectedUser?.status === 'active'} 
                />
                <Label htmlFor="edit-status">Active account</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={() => setIsEditDialogOpen(false)}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedUser?.name}? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default UserManagement;
