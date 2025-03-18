
import { Home, Users, Mail, FileText, LineChart, DollarSign, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

type NavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
  variant: "default" | "ghost";
};

export const adminNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: Home,
    variant: "ghost",
  },
  {
    title: "User Management",
    href: "/admin/users",
    icon: Users,
    variant: "ghost",
  },
  {
    title: "Email Manager",
    href: "/admin/email",
    icon: Mail,
    variant: "ghost",
  },
  {
    title: "Financial Reports",
    href: "/admin/financial-reports",
    icon: FileText,
    variant: "ghost",
  },
  {
    title: "Revenue Management",
    href: "/admin/revenue",
    icon: DollarSign,
    variant: "ghost",
  },
  {
    title: "Growth Metrics",
    href: "/admin/growth-metrics",
    icon: LineChart,
    variant: "ghost",
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
    variant: "ghost",
  },
];

const AdminSidebarNav = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
  const location = useLocation();
  
  return (
    <nav className="space-y-2 px-2 py-4 flex-1 overflow-auto">
      {adminNavItems.map((item) => {
        const isActive = location.pathname === item.href || 
                        (item.href !== "/admin" && location.pathname.startsWith(item.href));
        
        return (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center px-3 py-2 rounded-md transition-colors",
              isActive 
                ? "bg-gray-100 text-gray-900 font-medium" 
                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            )}
          >
            <item.icon className="h-5 w-5 mr-3" />
            {isSidebarOpen && <span>{item.title}</span>}
          </Link>
        );
      })}
    </nav>
  );
};

export default AdminSidebarNav;
