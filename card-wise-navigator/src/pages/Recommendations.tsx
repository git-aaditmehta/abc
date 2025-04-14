import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CreditCard, BadgeCheck, Star, Activity, Banknote, BadgeDollarSign } from 'lucide-react';

interface CardRecommendation {
  card_name: string;
  issuer: string;
  annual_fee: string;
  joining_fee: string;
  rewards: string;
  premium_services: string;
  travel_benefits: string;
  lifestyle_benefits: string;
  match_percentage: number;
  match_reasons: string[];
}

interface RecommendationsState {
  recommendations: CardRecommendation[];
  user_profile: {
    top_categories: { category: string; amount: number }[];
    lifestyle_score: number;
  };
}

const Recommendations = () => {
  const location = useLocation();
  const recommendationsData: RecommendationsState = location.state as RecommendationsState;

  if (!recommendationsData || !recommendationsData.recommendations) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 px-4">
          <div className="container mx-auto max-w-4xl">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-blue-700">No Recommendations Available</CardTitle>
                <CardDescription>
                  Please complete your financial profile to get personalized credit card recommendations.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center py-12">
                <CreditCard className="w-16 h-16 text-gray-300 mb-4" />
                <p className="text-lg mb-6">No recommendation data was found.</p>
                <Button onClick={() => window.location.href = '/create-profile'}>
                  Complete Your Profile
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const { recommendations, user_profile } = recommendationsData;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-blue-700">
              Your Personalized Card Recommendations
            </h1>
            <p className="text-foreground/70 text-lg">
              Based on your financial profile, we've found these credit cards that match your needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="shadow-md bg-gradient-to-br from-blue-50 to-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-blue-700 flex items-center">
                  <Activity className="mr-2 h-5 w-5" /> Spending Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">Your top spending categories:</p>
                  <div className="space-y-2">
                    {user_profile.top_categories.map((category, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span>{category.category}</span>
                        <Badge variant="secondary">₹{category.amount.toLocaleString()}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-md bg-gradient-to-br from-blue-50 to-white col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-blue-700 flex items-center">
                  <BadgeCheck className="mr-2 h-5 w-5" /> Match Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  We analyzed your spending habits, preferences, and financial goals to find the best cards for you.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {recommendations.slice(0, 3).map((card, index) => (
                    <div key={index} className="border rounded-lg p-3 text-center">
                      <div className="text-lg font-semibold mb-1 truncate" title={card.card_name}>
                        {card.card_name.length > 20 ? card.card_name.substring(0, 20) + '...' : card.card_name}
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">{card.issuer}</div>
                      <div className="inline-flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-1 ${
                          card.match_percentage > 80 ? 'bg-green-100 text-green-700' : 
                          card.match_percentage > 60 ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                          <BadgeDollarSign className="w-4 h-4" />
                        </div>
                        <div className="text-sm font-medium">
                          {card.match_percentage}% match
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="cards" className="mb-12">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="cards">Card Details</TabsTrigger>
              <TabsTrigger value="comparison">Comparison</TabsTrigger>
            </TabsList>
            <TabsContent value="cards" className="space-y-8">
              {recommendations.map((card, index) => (
                <Card key={index} className={`shadow-md overflow-hidden border-l-4 ${
                  index === 0 ? 'border-l-green-500' : 
                  index === 1 ? 'border-l-blue-500' : 'border-l-indigo-500'
                }`}>
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-3/4 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold">{card.card_name}</h3>
                          <p className="text-muted-foreground">{card.issuer}</p>
                        </div>
                        <Badge variant="outline" className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-current" /> 
                          {card.match_percentage}% Match
                        </Badge>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-semibold mb-1">Why this card is right for you:</h4>
                          <ul className="list-disc list-inside space-y-1">
                            {card.match_reasons.map((reason, i) => (
                              <li key={i} className="text-sm text-muted-foreground">{reason}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-semibold mb-1">Rewards</h4>
                            <p className="text-sm text-muted-foreground">{card.rewards}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold mb-1">Lifestyle Benefits</h4>
                            <p className="text-sm text-muted-foreground">{card.lifestyle_benefits}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="md:w-1/4 bg-gray-50 p-6 flex flex-col justify-between border-t md:border-t-0 md:border-l">
                      <div>
                        <div className="mb-4">
                          <h4 className="text-sm font-semibold mb-1">Annual Fee</h4>
                          <p className={`font-medium ${card.annual_fee.includes('0') ? 'text-green-600' : 'text-orange-600'}`}>
                            {card.annual_fee}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold mb-1">Joining Fee</h4>
                          <p className={`font-medium ${card.joining_fee.includes('0') ? 'text-green-600' : 'text-orange-600'}`}>
                            {card.joining_fee}
                          </p>
                        </div>
                      </div>
                      
                      <Button className="mt-4 w-full bg-blue-600 hover:bg-blue-700">
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="comparison">
              <Card>
                <CardContent className="pt-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[180px]">Card</TableHead>
                        <TableHead>Annual Fee</TableHead>
                        <TableHead>Reward Structure</TableHead>
                        <TableHead>Travel Benefits</TableHead>
                        <TableHead>Lifestyle Benefits</TableHead>
                        <TableHead className="text-right">Match</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recommendations.map((card, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            <div>{card.card_name}</div>
                            <div className="text-sm text-muted-foreground">{card.issuer}</div>
                          </TableCell>
                          <TableCell>{card.annual_fee}</TableCell>
                          <TableCell>{card.rewards}</TableCell>
                          <TableCell>{card.travel_benefits}</TableCell>
                          <TableCell>{card.lifestyle_benefits}</TableCell>
                          <TableCell className="text-right font-semibold">
                            {card.match_percentage}%
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Recommendations;