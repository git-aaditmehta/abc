import React, { useState } from 'react';
import { 
  Banknote, 
  CreditCard, 
  ShoppingCart, 
  Plane, 
  Utensils, 
  Car,
  ChevronRight,
  Check,
  ArrowLeft,
  Award,
  Star,
  Zap
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
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
import { Progress } from '@/components/ui/progress';

const FinancialProfileForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Generate dummy recommendation data instead of API call
    const dummyRecommendations = [
      {
        card_name: "Premium Travel Rewards Card",
        issuer: "HDFC Bank",
        annual_fee: "₹5,000",
        joining_fee: "₹2,000",
        rewards: "4x points on travel, 2x on dining, 1x on all other purchases",
        premium_services: "Concierge service, priority customer support",
        travel_benefits: "Airport lounge access, travel insurance, zero forex markup",
        lifestyle_benefits: "Complimentary golf sessions, luxury hotel upgrades",
        match_percentage: 95,
        match_reasons: [
          "Aligned with your high travel spending",
          "Provides strong dining rewards matching your profile",
          "Premium benefits justify the annual fee you're comfortable with"
        ]
      },
      {
        card_name: "Cashback Plus Card",
        issuer: "ICICI Bank",
        annual_fee: "₹1,000 (waived if annual spend > ₹2,00,000)",
        joining_fee: "₹0",
        rewards: "2% cashback on groceries and utility bills, 1.5% on all other transactions",
        premium_services: "24/7 Dedicated helpline",
        travel_benefits: "Complimentary travel insurance",
        lifestyle_benefits: "Movie ticket discounts, dining offers at partner restaurants",
        match_percentage: 87,
        match_reasons: [
          "High cashback rates on groceries match your spending pattern",
          "Low annual fee aligns with your preference",
          "Good everyday benefits for regular spending"
        ]
      },
      {
        card_name: "ShopSmart Titanium",
        issuer: "Axis Bank",
        annual_fee: "₹750",
        joining_fee: "₹500",
        rewards: "5% reward points on online shopping, 3% on electronics",
        premium_services: "Extended warranty on purchases",
        travel_benefits: "Domestic lounge access (2 per quarter)",
        lifestyle_benefits: "Partner discounts on fashion and electronics websites",
        match_percentage: 82,
        match_reasons: [
          "Excellent rewards on shopping matches your spending habits",
          "Moderate annual fee fits your comfort level",
          "Special discounts align with your shopping preferences"
        ]
      },
      {
        card_name: "Lifestyle Elite Card",
        issuer: "SBI Cards",
        annual_fee: "₹2,500",
        joining_fee: "₹1,000",
        rewards: "3x points on dining and entertainment, 2x on travel",
        premium_services: "Priority pass for banking services",
        travel_benefits: "Complimentary hotel nights (twice a year)",
        lifestyle_benefits: "1+1 movie tickets, exclusive dining discounts, wellness offers",
        match_percentage: 79,
        match_reasons: [
          "Strong dining and entertainment rewards match your lifestyle",
          "Travel benefits complement your moderate travel spending",
          "Lifestyle perks align with your preferences"
        ]
      },
      {
        card_name: "Everyday Rewards Card",
        issuer: "Kotak Mahindra Bank",
        annual_fee: "₹0",
        joining_fee: "₹500 (waived on first transaction)",
        rewards: "1.5% cashback on all transactions, 2% on utility bills",
        premium_services: "SMS alerts, online account management",
        travel_benefits: "Basic travel insurance",
        lifestyle_benefits: "Partner merchant discounts, fuel surcharge waiver",
        match_percentage: 75,
        match_reasons: [
          "No annual fee aligns with your value preference",
          "Simple cashback structure fits your spending pattern",
          "Basic benefits without unnecessary premium features"
        ]
      }
    ];

    // Create user profile data based on form input
    const userProfile = {
      top_categories: [
        { category: "Groceries", amount: formData.spendingCategories.groceries },
        { category: "Dining", amount: formData.spendingCategories.dining },
        { category: "Travel", amount: formData.spendingCategories.travel },
        { category: "Shopping", amount: formData.spendingCategories.shopping },
        { category: "Gas & Transport", amount: formData.spendingCategories.gas }
      ].sort((a, b) => b.amount - a.amount),
      lifestyle_score: Math.round(Math.random() * 100)
    };

    setTimeout(() => {
      setIsLoading(false);
      navigate('/recommendations', { 
        state: { 
          recommendations: dummyRecommendations,
          user_profile: userProfile
        } 
      });
      toast({
        title: "Recommendations ready!",
        description: "We've found the best credit cards for you.",
        duration: 3000,
      });
    }, 1500); // Simulate loading time
  };

  const nextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      handleSubmit(new Event('submit'));
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const resetForm = () => {
    setStep(1);
    setRecommendations([]);
  };

  const updateSpendingCategory = (category, value) => {
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
            <h2 className="text-3xl md:text-4xl font-bold gradient-heading mb-4">
              {step < 4 ? "Create Your Financial Profile" : "Your Personalized Recommendations"}
            </h2>
            <p className="text-foreground/70 text-lg">
              {step < 4 
                ? "Help us understand your spending habits to provide personalized card recommendations" 
                : "Based on your profile, here are the best credit cards for you"}
            </p>
          </div>

          {step < 4 && (
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
          )}

          {step < 4 ? (
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
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                          <Input
                            type="number"
                            id="income"
                            value={formData.income}
                            onChange={(e) => setFormData({...formData, income: parseInt(e.target.value) || 0})}
                            className="pl-8"
                          />
                        </div>
                        <div className="flex justify-between text-sm text-muted-foreground pt-1">
                          <span>₹0</span>
                          <span>₹2,500,000+</span>
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
                              ₹{formData.spendingCategories[category.name]}
                            </span>
                          </Label>
                          <Slider
                            value={[formData.spendingCategories[category.name]]}
                            min={0}
                            max={20000}
                            step={500}
                            onValueChange={(value) => updateSpendingCategory(category.name, value[0])}
                            className="py-2"
                          />
                          <div className="flex justify-between text-xs text-muted-foreground pt-1">
                            <span>₹0</span>
                            <span>₹20,000+</span>
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
                              <span className="font-medium">Low Annual Fee (Under ₹1,000)</span>
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
                              <span className="font-medium">Medium Annual Fee (₹1,000-₹5,000)</span>
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
                              <span className="font-medium">Premium Annual Fee (₹5,000+)</span>
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
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>Processing...</>
                  ) : (
                    <>
                      {step < 3 ? 'Continue' : 'Get Recommendations'}
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ) : (
            // Recommendations View
            <div className="space-y-6">
              <Button 
                variant="outline" 
                onClick={resetForm}
                className="mb-4"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Profile
              </Button>
              
              {recommendations.length > 0 ? (
                recommendations.map((card, index) => (
                  <Card key={index} className="overflow-hidden card-shadow">
                    <div className="bg-gradient-to-r from-cardwise-blue-600 to-cardwise-teal-500 p-1" />
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-xl md:text-2xl">{card.card_name}</CardTitle>
                          <CardDescription className="text-base">
                            {card.issuer}
                          </CardDescription>
                        </div>
                        <div className="bg-cardwise-blue-50 rounded-full p-2 flex items-center justify-center w-16 h-16">
                          <div className="text-center">
                            <div className="text-lg font-bold text-cardwise-teal-500">{card.match_percentage}%</div>
                            <div className="text-xs text-muted-foreground">Match</div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Annual Fee</p>
                          <p className="font-medium">{card.annual_fee}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Joining Fee</p>
                          <p className="font-medium">{card.joining_fee}</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-cardwise-blue-500 flex items-center gap-1 mb-1.5">
                          <Award className="h-4 w-4" />
                          Rewards
                        </p>
                        <p className="text-sm">{card.rewards}</p>
                      </div>
                      
                      {card.premium_services && (
                        <div>
                          <p className="text-sm font-medium text-cardwise-blue-500 flex items-center gap-1 mb-1.5">
                            <Star className="h-4 w-4" />
                            Premium Services
                          </p>
                          <p className="text-sm">{card.premium_services}</p>
                        </div>
                      )}
                      
                      {card.travel_benefits && (
                        <div>
                          <p className="text-sm font-medium text-cardwise-blue-500 flex items-center gap-1 mb-1.5">
                            <Plane className="h-4 w-4" />
                            Travel Benefits
                          </p>
                          <p className="text-sm">{card.travel_benefits}</p>
                        </div>
                      )}
                      
                      {card.lifestyle_benefits && (
                        <div>
                          <p className="text-sm font-medium text-cardwise-blue-500 flex items-center gap-1 mb-1.5">
                            <Zap className="h-4 w-4" />
                            Lifestyle Benefits
                          </p>
                          <p className="text-sm">{card.lifestyle_benefits}</p>
                        </div>
                      )}
                      
                      <div className="pt-2">
                        <p className="text-sm font-medium text-cardwise-blue-500 mb-2">Why we recommend this</p>
                        <ul className="space-y-1">
                          {card.match_reasons.map((reason, i) => (
                            <li key={i} className="text-sm flex items-start gap-2">
                              <Check className="h-4 w-4 text-cardwise-teal-500 mt-0.5 flex-shrink-0" />
                              <span>{reason}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-cardwise-blue-500 hover:bg-cardwise-blue-600">
                        Apply Now
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <Card className="p-8 text-center">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="animate-pulse">
                      <CreditCard className="h-12 w-12 text-cardwise-blue-300" />
                    </div>
                    <CardTitle>Finding the perfect cards for you</CardTitle>
                    <Progress value={75} className="w-64" />
                    <CardDescription>Please wait while we analyze your profile...</CardDescription>
                  </div>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinancialProfileForm;