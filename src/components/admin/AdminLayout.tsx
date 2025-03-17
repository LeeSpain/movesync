
import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, Globe, Home, Settings, Map, CreditCard, Briefcase, 
  FileText, BarChart3, Lock, Database, Bot, ChevronLeft, Menu
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/components/ui/use-toast';

type AdminLayoutProps = {
  children: ReactNode;
  title: string;
};

const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You've been logged out of your MoveSync admin account.",
    });
    navigate('/login');
  };

  // Navigation items for the admin sidebar
  const navigationItems = [
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
    <div className="min-h-screen flex bg-gray-50">
      {/* Admin Sidebar */}
      <aside
        className={cn(
          "bg-white border-r border-gray-200 transition-all duration-300 flex flex-col fixed inset-y-0 z-30",
          isSidebarOpen ? "w-64" : "w-16"
        )}
      >
        {/* Sidebar Header */}
        <div className="h-16 border-b border-gray-200 flex items-center justify-between px-4">
          {isSidebarOpen ? (
            <div className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-blue-600" />
              <span className="font-bold text-lg">MoveSync Admin</span>
            </div>
          ) : (
            <Lock className="h-5 w-5 text-blue-600 mx-auto" />
          )}
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <ChevronLeft className={cn("h-5 w-5 transition-transform", !isSidebarOpen && "rotate-180")} />
          </Button>
        </div>

        {/* Admin User Info */}
        <div className={cn("p-4 border-b border-gray-200", !isSidebarOpen && "flex justify-center")}>
          {isSidebarOpen ? (
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-blue-100 text-blue-600">
                  {user?.name?.charAt(0) || 'A'}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium">{user?.name || 'Admin User'}</span>
                <span className="text-xs text-gray-500">Administrator</span>
              </div>
            </div>
          ) : (
            <Avatar>
              <AvatarFallback className="bg-blue-100 text-blue-600">
                {user?.name?.charAt(0) || 'A'}
              </AvatarFallback>
            </Avatar>
          )}
        </div>

        {/* Navigation Menu */}
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

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200">
          <Button
            variant="outline"
            className={cn("w-full", !isSidebarOpen && "p-2 justify-center")}
            onClick={handleLogout}
          >
            {isSidebarOpen ? "Logout" : <Lock className="h-5 w-5" />}
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main
        className={cn(
          "flex-1 transition-all duration-300 min-h-screen",
          isSidebarOpen ? "ml-64" : "ml-16"
        )}
      >
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6 sticky top-0 z-10">
          <div className="flex justify-between w-full items-center">
            <h1 className="text-xl font-bold text-gray-800">{title}</h1>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm" onClick={() => navigate('/')}>
                View Site
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
