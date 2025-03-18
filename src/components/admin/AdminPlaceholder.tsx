
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

interface AdminPlaceholderProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  items?: string[];
  comingSoon?: boolean;
}

const AdminPlaceholder = ({ 
  title, 
  description, 
  icon, 
  items = [], 
  comingSoon = false 
}: AdminPlaceholderProps) => {
  return (
    <Card className="border-dashed border-2">
      <CardHeader className="flex flex-row items-center gap-4">
        <div className="bg-blue-50 p-3 rounded-full">
          {icon}
        </div>
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <p className="text-sm text-gray-500">
            {comingSoon 
              ? "This feature is coming soon. When implemented, you'll be able to manage:"
              : "When you add content, it will appear here. You'll be able to manage:"}
          </p>
          <ul className="list-disc pl-5 space-y-2 text-sm text-gray-600">
            {items.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          
          <div className="flex justify-center mt-6">
            <Button disabled={comingSoon} className="gap-2">
              <PlusCircle className="h-4 w-4" />
              {comingSoon ? 'Coming Soon' : 'Add Your First Item'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPlaceholder;
