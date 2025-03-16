
import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { cn } from '@/lib/utils';

type NavItemProps = {
  icon: React.ElementType;
  label: string;
  href: string;
  isActive?: boolean;
  isPremiumLocked?: boolean;
  onClick?: () => void;
};

const NavItem = ({ icon: Icon, label, href, isActive, isPremiumLocked, onClick }: NavItemProps) => (
  <Link
    to={href}
    className={cn(
      "flex items-center gap-3 px-3 py-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors",
      isActive && "bg-sidebar-accent text-sidebar-accent-foreground font-medium",
      isPremiumLocked && "opacity-50"
    )}
    onClick={onClick}
  >
    <Icon className="h-5 w-5" />
    <span>{label}</span>
    {isPremiumLocked && <Lock className="h-4 w-4 ml-auto text-movesync-gray" />}
  </Link>
);

export default NavItem;
