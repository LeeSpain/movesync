
import { Link } from 'react-router-dom';
import { X, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type SidebarHeaderProps = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
};

const SidebarHeader = ({ isSidebarOpen, toggleSidebar }: SidebarHeaderProps) => {
  return (
    <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
      <Link to="/" className={cn("flex items-center gap-2", !isSidebarOpen && "justify-center")}>
        {isSidebarOpen ? (
          <span className="text-xl font-bold text-movesync-blue">MoveSync</span>
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
  );
};

export default SidebarHeader;
