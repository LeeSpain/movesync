
import { LineChart, DollarSign, TrendingUp, Users, FileText, BarChart } from 'lucide-react';
import { Link } from 'react-router-dom';

type NavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
  variant: "default" | "ghost";
};

export const investorNavItems: NavItem[] = [
  {
    title: "Overview",
    href: "/investor",
    icon: LineChart,
    variant: "ghost",
  },
  {
    title: "Financial Performance",
    href: "/investor/financial",
    icon: DollarSign,
    variant: "ghost",
  },
  {
    title: "Growth Metrics",
    href: "/investor/growth",
    icon: TrendingUp,
    variant: "ghost",
  },
  {
    title: "User Analytics",
    href: "/investor/users",
    icon: Users,
    variant: "ghost",
  },
  {
    title: "Quarterly Reports",
    href: "/investor/reports",
    icon: FileText,
    variant: "ghost",
  },
  {
    title: "Revenue Projections",
    href: "/investor/projections",
    icon: BarChart,
    variant: "ghost",
  }
];

const InvestorSidebarNav = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
  return (
    <nav className="space-y-2 px-2">
      {investorNavItems.map((item) => (
        <Link
          key={item.href}
          to={item.href}
          className="flex items-center px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors"
        >
          <item.icon className="h-5 w-5 mr-3" />
          {isSidebarOpen && <span>{item.title}</span>}
        </Link>
      ))}
    </nav>
  );
};

export default InvestorSidebarNav;
