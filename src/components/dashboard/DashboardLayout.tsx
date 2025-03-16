
import { ReactNode, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, Bot, Map, CreditCard, Briefcase, Globe, PieChart
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import Sidebar from './Sidebar';

type DashboardLayoutProps = {
  children: ReactNode;
  isPremium?: boolean;
  userName?: string;
  progressPercentage?: number;
};

const DashboardLayout = ({ 
  children, 
  isPremium = false,
  userName = "User",
  progressPercentage = 10
}: DashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { toast } = useToast();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You've been logged out of your MoveSync account.",
    });
    navigate('/');
  };

  const basePath = isPremium ? "/dashboard/premium" : "/dashboard/free";

  const navItems = [
    { icon: Home, label: "Overview", href: basePath },
    { icon: Bot, label: "AI Assistant", href: `${basePath}/assistant` },
    { icon: Map, label: "Property Search", href: `${basePath}/property`, isPremiumLocked: !isPremium },
    { icon: Globe, label: "Visa & Immigration", href: `${basePath}/visa`, isPremiumLocked: !isPremium },
    { icon: CreditCard, label: "Cost of Living", href: `${basePath}/cost-living`, isPremiumLocked: !isPremium },
    { icon: Briefcase, label: "Job Search", href: `${basePath}/jobs`, isPremiumLocked: !isPremium },
    { icon: PieChart, label: "Services Finder", href: `${basePath}/services`, isPremiumLocked: !isPremium },
  ];

  return (
    <div className="min-h-screen flex w-full">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
        userName={userName}
        isPremium={isPremium}
        progressPercentage={progressPercentage}
        navItems={navItems}
        onLogout={handleLogout}
      />

      {/* Main Content */}
      <main
        className={cn(
          "flex-1 transition-all duration-300",
          isSidebarOpen ? "ml-64" : "ml-16"
        )}
      >
        <div className="container-content py-8">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
