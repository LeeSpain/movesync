
import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';

interface LocationsTableProps {
  displayData: any[];
  handleEdit: (entry: any) => void;
  handleDelete: (id: number) => void;
  getTotalCost: (entry: any) => number;
}

const LocationsTable = ({ 
  displayData, 
  handleEdit, 
  handleDelete, 
  getTotalCost 
}: LocationsTableProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cost of Living Data by Location</CardTitle>
        <CardDescription>
          Manage all location data and make updates when needed
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>City</TableHead>
              <TableHead>Country</TableHead>
              <TableHead>Housing</TableHead>
              <TableHead>Utilities</TableHead>
              <TableHead>Food</TableHead>
              <TableHead>Transport</TableHead>
              <TableHead>Healthcare</TableHead>
              <TableHead>Entertainment</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayData.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell className="font-medium">{entry.city}</TableCell>
                <TableCell>{entry.country}</TableCell>
                <TableCell>${entry.housing}</TableCell>
                <TableCell>${entry.utilities}</TableCell>
                <TableCell>${entry.food}</TableCell>
                <TableCell>${entry.transport}</TableCell>
                <TableCell>${entry.healthcare}</TableCell>
                <TableCell>${entry.entertainment}</TableCell>
                <TableCell className="font-bold">${getTotalCost(entry)}</TableCell>
                <TableCell>{entry.lastUpdated}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="icon" onClick={() => handleEdit(entry)}>
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                    </Dialog>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => handleDelete(entry.id)}
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default LocationsTable;
