
import { ReactNode, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { cn } from '@/lib/utils';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

export type AdminLayoutProps = {
  children?: ReactNode;
  title: string;
};

const AdminLayout = ({ children, title }: AdminLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Admin Sidebar */}
      <AdminSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

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
          {children || <Outlet />}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
