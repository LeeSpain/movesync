
import { Link } from 'react-router-dom';
import { Settings, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NavItem from './NavItem';

type SidebarActionsProps = {
  isSidebarOpen: boolean;
  onLogout: () => void;
};

const SidebarActions = ({ isSidebarOpen, onLogout }: SidebarActionsProps) => {
  return (
    <div className="mt-auto border-t border-sidebar-border p-2">
      {isSidebarOpen ? (
        <>
          <NavItem icon={Settings} label="Settings" href="/settings" />
          <div
            className="flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors cursor-pointer"
            onClick={onLogout}
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
            onClick={onLogout}
          >
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default SidebarActions;
