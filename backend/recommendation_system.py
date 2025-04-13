import pandas as pd
import os
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

class CreditCardRecommender:
    def __init__(self, database_path='database.csv'):
        try:
            if not os.path.exists(database_path):
                raise FileNotFoundError(f"Database file '{database_path}' not found. Please ensure the file exists.")
            
            # Load the CSV database
            self.credit_card_data = pd.read_csv(database_path)
            
            # Debug information before feature extraction
            print("Available columns in the CSV file:")
            print(self.credit_card_data.columns.tolist())
            
            # Fill NaN values with empty strings
            self.credit_card_data = self.credit_card_data.fillna('')
            
            # Extract features immediately after loading
            self.extract_features()
            
            print(f"Successfully loaded and processed {len(self.credit_card_data)} credit cards.")
            
        except Exception as e:
            print(f"Error initializing recommender: {str(e)}")
            raise

    def extract_features(self):
        """Extract and prepare features from credit card data for comparison"""
        # Create new columns for binary features
        self.credit_card_data['has_travel_benefits'] = self.credit_card_data['Travel Benefits'].str.contains('travel|airport|lounge', case=False).astype(int)
        self.credit_card_data['has_cashback'] = self.credit_card_data['Reward Structure'].str.contains('cashback|cash back', case=False).astype(int)
        self.credit_card_data['has_points'] = self.credit_card_data['Reward Structure'].str.contains('point|reward', case=False).astype(int)
        self.credit_card_data['has_dining'] = self.credit_card_data['Lifestyle Benefits'].str.contains('dining|restaurant', case=False).astype(int)
        self.credit_card_data['has_shopping'] = self.credit_card_data['Lifestyle Benefits'].str.contains('shopping|discount', case=False).astype(int)
        self.credit_card_data['has_premium'] = self.credit_card_data['Premium Services'].str.contains('premium|luxury|exclusive', case=False).astype(int)
        self.credit_card_data['has_entertainment'] = self.credit_card_data['Lifestyle Benefits'].str.contains('entertainment|movies|events', case=False).astype(int)

    def process_responses(self, responses):
        """Process questionnaire responses into a format for comparison"""
        user_profile = {}
        
        # Financial profile
        user_profile['annual_income'] = float(responses['annual_income'].replace('₹', '').replace(',', ''))
        user_profile['debt_to_income'] = responses.get('debt_to_income', 0)
        user_profile['total_obligations'] = sum(responses['obligations'].values())
        
        # Process credit score
        credit_score_map = {
            'Below 650': 600,
            '650-700': 675,
            '701-750': 725,
            '751-800': 775,
            'Above 800': 825,
            "I don't know my credit score": 650
        }
        user_profile['credit_score'] = credit_score_map.get(responses['credit_score_range'], 650)
        
        # Process monthly spending and determine top categories
        spending = responses['monthly_spending']
        user_profile['top_categories'] = sorted(spending.items(), key=lambda x: x[1], reverse=True)[:3]
        
        # Enhanced feature extraction
        user_profile['features'] = {
            'has_travel_benefits': (
                1 if (responses['travel_profile']['domestic_trips'] + 
                     responses['travel_profile']['international_trips'] > 2 or
                     responses['reward_preferences'].get('Travel miles/points', 5) <= 3)
                else 0
            ),
            'has_cashback': 1 if responses['reward_preferences'].get('Cashback on purchases', 5) <= 3 else 0,
            'has_points': 1,  # Default for reward tracking
            'has_dining': (
                1 if (responses['monthly_spending'].get('Dining out', 0) > 5000 or
                     responses['reward_preferences'].get('Dining benefits', 5) <= 3)
                else 0
            ),
            'has_shopping': (
                1 if (responses['monthly_spending'].get('Online shopping', 0) > 10000 or
                     responses['reward_preferences'].get('Shopping discounts', 5) <= 3)
                else 0
            ),
            'has_premium': (
                1 if (len(responses['premium_preferences']) >= 3 or
                     user_profile['annual_income'] > 1200000)
                else 0
            ),
            'has_entertainment': 1 if responses['reward_preferences'].get('Entertainment perks', 5) <= 3 else 0
        }
        
        # Add lifestyle indicators based on top spending categories
        for category, _ in user_profile['top_categories']:
            if 'Dining' in category:
                user_profile['features']['has_dining'] = 1
            elif 'Travel' in category:
                user_profile['features']['has_travel_benefits'] = 1
            elif 'shopping' in category.lower():
                user_profile['features']['has_shopping'] = 1
            elif 'Fuel' in category:
                user_profile['features']['has_fuel'] = 1
        
        # Process fee tolerance
        try:
            user_profile['max_annual_fee'] = float(responses['max_annual_fee'].replace('₹', '').replace(',', ''))
        except ValueError:
            user_profile['max_annual_fee'] = 1000  # Default
        
        # Process lifestyle indicators
        user_profile['lifestyle_score'] = self.calculate_lifestyle_score(responses)
        
        return user_profile

    def calculate_lifestyle_score(self, responses):
        """Calculate a lifestyle score based on spending patterns and preferences"""
        score = 0
        
        # Travel frequency impact
        travel_data = responses['travel_profile']
        score += min(5, travel_data['domestic_trips'] + travel_data['international_trips'] * 2)
        
        # Spending patterns impact
        monthly_spending = responses['monthly_spending']
        high_value_spending = sum([
            monthly_spending.get('Dining out', 0),
            monthly_spending.get('Entertainment', 0),
            monthly_spending.get('Travel', 0)
        ])
        score += min(5, high_value_spending / 20000)  # Normalize to 5-point scale
        
        # Premium preferences impact
        score += min(5, len(responses['premium_preferences']))
        
        return min(10, score)  # Normalize to 10-point scale

    def recommend_cards(self, user_profile, top_n=3):
        """Enhanced recommendation system with new features"""
        # Filter by eligibility (credit score and income)
        eligible_cards = self.credit_card_data[
            (self.credit_card_data['Min Credit Score'] <= user_profile['credit_score']) &
            (self.credit_card_data['Min Income Requirement'] <= user_profile['annual_income'])
        ]
        
        if len(eligible_cards) == 0:
            return [], "No cards match your credit score and income requirements. Try adjusting your profile."
        
        # Filter by annual fee if specified
        if user_profile['max_annual_fee'] > 0:
            eligible_cards['Annual Fee Numeric'] = pd.to_numeric(
                eligible_cards['Annual Fee'].replace('Not specified', np.nan), errors='coerce'
            )
            
            fee_filtered = eligible_cards[
                (eligible_cards['Annual Fee Numeric'] <= user_profile['max_annual_fee']) | 
                (eligible_cards['Annual Fee Numeric'].isna())
            ]
            
            if len(fee_filtered) > 0:
                eligible_cards = fee_filtered
        
        if len(eligible_cards) == 0:
            return [], "No cards match your fee preferences. Try adjusting your maximum fee."
        
        # Enhanced feature matching
        feature_cols = [
            'has_travel_benefits', 'has_cashback', 'has_points', 
            'has_dining', 'has_shopping', 'has_premium', 'has_entertainment'
        ]
        
        # Create weighted user vector based on lifestyle score
        weights = np.ones(len(feature_cols))
        weights[feature_cols.index('has_premium')] = user_profile['lifestyle_score'] / 10
        
        user_vector = np.array([[user_profile['features'][col] * weights[i] 
                               for i, col in enumerate(feature_cols)]])
        
        # Create card vectors
        card_vectors = eligible_cards[feature_cols].values
        
        # Calculate similarity
        similarity_scores = cosine_similarity(user_vector, card_vectors)[0]
        
        # Add similarity scores to cards
        eligible_cards = eligible_cards.copy()
        eligible_cards['match_score'] = similarity_scores
        
        # Sort by match score
        results = eligible_cards.sort_values('match_score', ascending=False).head(top_n)
        
        # Generate recommendations
        recommendations = []
        for _, card in results.iterrows():
            match_percentage = min(100, int(card['match_score'] * 100))
            recommendation = {
                'card_name': card['Card Name'],
                'issuer': card['Issuer'],
                'annual_fee': card['Annual Fee'],
                'joining_fee': card['Joining Fee'],
                'rewards': card['Reward Structure'],
                'premium_services': card['Premium Services'],
                'travel_benefits': card['Travel Benefits'],
                'lifestyle_benefits': card['Lifestyle Benefits'],
                'match_percentage': match_percentage,
                'match_reasons': self.generate_match_reasons(card, user_profile)
            }
            recommendations.append(recommendation)
        
        return recommendations, None
    
    def generate_match_reasons(self, card, user_profile):
        """Generate explanations for why a card was recommended"""
        reasons = []
        
        # Check eligibility
        if card['Min Credit Score'] <= user_profile['credit_score']:
            reasons.append(f"You meet the credit score requirement")
        
        if card['Min Income Requirement'] <= user_profile['annual_income']:
            reasons.append(f"You meet the income requirement")
        
        # Check benefits matches
        if user_profile['features']['has_travel_benefits'] and card['has_travel_benefits']:
            reasons.append("Offers travel benefits aligning with your interests")
            
        if user_profile['features']['has_premium'] and card['has_premium']:
            reasons.append("Includes premium services matching your preferences")
            
        if user_profile['features']['has_cashback'] and card['has_cashback']:
            reasons.append("Provides cashback rewards")
            
        if user_profile['features']['has_entertainment'] and card['has_entertainment']:
            reasons.append("Offers entertainment perks")
            
        if not reasons:
            reasons.append("Generally matches your overall profile and preferences")
        
        if card['Ideal For'] and str(card['Ideal For']).strip():
            reasons.append(f"Ideal for: {card['Ideal For']}")
                
        return reasons
