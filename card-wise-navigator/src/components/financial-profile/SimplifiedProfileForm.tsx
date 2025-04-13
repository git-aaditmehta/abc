import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/components/ui/use-toast';
import { ChevronRight, ChevronLeft, IndianRupee, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ProfileFormProps {
  onSubmit?: (data: any) => void;
}

const SimplifiedProfileForm: React.FC<ProfileFormProps> = ({ onSubmit }) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const totalSteps = 3;
  const [errors, setErrors] = useState<string[]>([]);
  const formRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    annual_income: '',
    credit_score_range: '',
    monthly_spending: {
      Groceries: '',
      'Dining out': '',
      'Fuel/transportation': '',
      'Online shopping': '',
      Utilities: '',
      Entertainment: '',
      Travel: ''
    },
    reward_preferences: {
      'Cashback on purchases': '',
      'Travel miles/points': '',
      'Shopping discounts': '',
      'Dining benefits': '',
      'Fuel benefits': ''
    },
    max_annual_fee: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile data submitted:", formData);
    
    if (onSubmit) {
      onSubmit(formData);
    }
    
    toast({
      title: "Profile created!",
      description: "Your financial profile has been saved successfully.",
      duration: 3000,
    });
  };

  const validateCurrentStep = (): boolean => {
    const newErrors: string[] = [];
    
    if (step === 1) {
      if (!formData.annual_income || parseInt(formData.annual_income.toString()) <= 0) {
        newErrors.push("Please enter a valid annual income");
      }
      if (!formData.credit_score_range) {
        newErrors.push("Please select your credit score range");
      }
    } 
    else if (step === 2) {
      let emptyCategories: string[] = [];
      
      Object.entries(formData.monthly_spending).forEach(([category, value]) => {
        if (!value || parseInt(value.toString()) <= 0) {
          emptyCategories.push(category);
        }
      });
      
      if (emptyCategories.length > 0) {
        newErrors.push(`Please enter spending amounts for: ${emptyCategories.join(', ')}`);
      }
    }
    else if (step === 3) {
      let emptyPreferences: string[] = [];
      
      Object.entries(formData.reward_preferences).forEach(([preference, value]) => {
        if (!value || parseInt(value.toString()) <= 0) {
          emptyPreferences.push(preference);
        }
      });
      
      if (emptyPreferences.length > 0) {
        newErrors.push(`Please rank the following reward preferences: ${emptyPreferences.join(', ')}`);
      }
      
      if (!formData.max_annual_fee) {
        newErrors.push("Please enter the maximum annual fee you're willing to pay");
      } else if (parseInt(formData.max_annual_fee.toString()) < 0) {
        newErrors.push("Annual fee cannot be negative");
      }
    }
    
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const nextStep = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default to avoid page scrolling
    
    if (validateCurrentStep()) {
      if (step < totalSteps) {
        setStep(step + 1);
        setErrors([]);
        // Keep the scroll position
        if (formRef.current) {
          setTimeout(() => {
            formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        }
      } else {
        handleSubmit(new Event('submit') as unknown as React.FormEvent);
      }
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      setErrors([]);
    }
  };

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateSpendingCategory = (category: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      monthly_spending: {
        ...prev.monthly_spending,
        [category]: value
      }
    }));
  };

  const updateRewardPreference = (reward: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      reward_preferences: {
        ...prev.reward_preferences,
        [reward]: value
      }
    }));
  };

  const categories = [
    "Groceries",
    "Dining out",
    "Fuel/transportation",
    "Online shopping",
    "Utilities",
    "Entertainment",
    "Travel"
  ];

  const rewards = [
    "Cashback on purchases",
    "Travel miles/points",
    "Shopping discounts",
    "Dining benefits",
    "Fuel benefits"
  ];

  return (
    <section id="profile" className="py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto" ref={formRef}>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-700">Create Your Financial Profile</h2>
            <p className="text-foreground/70 text-lg">
              Help us understand your financial situation to provide personalized credit card recommendations
            </p>
          </div>

          {/* Progress Bar */}
          <div className="relative mb-12">
            <div className="flex justify-between items-center relative z-10">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 
                      ${step >= i ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}
                  >
                    {i}
                  </div>
                  <div className={`text-sm ${step >= i ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                    {i === 1 ? 'Basic Info' : i === 2 ? 'Spending Habits' : 'Preferences'}
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-200">
              <div 
                className="h-full bg-blue-600 transition-all duration-300"
                style={{ width: `${((step - 1) / 2) * 100}%` }}
              ></div>
            </div>
          </div>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-blue-700">
                {step === 1 ? 'Basic Financial Information' : 
                 step === 2 ? 'Monthly Spending' :
                 'Reward Preferences'}
              </CardTitle>
              <CardDescription>
                {step === 1 ? 'Tell us about your income and credit score' : 
                 step === 2 ? 'Help us understand your monthly spending patterns' :
                 'Share your reward preferences and fee tolerance'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {errors.length > 0 && (
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <ul className="list-disc pl-5">
                      {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
              
              <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                {/* Step 1: Annual Income and Credit Score */}
                {step === 1 && (
                  <>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="annual_income">
                          What is your annual income? *
                        </Label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                            <IndianRupee className="h-4 w-4" />
                          </span>
                          <Input
                            id="annual_income"
                            type="number"
                            value={formData.annual_income}
                            onChange={(e) => updateFormData('annual_income', e.target.value)}
                            className="pl-9"
                            placeholder="Enter your annual income"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-2 pt-4">
                        <Label htmlFor="credit_score_range">
                          What is your credit score range? *
                        </Label>
                        <Select
                          value={formData.credit_score_range}
                          onValueChange={(value) => updateFormData('credit_score_range', value)}
                          required
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Please select your credit score range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="300-600">300-600</SelectItem>
                            <SelectItem value="601-650">601-650</SelectItem>
                            <SelectItem value="651-700">651-700</SelectItem>
                            <SelectItem value="701-750">701-750</SelectItem>
                            <SelectItem value="751-800">751-800</SelectItem>
                            <SelectItem value="801-900">801-900</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </>
                )}

                {/* Step 2: Monthly Spending */}
                {step === 2 && (
                  <div className="space-y-6">
                    <p className="text-sm text-muted-foreground mb-2">
                      Please enter your monthly spending in all categories (in INR) *
                    </p>
                    
                    {categories.map((category) => (
                      <div key={category} className="space-y-2">
                        <div className="flex justify-between">
                          <Label>{category}</Label>
                          <span className="font-medium">
                            ₹{formData.monthly_spending[category] ? parseInt(formData.monthly_spending[category].toString()).toLocaleString() : '0'}
                          </span>
                        </div>
                        <Slider
                          value={[formData.monthly_spending[category] ? parseInt(formData.monthly_spending[category].toString()) : 0]}
                          min={0}
                          max={50000}
                          step={1000}
                          onValueChange={(value) => updateSpendingCategory(category, value[0])}
                        />
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>₹0</span>
                          <span>₹50,000</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Step 3: Reward Preferences and Annual Fee */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <p className="mb-4 font-medium">
                        Rank all your preferred rewards (1 being most preferred, 5 being least): *
                      </p>
                      
                      {rewards.map((reward) => (
                        <div key={reward} className="mb-6 space-y-2">
                          <div className="flex justify-between">
                            <Label>{reward}</Label>
                            <span className="font-medium">
                              {formData.reward_preferences[reward] || '-'}
                            </span>
                          </div>
                          <Slider
                            value={[formData.reward_preferences[reward] ? parseInt(formData.reward_preferences[reward].toString()) : 1]}
                            min={1}
                            max={5}
                            step={1}
                            onValueChange={(value) => updateRewardPreference(reward, value[0])}
                          />
                          <div className="flex justify-between text-xs text-muted-foreground">
                            <span>Most Preferred (1)</span>
                            <span>Least Preferred (5)</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-2 pt-6 border-t">
                      <Label htmlFor="max_annual_fee">
                        What is the maximum annual fee you are willing to pay? *
                      </Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                          <IndianRupee className="h-4 w-4" />
                        </span>
                        <Input
                          id="max_annual_fee"
                          type="number"
                          value={formData.max_annual_fee}
                          onChange={(e) => updateFormData('max_annual_fee', e.target.value)}
                          className="pl-9"
                          placeholder="Enter maximum annual fee"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              {step > 1 ? (
                <Button variant="outline" onClick={prevStep}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              ) : (
                <div></div>
              )}
              <Button 
                onClick={nextStep}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {step < totalSteps ? 'Continue' : 'Get Recommendations'}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SimplifiedProfileForm; 