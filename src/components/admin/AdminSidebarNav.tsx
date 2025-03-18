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
