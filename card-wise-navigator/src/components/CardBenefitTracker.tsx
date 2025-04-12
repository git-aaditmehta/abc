
import React from 'react';
import { 
  CreditCard, 
  Gift, 
  DollarSign, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  Clock 
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const benefitData = [
  {
    id: 1,
    cardName: 'Chase Sapphire Reserve',
    cardColor: 'bg-cardwise-blue-500',
    benefits: [
      {
        name: 'Annual Travel Credit',
        description: '$300 statement credit for travel purchases',
        total: 300,
        used: 175,
        expires: '12/31/2023',
        status: 'active'
      },
      {
        name: 'Global Entry Credit',
        description: 'Statement credit for Global Entry or TSA PreCheck',
        total: 100,
        used: 0,
        expires: '07/15/2024',
        status: 'active'
      }
    ]
  },
  {
    id: 2,
    cardName: 'Amex Gold Card',
    cardColor: 'bg-[#B8860B]',
    benefits: [
      {
        name: 'Dining Credit',
        description: '$10 monthly credit for select restaurants',
        total: 120,
        used: 100,
        expires: 'Monthly',
        status: 'active'
      },
      {
        name: 'Uber Cash',
        description: '$10 monthly Uber Cash for rides or Uber Eats',
        total: 120,
        used: 90,
        expires: 'Monthly',
        status: 'active'
      }
    ]
  }
];

const CardBenefitTracker = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold gradient-heading mb-4">Track Your Card Benefits</h2>
          <p className="text-foreground/70 text-lg max-w-3xl mx-auto">
            Never miss out on your credit card perks and benefits. CardWise helps you stay on top of expiring benefits and maximize value.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {benefitData.map((cardBenefits) => (
            <Card key={cardBenefits.id} className="mb-8 card-shadow overflow-hidden">
              <div className={`${cardBenefits.cardColor} h-2`}></div>
              <CardHeader className="flex flex-row items-center gap-2">
                <CreditCard className={`text-${cardBenefits.cardColor.replace('bg-', '')} h-5 w-5`} />
                <CardTitle>{cardBenefits.cardName}</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 divide-y">
                {cardBenefits.benefits.map((benefit, index) => (
                  <div 
                    key={index} 
                    className="py-4 first:pt-0 last:pb-0"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
                      <div className="flex items-start gap-2">
                        <div className="p-1.5 rounded-full bg-cardwise-mint-50 text-cardwise-mint-500 mt-0.5">
                          <Gift className="h-4 w-4" />
                        </div>
                        <div>
                          <h4 className="font-medium">{benefit.name}</h4>
                          <p className="text-sm text-muted-foreground">{benefit.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <StatusBadge status={benefit.status} />
                        <span className="flex items-center text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          Expires: {benefit.expires}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-8 gap-2 items-center">
                      <div className="md:col-span-5">
                        <Progress 
                          value={(benefit.used / benefit.total) * 100} 
                          className="h-3" 
                        />
                      </div>
                      <div className="flex items-center md:col-span-3 justify-end text-sm">
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                        <span className="font-semibold">${benefit.used}</span>
                        <span className="text-muted-foreground mx-1">of</span>
                        <span className="font-semibold">${benefit.total}</span>
                        <span className="text-muted-foreground ml-1">used</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}

          <div className="text-center mt-8">
            <p className="text-muted-foreground mb-4">
              Link your credit cards to automatically track benefits and get timely reminders for expiring perks.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper component for status badges
const StatusBadge = ({ status }: { status: string }) => {
  if (status === 'active') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-2">
        <CheckCircle2 className="h-3 w-3 mr-1" />
        Active
      </span>
    );
  } else if (status === 'expiring') {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 mr-2">
        <Clock className="h-3 w-3 mr-1" />
        Expiring Soon
      </span>
    );
  } else {
    return (
      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 mr-2">
        <AlertCircle className="h-3 w-3 mr-1" />
        Expired
      </span>
    );
  }
};

export default CardBenefitTracker;
