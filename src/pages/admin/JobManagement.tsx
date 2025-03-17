
import React from 'react';
import { Briefcase } from 'lucide-react';
import AdminPlaceholder from '@/components/admin/AdminPlaceholder';

const JobManagement = () => {
  return (
    <AdminPlaceholder
      title="Job Management"
      description="Manage job listings and opportunities for relocating users"
      icon={<Briefcase className="h-6 w-6 text-blue-600" />}
      items={[
        "Job listings from partner companies",
        "Visa sponsorship opportunities",
        "Industry-specific job boards",
        "Recruitment partners by country",
        "Job application analytics"
      ]}
    />
  );
};

export default JobManagement;
