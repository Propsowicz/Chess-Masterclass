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
from dotenv import load_dotenv

    
class premiumPlan(APIView):
    authentication_classes = []
    permission_classes = [] 
    
    
    def get(self, request, id, slug):          
        premiumPlan = PremiumPlansDescriptions.objects.get(slug=slug)
        serializer = PremiumPlansDescriptionsSerializer(premiumPlan, many=False)
        load_dotenv()
        price = PremiumPlansDescriptions.objects.get(slug=slug).price
        user_id = User.objects.get(id=id).id
        # shop_id = str(os.getenv('DOTPAY_ID'))
        shop_id = str(os.environ.get('DOTPAY_ID'))
        print(shop_id)
        payment = DotPayHandler(str(os.environ.get('DOTPAY_PIN')), shop_id)
        dotpay_call = payment.createDotPayRequest(price, user_id)
        
        return Response({'data': serializer.data, 'exp_date': exp_date(), 'dotpay_call': dotpay_call})
    
    # def post(self, request, id, slug):
    #     print('pay call')x
        
    #     url = 'https://ssl.dotpay.pl/test_payment/'
    #     data = {
    #         'api_version': 'next',
    #         'id': '746269',
    #         'amount': 19.99,
    #         'currency': 'USD',
    #         'description': 'some test',
    #         'chk': 19.99,
    #     }
      
    #     # requests.post(url, data=json.dumps(data))
        
    #     # return HttpResponseRedirect(redirect_to='https://ssl.dotpay.pl/test_payment/')
    #     # return HttpResponseRedirect(redirect_to='https://ssl.dotpay.pl/test_payment/?chk=c583c8e71cf4ec668c3ebe6cae12ff8f4adf55e6bb5b43d3222974d34e48a9f7&pid=awouwdo3dnrgm0dq0kvfa3h38noauq6l')
    #     return Response('ere')

from django.shortcuts import render
import hmac
import hashlib
import binascii
import base64
from payment.utils import createCHK, createResponseSignature
from django.views.decorators.csrf import csrf_exempt
from urllib.parse import urlparse
from django.http import HttpResponseRedirect



@csrf_exempt
def payView(request, *args, **kwargs):
    
    
   
    # secret_key = b'2gOmPw671IouFoDLF6yR8CDZpjz7NjJU'
    params_ex = {
         "amount": "98.53",
         "currency": "USD",
         "description": "Order123",
         "id": "123456",
         "paramsList": "amount;currency;description;id;type;url",
         "type": "0",
         "url": "https://www.example.com/thanks_page.php"
    }
    
    params = {
         "amount": "50.00",
         "currency": "PLN",
         "description": "Test",
         "id": "746269",
         'ignore_last_payment_channel': '1',
         "paramsList": "amount;currency;description;id;ignore_last_payment_channel;type;url;urlc",
         "type": "0",
         "url": "https://chess-masterclass.onrender.com/payment/premium-plans/pay",
         "urlc": "https://chess-masterclass.onrender.com/payment/premium-plans/pay-ok",
    }
    # jsoned_params = json.dumps(params)
    # # elo = '{"amount": "50.00","currency":"PLN","description":"Testowa płatność","id":"746269","paramsList":"amount;currency;description;id;type;url","type":"0","url":"http://127.0.0.1:8000/"}'
    # # signature = hmac.new(secret_key, elo, hashlib.sha256).hexdigest()
    # # print("signature = {0}".format(signature))
    # # byte_key = binascii.unhexlify('2gOmPw671IouFoDLF6yR8CDZpjz7NjJU')
    # # message = jsoned_params.encode('utf-8')   
    # # x = hmac.new(b'POlj9b2xIl87u1hCauuT4SFw6RmF01Tuy', msg=message, digestmod=hashlib.sha256).hexdigest()
    # # print(x)
    # # z = base64.b64encode(x).decode()
    # elo = jsoned_params.replace(' ', '')
    # # print(elo)
    # y = hmac.new(bytes('2gOmPw671IouFoDLF6yR8CDZpjz7NjJU', 'utf-8'), msg=bytes(elo,'utf-8'), digestmod=hashlib.sha256).hexdigest()
    # print(y)
    respond_from_dotpay = {'id': '746269',
                            'operation_number': 'M9952-74684',
                            'operation_type': 'payment',
                            'operation_status': 'completed',
                            'operation_amount': '50.00',
                            'operation_currency': 'PLN',
                            'operation_original_amount': '50.00',
                            'operation_original_currency': 'PLN',
                            'operation_datetime': '2022-10-25 20:16:53',
                            'description': 'Test',
                            'email': 'qwe@qdqwe.qwe',
                            'p_info': 'Test User (tomasiktomasz00@gmail.com)',
                            'p_email': 'tomasiktomasz00@gmail.com',
                            'channel': '1',
                            'signature': '1f27e59d81152b7469e3137633aedd6ff889d2d64678f0a170e45f68419c16a6',
                            }
    
    
    strrr = '2gOmPw671IouFoDLF6yR8CDZpjz7NjJU746269M9952-74684paymentcompleted50.00PLN50.00PLN2022-10-25 20:16:53Testqwe@qdqwe.qweTest User (tomasiktomasz00@gmail.com)tomasiktomasz00@gmail.com1'
    # 'signature': '1f27e59d81152b7469e3137633aedd6ff889d2d64678f0a170e45f68419c16a6'
    
    passs = hashlib.sha256(bytes(strrr, 'utf-8')).hexdigest()       # to działa
    print(passs)

    x = sorted(respond_from_dotpay)
    dictt = {}
    for i in x:
        dictt[i] = respond_from_dotpay[i]
    print(dictt)
    
    print('nowy kod ' + createCHK('2gOmPw671IouFoDLF6yR8CDZpjz7NjJU', params))
    print('kod ze stronki ' + createResponseSignature('2gOmPw671IouFoDLF6yR8CDZpjz7NjJU', respond_from_dotpay))
    
    # *TODO zrobić api do przesyłania informacji do fornt endu (wraz z generacja urlci chk i zmiennymi paramterami takimi jak username(w urlc) i kwota) >> sprawdzenie signature i signatury z funkcji >> zapis w bazie dnaych jesli wszytsko gra
    # *! uwaga zmieniam PIN w DOTPAY
    
    form = {      
         
    }
    
    return render(request, 'payment.html', {'form': form})


