
import React from 'react';
import { DialogHeader, DialogContent, DialogDescription, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface AddLocationFormProps {
  newEntry: any;
  setNewEntry: React.Dispatch<React.SetStateAction<any>>;
  handleAddEntry: () => void;
}

const AddLocationForm = ({ 
  newEntry, 
  setNewEntry, 
  handleAddEntry 
}: AddLocationFormProps) => {
  return (
    <>
      <DialogHeader>
        <DialogTitle>Add New Cost of Living Data</DialogTitle>
        <DialogDescription>
          Enter details for a new location's cost of living.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="city">City</label>
            <Input 
              id="city" 
              value={newEntry.city} 
              onChange={(e) => setNewEntry({...newEntry, city: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="country">Country</label>
            <Input 
              id="country" 
              value={newEntry.country} 
              onChange={(e) => setNewEntry({...newEntry, country: e.target.value})}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="housing">Housing (Monthly)</label>
            <Input 
              id="housing" 
              type="number" 
              value={newEntry.housing.toString()} 
              onChange={(e) => setNewEntry({...newEntry, housing: Number(e.target.value)})}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="utilities">Utilities (Monthly)</label>
            <Input 
              id="utilities" 
              type="number" 
              value={newEntry.utilities.toString()} 
              onChange={(e) => setNewEntry({...newEntry, utilities: Number(e.target.value)})}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="food">Food (Monthly)</label>
            <Input 
              id="food" 
              type="number" 
              value={newEntry.food.toString()} 
              onChange={(e) => setNewEntry({...newEntry, food: Number(e.target.value)})}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="transport">Transport (Monthly)</label>
            <Input 
              id="transport" 
              type="number" 
              value={newEntry.transport.toString()} 
              onChange={(e) => setNewEntry({...newEntry, transport: Number(e.target.value)})}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="healthcare">Healthcare (Monthly)</label>
            <Input 
              id="healthcare" 
              type="number" 
              value={newEntry.healthcare.toString()} 
              onChange={(e) => setNewEntry({...newEntry, healthcare: Number(e.target.value)})}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="entertainment">Entertainment (Monthly)</label>
            <Input 
              id="entertainment" 
              type="number" 
              value={newEntry.entertainment.toString()} 
              onChange={(e) => setNewEntry({...newEntry, entertainment: Number(e.target.value)})}
            />
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" onClick={handleAddEntry}>Add Location</Button>
      </DialogFooter>
    </>
  );
};

export default AddLocationForm;
