from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import CreditCard
from .serializers import CreditCardSerializer

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
