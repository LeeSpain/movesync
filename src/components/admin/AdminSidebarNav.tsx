
import { useNavigate } from 'react-router-dom';
import { 
  Users, Globe, Home, Settings, Map, CreditCard, Briefcase, 
  FileText, BarChart3, Lock, Database, Bot 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

type NavigationItem = {
  label: string;
  icon: React.ElementType;
  href: string;
};

type AdminSidebarNavProps = {
  isSidebarOpen: boolean;
};

const AdminSidebarNav = ({ isSidebarOpen }: AdminSidebarNavProps) => {
  const navigate = useNavigate();

  // Navigation items for the admin sidebar
  const navigationItems: NavigationItem[] = [
    {
      label: 'Dashboard',
      icon: Home,
      href: '/admin',
    },
    {
      label: 'User Management',
      icon: Users,
      href: '/admin/users',
    },
    {
      label: 'Countries',
      icon: Globe,
      href: '/admin/countries',
    },
    {
      label: 'Properties',
      icon: Map,
      href: '/admin/properties',
    },
    {
      label: 'Visa Services',
      icon: FileText,
      href: '/admin/visa',
    },
    {
      label: 'Cost of Living',
      icon: CreditCard,
      href: '/admin/cost-living',
    },
    {
      label: 'Jobs',
      icon: Briefcase,
      href: '/admin/jobs',
    },
    {
      label: 'Service Providers',
      icon: Database,
      href: '/admin/services',
    },
    {
      label: 'AI Assistant',
      icon: Bot,
      href: '/admin/ai-assistant',
    },
    {
      label: 'Analytics',
      icon: BarChart3,
      href: '/admin/analytics',
    },
    {
      label: 'Settings',
      icon: Settings,
      href: '/admin/settings',
    },
  ];

  return (
    <ScrollArea className="flex-grow">
      <nav className={cn("p-2", !isSidebarOpen && "flex flex-col items-center")}>
        {navigationItems.map((item) => (
          <Button
            key={item.href}
            variant="ghost"
            className={cn(
              "w-full justify-start mb-1 text-gray-700 hover:text-blue-600 hover:bg-blue-50",
              location.pathname === item.href && "bg-blue-50 text-blue-600",
              !isSidebarOpen && "justify-center p-2"
            )}
            onClick={() => navigate(item.href)}
          >
            <item.icon className={cn("h-5 w-5 mr-3", !isSidebarOpen && "mr-0")} />
            {isSidebarOpen && <span>{item.label}</span>}
          </Button>
        ))}
      </nav>
    </ScrollArea>
  );
};

export default AdminSidebarNav;
