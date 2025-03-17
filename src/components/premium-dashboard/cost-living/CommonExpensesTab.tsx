
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface ExpenseItem {
  name: string;
  value: string;
}

interface CommonExpensesTabProps {
  expensesList: ExpenseItem[];
}

const CommonExpensesTab = ({ expensesList }: CommonExpensesTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Common Expenses in Australia</CardTitle>
        <CardDescription>Average prices for everyday items and services</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {expensesList.map((expense, index) => (
            <div key={index} className="flex flex-col p-3 border rounded-lg">
              <span className="text-sm font-medium">{expense.name}</span>
              <span className="text-lg font-bold mt-1">{expense.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          <Download className="h-4 w-4 mr-2" /> Download Full Price List
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CommonExpensesTab;
