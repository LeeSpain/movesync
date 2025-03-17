
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { User } from '@/contexts/AuthContext';

type AdminUserInfoProps = {
  user: User | null;
  isSidebarOpen: boolean;
};

const AdminUserInfo = ({ user, isSidebarOpen }: AdminUserInfoProps) => {
  return (
    <div className={cn("p-4 border-b border-gray-200", !isSidebarOpen && "flex justify-center")}>
      {isSidebarOpen ? (
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback className="bg-blue-100 text-blue-600">
              {user?.name?.charAt(0) || 'A'}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{user?.name || 'Admin User'}</span>
            <span className="text-xs text-gray-500">Administrator</span>
          </div>
        </div>
      ) : (
        <Avatar>
          <AvatarFallback className="bg-blue-100 text-blue-600">
            {user?.name?.charAt(0) || 'A'}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};

export default AdminUserInfo;
