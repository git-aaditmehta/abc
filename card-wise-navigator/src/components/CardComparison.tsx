import React, { useState } from 'react';
import { Check, CreditCard, DollarSign, X, Award, Gift, Percent } from 'lucide-react';
import { 
  Card, 
  CardContent,
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Sample credit card data
const cardData = [
  {
    id: 'chase-sapphire-reserve',
    name: 'Chase Sapphire Reserve',
    issuer: 'Chase',
    annualFee: 550,
    category: 'travel',
    color: 'bg-gradient-to-br from-cardwise-blue-500 to-cardwise-blue-700',
    welcomeBonus: '$750 value after $4,000 spend in 3 months',
    pointsMultipliers: [
      { category: 'Travel', rate: '10x' },
      { category: 'Dining', rate: '3x' },
      { category: 'Other', rate: '1x' },
    ],
    benefitHighlights: [
      '$300 annual travel credit',
      'Priority Pass airport lounge access',
      'Global Entry/TSA PreCheck credit',
      'No foreign transaction fees',
      'Primary rental car insurance'
    ],
    annualValue: 1275,
    rewardsRate: 4.5,
    creditScoreReq: 'Excellent (740+)'
  },
  {
    id: 'amex-platinum',
    name: 'Amex Platinum Card',
    issuer: 'American Express',
    annualFee: 695,
    category: 'travel',
    color: 'bg-gradient-to-br from-gray-500 to-gray-700',
    welcomeBonus: '125,000 points after $6,000 spend in 6 months',
    pointsMultipliers: [
      { category: 'Flights', rate: '5x' },
      { category: 'Hotels', rate: '5x' },
      { category: 'Other', rate: '1x' },
    ],
    benefitHighlights: [
      '$200 airline fee credit',
      '$200 hotel credit',
      '$240 digital entertainment credit',
      'Centurion Lounge access',
      'Global Entry/TSA PreCheck credit'
    ],
    annualValue: 1520,
    rewardsRate: 4.2,
    creditScoreReq: 'Excellent (740+)'
  },
  {
    id: 'citi-double-cash',
    name: 'Citi Double Cash',
    issuer: 'Citibank',
    annualFee: 0,
    category: 'cash-back',
    color: 'bg-gradient-to-br from-cardwise-teal-400 to-cardwise-teal-600',
    welcomeBonus: '$200 cash back after $1,500 spend in 6 months',
    pointsMultipliers: [
      { category: 'All Purchases', rate: '2%' },
    ],
    benefitHighlights: [
      'No annual fee',
      'Simple flat-rate cash back',
      'Flexible redemption options',
      'Citi Entertainment access',
      'Purchase protection'
    ],
    annualValue: 438,
    rewardsRate: 2.0,
    creditScoreReq: 'Good (670+)'
  },
  {
    id: 'discover-it',
    name: 'Discover it Cash Back',
    issuer: 'Discover',
    annualFee: 0,
    category: 'cash-back',
    color: 'bg-gradient-to-br from-cardwise-mint-400 to-cardwise-mint-600',
    welcomeBonus: 'Cashback match at the end of first year',
    pointsMultipliers: [
      { category: 'Rotating Categories', rate: '5%' },
      { category: 'Other', rate: '1%' },
    ],
    benefitHighlights: [
      'No annual fee',
      'Cashback match first year',
      'No foreign transaction fees',
      'Free FICO score',
      'No late fee on first late payment'
    ],
    annualValue: 352,
    rewardsRate: 3.0,
    creditScoreReq: 'Good (670+)'
  }
];

const CardComparison = () => {
  const [selectedCards, setSelectedCards] = useState(['chase-sapphire-reserve', 'amex-platinum']);

  const handleCardSelect = (position: number, cardId: string) => {
    const newSelectedCards = [...selectedCards];
    newSelectedCards[position] = cardId;
    setSelectedCards(newSelectedCards);
  };

  return (
    <section id="compare" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold gradient-heading mb-4">Compare Credit Cards</h2>
          <p className="text-foreground/70 text-lg max-w-2xl mx-auto">
            See how different cards stack up against each other to find the perfect fit for your wallet
          </p>
        </div>

        <Tabs defaultValue="benefits" className="max-w-5xl mx-auto">
          <TabsList className="grid grid-cols-3 w-full max-w-lg mx-auto mb-8">
            <TabsTrigger value="benefits">Key Benefits</TabsTrigger>
            <TabsTrigger value="rewards">Rewards Structure</TabsTrigger>
            <TabsTrigger value="fees">Fees & Requirements</TabsTrigger>
          </TabsList>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="md:col-span-1">
              <h3 className="font-medium text-lg mb-2 text-cardwise-blue-600">Category</h3>
            </div>
            
            {[0, 1].map((index) => (
              <div key={index} className="md:col-span-1">
                <Select 
                  value={selectedCards[index]} 
                  onValueChange={(value) => handleCardSelect(index, value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a card" />
                  </SelectTrigger>
                  <SelectContent>
                    {cardData.map((card) => (
                      <SelectItem key={card.id} value={card.id}>
                        {card.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <TabsContent value="benefits" className="mt-0">
              <ComparisonSection 
                title="Card Overview"
                selectedCards={selectedCards}
                cardData={cardData}
                renderCardContent={(card) => (
                  <div className="space-y-4">
                    <div className={`relative credit-card ${card.color} h-36 w-full rounded-xl text-white p-4`}>
                      <div className="credit-card-pattern"></div>
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-xs opacity-80">{card.issuer}</div>
                          <div className="text-lg font-semibold">{card.name}</div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <CreditCard className="h-5 w-5" />
                        </div>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <div className="text-xs opacity-80">Annual Value</div>
                        <div className="text-xl font-bold">${card.annualValue}</div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="font-medium mb-1 flex items-center gap-1">
                        <Gift className="h-4 w-4 text-cardwise-teal-500" />
                        Welcome Bonus
                      </div>
                      <p className="text-sm">{card.welcomeBonus}</p>
                    </div>

                    <div>
                      <div className="font-medium mb-1 flex items-center gap-1">
                        <Award className="h-4 w-4 text-cardwise-teal-500" />
                        Key Benefits
                      </div>
                      <ul className="text-sm space-y-2">
                        {card.benefitHighlights.map((benefit, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <Check className="h-4 w-4 text-cardwise-mint-500 mt-0.5 flex-shrink-0" />
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              />
            </TabsContent>

            <TabsContent value="rewards" className="mt-0">
              <ComparisonSection 
                title="Annual Value"
                selectedCards={selectedCards}
                cardData={cardData}
                renderCardContent={(card) => (
                  <div className="text-2xl font-bold text-cardwise-blue-600">
                    ${card.annualValue}
                  </div>
                )}
              />

              <ComparisonSection 
                title="Effective Rewards Rate"
                selectedCards={selectedCards}
                cardData={cardData}
                renderCardContent={(card) => (
                  <div className="text-xl font-semibold flex items-center">
                    <Percent className="h-5 w-5 mr-1 text-cardwise-teal-500" />
                    {card.rewardsRate}%
                  </div>
                )}
              />

              <ComparisonSection 
                title="Point Multipliers"
                selectedCards={selectedCards}
                cardData={cardData}
                renderCardContent={(card) => (
                  <div className="space-y-2">
                    {card.pointsMultipliers.map((multiplier, i) => (
                      <div key={i} className="flex justify-between items-center py-1 border-b last:border-0">
                        <span className="text-sm">{multiplier.category}:</span>
                        <span className="font-semibold text-cardwise-blue-600">{multiplier.rate}</span>
                      </div>
                    ))}
                  </div>
                )}
              />
            </TabsContent>

            <TabsContent value="fees" className="mt-0">
              <ComparisonSection 
                title="Annual Fee"
                selectedCards={selectedCards}
                cardData={cardData}
                renderCardContent={(card) => (
                  <div className="flex items-center">
                    <DollarSign className="h-5 w-5 text-cardwise-coral-500" />
                    <span className="text-xl font-semibold">
                      {card.annualFee === 0 ? 'None' : `$${card.annualFee}`}
                    </span>
                  </div>
                )}
              />

              <ComparisonSection 
                title="Credit Score Requirement"
                selectedCards={selectedCards}
                cardData={cardData}
                renderCardContent={(card) => (
                  <div className="font-medium">{card.creditScoreReq}</div>
                )}
              />
            </TabsContent>
          </div>

          <div className="mt-12 text-center">
            <Button className="bg-cardwise-teal-500 hover:bg-cardwise-teal-600">
              View Full Card Details
            </Button>
          </div>
        </Tabs>
      </div>
    </section>
  );
};

// Helper component for each comparison section
const ComparisonSection = ({ 
  title,
  selectedCards,
  cardData,
  renderCardContent
}: { 
  title: string;
  selectedCards: string[];
  cardData: any[];
  renderCardContent: (card: any) => React.ReactNode;
}) => {
  return (
    <Card className="mb-4 card-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1 flex items-center">
            <CardDescription className="text-base">{title}</CardDescription>
          </div>
          
          {selectedCards.map((cardId) => {
            const card = cardData.find((c) => c.id === cardId);
            return (
              <div key={cardId} className="md:col-span-1">
                {card && renderCardContent(card)}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default CardComparison;
