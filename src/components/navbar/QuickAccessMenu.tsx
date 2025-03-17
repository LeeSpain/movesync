
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, LayoutDashboard } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";

interface QuickAccessMenuProps {
  isAdmin: boolean;
}

export const QuickAccessMenu = ({ isAdmin }: QuickAccessMenuProps) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  console.log("QuickAccessMenu rendering with auth state:", { 
    isAdmin, 
    userIsAdmin: user?.isAdmin,
    userPlan: user?.plan,
    userObject: user 
  });

  const handleNavigate = (path: string) => {
    console.log("QuickAccessMenu: Navigating to:", path);
    navigate(path);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-1 p-0 h-auto bg-transparent">
          Quick Access <ChevronDown size={16} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-white shadow-lg rounded-md border border-gray-200 p-1 z-50">
        <DropdownMenuLabel className="px-3 py-2 text-xs text-gray-500">Dashboards</DropdownMenuLabel>
        
        <DropdownMenuItem
          className="flex items-center gap-2 w-full px-3 py-2 text-sm cursor-pointer"
          onClick={() => handleNavigate('/dashboard/free')}
        >
          <LayoutDashboard className="h-4 w-4 mr-2" />
          Dashboard
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default QuickAccessMenu;
