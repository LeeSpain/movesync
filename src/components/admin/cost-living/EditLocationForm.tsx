
import React from 'react';
import { DialogHeader, DialogContent, DialogDescription, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface EditLocationFormProps {
  editingEntry: any;
  setEditingEntry: React.Dispatch<React.SetStateAction<any>>;
  handleSaveEdit: () => void;
}

const EditLocationForm = ({ 
  editingEntry, 
  setEditingEntry, 
  handleSaveEdit 
}: EditLocationFormProps) => {
  if (!editingEntry) return null;
  
  return (
    <>
      <DialogHeader>
        <DialogTitle>Edit Cost of Living Data</DialogTitle>
        <DialogDescription>
          Update the cost of living information for {editingEntry.city}, {editingEntry.country}.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="edit-city">City</label>
            <Input 
              id="edit-city" 
              value={editingEntry.city} 
              onChange={(e) => setEditingEntry({...editingEntry, city: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="edit-country">Country</label>
            <Input 
              id="edit-country" 
              value={editingEntry.country} 
              onChange={(e) => setEditingEntry({...editingEntry, country: e.target.value})}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="edit-housing">Housing (Monthly)</label>
            <Input 
              id="edit-housing" 
              type="number" 
              value={editingEntry.housing.toString()} 
              onChange={(e) => setEditingEntry({...editingEntry, housing: Number(e.target.value)})}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="edit-utilities">Utilities (Monthly)</label>
            <Input 
              id="edit-utilities" 
              type="number" 
              value={editingEntry.utilities.toString()} 
              onChange={(e) => setEditingEntry({...editingEntry, utilities: Number(e.target.value)})}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="edit-food">Food (Monthly)</label>
            <Input 
              id="edit-food" 
              type="number" 
              value={editingEntry.food.toString()} 
              onChange={(e) => setEditingEntry({...editingEntry, food: Number(e.target.value)})}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="edit-transport">Transport (Monthly)</label>
            <Input 
              id="edit-transport" 
              type="number" 
              value={editingEntry.transport.toString()} 
              onChange={(e) => setEditingEntry({...editingEntry, transport: Number(e.target.value)})}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="edit-healthcare">Healthcare (Monthly)</label>
            <Input 
              id="edit-healthcare" 
              type="number" 
              value={editingEntry.healthcare.toString()} 
              onChange={(e) => setEditingEntry({...editingEntry, healthcare: Number(e.target.value)})}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="edit-entertainment">Entertainment (Monthly)</label>
            <Input 
              id="edit-entertainment" 
              type="number" 
              value={editingEntry.entertainment.toString()} 
              onChange={(e) => setEditingEntry({...editingEntry, entertainment: Number(e.target.value)})}
            />
          </div>
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" onClick={handleSaveEdit}>Save Changes</Button>
      </DialogFooter>
    </>
  );
};

export default EditLocationForm;
