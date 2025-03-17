
import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import PropertySearchForm from '@/components/premium-dashboard/PropertySearchForm';
import PropertyListing from '@/components/premium-dashboard/PropertyListing';
import { sampleProperties } from '@/data/sampleProperties';

const PropertySearch = () => {
  const { user } = useAuth();
  const [areaFilter, setAreaFilter] = useState('all');
  const [propertyTypeFilter, setPropertyTypeFilter] = useState('all');
  
  // Filter properties based on current filters
  const filteredProperties = sampleProperties.filter(property => {
    const matchesArea = areaFilter === 'all' || property.area === areaFilter;
    const matchesType = propertyTypeFilter === 'all' || property.type === propertyTypeFilter;
    return matchesArea && matchesType;
  });

  return (
    <DashboardLayout isPremium={true} userName={user?.name || "User"} progressPercentage={user?.progressPercentage || 65}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Property Search</h1>
        <p className="text-muted-foreground">Find your ideal home in Australia with our personalized property matching system. Our AI scans thousands of listings daily to help you whether you're moving within Australia or arriving from overseas.</p>
        
        <PropertySearchForm 
          areaFilter={areaFilter}
          propertyTypeFilter={propertyTypeFilter}
          onAreaFilterChange={setAreaFilter}
          onPropertyTypeFilterChange={setPropertyTypeFilter}
        />
        
        <PropertyListing properties={filteredProperties} />
      </div>
    </DashboardLayout>
  );
};

export default PropertySearch;
