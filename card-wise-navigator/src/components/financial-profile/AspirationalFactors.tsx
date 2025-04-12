
import React from 'react';
import { Gem, Star, Clock, Award, Shield, CreditCard } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface AspirationalFactorsProps {
  formData: any;
  updateFormData: (data: any) => void;
  updateNestedFormData: (section: string, subsection: string, data: any) => void;
}

const AspirationalFactors: React.FC<AspirationalFactorsProps> = ({
  formData,
  updateFormData,
  updateNestedFormData
}) => {
  const handleRewardPriorityChange = (type: string, value: number) => {
    updateNestedFormData('rewardPreferences', type, value);
  };

  const handlePremiumServiceChange = (service: string, checked: boolean) => {
    let newServices = [...formData.premiumServices];
    
    if (checked) {
      newServices.push(service);
    } else {
      newServices = newServices.filter(item => item !== service);
    }
    
    updateNestedFormData('', 'premiumServices', newServices);
  };

  return (
    <div className="space-y-8">
      {/* Reward Preferences */}
      <div className="space-y-4">
        <Label className="text-lg font-medium flex items-center gap-2">
          <Star className="h-4 w-4 text-blue-500" />
          Reward Preferences
        </Label>
        <div className="text-sm text-muted-foreground mb-4">
          Rank each reward type from 1 (most important) to 5 (least important)
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Cashback on purchases</Label>
              <span className="font-semibold text-blue-600">{formData.rewardPreferences.cashback}</span>
            </div>
            <Slider
              value={[formData.rewardPreferences.cashback]}
              min={1}
              max={5}
              step={1}
              onValueChange={(value) => handleRewardPriorityChange('cashback', value[0])}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground pt-1">
              <span>Most Important</span>
              <span>Least Important</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Travel miles/points</Label>
              <span className="font-semibold text-blue-600">{formData.rewardPreferences.travelMiles}</span>
            </div>
            <Slider
              value={[formData.rewardPreferences.travelMiles]}
              min={1}
              max={5}
              step={1}
              onValueChange={(value) => handleRewardPriorityChange('travelMiles', value[0])}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground pt-1">
              <span>Most Important</span>
              <span>Least Important</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Shopping discounts</Label>
              <span className="font-semibold text-blue-600">{formData.rewardPreferences.shoppingDiscounts}</span>
            </div>
            <Slider
              value={[formData.rewardPreferences.shoppingDiscounts]}
              min={1}
              max={5}
              step={1}
              onValueChange={(value) => handleRewardPriorityChange('shoppingDiscounts', value[0])}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground pt-1">
              <span>Most Important</span>
              <span>Least Important</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Dining benefits</Label>
              <span className="font-semibold text-blue-600">{formData.rewardPreferences.diningBenefits}</span>
            </div>
            <Slider
              value={[formData.rewardPreferences.diningBenefits]}
              min={1}
              max={5}
              step={1}
              onValueChange={(value) => handleRewardPriorityChange('diningBenefits', value[0])}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground pt-1">
              <span>Most Important</span>
              <span>Least Important</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Entertainment perks</Label>
              <span className="font-semibold text-blue-600">{formData.rewardPreferences.entertainmentPerks}</span>
            </div>
            <Slider
              value={[formData.rewardPreferences.entertainmentPerks]}
              min={1}
              max={5}
              step={1}
              onValueChange={(value) => handleRewardPriorityChange('entertainmentPerks', value[0])}
              className="py-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground pt-1">
              <span>Most Important</span>
              <span>Least Important</span>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Services */}
      <div className="space-y-4 pt-4 border-t">
        <Label className="text-lg font-medium flex items-center gap-2">
          <Award className="h-4 w-4 text-blue-500" />
          Premium Services
        </Label>
        <div className="text-sm text-muted-foreground mb-2">
          Select premium services that would enhance your lifestyle
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="airportLounge"
                checked={formData.premiumServices.includes('airportLounge')}
                onCheckedChange={(checked) => {
                  handlePremiumServiceChange('airportLounge', checked === true);
                }}
              />
              <label
                htmlFor="airportLounge"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Airport lounge access
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="conciergeServices"
                checked={formData.premiumServices.includes('conciergeServices')}
                onCheckedChange={(checked) => {
                  handlePremiumServiceChange('conciergeServices', checked === true);
                }}
              />
              <label
                htmlFor="conciergeServices"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Concierge services
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="priorityCheckIn"
                checked={formData.premiumServices.includes('priorityCheckIn')}
                onCheckedChange={(checked) => {
                  handlePremiumServiceChange('priorityCheckIn', checked === true);
                }}
              />
              <label
                htmlFor="priorityCheckIn"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Priority check-in at hotels/airports
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="exclusiveEvents"
                checked={formData.premiumServices.includes('exclusiveEvents')}
                onCheckedChange={(checked) => {
                  handlePremiumServiceChange('exclusiveEvents', checked === true);
                }}
              />
              <label
                htmlFor="exclusiveEvents"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Exclusive event access
              </label>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="chauffeurServices"
                checked={formData.premiumServices.includes('chauffeurServices')}
                onCheckedChange={(checked) => {
                  handlePremiumServiceChange('chauffeurServices', checked === true);
                }}
              />
              <label
                htmlFor="chauffeurServices"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Chauffeur services
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="extendedWarranty"
                checked={formData.premiumServices.includes('extendedWarranty')}
                onCheckedChange={(checked) => {
                  handlePremiumServiceChange('extendedWarranty', checked === true);
                }}
              />
              <label
                htmlFor="extendedWarranty"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Extended warranty on purchases
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="purchaseProtection"
                checked={formData.premiumServices.includes('purchaseProtection')}
                onCheckedChange={(checked) => {
                  handlePremiumServiceChange('purchaseProtection', checked === true);
                }}
              />
              <label
                htmlFor="purchaseProtection"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Purchase protection insurance
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="emergencyAssistance"
                checked={formData.premiumServices.includes('emergencyAssistance')}
                onCheckedChange={(checked) => {
                  handlePremiumServiceChange('emergencyAssistance', checked === true);
                }}
              />
              <label
                htmlFor="emergencyAssistance"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Emergency assistance services
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Fee Tolerance */}
      <div className="space-y-4 pt-4 border-t">
        <Label className="text-lg font-medium flex items-center gap-2">
          <CreditCard className="h-4 w-4 text-blue-500" />
          Fee Tolerance
        </Label>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="maximumFee">Maximum annual fee you would consider (₹)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
              <Input
                type="number"
                id="maximumFee"
                value={formData.feeTolerances.maximumAnnualFee}
                onChange={(e) => updateNestedFormData('feeTolerances', 'maximumAnnualFee', parseInt(e.target.value) || 0)}
                className="pl-8"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="minimumReward">Minimum value of rewards needed to justify fees (₹)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
              <Input
                type="number"
                id="minimumReward"
                value={formData.feeTolerances.minimumRewardValue}
                onChange={(e) => updateNestedFormData('feeTolerances', 'minimumRewardValue', parseInt(e.target.value) || 0)}
                className="pl-8"
              />
            </div>
          </div>
        </div>
        
        <div className="space-y-2 mt-2">
          <Label htmlFor="justifyingFeatures">Features that would justify a higher annual fee</Label>
          <Textarea
            id="justifyingFeatures"
            placeholder="e.g., Lounge access, higher cashback rate, better insurance coverage"
            value={formData.feeTolerances.justifyingFeatures}
            onChange={(e) => updateNestedFormData('feeTolerances', 'justifyingFeatures', e.target.value)}
            className="resize-none"
            rows={3}
          />
        </div>
      </div>

      {/* Card Prestige Importance */}
      <div className="space-y-4 pt-4 border-t">
        <Label className="text-lg font-medium flex items-center gap-2">
          <Gem className="h-4 w-4 text-blue-500" />
          Card Status/Prestige Importance
        </Label>
        
        <RadioGroup 
          value={formData.prestigeImportance}
          onValueChange={(value) => updateNestedFormData('', 'prestigeImportance', value)}
          className="grid gap-3 pt-2"
        >
          <Label
            htmlFor="not-important"
            className="flex flex-col space-y-1 border rounded-lg p-4 cursor-pointer hover:bg-muted transition-colors"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="not" id="not-important" />
              <span className="font-medium">Not important at all</span>
            </div>
            <span className="text-sm text-muted-foreground pl-6">
              I'm only interested in the practical benefits and rewards
            </span>
          </Label>
          
          <Label
            htmlFor="somewhat-important"
            className="flex flex-col space-y-1 border rounded-lg p-4 cursor-pointer hover:bg-muted transition-colors"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="somewhat" id="somewhat-important" />
              <span className="font-medium">Somewhat important</span>
            </div>
            <span className="text-sm text-muted-foreground pl-6">
              I'd like a card with some prestige, but it's not my primary concern
            </span>
          </Label>
          
          <Label
            htmlFor="very-important"
            className="flex flex-col space-y-1 border rounded-lg p-4 cursor-pointer hover:bg-muted transition-colors"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="very" id="very-important" />
              <span className="font-medium">Very important</span>
            </div>
            <span className="text-sm text-muted-foreground pl-6">
              The status associated with the card is a significant factor for me
            </span>
          </Label>
          
          <Label
            htmlFor="essential"
            className="flex flex-col space-y-1 border rounded-lg p-4 cursor-pointer hover:bg-muted transition-colors"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="essential" id="essential" />
              <span className="font-medium">Essential</span>
            </div>
            <span className="text-sm text-muted-foreground pl-6">
              I'm primarily looking for a premium/prestige card
            </span>
          </Label>
        </RadioGroup>
      </div>
    </div>
  );
};

export default AspirationalFactors;
