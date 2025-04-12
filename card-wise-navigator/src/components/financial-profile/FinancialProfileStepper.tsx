
import React from 'react';
import { Check } from 'lucide-react';

interface FinancialProfileStepperProps {
  currentStep: number;
  totalSteps: number;
}

const FinancialProfileStepper: React.FC<FinancialProfileStepperProps> = ({ 
  currentStep, 
  totalSteps 
}) => {
  const steps = [
    { label: 'Financial Profile', step: 1 },
    { label: 'Expenditure Patterns', step: 2 },
    { label: 'Behavioral Metrics', step: 3 },
    { label: 'Lifestyle', step: 4 },
    { label: 'Aspirations', step: 5 }
  ];

  return (
    <div className="relative mb-12">
      <div className="flex justify-between items-center relative z-10">
        {steps.map(({ label, step }) => (
          <div key={step} className="flex flex-col items-center">
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                currentStep >= step 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-blue-100 text-blue-500'
              }`}
            >
              {currentStep > step ? <Check className="h-5 w-5" /> : step}
            </div>
            <div className={`text-sm ${currentStep >= step ? 'text-blue-600 font-medium' : 'text-muted-foreground'}`}>
              {label}
            </div>
          </div>
        ))}
      </div>
      <div className="absolute top-5 left-0 w-full h-0.5 bg-blue-100">
        <div 
          className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default FinancialProfileStepper;
