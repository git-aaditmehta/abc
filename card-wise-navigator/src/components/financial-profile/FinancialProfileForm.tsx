import React, { useState, useRef } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { Spinner } from '@/components/ui/spinner';
import FinancialProfileStep from './FinancialProfileStep';
import FinancialProfileStepper from './FinancialProfileStepper';
import FinancialProfileAssessment from './FinancialProfileAssessment';
import ExpenditurePatternAnalysis from './ExpenditurePatternAnalysis';
import BehavioralMetrics from './BehavioralMetrics';
import LifestyleIndicators from './LifestyleIndicators';
import AspirationalFactors from './AspirationalFactors';
import axios from 'axios';

// Define the type for the profile form data to avoid type errors
interface ProfileFormData {
  annualIncome: number;
  debtToIncomeRatio: {
    monthlyDebt: number;
    monthlyIncome: number;
    notSure: boolean;
  };
  creditScoreRange: string;
  financialObligations: string[];
  customObligations: any[];
  monthlySpending: Record<string, number>;
  transactionFrequency: {
    weeklyTransactions: number;
    averageTransactionValue: number;
    largestRecurringExpense: number;
  };
  seasonalSpending: {
    highestSpendingMonths: string;
    seasonalCategories: string;
    annualLargePurchases: string;
  };
  paymentHabits: string;
  cardUsage: {
    monthlySpendingPercentage: number;
    activeCards: number;
    primaryCardPercentage: number;
  };
  preferredPaymentMethods: Record<string, string>;
  travelFrequency: {
    domesticTrips: number;
    internationalTrips: number;
    averageSpending: number;
    accommodationPreferences: string;
  };
  shoppingPreferences: {
    onlinePercentage: number;
    favoriteRetailers: string;
    discretionarySpending: number;
    topCategories: string;
  };
  lifestyleActivities: string[];
  customActivities: string;
  rewardPreferences: Record<string, number>;
  premiumServices: string[];
  feeTolerances: {
    maximumAnnualFee: number;
    justifyingFeatures: string;
    minimumRewardValue: number;
  };
  prestigeImportance: string;
  [key: string]: any; // Allow any additional properties
}

const FinancialProfileForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const formRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState<ProfileFormData>({
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

  // Format data for our Flask backend
  const formatDataForBackend = () => {
    // Calculate top spending categories
    const spendingEntries = Object.entries(formData.monthlySpending);
    spendingEntries.sort((a, b) => b[1] - a[1]); // Sort by spending amount (descending)
    const topCategories = spendingEntries.slice(0, 3).map(([category, amount]) => ({
      category, 
      amount
    }));

    // Map credit score range to approximate numerical value for the model
    const creditScoreMap: Record<string, number> = {
      'excellent': 800,
      'good': 700,
      'fair': 650,
      'poor': 550,
      'unknown': 650 // Default to middle range if unknown
    };
    
    const creditScore = creditScoreMap[formData.creditScoreRange] || 650;

    return {
      income: formData.annualIncome,
      creditScore: creditScore,
      maxAnnualFee: formData.feeTolerances.maximumAnnualFee,
      spendingCategories: formData.monthlySpending,
      topCategories: topCategories,
      travelFrequency: {
        domestic: formData.travelFrequency.domesticTrips,
        international: formData.travelFrequency.internationalTrips
      },
      rewardPreferences: formData.rewardPreferences,
      premiumServices: formData.premiumServices
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      console.log("Preparing profile data for submission");
      
      // Format data for the backend
      const backendData = formatDataForBackend();
      console.log("Formatted data for backend:", backendData);
      
      const API_URL = 'http://localhost:5000/api/recommend';
      console.log("Sending request to:", API_URL);
      
      // Make an API call to our Flask backend to process the form data
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': window.location.origin
        },
        mode: 'cors',
        credentials: 'omit',
        body: JSON.stringify(backendData),
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", Object.fromEntries(response.headers.entries()));
      
      if (!response.ok) {
        let errorMessage;
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || `Server responded with status: ${response.status}`;
        } catch {
          const errorText = await response.text();
          errorMessage = `Server responded with status: ${response.status}. Details: ${errorText}`;
        }
        throw new Error(errorMessage);
      }
      
      const recommendations = await response.json();
      console.log("Recommendations received:", recommendations);
      
      // Format the recommendations in the structure expected by the Recommendations component
      const formattedRecommendations = {
        recommendations: recommendations.map((card: any) => ({
          card_name: card.card_name,
          issuer: card.issuer,
          annual_fee: card.annual_fee,
          joining_fee: card.joining_fee,
          rewards: card.rewards,
          premium_services: card.premium_services,
          travel_benefits: card.travel_benefits,
          lifestyle_benefits: card.lifestyle_benefits,
          match_percentage: card.match_percentage,
          match_reasons: card.match_reasons || [
            'Aligns with your spending patterns',
            'Matches your reward preferences',
            'Fits within your fee tolerance'
          ]
        })),
        user_profile: {
          top_categories: backendData.topCategories,
          lifestyle_score: Math.min(100, Math.round(
            (backendData.travelFrequency.domestic * 10) + 
            (backendData.travelFrequency.international * 20) + 
            (backendData.maxAnnualFee / 1000)
          ))
        }
      };
      
      // Show success toast
      toast({
        title: "Profile created!",
        description: "Your comprehensive financial profile has been saved successfully.",
        duration: 3000,
      });
      
      // Navigate to the recommendations page with the data
      navigate('/recommendations', { state: formattedRecommendations });
      
    } catch (error: any) {
      console.error("Error submitting form:", error);
      
      // Show error toast with more specific error message
      toast({
        title: "Error",
        description: error.message || "There was a problem processing your profile. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const nextStep = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default to avoid page scrolling
    
    if (step < totalSteps) {
      setStep(step + 1);
      // Keep the scroll position
      if (formRef.current) {
        setTimeout(() => {
          formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else {
      handleSubmit(new Event('submit') as unknown as React.FormEvent);
    }
  };

  const prevStep = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent default to avoid page scrolling
    
    if (step > 1) {
      setStep(step - 1);
      // Keep the scroll position
      if (formRef.current) {
        setTimeout(() => {
          formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  };

  // Handler for FinancialProfileAssessment component
  const handleDebtToIncomeUpdate = (data: any) => {
    setFormData({
      ...formData,
      debtToIncomeRatio: {
        ...formData.debtToIncomeRatio,
        ...data
      }
    });
  };

  // Handler for ExpenditurePatternAnalysis component
  const handleMonthlySpendingUpdate = (category: string, value: number) => {
    setFormData({
      ...formData,
      monthlySpending: {
        ...formData.monthlySpending,
        [category]: value
      }
    });
  };

  // Generic handler for nested form data
  const updateNestedFormData = (section: string, subsection: string, data: any) => {
    if (section === '') {
      // Handle top-level updates
      setFormData({
        ...formData,
        [subsection]: data
      });
    } else {
      // Handle nested updates
      setFormData({
        ...formData,
        [section]: {
          ...formData[section],
          [subsection]: data
        }
      });
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto" ref={formRef}>
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
                    updateFormData={handleDebtToIncomeUpdate}
                    updateNestedFormData={updateNestedFormData}
                  />
                </FinancialProfileStep>
                
                <FinancialProfileStep isActive={step === 2}>
                  <ExpenditurePatternAnalysis 
                    formData={formData} 
                    updateFormData={handleMonthlySpendingUpdate}
                    updateNestedFormData={updateNestedFormData}
                  />
                </FinancialProfileStep>
                
                <FinancialProfileStep isActive={step === 3}>
                  <BehavioralMetrics 
                    formData={formData} 
                    updateFormData={(data) => setFormData({ ...formData, ...data })}
                    updateNestedFormData={updateNestedFormData}
                  />
                </FinancialProfileStep>
                
                <FinancialProfileStep isActive={step === 4}>
                  <LifestyleIndicators 
                    formData={formData} 
                    updateFormData={(data) => setFormData({ ...formData, ...data })}
                    updateNestedFormData={updateNestedFormData}
                  />
                </FinancialProfileStep>
                
                <FinancialProfileStep isActive={step === 5}>
                  <AspirationalFactors 
                    formData={formData} 
                    updateFormData={(data) => setFormData({ ...formData, ...data })}
                    updateNestedFormData={updateNestedFormData}
                  />
                </FinancialProfileStep>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              {step > 1 ? (
                <Button variant="outline" onClick={prevStep} disabled={loading}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Back
                </Button>
              ) : (
                <div></div>
              )}
              <Button 
                onClick={nextStep}
                className="bg-blue-600 hover:bg-blue-700"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="mr-2">Processing</span>
                    <Spinner className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    {step < totalSteps ? 'Continue' : 'Get Recommendations'}
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FinancialProfileForm;