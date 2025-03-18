
import { ReactNode, useState } from 'react';
import { cn } from '@/lib/utils';
import InvestorSidebar from './InvestorSidebar';
import AdminHeader from '@/components/admin/AdminHeader';

type InvestorLayoutProps = {
  children: ReactNode;
  title: string;
};

const InvestorLayout = ({ children, title }: InvestorLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Investor Sidebar */}
      <InvestorSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <main
        className={cn(
          "flex-1 transition-all duration-300 min-h-screen",
          isSidebarOpen ? "ml-64" : "ml-16"
        )}
      >
        {/* Header */}
        <AdminHeader title={title} />

        {/* Page Content */}
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

export default InvestorLayout;
