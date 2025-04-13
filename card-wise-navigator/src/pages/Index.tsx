import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import CardComparison from '@/components/CardComparison';
import CardRecommendations from '@/components/CardRecommendations';
import CardBenefitTracker from '@/components/CardBenefitTracker';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <CardRecommendations />
        <CardComparison />
        <CardBenefitTracker />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
