
import React from 'react';

interface FinancialProfileStepProps {
  isActive: boolean;
  children: React.ReactNode;
}

const FinancialProfileStep: React.FC<FinancialProfileStepProps> = ({ 
  isActive, 
  children 
}) => {
  if (!isActive) return null;
  
  return (
    <div className="space-y-6">
      {children}
    </div>
  );
};

export default FinancialProfileStep;
