
import React from 'react';
import { Plane, ShoppingBag, Utensils, Dumbbell, Car, GraduationCap, CalendarDays } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';

interface LifestyleIndicatorsProps {
  formData: any;
  updateFormData: (data: any) => void;
  updateNestedFormData: (section: string, subsection: string, data: any) => void;
}

const LifestyleIndicators: React.FC<LifestyleIndicatorsProps> = ({
  formData,
  updateFormData,
  updateNestedFormData
}) => {
  const handleActivityChange = (activity: string, checked: boolean) => {
    let newActivities = [...formData.lifestyleActivities];
    
    if (checked) {
      newActivities.push(activity);
    } else {
      newActivities = newActivities.filter(item => item !== activity);
    }
    
    updateNestedFormData('', 'lifestyleActivities', newActivities);
  };

  return (
    <div className="space-y-8">
      {/* Travel Frequency */}
      <div className="space-y-4">
        <Label className="text-lg font-medium flex items-center gap-2">
          <Plane className="h-4 w-4 text-blue-500" />
          Travel Frequency
        </Label>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="domesticTrips">Domestic trips per year</Label>
            <Input
              type="number"
              id="domesticTrips"
              value={formData.travelFrequency.domesticTrips}
              onChange={(e) => updateNestedFormData('travelFrequency', 'domesticTrips', parseInt(e.target.value) || 0)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="internationalTrips">International trips per year</Label>
            <Input
              type="number"
              id="internationalTrips"
              value={formData.travelFrequency.internationalTrips}
              onChange={(e) => updateNestedFormData('travelFrequency', 'internationalTrips', parseInt(e.target.value) || 0)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="travelSpending">Average spending per trip (₹)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
              <Input
                type="number"
                id="travelSpending"
                value={formData.travelFrequency.averageSpending}
                onChange={(e) => updateNestedFormData('travelFrequency', 'averageSpending', parseInt(e.target.value) || 0)}
                className="pl-8"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="accommodationPreferences">Typical accommodation preferences</Label>
            <Input
              type="text"
              id="accommodationPreferences"
              placeholder="e.g., Luxury hotels, Budget stays, Airbnb"
              value={formData.travelFrequency.accommodationPreferences}
              onChange={(e) => updateNestedFormData('travelFrequency', 'accommodationPreferences', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Shopping Preferences */}
      <div className="space-y-4 pt-4 border-t">
        <Label className="text-lg font-medium flex items-center gap-2">
          <ShoppingBag className="h-4 w-4 text-blue-500" />
          Shopping Preferences
        </Label>
        
        <div className="grid grid-cols-1 gap-4">
          <div className="space-y-2">
            <Label>Preferred shopping channels (online vs. in-store)</Label>
            <div className="flex items-center gap-4">
              <Slider
                value={[formData.shoppingPreferences.onlinePercentage]}
                min={0}
                max={100}
                step={5}
                onValueChange={(value) => updateNestedFormData('shoppingPreferences', 'onlinePercentage', value[0])}
                className="flex-grow"
              />
              <div className="w-16 font-medium text-blue-600 text-right">
                {formData.shoppingPreferences.onlinePercentage}% online
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="favoriteRetailers">Favorite retailers/websites</Label>
            <Input
              type="text"
              id="favoriteRetailers"
              placeholder="e.g., Amazon, Myntra, Flipkart"
              value={formData.shoppingPreferences.favoriteRetailers}
              onChange={(e) => updateNestedFormData('shoppingPreferences', 'favoriteRetailers', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="discretionarySpending">Average monthly discretionary spending (₹)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
              <Input
                type="number"
                id="discretionarySpending"
                value={formData.shoppingPreferences.discretionarySpending}
                onChange={(e) => updateNestedFormData('shoppingPreferences', 'discretionarySpending', parseInt(e.target.value) || 0)}
                className="pl-8"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="topCategories">Shopping categories you spend most on</Label>
            <Input
              type="text"
              id="topCategories"
              placeholder="e.g., Electronics, Clothing, Home decor"
              value={formData.shoppingPreferences.topCategories}
              onChange={(e) => updateNestedFormData('shoppingPreferences', 'topCategories', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Lifestyle Activities */}
      <div className="space-y-4 pt-4 border-t">
        <Label className="text-lg font-medium flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-blue-500" />
          Lifestyle Activities
        </Label>
        <div className="text-sm text-muted-foreground mb-2">
          Select all activities that you engage in regularly
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="fineDining"
                checked={formData.lifestyleActivities.includes('fineDining')}
                onCheckedChange={(checked) => {
                  handleActivityChange('fineDining', checked === true);
                }}
              />
              <label
                htmlFor="fineDining"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
              >
                <Utensils className="h-4 w-4 mr-1 text-blue-500" />
                Fine dining
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="entertainment"
                checked={formData.lifestyleActivities.includes('entertainment')}
                onCheckedChange={(checked) => {
                  handleActivityChange('entertainment', checked === true);
                }}
              />
              <label
                htmlFor="entertainment"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
              >
                <CalendarDays className="h-4 w-4 mr-1 text-blue-500" />
                Entertainment events (concerts, sports)
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="fitness"
                checked={formData.lifestyleActivities.includes('fitness')}
                onCheckedChange={(checked) => {
                  handleActivityChange('fitness', checked === true);
                }}
              />
              <label
                htmlFor="fitness"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
              >
                <Dumbbell className="h-4 w-4 mr-1 text-blue-500" />
                Fitness/wellness activities
              </label>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="luxuryShopping"
                checked={formData.lifestyleActivities.includes('luxuryShopping')}
                onCheckedChange={(checked) => {
                  handleActivityChange('luxuryShopping', checked === true);
                }}
              />
              <label
                htmlFor="luxuryShopping"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
              >
                <ShoppingBag className="h-4 w-4 mr-1 text-blue-500" />
                Shopping at luxury retailers
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="frequentFuel"
                checked={formData.lifestyleActivities.includes('frequentFuel')}
                onCheckedChange={(checked) => {
                  handleActivityChange('frequentFuel', checked === true);
                }}
              />
              <label
                htmlFor="frequentFuel"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
              >
                <Car className="h-4 w-4 mr-1 text-blue-500" />
                Frequent fuel purchases
              </label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="education"
                checked={formData.lifestyleActivities.includes('education')}
                onCheckedChange={(checked) => {
                  handleActivityChange('education', checked === true);
                }}
              />
              <label
                htmlFor="education"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center"
              >
                <GraduationCap className="h-4 w-4 mr-1 text-blue-500" />
                Educational pursuits
              </label>
            </div>
          </div>
        </div>
        
        <div className="space-y-2 mt-4">
          <Label htmlFor="otherActivities">Other significant lifestyle activities</Label>
          <Input
            type="text"
            id="otherActivities"
            placeholder="Please specify any other regular activities"
            value={formData.customActivities}
            onChange={(e) => updateNestedFormData('', 'customActivities', e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default LifestyleIndicators;
