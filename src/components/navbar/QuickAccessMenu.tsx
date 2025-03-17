
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, LayoutDashboard, Shield, Sparkles } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { useAuth } from '@/contexts/AuthContext';

interface QuickAccessMenuProps {
  isAdmin: boolean;
}

export const QuickAccessMenu = ({ isAdmin }: QuickAccessMenuProps) => {
  const { user } = useAuth();
  const isPremium = user?.plan === 'premium';
  const navigate = useNavigate();
  
  console.log("QuickAccessMenu props:", { isAdmin, user });

  const handleNavigation = (path: string) => {
    console.log("Navigating to:", path);
    navigate(path);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="text-movesync-gray-dark hover:text-movesync-blue transition-colors duration-200 flex items-center gap-1">
          Quick Access <ChevronDown size={16} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-white shadow-lg rounded-md border border-gray-200 p-1 z-50">
        <DropdownMenuLabel className="px-3 py-2 text-xs text-gray-500">Dashboards</DropdownMenuLabel>
        
        <DropdownMenuItem onClick={() => handleNavigation('/dashboard/free')}>
          <div className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100 rounded">
            <LayoutDashboard className="h-4 w-4 mr-2" />
            Free Dashboard
          </div>
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleNavigation('/dashboard/premium')}>
          <div className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100 rounded">
            <Sparkles className="h-4 w-4 mr-2" />
            Premium Dashboard
          </div>
        </DropdownMenuItem>
        
        {isAdmin && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="px-3 py-2 text-xs text-gray-500">Admin</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => handleNavigation('/admin')}>
              <div className="flex items-center gap-2 w-full px-3 py-2 text-sm hover:bg-gray-100 rounded">
                <Shield className="h-4 w-4 mr-2" />
                Admin Dashboard
              </div>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default QuickAccessMenu;
