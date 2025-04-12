import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CreditCard, TrendingUp, Award, AlertTriangle, Lightbulb } from "lucide-react";

// Sample data - replace with actual API data
const sampleData = {
  creditScore: 750,
  creditLimit: 10000,
  usedLimit: 3500,
  rewards: {
    points: 25000,
    cashback: 125,
    expiringPoints: 5000,
    expiryDate: "2024-12-31"
  },
  spendingCategories: [
    { name: "Dining", amount: 1200, percentage: 30 },
    { name: "Shopping", amount: 800, percentage: 20 },
    { name: "Travel", amount: 1000, percentage: 25 },
    { name: "Groceries", amount: 500, percentage: 12.5 },
    { name: "Entertainment", amount: 500, percentage: 12.5 }
  ],
  recommendations: [
    {
      card: "Chase Sapphire Preferred",
      reason: "Best for dining and travel rewards",
      benefits: ["3x points on dining", "2x points on travel", "60,000 bonus points"]
    },
    {
      card: "American Express Gold",
      reason: "Great for groceries and dining",
      benefits: ["4x points on dining", "4x points on groceries", "60,000 bonus points"]
    }
  ]
};

const DetailedAnalysis = () => {
  return (
    <div className="space-y-6">
      {/* Credit Score and Limit Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Credit Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-2">{sampleData.creditScore}</div>
            <div className="flex items-center gap-2">
              <Progress value={75} className="h-2" />
              <span className="text-sm text-muted-foreground">Good</span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Your credit score is in good standing. Keep up the good work!
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Credit Limit Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold mb-2">
              ${sampleData.usedLimit} / ${sampleData.creditLimit}
            </div>
            <div className="flex items-center gap-2">
              <Progress value={(sampleData.usedLimit / sampleData.creditLimit) * 100} className="h-2" />
              <span className="text-sm text-muted-foreground">
                {Math.round((sampleData.usedLimit / sampleData.creditLimit) * 100)}%
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Using {Math.round((sampleData.usedLimit / sampleData.creditLimit) * 100)}% of your credit limit
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Rewards Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Rewards Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Total Points</h3>
              <p className="text-2xl font-bold">{sampleData.rewards.points.toLocaleString()}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Cashback Value</h3>
              <p className="text-2xl font-bold">${sampleData.rewards.cashback}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Expiring Points</h3>
              <p className="text-2xl font-bold text-red-500">
                {sampleData.rewards.expiringPoints.toLocaleString()}
              </p>
              <p className="text-sm text-muted-foreground">
                Expires: {new Date(sampleData.rewards.expiryDate).toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Spending Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Spending Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sampleData.spendingCategories.map((category) => (
              <div key={category.name} className="space-y-2">
                <div className="flex justify-between">
                  <span className="font-medium">{category.name}</span>
                  <span className="text-muted-foreground">${category.amount}</span>
                </div>
                <Progress value={category.percentage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Recommended Cards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sampleData.recommendations.map((rec, index) => (
              <div key={index} className="border rounded-lg p-4">
                <h3 className="font-bold text-lg">{rec.card}</h3>
                <p className="text-muted-foreground mb-2">{rec.reason}</p>
                <div className="flex flex-wrap gap-2">
                  {rec.benefits.map((benefit, i) => (
                    <Badge key={i} variant="secondary">
                      {benefit}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Credit Score Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Credit Score Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            <li>Keep your credit utilization below 30%</li>
            <li>Pay your bills on time every month</li>
            <li>Maintain a mix of different types of credit</li>
            <li>Avoid opening too many new accounts at once</li>
            <li>Regularly check your credit report for errors</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailedAnalysis; 