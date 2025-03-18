
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import SidebarHeader from '@/components/admin/SidebarHeader';
import AdminUserInfo from '@/components/admin/AdminUserInfo';
import InvestorSidebarNav from './InvestorSidebarNav';
import SidebarFooter from '@/components/admin/SidebarFooter';

type InvestorSidebarProps = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
};

const InvestorSidebar = ({ isSidebarOpen, toggleSidebar }: InvestorSidebarProps) => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You've been logged out of your MoveSync investor account.",
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
      <InvestorSidebarNav isSidebarOpen={isSidebarOpen} />
      <SidebarFooter isSidebarOpen={isSidebarOpen} onLogout={handleLogout} />
    </aside>
  );
};

export default InvestorSidebar;