from urllib.parse import parse_qs

@csrf_exempt
def payViewOK(request):
    
    return render(request, 'ok.html', {'n': 'n'})


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
    
    # @csrf_exempt
    def post(self, request, *args, **kwargs):
        data = request.body
        parsed_data = parse_qs(str(data))
        
        
        # parsed_data to praWIDŁOWA WARTOSC
        # respond_from_dotpay = {"b'id": ['746269'],
        #                        'operation_number': ['M9952-74684'],
        #                        'operation_type': ['payment'],
        #                        'operation_status': ['completed'],
        #                        'operation_amount': ['50.00'],
        #                        'operation_currency': ['PLN'],
        #                        'operation_original_amount': ['50.00'],
        #                        'operation_original_currency': ['PLN'],
        #                        'operation_datetime': ['2022-10-25 20:16:53'],
        #                        'description': ['Test'],
        #                        'email': ['qwe@qdqwe.qwe'],
        #                        'p_info': ['Test User (tomasiktomasz00@gmail.com)'],
        #                        'p_email': ['tomasiktomasz00@gmail.com'],
        #                        'channel': ['1'],
        #                        'signature': ["1f27e59d81152b7469e3137633aedd6ff889d2d64678f0a170e45f68419c16a6'"]
        #                        }
        dotpay_response = parse_dotpay_response(parsed_data)
        
        payment = DotPayHandler(str(os.getenv('DOTPAY_PIN')), '746269')
        
        if checkResponseSignature(dotpay_response):            
            DotPayRespond.objects.create(user=dotpay_response['description'].split(':')[1], 
                                        operation_number=dotpay_response['operation_number'],
                                        operation_status=dotpay_response['operation_status'],
                                        operation_amount=dotpay_response['operation_amount'],
                                        operation_datatime=dotpay_response['operation_datatime'],
                                        email=dotpay_response['email'],
                                        )
        else:
            print('wrong signature')
        # print(respond_from_dotpay)
        # dictionary = {}
        # for key, value in respond_from_dotpay.items():
        #     dictionary[key] = value[0]
        # signature = dictionary['signature'][:-1] 
        # print(dictionary)
        # print(signature)asdasd
        
        return Response('note')
    
    

