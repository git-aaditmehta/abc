import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import EmailAnalysisForm from '@/components/spending-analysis/EmailAnalysisForm';
import DetailedAnalysis from '@/components/spending-analysis/DetailedAnalysis';
import CardRecommendations from '@/components/spending-analysis/CardRecommendations';

// Sample data - replace with actual API data
const monthlyData = [
  { name: 'Jan', amount: 4000 },
  { name: 'Feb', amount: 3000 },
  { name: 'Mar', amount: 5000 },
  { name: 'Apr', amount: 2780 },
  { name: 'May', amount: 1890 },
  { name: 'Jun', amount: 2390 },
  { name: 'Jul', amount: 3490 },
];

const categoryData = [
  { name: 'Dining', value: 30 },
  { name: 'Shopping', value: 20 },
  { name: 'Travel', value: 25 },
  { name: 'Groceries', value: 12.5 },
  { name: 'Entertainment', value: 12.5 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const SpendingAnalytics = () => {
  const [showAnalysis, setShowAnalysis] = useState(false);

  const handleEmailSubmit = () => {
    setShowAnalysis(true);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Spending Analytics</h1>
      
      {!showAnalysis ? (
        <EmailAnalysisForm onSubmit={handleEmailSubmit} />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Total Spending</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">$24,550</div>
                <p className="text-muted-foreground">Last 7 months</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Average Monthly Spend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">$3,507</div>
                <p className="text-muted-foreground">Based on 7 months</p>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="monthly" className="mb-8">
            <TabsList>
              <TabsTrigger value="monthly">Monthly Overview</TabsTrigger>
              <TabsTrigger value="categories">Spending Categories</TabsTrigger>
              <TabsTrigger value="cards">Card Recommendations</TabsTrigger>
            </TabsList>
            <TabsContent value="monthly">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Spending</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={monthlyData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="amount" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="categories">
              <Card>
                <CardHeader>
                  <CardTitle>Spending by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={categoryData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {categoryData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="cards">
              <CardRecommendations />
            </TabsContent>
          </Tabs>

          <DetailedAnalysis />
        </>
      )}
    </div>
  );
};

export default SpendingAnalytics; 