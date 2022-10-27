from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAdminUser, IsAuthenticatedOrReadOnly

from .serializers import PremiumPlansDescriptionsSerializer
from payment.models import PremiumPlansDescriptions
from payment.utils import exp_date, DotPayHandler, parse_dotpay_response
from main.models import ChessCourse
from member.models import User
from datetime import date, timedelta
from urllib.parse import parse_qs

class premiumPlans(APIView):
    authentication_classes = []
    permission_classes = [] 
    
    def get(self, request):
        premiumPlans = PremiumPlansDescriptions.objects.all()
        serializer = PremiumPlansDescriptionsSerializer(premiumPlans, many=True)
        
        return Response(serializer.data)
    
    

from decimal import Decimal
import requests
import json
from django.http import HttpResponseRedirect
import os
from dotenv import load_dotenv, find_dotenv
import sys
    
class premiumPlan(APIView):
    authentication_classes = []
    permission_classes = [] 
    
    
    def get(self, request, id, slug):          
        premiumPlan = PremiumPlansDescriptions.objects.get(slug=slug)
        serializer = PremiumPlansDescriptionsSerializer(premiumPlan, many=False)
        load_dotenv(find_dotenv())
        price = PremiumPlansDescriptions.objects.get(slug=slug).price
        user_id = User.objects.get(id=id).id
        dotpay_id = str(os.getenv('DOTPAY_ID'))
        dotpay_pin = str(os.getenv('DOTPAY_PIN'))
        payment = DotPayHandler(dotpay_pin, dotpay_id)
        dotpay_call = payment.createDotPayRequest(price, user_id)
        
        return Response({'data': serializer.data, 'exp_date': exp_date(), 'dotpay_call': dotpay_call}) 

from django.shortcuts import render
import hmac
import hashlib
import binascii
import base64

from django.views.decorators.csrf import csrf_exempt
from urllib.parse import urlparse
from django.http import HttpResponseRedirect

class payTransactionDone(APIView):
    authentication_classes = []
    permission_classes = []     
    
    def post(self, request, *args, **kwargs):
        response_status = request.body.decode().split('=')[1]        
        if response_status == 'OK':
            return HttpResponseRedirect('https://chess-masterclass.onrender.com/payment/success')
        else:
            return HttpResponseRedirect('https://chess-masterclass.onrender.com/payment/failure')

class payTransactionResponse(APIView):
    authentication_classes = []
    permission_classes = [] 
    
    def post(self, request, *args, **kwargs):
        data = request.body
        parsed_data = parse_qs(str(data))
        load_dotenv(find_dotenv())       
        
        dotpay_response = parse_dotpay_response(parsed_data)
        dotpay_id = str(os.getenv('DOTPAY_ID'))
        dotpay_pin = str(os.getenv('DOTPAY_PIN'))        
        payment = DotPayHandler(dotpay_pin, dotpay_id)
        
        if checkResponseSignature(dotpay_response) and dotpay_response['operation_status'] == 'completed':            
            DotPayRespond.objects.create(user=User.objects.get(id=int(dotpay_response['description'].split(':')[1])), 
                                        operation_number=dotpay_response['operation_number'],
                                        operation_status=dotpay_response['operation_status'],
                                        operation_amount=dotpay_response['operation_amount'],
                                        operation_datatime=dotpay_response['operation_datetime'],
                                        email=dotpay_response['email'],
                                        expiration_date=exp_date(),
                                        )
        else:
            print('wrong signature')                
        return Response('OK')
    
def successLink(response):    
    return render(response, 'success.html') 

def failureLink(response):    
    return render(response, 'failure.html') 