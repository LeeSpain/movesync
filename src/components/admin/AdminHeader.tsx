
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

type AdminHeaderProps = {
  title: string;
};

const AdminHeader = ({ title }: AdminHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center px-6 sticky top-0 z-10">
      <div className="flex justify-between w-full items-center">
        <h1 className="text-xl font-bold text-gray-800">{title}</h1>
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
