import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CreditCard, Wallet, Award, DollarSign, ChevronsUpDown, ExternalLink } from 'lucide-react';

const cardRecommendations = [
  {
    id: 1,
    name: 'Chase Sapphire Preferred',
    category: 'Travel',
    annualFee: 95,
    rewardsRate: '2.5%',
    welcomeBonus: '60,000 points ($750 value)',
    keyBenefits: [
      'No foreign transaction fees',
      'Travel insurance and protections',
      '25% more value when redeeming through Chase portal',
      '10% anniversary point bonus'
    ],
    color: 'bg-gradient-to-br from-cardwise-blue-500 to-cardwise-blue-700',
    match: 98
  },
  {
    id: 2,
    name: 'American Express Gold Card',
    category: 'Dining & Groceries',
    annualFee: 250,
    rewardsRate: '4%',
    welcomeBonus: '60,000 points ($600 value)',
    keyBenefits: [
      '$240 annual dining credits',
      '$120 annual Uber Cash',
      '4x points at restaurants and supermarkets',
      'No foreign transaction fees'
    ],
    color: 'bg-gradient-to-br from-[#B8860B] to-[#DAA520]',
    match: 92
  },
  {
    id: 3,
    name: 'Citi Custom Cash',
    category: 'Cash Back',
    annualFee: 0,
    rewardsRate: '5%',
    welcomeBonus: '$200 cash back',
    keyBenefits: [
      '5% cash back in your top eligible spend category',
      'No annual fee',
      'Automatic category detection',
      'Flexible redemption options'
    ],
    color: 'bg-gradient-to-br from-cardwise-teal-400 to-cardwise-teal-600',
    match: 87
  }
];

const CardRecommendations = () => {
  return (
    <section id="features" className="py-16 bg-cardwise-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold gradient-heading mb-4">Your Top Card Recommendations</h2>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
            Based on your spending profile, these cards will maximize your rewards and benefits
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {cardRecommendations.map((card) => (
            <div key={card.id} className="flex flex-col">
              <div className="relative mb-4">
                <Badge 
                  className="absolute -top-2 -right-2 z-10 bg-cardwise-coral-500 hover:bg-cardwise-coral-600"
                >
                  {card.match}% Match
                </Badge>
                <div className={`relative credit-card ${card.color} h-52 w-full rounded-xl text-white p-6`}>
                  <div className="credit-card-pattern"></div>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm opacity-80">{card.category}</div>
                      <div className="text-xl font-semibold">{card.name}</div>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <CreditCard className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="mt-auto pt-14">
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="text-xs opacity-80">Annual Fee</div>
                        <div className="text-base font-bold">
                          {card.annualFee === 0 ? 'None' : `$${card.annualFee}`}
                        </div>
                      </div>
                      <div className="w-px h-10 bg-white/30"></div>
                      <div>
                        <div className="text-xs opacity-80">Rewards Rate</div>
                        <div className="text-base font-bold">{card.rewardsRate}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex-1 bg-white rounded-xl border p-5 card-shadow">
                <div className="space-y-4">
                  <div>
                    <div className="font-medium mb-1 flex items-center gap-2">
                      <Wallet className="h-4 w-4 text-cardwise-teal-500" />
                      Welcome Bonus
                    </div>
                    <p className="text-sm">{card.welcomeBonus}</p>
                  </div>

                  <div>
                    <div className="font-medium mb-1 flex items-center gap-2">
                      <Award className="h-4 w-4 text-cardwise-teal-500" />
                      Key Benefits
                    </div>
                    <ul className="text-sm space-y-1">
                      {card.keyBenefits.map((benefit, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <div className="bg-cardwise-mint-50 p-1 rounded-full mt-0.5 flex-shrink-0">
                            <DollarSign className="h-3 w-3 text-cardwise-mint-500" />
                          </div>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 flex gap-2">
                    <Button className="flex-1 bg-cardwise-teal-500 hover:bg-cardwise-teal-600">
                      Apply Now
                      <ExternalLink className="ml-1 h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="flex-shrink-0">
                      Details
                      <ChevronsUpDown className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardRecommendations;
