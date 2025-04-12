
import React from 'react';
import { ArrowRight, CreditCard, Award, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-cardwise-blue-50 to-transparent pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight gradient-heading">
              Maximize Your Credit Card Benefits
            </h1>
            <p className="text-lg text-foreground/80 md:pr-12">
              CardWise helps you choose the perfect credit cards based on your spending habits and unlock rewards you never knew existed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button className="bg-cardwise-teal-500 hover:bg-cardwise-teal-600 text-white font-medium px-6 py-6 h-auto rounded-full">
                Get Smart Recommendations
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button variant="outline" className="border-cardwise-blue-200 text-cardwise-blue-500 hover:bg-cardwise-blue-50 py-6 h-auto rounded-full">
                Compare Popular Cards
              </Button>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 text-sm text-muted-foreground">
              <div className="flex items-center">
                <div className="bg-cardwise-mint-50 p-1.5 rounded-full mr-2">
                  <CreditCard className="h-4 w-4 text-cardwise-mint-500" />
                </div>
                <span>Personalized Card Matching</span>
              </div>
              <div className="flex items-center">
                <div className="bg-cardwise-mint-50 p-1.5 rounded-full mr-2">
                  <Award className="h-4 w-4 text-cardwise-mint-500" />
                </div>
                <span>Benefit Utilization Tracking</span>
              </div>
              <div className="flex items-center">
                <div className="bg-cardwise-mint-50 p-1.5 rounded-full mr-2">
                  <Bell className="h-4 w-4 text-cardwise-mint-500" />
                </div>
                <span>Smart Alerts</span>
              </div>
            </div>
          </div>
          <div className="relative animate-fade-in">
            <div className="absolute -top-12 -right-12 w-64 h-64 bg-cardwise-teal-100 rounded-full opacity-50 blur-3xl"></div>
            <div className="absolute -bottom-8 -left-8 w-40 h-40 bg-cardwise-mint-100 rounded-full opacity-50 blur-3xl"></div>
            
            <div className="relative h-[400px] w-full md:w-[500px] mx-auto">
              <div className="absolute credit-card bg-gradient-to-br from-cardwise-blue-500 to-cardwise-blue-700 h-56 w-[340px] rounded-xl rotate-6 top-16 right-5 z-20 p-6 text-white">
                <div className="credit-card-pattern"></div>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm opacity-80">Premium</div>
                    <div className="text-xl font-semibold">Sapphire Reserve</div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <CreditCard className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-auto pt-14">
                  <div className="text-sm opacity-80">Annual Value</div>
                  <div className="text-2xl font-bold">$1,275</div>
                </div>
              </div>
              
              <div className="absolute credit-card bg-gradient-to-br from-cardwise-teal-400 to-cardwise-teal-600 h-56 w-[340px] rounded-xl -rotate-3 top-4 left-5 z-10 p-6 text-white">
                <div className="credit-card-pattern"></div>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm opacity-80">Everyday</div>
                    <div className="text-xl font-semibold">Freedom Unlimited</div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <CreditCard className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-auto pt-14">
                  <div className="text-sm opacity-80">Annual Value</div>
                  <div className="text-2xl font-bold">$438</div>
                </div>
              </div>
              
              <div className="absolute credit-card bg-gradient-to-br from-cardwise-mint-400 to-cardwise-mint-600 h-56 w-[340px] rounded-xl -rotate-12 top-36 left-0 z-0 p-6 text-white">
                <div className="credit-card-pattern"></div>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-sm opacity-80">Cash Back</div>
                    <div className="text-xl font-semibold">Everyday Preferred</div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <CreditCard className="h-6 w-6" />
                  </div>
                </div>
                <div className="mt-auto pt-14">
                  <div className="text-sm opacity-80">Annual Value</div>
                  <div className="text-2xl font-bold">$612</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
