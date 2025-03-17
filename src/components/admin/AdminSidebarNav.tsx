
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Users, Home, Settings, BarChart3, Bot, 
  DollarSign, PieChart, TrendingUp, BadgePercent,
  CreditCard
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
  const location = useLocation();

  // Updated navigation items focused on CEO metrics and financials
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
      label: 'Revenue',
      icon: DollarSign,
      href: '/admin/revenue',
    },
    {
      label: 'Subscriptions',
      icon: BadgePercent,
      href: '/admin/subscriptions',
    },
    {
      label: 'Growth Metrics',
      icon: TrendingUp,
      href: '/admin/growth',
    },
    {
      label: 'Financial Reports',
      icon: PieChart,
      href: '/admin/finance',
    },
    {
      label: 'AI Performance',
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
