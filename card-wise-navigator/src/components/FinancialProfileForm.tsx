
import React, { useState } from 'react';
import { 
  Banknote, 
  CreditCard, 
  ShoppingCart, 
  Plane, 
  Utensils, 
  Car,
  ChevronRight,
  Check 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle 
} from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/components/ui/use-toast';

const FinancialProfileForm = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    income: 75000,
    existingCards: 'some',
    spendingCategories: {
      groceries: 500,
      dining: 300,
      travel: 200,
      shopping: 400,
      gas: 150,
      other: 250
    },
    annualFeeComfort: 'medium'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile data submitted:", formData);
    toast({
      title: "Profile created!",
      description: "Your financial profile has been saved successfully.",
      duration: 3000,
    });
  };

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleSubmit(new Event('submit') as unknown as React.FormEvent);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const updateSpendingCategory = (category: string, value: number) => {
    setFormData({
      ...formData,
      spendingCategories: {
        ...formData.spendingCategories,
        [category]: value
      }
    });
  };

  return (
    <div id="profile" className="py-16 bg-gradient-to-b from-white to-cardwise-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold gradient-heading mb-4">Create Your Financial Profile</h2>
            <p className="text-foreground/70 text-lg">
              Help us understand your spending habits to provide personalized card recommendations
            </p>
          </div>

          <div className="relative mb-12">
            <div className="flex justify-between items-center relative z-10">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col items-center">
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                      step >= i 
                        ? 'bg-cardwise-teal-500 text-white' 
                        : 'bg-cardwise-blue-100 text-cardwise-blue-500'
                    }`}
                  >
                    {step > i ? <Check className="h-5 w-5" /> : i}
                  </div>
                  <div className={`text-sm ${step >= i ? 'text-cardwise-teal-500 font-medium' : 'text-muted-foreground'}`}>
                    {i === 1 ? 'Basic Info' : i === 2 ? 'Spending Habits' : 'Preferences'}
                  </div>
                </div>
              ))}
            </div>
            <div className="absolute top-5 left-0 w-full h-0.5 bg-cardwise-blue-100">
              <div 
                className="h-full bg-cardwise-teal-500 transition-all duration-300"
                style={{ width: `${((step - 1) / 2) * 100}%` }}
              ></div>
            </div>
          </div>

          <Card className="card-shadow">
            <CardHeader>
              <CardTitle className="text-cardwise-blue-500">
                {step === 1 ? 'Tell us about yourself' : 
                 step === 2 ? 'What are your monthly spending habits?' :
                 'Your preferences'}
              </CardTitle>
              <CardDescription>
                {step === 1 ? 'This helps us tailor recommendations to your financial situation' : 
                 step === 2 ? 'Estimate your average monthly spending in each category' :
                 'Almost done! Just a few more preferences to fine-tune your recommendations'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="income" className="flex items-center gap-2">
                        <Banknote className="h-4 w-4 text-cardwise-teal-500" />
                        Annual Income
                      </Label>
                      <div className="relative mt-1">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <Input
                          type="number"
                          id="income"
                          value={formData.income}
                          onChange={(e) => setFormData({...formData, income: parseInt(e.target.value) || 0})}
                          className="pl-8"
                        />
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground pt-1">
                        <span>$0</span>
                        <span>$250,000+</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-cardwise-teal-500" />
                        Existing Credit Cards
                      </Label>
                      <RadioGroup 
                        value={formData.existingCards}
                        onValueChange={(value) => setFormData({...formData, existingCards: value})}
                        className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="none" id="none" />
                          <Label htmlFor="none" className="cursor-pointer">None</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="some" id="some" />
                          <Label htmlFor="some" className="cursor-pointer">1-3 Cards</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="many" id="many" />
                          <Label htmlFor="many" className="cursor-pointer">4+ Cards</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-8">
                    {[
                      { name: 'groceries', icon: <ShoppingCart className="h-4 w-4" />, label: 'Groceries' },
                      { name: 'dining', icon: <Utensils className="h-4 w-4" />, label: 'Dining Out' },
                      { name: 'travel', icon: <Plane className="h-4 w-4" />, label: 'Travel' },
                      { name: 'gas', icon: <Car className="h-4 w-4" />, label: 'Gas & Transportation' },
                      { name: 'shopping', icon: <ShoppingCart className="h-4 w-4" />, label: 'Shopping' }
                    ].map((category) => (
                      <div key={category.name} className="space-y-2">
                        <Label className="flex items-center gap-2">
                          <div className="text-cardwise-teal-500">{category.icon}</div>
                          {category.label}
                          <span className="ml-auto font-semibold">
                            ${formData.spendingCategories[category.name as keyof typeof formData.spendingCategories]}
                          </span>
                        </Label>
                        <Slider
                          value={[formData.spendingCategories[category.name as keyof typeof formData.spendingCategories]]}
                          min={0}
                          max={2000}
                          step={50}
                          onValueChange={(value) => updateSpendingCategory(category.name, value[0])}
                          className="py-2"
                        />
                        <div className="flex justify-between text-xs text-muted-foreground pt-1">
                          <span>$0</span>
                          <span>$2,000+</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {step === 3 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 text-cardwise-teal-500" />
                        Annual Fee Comfort Level
                      </Label>
                      <RadioGroup 
                        value={formData.annualFeeComfort}
                        onValueChange={(value) => setFormData({...formData, annualFeeComfort: value})}
                        className="grid gap-3 pt-2"
                      >
                        <Label
                          htmlFor="no-fee"
                          className="flex flex-col space-y-1 border rounded-lg p-4 cursor-pointer hover:bg-muted transition-colors"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="none" id="no-fee" />
                            <span className="font-medium">No Annual Fee</span>
                          </div>
                          <span className="text-sm text-muted-foreground pl-6">
                            I only want cards with no annual fees
                          </span>
                        </Label>
                        
                        <Label
                          htmlFor="low-fee"
                          className="flex flex-col space-y-1 border rounded-lg p-4 cursor-pointer hover:bg-muted transition-colors"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="low" id="low-fee" />
                            <span className="font-medium">Low Annual Fee (Under $95)</span>
                          </div>
                          <span className="text-sm text-muted-foreground pl-6">
                            I'm comfortable with a low annual fee if the benefits justify it
                          </span>
                        </Label>
                        
                        <Label
                          htmlFor="medium-fee"
                          className="flex flex-col space-y-1 border rounded-lg p-4 cursor-pointer hover:bg-muted transition-colors"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="medium" id="medium-fee" />
                            <span className="font-medium">Medium Annual Fee ($95-$250)</span>
                          </div>
                          <span className="text-sm text-muted-foreground pl-6">
                            I'm willing to pay a moderate fee for valuable benefits
                          </span>
                        </Label>
                        
                        <Label
                          htmlFor="high-fee"
                          className="flex flex-col space-y-1 border rounded-lg p-4 cursor-pointer hover:bg-muted transition-colors"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="high" id="high-fee" />
                            <span className="font-medium">Premium Annual Fee ($250+)</span>
                          </div>
                          <span className="text-sm text-muted-foreground pl-6">
                            I want premium cards with luxury benefits and am willing to pay for them
                          </span>
                        </Label>
                      </RadioGroup>
                    </div>
                  </div>
                )}
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              {step > 1 ? (
                <Button variant="outline" onClick={prevStep}>
                  Back
                </Button>
              ) : (
                <div></div>
              )}
              <Button 
                onClick={nextStep}
                className="bg-cardwise-teal-500 hover:bg-cardwise-teal-600"
              >
                {step < 3 ? 'Continue' : 'Get Recommendations'}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default FinancialProfileForm;
