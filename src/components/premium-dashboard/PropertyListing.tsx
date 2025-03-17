
import { Property } from './PropertyCard';
import PropertyCard from './PropertyCard';

interface PropertyListingProps {
  properties: Property[];
}

const PropertyListing = ({ properties }: PropertyListingProps) => {
  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <div>
          <h2 className="text-xl font-semibold">Available Properties ({properties.length})</h2>
          <p className="text-sm text-muted-foreground">
            AI-curated listings updated daily from across the web
          </p>
        </div>
        <p className="text-sm text-muted-foreground mt-1 sm:mt-0">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </>
  );
};

export default PropertyListing;
