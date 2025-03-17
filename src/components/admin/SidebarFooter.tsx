
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

type SidebarFooterProps = {
  isSidebarOpen: boolean;
  onLogout: () => void;
};

const SidebarFooter = ({ isSidebarOpen, onLogout }: SidebarFooterProps) => {
  return (
    <div className="p-4 border-t border-gray-200">
      <Button
        variant="outline"
        className={cn("w-full", !isSidebarOpen && "p-2 justify-center")}
        onClick={onLogout}
      >
        {isSidebarOpen ? "Logout" : <Lock className="h-5 w-5" />}
      </Button>
    </div>
  );
};

export default SidebarFooter;
