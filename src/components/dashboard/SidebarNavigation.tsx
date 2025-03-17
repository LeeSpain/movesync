
import { useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import NavItem from './NavItem';
import { useToast } from '@/components/ui/use-toast';

type NavItem = {
  icon: React.ElementType;
  label: string;
  href: string;
  isPremiumLocked?: boolean;
};

type SidebarNavigationProps = {
  navItems: NavItem[];
  isSidebarOpen: boolean;
};

const SidebarNavigation = ({ navItems, isSidebarOpen }: SidebarNavigationProps) => {
  const location = useLocation();
  const { toast } = useToast();

  const handleLockedFeatureClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toast({
      title: "Premium Feature",
      description: "This feature is only available with the Premium plan.",
    });
  };

  return (
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
              asChild={!item.isPremiumLocked}
              className={cn(
                "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                location.pathname === item.href && "bg-sidebar-accent text-sidebar-accent-foreground",
                item.isPremiumLocked && "opacity-50"
              )}
              onClick={item.isPremiumLocked ? handleLockedFeatureClick : undefined}
            >
              {!item.isPremiumLocked ? (
                <Link to={item.href}>
                  <item.icon className="h-5 w-5" />
                </Link>
              ) : (
                <item.icon className="h-5 w-5" />
              )}
            </Button>
          ))
        )}
      </div>
    </ScrollArea>
  );
};

export default SidebarNavigation;
