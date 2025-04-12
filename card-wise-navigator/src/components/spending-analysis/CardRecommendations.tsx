import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CreditCard } from "lucide-react";

// Sample card benefits data - replace with actual data from your backend
const cardBenefits = {
  "HDFC Diners Club Black Credit Card": {
    categories: [
      { category: "Airport Lounge", benefit: "Unlimited lounge access" },
      { category: "Dining", benefit: "4x reward points" },
      { category: "Travel", benefit: "5x reward points" },
    ]
  },
  "Amazon Pay ICICI Credit Card": {
    categories: [
      { category: "Amazon Shopping", benefit: "5% cashback" },
      { category: "Online Shopping", benefit: "2% cashback" },
      { category: "Utilities", benefit: "1% cashback" },
    ]
  },
  // Add more cards as needed
};

const creditCards = [
  "HDFC Diners Club Black Credit Card",
  "Amazon Pay ICICI Credit Card",
  "SBI SimplyCLICK Credit Card",
  "HDFC Regalia Credit Card",
  "Flipkart Axis Bank Credit Card",
  "Standard Chartered Manhattan Credit Card",
  "American Express Platinum Card",
  "HDFC Millennia Credit Card",
  "SBI ELITE Credit Card",
  "ICICI Bank Emeralde Credit Card",
  "Axis Bank Vistara Infinite Credit Card",
  "IDFC FIRST Wealth Credit Card",
  "Citi Prestige Credit Card",
  "HSBC Visa Platinum Credit Card",
  "Kotak 811 Dream Different Credit Card",
  "IndusInd Iconia Amex Credit Card",
  "RBL Bank Shoprite Credit Card",
  "YES Bank Premia Credit Card",
  "ICICI Bank HPCL Coral Credit Card",
  "SBI Card PRIME",
  "HDFC Infinia Credit Card",
  "Axis Bank ACE Credit Card",
  "Bajaj Finserv RBL Bank SuperCard",
  "HDFC MoneyBack Credit Card",
  "AU Small Finance Bank LIT Credit Card",
  "ICICI Bank Coral Credit Card",
  "Axis Bank My Zone Credit Card",
  "SBI SimplySAVE Credit Card",
  "American Express Membership Rewards Card",
  "IDFC FIRST Millennia Credit Card",
  "Axis Bank Magnus Credit Card"
];

const spendingCategories = [
  { category: "Dining", amount: 1200 },
  { category: "Shopping", amount: 800 },
  { category: "Travel", amount: 1000 },
  { category: "Groceries", amount: 500 },
  { category: "Entertainment", amount: 500 },
  { category: "Utilities", amount: 300 },
  { category: "Fuel", amount: 400 }
];

const CardRecommendations = () => {
  const [selectedCard, setSelectedCard] = useState<string>("");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Card Usage Recommendations
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="text-sm font-medium mb-2 block">Select Your Card</label>
          <Select value={selectedCard} onValueChange={setSelectedCard}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose a credit card" />
            </SelectTrigger>
            <SelectContent>
              {creditCards.map((card) => (
                <SelectItem key={card} value={card}>
                  {card}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedCard && (
          <>
            <div>
              <h3 className="text-lg font-semibold mb-4">Best Uses for {selectedCard}</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Spending Category</TableHead>
                    <TableHead>Monthly Spend</TableHead>
                    <TableHead>Card Benefit</TableHead>
                    <TableHead>Recommendation</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {spendingCategories.map((spend) => (
                    <TableRow key={spend.category}>
                      <TableCell>{spend.category}</TableCell>
                      <TableCell>${spend.amount}</TableCell>
                      <TableCell>
                        {cardBenefits[selectedCard as keyof typeof cardBenefits]?.categories.find(
                          (b) => b.category === spend.category
                        )?.benefit || "Standard rewards"}
                      </TableCell>
                      <TableCell>
                        {cardBenefits[selectedCard as keyof typeof cardBenefits]?.categories.find(
                          (b) => b.category === spend.category
                        ) ? (
                          <span className="text-green-600 font-medium">Recommended ✓</span>
                        ) : (
                          <span className="text-gray-500">Consider alternatives</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default CardRecommendations; 