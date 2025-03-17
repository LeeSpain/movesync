
import { Property } from './PropertyCard';
import PropertyCard from './PropertyCard';

interface PropertyListingProps {
  properties: Property[];
}

const PropertyListing = ({ properties }: PropertyListingProps) => {
  return (
    <>
      <h2 className="text-xl font-semibold mt-8 mb-4">Available Properties ({properties.length})</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map(property => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </>
  );
};

export default PropertyListing;
