
import React from 'react';
import { CreditCard, Percent, ListChecks } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';

interface BehavioralMetricsProps {
  formData: any;
  updateFormData: (data: any) => void;
  updateNestedFormData: (section: string, subsection: string, data: any) => void;
}

const BehavioralMetrics: React.FC<BehavioralMetricsProps> = ({
  formData,
  updateFormData,
  updateNestedFormData
}) => {
  return (
    <div className="space-y-8">
      {/* Payment Habits */}
      <div className="space-y-4">
        <Label className="text-lg font-medium flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-blue-500" />
          Credit Card Payment Habits
        </Label>
        
        <RadioGroup 
          value={formData.paymentHabits}
          onValueChange={(value) => updateFormData({ paymentHabits: value })}
          className="grid gap-3 pt-2"
        >
          <Label
            htmlFor="fullBalance"
            className="flex flex-col space-y-1 border rounded-lg p-4 cursor-pointer hover:bg-muted transition-colors"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="fullBalance" id="fullBalance" />
              <span className="font-medium">Full Balance Payment</span>
            </div>
            <span className="text-sm text-muted-foreground pl-6">
              I always pay the full balance before the due date
            </span>
          </Label>
          
          <Label
            htmlFor="partialBalance"
            className="flex flex-col space-y-1 border rounded-lg p-4 cursor-pointer hover:bg-muted transition-colors"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="partialBalance" id="partialBalance" />
              <span className="font-medium">Partial Balance Payment</span>
            </div>
            <span className="text-sm text-muted-foreground pl-6">
              I typically pay more than the minimum but less than the full amount
            </span>
          </Label>
          
          <Label
            htmlFor="minimumPayment"
            className="flex flex-col space-y-1 border rounded-lg p-4 cursor-pointer hover:bg-muted transition-colors"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="minimumPayment" id="minimumPayment" />
              <span className="font-medium">Minimum Payment</span>
            </div>
            <span className="text-sm text-muted-foreground pl-6">
              I usually make only minimum payments
            </span>
          </Label>
          
          <Label
            htmlFor="variablePayment"
            className="flex flex-col space-y-1 border rounded-lg p-4 cursor-pointer hover:bg-muted transition-colors"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="variablePayment" id="variablePayment" />
              <span className="font-medium">Variable Payment</span>
            </div>
            <span className="text-sm text-muted-foreground pl-6">
              My payment pattern varies month to month
            </span>
          </Label>
        </RadioGroup>
      </div>

      {/* Card Usage Intensity */}
      <div className="space-y-4 pt-4 border-t">
        <Label className="text-lg font-medium flex items-center gap-2">
          <Percent className="h-4 w-4 text-blue-500" />
          Card Usage Intensity
        </Label>
        
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <Label>Percentage of monthly spending on credit cards</Label>
            <div className="flex items-center gap-4">
              <Slider
                value={[formData.cardUsage.monthlySpendingPercentage]}
                min={0}
                max={100}
                step={5}
                onValueChange={(value) => updateNestedFormData('cardUsage', 'monthlySpendingPercentage', value[0])}
                className="flex-grow"
              />
              <div className="w-16 font-medium text-blue-600 text-right">
                {formData.cardUsage.monthlySpendingPercentage}%
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="activeCards">Number of credit cards actively used</Label>
            <Input
              type="number"
              id="activeCards"
              value={formData.cardUsage.activeCards}
              onChange={(e) => updateNestedFormData('cardUsage', 'activeCards', parseInt(e.target.value) || 0)}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Primary card usage as percentage of total card spending</Label>
            <div className="flex items-center gap-4">
              <Slider
                value={[formData.cardUsage.primaryCardPercentage]}
                min={0}
                max={100}
                step={5}
                onValueChange={(value) => updateNestedFormData('cardUsage', 'primaryCardPercentage', value[0])}
                className="flex-grow"
              />
              <div className="w-16 font-medium text-blue-600 text-right">
                {formData.cardUsage.primaryCardPercentage}%
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Preferred Payment Methods */}
      <div className="space-y-4 pt-4 border-t">
        <Label className="text-lg font-medium flex items-center gap-2">
          <ListChecks className="h-4 w-4 text-blue-500" />
          Preferred Payment Methods
        </Label>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="everydayPurchases">Everyday small purchases</Label>
            <Input
              type="text"
              id="everydayPurchases"
              placeholder="e.g., Credit card, UPI, Cash"
              value={formData.preferredPaymentMethods.everydayPurchases}
              onChange={(e) => updateNestedFormData('preferredPaymentMethods', 'everydayPurchases', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="largePurchases">Large purchases</Label>
            <Input
              type="text"
              id="largePurchases"
              placeholder="e.g., Credit card, Debit card"
              value={formData.preferredPaymentMethods.largePurchases}
              onChange={(e) => updateNestedFormData('preferredPaymentMethods', 'largePurchases', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="onlineTransactions">Online transactions</Label>
            <Input
              type="text"
              id="onlineTransactions"
              placeholder="e.g., Credit card, UPI, Wallets"
              value={formData.preferredPaymentMethods.onlineTransactions}
              onChange={(e) => updateNestedFormData('preferredPaymentMethods', 'onlineTransactions', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="recurringBills">Recurring bills and subscriptions</Label>
            <Input
              type="text"
              id="recurringBills"
              placeholder="e.g., Auto-debit, Credit card"
              value={formData.preferredPaymentMethods.recurringBills}
              onChange={(e) => updateNestedFormData('preferredPaymentMethods', 'recurringBills', e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BehavioralMetrics;
