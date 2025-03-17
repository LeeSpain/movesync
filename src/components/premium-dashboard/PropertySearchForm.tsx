
import { Search, Filter } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent 
} from '@/components/ui/card';
import PropertyFilterTabs from './PropertyFilterTabs';

interface PropertySearchFormProps {
  onAreaFilterChange: (value: string) => void;
  onPropertyTypeFilterChange: (value: string) => void;
  areaFilter: string;
  propertyTypeFilter: string;
}

const PropertySearchForm = ({ 
  onAreaFilterChange, 
  onPropertyTypeFilterChange,
  areaFilter,
  propertyTypeFilter
}: PropertySearchFormProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Search initiated",
      description: `Searching for properties matching "${searchTerm}"`
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Search Properties</CardTitle>
        <CardDescription>Browse available properties or search for specific criteria</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSearch} className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by location, property type, features..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button type="submit">
            Search
          </Button>
        </form>
        
        <PropertyFilterTabs 
          areaFilter={areaFilter}
          propertyTypeFilter={propertyTypeFilter}
          onAreaFilterChange={onAreaFilterChange}
          onPropertyTypeFilterChange={onPropertyTypeFilterChange}
        />
      </CardContent>
    </Card>
  );
};

export default PropertySearchForm;
