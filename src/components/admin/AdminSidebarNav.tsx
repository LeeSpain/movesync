
import { Home, Users, Mail, Settings, FileText, LineChart } from 'lucide-react';

type NavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
  variant: "default" | "ghost";
};

export const adminNavItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
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
    icon: FileText,
    variant: "ghost",
  },
  {
    title: "Growth Metrics",
    href: "/admin/growth-metrics",
    icon: FileText,
    variant: "ghost",
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
    variant: "ghost",
  },
  {
    title: "Investor Dashboard",
    href: "/admin/investor",
    icon: LineChart,
    variant: "ghost",
  },
];

const AdminSidebarNav = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
  return (
    <nav className="space-y-2 px-2">
      {adminNavItems.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
        >
          <item.icon className="h-5 w-5 mr-3" />
          {isSidebarOpen && <span>{item.title}</span>}
        </a>
      ))}
    </nav>
  );
};

export default AdminSidebarNav;

