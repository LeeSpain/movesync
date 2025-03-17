
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';

interface FilterControlsProps {
  selectedCountry: string;
  setSelectedCountry: React.Dispatch<React.SetStateAction<string>>;
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  countries: string[];
}

const FilterControls = ({
  selectedCountry,
  setSelectedCountry,
  searchTerm,
  setSearchTerm,
  countries
}: FilterControlsProps) => {
  return (
    <div className="flex space-x-4 items-center mb-6">
      <Select value={selectedCountry} onValueChange={setSelectedCountry}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Country" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="All Countries">All Countries</SelectItem>
          {countries.map((country) => (
            <SelectItem key={country} value={country}>{country}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        placeholder="Search by city or country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />
    </div>
  );
};

export default FilterControls;
