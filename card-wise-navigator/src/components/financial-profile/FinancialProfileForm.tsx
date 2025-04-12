import React, { useState } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import FinancialProfileStep from './FinancialProfileStep';
import FinancialProfileStepper from './FinancialProfileStepper';
import FinancialProfileAssessment from './FinancialProfileAssessment';
import ExpenditurePatternAnalysis from './ExpenditurePatternAnalysis';
import BehavioralMetrics from './BehavioralMetrics';
import LifestyleIndicators from './LifestyleIndicators';
import AspirationalFactors from './AspirationalFactors';

const FinancialProfileForm = () => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Financial Profile Assessment
    annualIncome: 75000,
    debtToIncomeRatio: {
      monthlyDebt: 0,
      monthlyIncome: 0,
      notSure: true
    },
    creditScoreRange: 'unknown',
    financialObligations: [],
    customObligations: [],
    
    // Expenditure Pattern Analysis
    monthlySpending: {
      groceries: 500,
      diningOut: 300,
      fuelTransportation: 150,
      onlineShopping: 400,
      utilities: 250,
      entertainment: 200,
      travel: 200,
      healthcare: 150,
      other: 250
    },
    transactionFrequency: {
      weeklyTransactions: 15,
      averageTransactionValue: 200,
      largestRecurringExpense: 1000
    },
    seasonalSpending: {
      highestSpendingMonths: '',
      seasonalCategories: '',
      annualLargePurchases: ''
    },
    
    // Behavioral Metrics
    paymentHabits: 'fullBalance',
    cardUsage: {
      monthlySpendingPercentage: 60,
      activeCards: 2,
      primaryCardPercentage: 80
    },
    preferredPaymentMethods: {
      everydayPurchases: '',
      largePurchases: '',
      onlineTransactions: '',
      recurringBills: ''
    },
    
    // Lifestyle Indicators
    travelFrequency: {
      domesticTrips: 2,
      internationalTrips: 1,
      averageSpending: 50000,
      accommodationPreferences: ''
    },
    shoppingPreferences: {
      onlinePercentage: 70,
      favoriteRetailers: '',
      discretionarySpending: 10000,
      topCategories: ''
    },
    lifestyleActivities: [],
    customActivities: '',
    
    // Aspirational Factors
    rewardPreferences: {
      cashback: 1,
      travelMiles: 3,
      shoppingDiscounts: 2,
      diningBenefits: 4,
      entertainmentPerks: 5
    },
    premiumServices: [],
    feeTolerances: {
      maximumAnnualFee: 5000,
      justifyingFeatures: '',
      minimumRewardValue: 10000
    },
    prestigeImportance: 'somewhat'
  });

  const totalSteps = 5;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile data submitted:", formData);
    toast({
      title: "Profile created!",
      description: "Your comprehensive financial profile has been saved successfully.",
      duration: 3000,
    });
  };

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    } else {
      handleSubmit(new Event('submit') as unknown as React.FormEvent);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };

  // Fixed type error by correctly defining the expected type parameters
  const updateFormData = (section: string, data: Record<string, any>) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        ...data
      }
    }));
  };

  // Fixed type error by correctly defining the expected type parameters
  const updateNestedFormData = (section: string, subsection: string, data: any) => {
    if (section === '') {
      // Handle top-level updates
      setFormData(prev => ({
        ...prev,
        [subsection]: data
      }));
    } else {
      // Handle nested updates
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section as keyof typeof prev],
          [subsection]: data
        }
      }));
    }
  };

  return (
    <section id="profile" className="py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-700">Create Your Financial Profile</h2>
            <p className="text-foreground/70 text-lg">
              Help us understand your financial situation and preferences to provide personalized card recommendations
            </p>
          </div>

          <FinancialProfileStepper currentStep={step} totalSteps={totalSteps} />

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-blue-700">
                {step === 1 ? 'Financial Profile Assessment' : 
                 step === 2 ? 'Expenditure Pattern Analysis' :
                 step === 3 ? 'Behavioral Metrics' :
                 step === 4 ? 'Lifestyle Indicators' :
                 'Aspirational Factors'}
              </CardTitle>
              <CardDescription>
                {step === 1 ? 'Tell us about your financial situation' : 
                 step === 2 ? 'Help us understand your spending patterns' :
                 step === 3 ? 'Share your credit card usage habits' :
                 step === 4 ? 'Let us know about your lifestyle' :
                 'Tell us about your preferences and aspirations'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={(e) => e.preventDefault()}>
                <FinancialProfileStep isActive={step === 1}>
                  <FinancialProfileAssessment 
                    formData={formData} 
                    updateFormData={updateFormData}
                    updateNestedFormData={updateNestedFormData}
                  />
                </FinancialProfileStep>
                
                <FinancialProfileStep isActive={step === 2}>
                  <ExpenditurePatternAnalysis 
                    formData={formData} 
                    updateFormData={(section, data) => updateNestedFormData('monthlySpending', section, data)}
                    updateNestedFormData={updateNestedFormData}
                  />
                </FinancialProfileStep>
                
                <FinancialProfileStep isActive={step === 3}>
                  <BehavioralMetrics 
                    formData={formData} 
                    updateFormData={(data) => setFormData({...formData, ...data})}
                    updateNestedFormData={updateNestedFormData}
                  />
                </FinancialProfileStep>
                
                <FinancialProfileStep isActive={step === 4}>
                  <LifestyleIndicators 
                    formData={formData} 
                    updateFormData={(data) => setFormData({...formData, ...data})}
                    updateNestedFormData={updateNestedFormData}
                  />
                </FinancialProfileStep>
                
                <FinancialProfileStep isActive={step === 5}>
                  <AspirationalFactors 
                    formData={formData} 
                    updateFormData={(data) => setFormData({...formData, ...data})}
                    updateNestedFormData={updateNestedFormData}
                  />
                </FinancialProfileStep>
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

export default FinancialProfileForm;
