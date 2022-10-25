from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAdminUser, IsAuthenticatedOrReadOnly

from .serializers import PremiumPlansDescriptionsSerializer
from payment.models import PremiumPlansDescriptions
from payment.utils import exp_date
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

    
class premiumPlan(APIView):
    authentication_classes = []
    permission_classes = [] 
    
    
    def get(self, request, slug):          
        premiumPlan = PremiumPlansDescriptions.objects.get(slug=slug)
        serializer = PremiumPlansDescriptionsSerializer(premiumPlan, many=False)
        
        return Response({'data': serializer.data, 'exp_date': exp_date()})
    
    def post(self, request, slug):
        print('pay call')
        
        url = 'https://ssl.dotpay.pl/test_payment/'
        data = {
            'api_version': 'next',
            'id': '746269',
            'amount': 19.99,
            'currency': 'USD',
            'description': 'some test',
            'chk': 19.99,
        }
      
        # requests.post(url, data=json.dumps(data))
        
        # return HttpResponseRedirect(redirect_to='https://ssl.dotpay.pl/test_payment/')
        # return HttpResponseRedirect(redirect_to='https://ssl.dotpay.pl/test_payment/?chk=c583c8e71cf4ec668c3ebe6cae12ff8f4adf55e6bb5b43d3222974d34e48a9f7&pid=awouwdo3dnrgm0dq0kvfa3h38noauq6l')
        return Response('ere')

from django.shortcuts import render
import hmac
import hashlib
import binascii
import base64
from payment.utils import createCHK
from django.views.decorators.csrf import csrf_exempt
from urllib.parse import urlparse




@csrf_exempt
def payView(request, *args, **kwargs):
    print(request.POST)
    print(request.META['REMOTE_ADDR'])
    print(kwargs)
    print(args)
    
    try:
        post = urlparse.parse_qs(request._raw_post_data)
    except AttributeError:
        post = request.POST
    print(post)
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
    
    print('nowy kod ' + createCHK('2gOmPw671IouFoDLF6yR8CDZpjz7NjJU', params))
    
    form = {
        "amount": "50.00",
         "currency": "PLN",
         "description": "Test",
         "id": "746269",
         "chk": createCHK('2gOmPw671IouFoDLF6yR8CDZpjz7NjJU', params),
         "type": "0",
         "url": "http://127.0.0.1:8000/",
         
    }
    
    return render(request, 'payment.html', {'form': form})


from urllib.parse import parse_qs

@csrf_exempt
def payViewOK(request):
    
    return render(request, 'ok.html', {'n': 'n'})

class payResponse(APIView):
    authentication_classes = []
    permission_classes = [] 
    
    @csrf_exempt
    def post(self, request, *args, **kwargs):
        print('POST METHOD')
        x = request.body
        print(x)
        y = parse_qs(x)
        print(y)
        z = parse_qs(str(x))
        print(z)
        
        return Response('note')
    
    def get(self, request, *args, **kwargs):
        print('GET METHOD')
        return Response('note')

# @csrf_exempt
# def fetchDATA(request):
#     if request.method == 'POST':
        
#         print(request)
#         print(request.body)
        
        
#     return JsonResponse('cart is completed', safe=False)

