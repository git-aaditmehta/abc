from rest_framework import serializers
from .models import CreditCard

class CreditCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreditCard
        fields = ['id', 'card_number', 'card_holder', 'expiry_date', 'cvv', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at'] 