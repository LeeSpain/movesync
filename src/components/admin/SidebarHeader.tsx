
import { ReactNode } from 'react';
import { Lock, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type SidebarHeaderProps = {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
};

const SidebarHeader = ({ isSidebarOpen, toggleSidebar }: SidebarHeaderProps) => {
  return (
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
  );
};

export default SidebarHeader;
