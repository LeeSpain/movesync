
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import SidebarHeader from './SidebarHeader';
import UserInfo from './UserInfo';
import SidebarNavigation from './SidebarNavigation';
import SidebarActions from './SidebarActions';

type NavItem = {
  icon: React.ElementType;
  label: string;
  href: string;
  isPremiumLocked?: boolean;
};

type SidebarProps = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  userName: string;
  isPremium: boolean;
  progressPercentage: number;
  navItems: NavItem[];
  onLogout: () => void;
};

const Sidebar = ({ 
  isSidebarOpen, 
  toggleSidebar, 
  userName, 
  isPremium, 
  progressPercentage, 
  navItems, 
  onLogout 
}: SidebarProps) => {
  return (
    <aside
      className={cn(
        "bg-sidebar-background border-r border-sidebar-border transition-all duration-300 flex flex-col fixed inset-y-0 z-30",
        isSidebarOpen ? "w-64" : "w-16"
      )}
    >
      <SidebarHeader isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <UserInfo 
        userName={userName} 
        isPremium={isPremium} 
        progressPercentage={progressPercentage} 
        isSidebarOpen={isSidebarOpen} 
      />

      <Separator className="my-2" />

      <SidebarNavigation navItems={navItems} isSidebarOpen={isSidebarOpen} />
      
      <SidebarActions isSidebarOpen={isSidebarOpen} onLogout={onLogout} />
    </aside>
  );
};

export default Sidebar;
