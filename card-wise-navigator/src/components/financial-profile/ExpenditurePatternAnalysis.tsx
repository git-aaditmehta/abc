
import React from 'react';
import { ShoppingCart, Utensils, Car, Globe, Lightbulb, Film, Plane, Heart, CalendarDays } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';

interface ExpenditurePatternAnalysisProps {
  formData: any;
  updateFormData: (section: string, data: any) => void;
  updateNestedFormData: (section: string, subsection: string, data: any) => void;
}

const ExpenditurePatternAnalysis: React.FC<ExpenditurePatternAnalysisProps> = ({
  formData,
  updateFormData,
  updateNestedFormData
}) => {
  const spendingCategories = [
    { name: 'groceries', icon: <ShoppingCart className="h-4 w-4" />, label: 'Groceries' },
    { name: 'diningOut', icon: <Utensils className="h-4 w-4" />, label: 'Dining Out' },
    { name: 'fuelTransportation', icon: <Car className="h-4 w-4" />, label: 'Fuel/Transportation' },
    { name: 'onlineShopping', icon: <Globe className="h-4 w-4" />, label: 'Online Shopping' },
    { name: 'utilities', icon: <Lightbulb className="h-4 w-4" />, label: 'Utilities' },
    { name: 'entertainment', icon: <Film className="h-4 w-4" />, label: 'Entertainment' },
    { name: 'travel', icon: <Plane className="h-4 w-4" />, label: 'Travel' },
    { name: 'healthcare', icon: <Heart className="h-4 w-4" />, label: 'Healthcare' },
    { name: 'other', icon: <ShoppingCart className="h-4 w-4" />, label: 'Other Categories' }
  ];

  return (
    <div className="space-y-8">
      {/* Monthly Spending */}
      <div className="space-y-4">
        <Label className="text-lg font-medium">
          Monthly Spending by Category
        </Label>
        <div className="text-sm text-muted-foreground mb-4">
          Please provide your average monthly spending in these categories
        </div>

        <div className="space-y-6">
          {spendingCategories.map((category) => (
            <div key={category.name} className="space-y-2">
              <Label className="flex items-center gap-2">
                <div className="text-blue-500">{category.icon}</div>
                {category.label}
                <span className="ml-auto font-semibold">
                  ₹{formData.monthlySpending[category.name]}
                </span>
              </Label>
              <Slider
                value={[formData.monthlySpending[category.name]]}
                min={0}
                max={50000}
                step={500}
                onValueChange={(value) => updateFormData(category.name, value[0])}
                className="py-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground pt-1">
                <span>₹0</span>
                <span>₹50,000+</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transaction Frequency */}
      <div className="space-y-4 pt-4 border-t">
        <Label className="text-lg font-medium flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-blue-500" />
          Transaction Frequency
        </Label>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="weeklyTransactions">Average transactions per week</Label>
            <Input
              type="number"
              id="weeklyTransactions"
              value={formData.transactionFrequency.weeklyTransactions}
              onChange={(e) => updateNestedFormData('transactionFrequency', 'weeklyTransactions', parseInt(e.target.value) || 0)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="averageValue">Average transaction value (₹)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
              <Input
                type="number"
                id="averageValue"
                value={formData.transactionFrequency.averageTransactionValue}
                onChange={(e) => updateNestedFormData('transactionFrequency', 'averageTransactionValue', parseInt(e.target.value) || 0)}
                className="pl-8"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="largestExpense">Largest recurring monthly expense (₹)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
              <Input
                type="number"
                id="largestExpense"
                value={formData.transactionFrequency.largestRecurringExpense}
                onChange={(e) => updateNestedFormData('transactionFrequency', 'largestRecurringExpense', parseInt(e.target.value) || 0)}
                className="pl-8"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Seasonal Spending */}
      <div className="space-y-4 pt-4 border-t">
        <Label className="text-lg font-medium flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-blue-500" />
          Seasonal Spending Patterns
        </Label>
        
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label htmlFor="highestSpendingMonths">Months with highest spending</Label>
            <Input
              type="text"
              id="highestSpendingMonths"
              placeholder="e.g., November, December, May"
              value={formData.seasonalSpending.highestSpendingMonths}
              onChange={(e) => updateNestedFormData('seasonalSpending', 'highestSpendingMonths', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="seasonalCategories">Categories with seasonal variation</Label>
            <Input
              type="text"
              id="seasonalCategories"
              placeholder="e.g., Travel in summer, Shopping in December"
              value={formData.seasonalSpending.seasonalCategories}
              onChange={(e) => updateNestedFormData('seasonalSpending', 'seasonalCategories', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="annualPurchases">Annual large purchases (specify)</Label>
            <Textarea
              id="annualPurchases"
              placeholder="e.g., Electronics in January, Furniture in March"
              value={formData.seasonalSpending.annualLargePurchases}
              onChange={(e) => updateNestedFormData('seasonalSpending', 'annualLargePurchases', e.target.value)}
              className="resize-none"
              rows={3}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenditurePatternAnalysis;
