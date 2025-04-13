from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import CreditCard
from .serializers import CreditCardSerializer
import sys
import os

# Import the recommendation system
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from recommendation_system import CreditCardRecommender

# Initialize the recommender
try:
    recommender = CreditCardRecommender()
except Exception as e:
    print(f"Error initializing recommender: {e}")
    recommender = None

# Create your views here.

class CreditCardViewSet(viewsets.ModelViewSet):
    queryset = CreditCard.objects.all()
    serializer_class = CreditCardSerializer

    @action(detail=False, methods=['post'])
    def validate(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            # Here you can add additional validation logic
            return Response({'valid': True, 'message': 'Card is valid'})
        return Response({'valid': False, 'errors': serializer.errors}, status=400)
    
    @action(detail=False, methods=['post'])
    def get_recommendations(self, request):
        """
        Process financial profile form data and return credit card recommendations
        """
        if recommender is None:
            return Response(
                {'error': 'Recommendation system is not available'}, 
                status=status.HTTP_503_SERVICE_UNAVAILABLE
            )
        
        try:
            # Format incoming form data for the recommender
            form_data = request.data
            
            # Map the form data to the format expected by the recommender
            mapped_data = {
                # Financial Profile Assessment
                'annual_income': str(form_data.get('annualIncome', 0)),
                'credit_score_range': self._map_credit_score(form_data.get('creditScoreRange', 'unknown')),
                'debt_to_income': self._calculate_dti(form_data.get('debtToIncomeRatio', {})),
                
                # Map financial obligations to a dictionary for the recommender
                'obligations': self._extract_obligations(form_data.get('financialObligations', [])),
                
                # Monthly spending
                'monthly_spending': form_data.get('monthlySpending', {}),
                
                # Transaction frequency
                'transaction_frequency': form_data.get('transactionFrequency', {}),
                
                # Seasonal spending patterns
                'seasonal_spending': form_data.get('seasonalSpending', {}),
                
                # Payment habits
                'payment_habits': form_data.get('paymentHabits', 'fullBalance'),
                'card_usage': form_data.get('cardUsage', {}),
                'preferred_payment_methods': form_data.get('preferredPaymentMethods', {}),
                
                # Travel profile
                'travel_profile': form_data.get('travelFrequency', {}),
                
                # Shopping preferences
                'shopping_preferences': form_data.get('shoppingPreferences', {}),
                
                # Lifestyle activities
                'lifestyle_activities': form_data.get('lifestyleActivities', []),
                
                # Reward preferences
                'reward_preferences': self._format_reward_preferences(form_data.get('rewardPreferences', {})),
                
                # Premium preferences
                'premium_preferences': form_data.get('premiumServices', []),
                
                # Fee tolerances
                'max_annual_fee': str(form_data.get('feeTolerances', {}).get('maximumAnnualFee', 1000)),
                
                # Prestige importance
                'prestige_importance': form_data.get('prestigeImportance', 'somewhat')
            }
            
            # Process the mapped data through the recommender
            user_profile = recommender.process_responses(mapped_data)
            recommendations, error_message = recommender.recommend_cards(user_profile, top_n=5)
            
            if error_message:
                return Response({'error': error_message}, status=status.HTTP_400_BAD_REQUEST)
            
            return Response({
                'recommendations': recommendations,
                'user_profile': {
                    'top_categories': [{'category': cat, 'amount': amt} for cat, amt in user_profile.get('top_categories', [])],
                    'lifestyle_score': user_profile.get('lifestyle_score', 0)
                }
            })
            
        except Exception as e:
            import traceback
            print(traceback.format_exc())
            return Response(
                {'error': f'Error processing recommendation: {str(e)}'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    def _map_credit_score(self, credit_score):
        """Map the credit score range to the format expected by the recommender"""
        credit_score_mapping = {
            'unknown': "I don't know my credit score",
            '300-600': 'Below 650',
            '601-650': '650-700',
            '651-700': '650-700',
            '701-750': '701-750',
            '751-800': '751-800',
            '801-900': 'Above 800'
        }
        return credit_score_mapping.get(credit_score, "I don't know my credit score")
    
    def _calculate_dti(self, dti_data):
        """Calculate debt to income ratio from form data"""
        if dti_data.get('notSure', True):
            return 0
        
        monthly_debt = float(dti_data.get('monthlyDebt', 0))
        monthly_income = float(dti_data.get('monthlyIncome', 1))
        
        if monthly_income > 0:
            return monthly_debt / monthly_income
        return 0
    
    def _extract_obligations(self, obligations):
        """Format the financial obligations for the recommender"""
        result = {}
        for obligation in obligations:
            # Set a default value for each obligation
            result[obligation] = 1000
        return result
    
    def _format_reward_preferences(self, preferences):
        """Format reward preferences to the expected format"""
        result = {}
        name_mapping = {
            'cashback': 'Cashback on purchases',
            'travelMiles': 'Travel miles/points',
            'shoppingDiscounts': 'Shopping discounts',
            'diningBenefits': 'Dining benefits',
            'entertainmentPerks': 'Entertainment perks'
        }
        
        for key, value in preferences.items():
            if key in name_mapping:
                result[name_mapping[key]] = value
        
        return result
