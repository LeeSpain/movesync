import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, Menu, X, ChevronRight, User, Settings, LogOut, 
  PieChart, Map, CreditCard, Briefcase, Globe, Bot, Lock
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

type NavItemProps = {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive?: boolean;
  isPremiumLocked?: boolean;
  onClick?: () => void;
};

const NavItem = ({ icon: Icon, label, href, isActive, isPremiumLocked, onClick }: NavItemProps) => (
  <Link
    to={href}
    className={cn(
      "flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors",
      isActive && "bg-sidebar-accent text-sidebar-accent-foreground font-medium",
      isPremiumLocked && "opacity-50"
    )}
    onClick={onClick}
  >
    <Icon className="h-5 w-5" />
    <span>{label}</span>
    {isPremiumLocked && <Lock className="h-4 w-4 ml-auto text-movesync-gray" />}
  </Link>
);

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
      {/* Sidebar */}
      <aside
        className={cn(
          "bg-sidebar-background border-r border-sidebar-border transition-all duration-300 flex flex-col fixed inset-y-0 z-30",
          isSidebarOpen ? "w-64" : "w-16"
        )}
      >
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
          <Link to="/" className={cn("flex items-center gap-2", !isSidebarOpen && "justify-center")}>
            {isSidebarOpen ? (
              <>
                <span className="text-xl font-bold text-movesync-blue">MoveSync</span>
              </>
            ) : (
              <span className="text-xl font-bold text-movesync-blue">M</span>
            )}
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* User Info */}
        <div className={cn("flex items-center gap-3 p-4", !isSidebarOpen && "justify-center")}>
          <Avatar>
            <AvatarFallback className="bg-movesync-blue text-white">
              {userName.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {isSidebarOpen && (
            <div className="flex flex-col overflow-hidden">
              <span className="font-medium truncate">{userName}</span>
              <span className="text-xs text-muted-foreground">
                {isPremium ? "Premium Plan" : "Free Plan"}
              </span>
            </div>
          )}
        </div>

        {isSidebarOpen && (
          <div className="px-4 py-2">
            <div className="flex justify-between text-xs mb-1">
              <span>Relocation Progress</span>
              <span>{progressPercentage}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>
        )}

        <Separator className="my-2" />

        {/* Navigation */}
        <ScrollArea className="flex-grow">
          <div className={cn("px-2 py-2", !isSidebarOpen && "flex flex-col items-center space-y-2")}>
            {isSidebarOpen ? (
              navItems.map((item) => (
                <NavItem
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  href={item.href}
                  isActive={location.pathname === item.href}
                  isPremiumLocked={item.isPremiumLocked}
                />
              ))
            ) : (
              navItems.map((item) => (
                <Button
                  key={item.label}
                  variant="ghost"
                  size="icon"
                  asChild
                  className={cn(
                    "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                    location.pathname === item.href && "bg-sidebar-accent text-sidebar-accent-foreground",
                    item.isPremiumLocked && "opacity-50"
                  )}
                >
                  <Link to={item.href}>
                    <item.icon className="h-5 w-5" />
                  </Link>
                </Button>
              ))
            )}
          </div>
        </ScrollArea>

        {/* Bottom Actions */}
        <div className="mt-auto border-t border-sidebar-border p-2">
          {isSidebarOpen ? (
            <>
              <NavItem icon={Settings} label="Settings" href="/settings" />
              <div
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
                <span>Log Out</span>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center space-y-2">
              <Button variant="ghost" size="icon" asChild className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                <Link to="/settings">
                  <Settings className="h-5 w-5" />
                </Link>
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </aside>

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
