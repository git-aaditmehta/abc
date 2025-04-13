import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FinancialProfileForm from '@/components/financial-profile/FinancialProfileForm';

const CreateProfile = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24">
        <FinancialProfileForm />
      </main>
      <Footer />
    </div>
  );
};

export default CreateProfile; 