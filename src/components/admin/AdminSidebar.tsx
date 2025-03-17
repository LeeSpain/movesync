
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import SidebarHeader from './SidebarHeader';
import AdminUserInfo from './AdminUserInfo';
import AdminSidebarNav from './AdminSidebarNav';
import SidebarFooter from './SidebarFooter';

type AdminSidebarProps = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
};

const AdminSidebar = ({ isSidebarOpen, toggleSidebar }: AdminSidebarProps) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You've been logged out of your MoveSync admin account.",
    });
    navigate('/login');
  };

  return (
    <aside
      className={cn(
        "bg-white border-r border-gray-200 transition-all duration-300 flex flex-col fixed inset-y-0 z-30",
        isSidebarOpen ? "w-64" : "w-16"
      )}
    >
      <SidebarHeader isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <AdminUserInfo user={user} isSidebarOpen={isSidebarOpen} />
      <AdminSidebarNav isSidebarOpen={isSidebarOpen} />
      <SidebarFooter isSidebarOpen={isSidebarOpen} onLogout={handleLogout} />
    </aside>
  );
};

export default AdminSidebar;
