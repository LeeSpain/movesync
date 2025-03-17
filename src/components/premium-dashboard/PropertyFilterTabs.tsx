
import { MapPin, Building, Filter } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';

interface PropertyFilterTabsProps {
  areaFilter: string;
  propertyTypeFilter: string;
  onAreaFilterChange: (value: string) => void;
  onPropertyTypeFilterChange: (value: string) => void;
}

const PropertyFilterTabs = ({
  areaFilter,
  propertyTypeFilter,
  onAreaFilterChange,
  onPropertyTypeFilterChange
}: PropertyFilterTabsProps) => {
  return (
    <div className="flex flex-wrap gap-4 mb-8">
      <div>
        <span className="text-sm font-medium mr-2">Area:</span>
        <Tabs value={areaFilter} onValueChange={onAreaFilterChange} className="inline-flex">
          <TabsList>
            <TabsTrigger value="all"><MapPin className="h-4 w-4 mr-1" />All</TabsTrigger>
            <TabsTrigger value="sydney">Sydney</TabsTrigger>
            <TabsTrigger value="melbourne">Melbourne</TabsTrigger>
            <TabsTrigger value="brisbane">Brisbane</TabsTrigger>
            <TabsTrigger value="perth">Perth</TabsTrigger>
            <TabsTrigger value="goldcoast">Gold Coast</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <div>
        <span className="text-sm font-medium mr-2">Property Type:</span>
        <Tabs value={propertyTypeFilter} onValueChange={onPropertyTypeFilterChange} className="inline-flex">
          <TabsList>
            <TabsTrigger value="all"><Building className="h-4 w-4 mr-1" />All</TabsTrigger>
            <TabsTrigger value="apartment">Apartments</TabsTrigger>
            <TabsTrigger value="house">Houses</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <Button variant="outline" size="sm" className="gap-1">
        <Filter className="h-4 w-4" /> More Filters
      </Button>
    </div>
  );
};

export default PropertyFilterTabs;
