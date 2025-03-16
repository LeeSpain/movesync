
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

type UserInfoProps = {
  userName: string;
  isPremium: boolean;
  progressPercentage: number;
  isSidebarOpen: boolean;
};

const UserInfo = ({ userName, isPremium, progressPercentage, isSidebarOpen }: UserInfoProps) => {
  return (
    <>
      <div className={cn("flex items-center gap-3 p-4", !isSidebarOpen && "justify-center")}>
        <Avatar>
          <AvatarFallback className="bg-movesync-blue text-white">
            {userName.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        {isSidebarOpen && (
          <div className="flex flex-col overflow-hidden">
            <span className="font-medium truncate">{userName}</span>
            <span className="text-xs text-muted-foreground">
              {isPremium ? "Premium Plan" : "Free Plan"}
            </span>
          </div>
        )}
      </div>

      {isSidebarOpen && (
        <div className="px-4 py-2">
          <div className="flex justify-between text-xs mb-1">
            <span>Relocation Progress</span>
            <span>{progressPercentage}%</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>
      )}
    </>
  );
};

export default UserInfo;
