from rest_framework.views import APIView
from rest_framework import status, generics
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAdminUser, IsAuthenticatedOrReadOnly

from .serializers import PremiumPlansDescriptionsSerializer
from payment.models import PremiumPlansDescriptions, DotPayRespond, PaymentOrder
from payment.utils import exp_date, DotPayHandler, parse_dotpay_response
from member.models import User
from urllib.parse import parse_qs
from django.shortcuts import render
from django.http import HttpResponseRedirect
import os
from dotenv import load_dotenv, find_dotenv

# GET premium plans
class premiumPlans(APIView):
    authentication_classes = []
    permission_classes = [] 
    
    def get(self, request):
        premiumPlans = PremiumPlansDescriptions.objects.all()
        serializer = PremiumPlansDescriptionsSerializer(premiumPlans, many=True)
        
        return Response(serializer.data)
    
# handle singe premium plan
class premiumPlan(APIView):
    authentication_classes = []
    permission_classes = []     
    
    # sending premium plan data to fronteend -> IMPORTANT: this method sends data needed to make proper request to dotpay 
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

    # method which handles creating orders when trying to make payment -> order data is compared with POST request from external server (dotpay) to check if it is correct
    def post(self, request, id, credit):
        user = User.objects.get(id=id)
        if not PaymentOrder.objects.filter(user=user, isDone=False).exists():
            PaymentOrder.objects.create(user=user, selected_credit=float(credit))
            return Response({'msg': 'Order has been created.'}, status=status.HTTP_200_OK)
        else:
            return Response({'msg': 'Order is already created. Please wait or contact our support.'}, status=status.HTTP_400_BAD_REQUEST)
    
# redirecting to speicified website after making payment (exatcly after clicking button "Powrót do strony sklepu" on dotpay server)
class payTransactionDone(APIView):
    authentication_classes = []
    permission_classes = []     
    
    def post(self, request, *args, **kwargs):
        response_status = request.body.decode().split('=')[1]        
        if response_status == 'OK':
            return HttpResponseRedirect('https://chess-masterclass.onrender.com/payment/success')
        else:
            return HttpResponseRedirect('https://chess-masterclass.onrender.com/payment/failure')

# templates from above
def successLink(response):    
    return render(response, 'success.html') 

def failureLink(response):    
    return render(response, 'failure.html') 

# class to handle response from dotpay server -> at first signatures and order/payment data are compared:
class payTransactionResponse(APIView):
    authentication_classes = []
    permission_classes = [] 
    
    def post(self, request, *args, **kwargs):
        data = request.body
        parsed_data = parse_qs(str(data))
        load_dotenv(find_dotenv())       
        
        dotpay_response = parse_dotpay_response(parsed_data)
        user = User.objects.get(id=int(dotpay_response['description'].split(':')[1]))
        dotpay_id = str(os.getenv('DOTPAY_ID'))
        dotpay_pin = str(os.getenv('DOTPAY_PIN'))        
        payment = DotPayHandler(dotpay_pin, dotpay_id)

    # if it's OK -> create payment model and (via signals) changing User's premium plan and its expiration day
        if payment.checkResponseSignature(dotpay_response) and PaymentOrder.objects.filter(user=user, isDone=False, selected_credit=float(dotpay_response['operation_original_amount'])).exists():   
            print('signature is ok')         
            DotPayRespond.objects.create(user=user, 
                                        operation_number=dotpay_response['operation_number'],
                                        operation_status=dotpay_response['operation_status'],
                                        operation_amount=float(dotpay_response['operation_original_amount']),
                                        operation_datatime=dotpay_response['operation_datetime'],
                                        email=dotpay_response['email'],
                                        expiration_date=exp_date(),
                                        )
            pay_order = PaymentOrder.objects.filter(user=user, isDone=False, selected_credit=float(dotpay_response['operation_original_amount']))[0]
            pay_order.isDone = True
            pay_order.save()
        else:
            print('wrong signature')                
        return Response('OK')   # response to dotpay server (from their docs)
    
