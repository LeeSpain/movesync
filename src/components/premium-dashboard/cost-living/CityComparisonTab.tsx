
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// City data types
type CityExpenses = {
  housing: number;
  groceries: number;
  dining: number;
  transport: number;
  utilities: number;
  internet: number;
  other: number;
};

type CityDataType = {
  [key: string]: CityExpenses;
};

interface CityComparisonTabProps {
  cityData: CityDataType;
}

const CityComparisonTab = ({ cityData }: CityComparisonTabProps) => {
  const [selectedCity, setSelectedCity] = useState('sydney');
  const [comparisonCity, setComparisonCity] = useState('melbourne');
  
  // Get selected city data
  const cityExpenses = cityData[selectedCity];
  
  // Comparison data for bar chart
  const comparisonData = comparisonCity && comparisonCity !== "none" ? 
    Object.entries(cityData[comparisonCity as keyof typeof cityData]).map(([key, value]) => {
      return {
        name: key.charAt(0).toUpperCase() + key.slice(1),
        [selectedCity]: cityExpenses[key as keyof typeof cityExpenses],
        [comparisonCity]: value,
      };
    }) : [];

  return (
    <Card>
      <CardHeader>
        <CardTitle>City Comparison</CardTitle>
        <CardDescription>Compare costs between cities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <label className="text-sm font-medium block mb-2">Compare with:</label>
          <Select value={comparisonCity} onValueChange={setComparisonCity}>
            <SelectTrigger>
              <SelectValue placeholder="Select a city to compare" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              {Object.keys(cityData).filter(city => city !== selectedCity).map(city => (
                <SelectItem key={city} value={city}>
                  {city.charAt(0).toUpperCase() + city.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {comparisonCity && comparisonCity !== "none" && (
          <div className="mt-6">
            <h4 className="text-sm font-medium mb-2">Cost Comparison</h4>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={comparisonData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{fontSize: 12}} />
                <YAxis tick={{fontSize: 12}} />
                <Tooltip formatter={(value) => `$${value}`} />
                <Legend />
                <Bar 
                  dataKey={selectedCity} 
                  fill="#4F46E5" 
                  name={selectedCity.charAt(0).toUpperCase() + selectedCity.slice(1)} 
                />
                <Bar 
                  dataKey={comparisonCity} 
                  fill="#FF8042" 
                  name={comparisonCity.charAt(0).toUpperCase() + comparisonCity.slice(1)} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CityComparisonTab;
