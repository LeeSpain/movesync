
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { adminNavItems } from './AdminSidebarNav';

type AdminHeaderProps = {
  title: string;
};

const AdminHeader = ({ title }: AdminHeaderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Find the current page title from the navigation items based on the URL
  const currentPageTitle = () => {
    // Default to the provided title
    if (title) return title;
    
    // Try to find a matching route in our nav items
    const currentPath = location.pathname;
    const matchingNavItem = adminNavItems.find(item => 
      currentPath === item.href || 
      (item.href !== "/admin" && currentPath.startsWith(item.href))
    );
    
    // Hard-code some specific titles for consistency
    if (currentPath.includes('/financial-reports')) return "Financial Reports";
    if (currentPath.includes('/revenue')) return "Revenue Management";
    if (currentPath.includes('/settings')) return "Admin Settings";
    
    return matchingNavItem?.title || "Admin Dashboard";
  };
  
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6 sticky top-0 z-10">
      <div className="flex justify-between w-full items-center">
        <h1 className="text-xl font-bold text-gray-800">{currentPageTitle()}</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={() => navigate('/')}>
            View Site
          </Button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
