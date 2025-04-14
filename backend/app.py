from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import pandas as pd
from recommendation_system import CreditCardRecommender

app = Flask(__name__)

# Enable CORS for development
CORS(app, resources={
    r"/*": {
        "origins": "*",  # Allow all origins during development
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Accept", "Origin"],
    }
})

# Print all registered routes for debugging
print("Registered Routes:")
print(app.url_map)

# Initialize the recommender model
try:
    recommender = CreditCardRecommender(database_path='./data/database.csv')
    print("Credit Card Recommender initialized successfully")
except Exception as e:
    print(f"Error initializing recommender: {str(e)}")
    recommender = None

@app.route('/')
def index():
    """Root endpoint for testing"""
    return jsonify({"message": "Credit Card Recommender API is running"})

@app.route('/api/health', methods=['GET'])
def health_check():
    """Simple health check endpoint"""
    return jsonify({"status": "ok", "message": "Credit Card Recommender API is running"})

@app.route('/api/recommend', methods=['POST'])
def recommend_cards():
    """Process user data and return credit card recommendations"""
    print("Received request to /api/recommend")
    print("Request method:", request.method)
    print("Request headers:", dict(request.headers))
    
    if not recommender:
        return jsonify({"error": "Recommender model not initialized"}), 500
    
    try:
        # Get data from request
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400
        
        print("Received data for processing:", data)
        
        # Process the frontend data into the format expected by the recommender
        user_profile = format_user_data(data)
        
        # Get recommendations from the model
        recommendations, error = recommender.recommend_cards(user_profile, top_n=3)
        
        if error:
            return jsonify({"error": error}), 400
            
        # Return formatted recommendations
        return jsonify(recommendations)
        
    except Exception as e:
        print(f"Error processing recommendation: {str(e)}")
        return jsonify({"error": f"Failed to process recommendation: {str(e)}"}), 500

def format_user_data(frontend_data):
    """Convert frontend data format to the format expected by the recommender model"""
    # Create user profile structure that matches what the CreditCardRecommender expects
    user_profile = {
        'annual_income': frontend_data.get('income', 0),
        'credit_score': frontend_data.get('creditScore', 650),
        'max_annual_fee': frontend_data.get('maxAnnualFee', 5000),
        'lifestyle_score': frontend_data.get('lifestyleScore', 5),
        
        # Extract top spending categories
        'top_categories': [(cat['category'], cat['amount']) for cat in frontend_data.get('topCategories', [])],
        
        # Format features based on frontend data
        'features': {
            'has_travel_benefits': 1 if (
                frontend_data.get('travelFrequency', {}).get('domestic', 0) +
                frontend_data.get('travelFrequency', {}).get('international', 0) > 2
            ) else 0,
            'has_cashback': 1 if get_reward_preference(frontend_data, 'cashback') <= 3 else 0,
            'has_points': 1,  # Default for reward tracking
            'has_dining': 1 if get_reward_preference(frontend_data, 'diningBenefits') <= 3 else 0,
            'has_shopping': 1 if get_reward_preference(frontend_data, 'shoppingDiscounts') <= 3 else 0,
            'has_premium': 1 if ('premiumServices' in frontend_data and 
                              len(frontend_data['premiumServices']) >= 3) or 
                           frontend_data.get('income', 0) > 1200000 else 0,
            'has_entertainment': 1 if get_reward_preference(frontend_data, 'entertainmentPerks') <= 3 else 0,
        },
        
        # Process monthly spending data
        'monthly_spending': frontend_data.get('spendingCategories', {})
    }
    
    # Check for top spending categories and update features accordingly
    for category_info in frontend_data.get('topCategories', []):
        category = category_info.get('category', '').lower()
        if 'dining' in category:
            user_profile['features']['has_dining'] = 1
        elif 'travel' in category:
            user_profile['features']['has_travel_benefits'] = 1
        elif 'shopping' in category:
            user_profile['features']['has_shopping'] = 1
        elif 'fuel' in category or 'transport' in category:
            user_profile['features']['has_fuel'] = 1
    
    return user_profile

def get_reward_preference(data, preference_key):
    """Helper function to safely extract reward preferences"""
    if 'rewardPreferences' in data and preference_key in data['rewardPreferences']:
        return data['rewardPreferences'][preference_key]
    return 5  # Default to low priority if not specified

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)