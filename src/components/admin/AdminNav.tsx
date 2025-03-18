
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Settings, 
  LogOut, 
  Lock, 
  CreditCard, 
  Mail, 
  UserCog,
  Server,
  Bell,
  ShieldCheck,
  LineChart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const AdminNav = () => {
  const navigate = useNavigate();
  const { logout, isAdmin, user } = useAuth();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  // If not admin, don't render anything
  if (!isAdmin) return null;

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You've been logged out of your MoveSync account.",
    });
    navigate('/');
  };

  const goToAdminDashboard = () => {
    navigate('/admin');
    setIsOpen(false);
  };

  const goToUserManagement = () => {
    navigate('/admin/users');
    setIsOpen(false);
  };

  const goToServiceSetup = () => {
    navigate('/admin/service-setup');
    setIsOpen(false);
  };

  const goToEmailManager = () => {
    navigate('/admin/email');
    setIsOpen(false);
  };
  
  const goToSecuritySettings = () => {
    navigate('/admin/settings');
    setIsOpen(false);
  };
  
  const goToPaymentSettings = () => {
    navigate('/admin/service-setup');
    setIsOpen(false);
  };
  
  const goToNotifications = () => {
    navigate('/admin/settings');
    setIsOpen(false);
  };
  
  const goToAnalytics = () => {
    navigate('/admin/analytics');
    setIsOpen(false);
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Lock className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Admin Controls</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={goToAdminDashboard}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Admin Dashboard</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={goToUserManagement}>
            <UserCog className="mr-2 h-4 w-4" />
            <span>User Management</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={goToAnalytics}>
            <LineChart className="mr-2 h-4 w-4" />
            <span>Analytics & Reports</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuLabel>Service Configuration</DropdownMenuLabel>
        
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={goToServiceSetup}>
            <Server className="mr-2 h-4 w-4" />
            <span>Service Setup</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={goToEmailManager}>
            <Mail className="mr-2 h-4 w-4" />
            <span>Email Manager</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={goToPaymentSettings}>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Payment Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />
        <DropdownMenuLabel>System</DropdownMenuLabel>
        
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={goToSecuritySettings}>
            <ShieldCheck className="mr-2 h-4 w-4" />
            <span>Security Settings</span>
          </DropdownMenuItem>
          
          <DropdownMenuItem onClick={goToNotifications}>
            <Bell className="mr-2 h-4 w-4" />
            <span>System Notifications</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AdminNav;
