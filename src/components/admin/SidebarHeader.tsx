
import { useNavigate } from 'react-router-dom';
import { X, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type SidebarHeaderProps = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
};

const SidebarHeader = ({ isSidebarOpen, toggleSidebar }: SidebarHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200">
      <div 
        className={cn("flex items-center gap-2 cursor-pointer", !isSidebarOpen && "justify-center")}
        onClick={() => navigate('/admin')}
      >
        {isSidebarOpen ? (
          <span className="text-xl font-bold">
            Move-<span className="text-movesync-blue">Sync</span> Admin
          </span>
        ) : (
          <span className="text-xl font-bold text-movesync-blue">M</span>
        )}
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>
    </div>
  );
};

export default SidebarHeader;
