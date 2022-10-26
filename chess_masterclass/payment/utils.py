from datetime import date, timedelta
import json
import hmac
import hashlib
import binascii
import base64
from urllib.parse import parse_qs

def exp_date():
    today = date.today()
    time_delta = timedelta(days=30)
    exp_date = today + time_delta    
    return exp_date

def parse_dotpay_response(data):
    # data need to be parsed 
    data_to_encode = {}
    for key, value in data.items():
        data_to_encode[key] = value[0]
    data_to_encode['id'] = data_to_encode["b'id"]
    data_to_encode.pop("b'id")
    data_to_encode['signature'] = data_to_encode['signature'][:-1]
    
    return data_to_encode

def createCHK(key, dict):
    json_dict = json.dumps(dict)
    json_dict = json_dict.replace(' ', "")
    print(json_dict)
    # print(type(json_dict))
    return hmac.new(bytes(key, 'utf-8'), msg=bytes(json_dict,'utf-8'), digestmod=hashlib.sha256).hexdigest()

def createResponseSignature(key, response_dict):
    response_dict.pop('signature')    
    sign_string = key
    for key,value in response_dict.items():
        sign_string += value   
    return hashlib.sha256(bytes(sign_string, 'utf-8')).hexdigest()

class DotPayHandler():
    def __init__(self, key, shop_id):
        self.key = key
        self.shop_id = shop_id
        
    def createDotPayRequest(self, price, user_id):
        # https://chess-masterclass.onrender.com
        # http://127.0.0.1:8000
        url = 'http://127.0.0.1:8000/payment/premium-plans/pay-back'
        urlc = 'http://127.0.0.1:8000/payment/premium-plans/pay-response'
        attr_dict = {
            "amount": str(price),
            "currency": "USD",
            "description": f'UserId:{user_id}',
            "id": str(self.shop_id),
            'ignore_last_payment_channel': '1',
            "paramsList": "amount;currency;description;id;ignore_last_payment_channel;type;url;urlc",
            "type": "0",
            "url": url,
            "urlc": urlc,
        }
        json_dict = json.dumps(attr_dict)
        json_dict = json_dict.replace(' ', "")
        chk = hmac.new(bytes(self.key, 'utf-8'), msg=bytes(json_dict,'utf-8'), digestmod=hashlib.sha256).hexdigest()
        attr_dict['chk'] = chk
        return attr_dict
    
    def checkResponseSignature(self, dotpay_response):
        dotpay_signature = dotpay_response['signature']
        dotpay_response.pop('signature')
        
        str_to_decode = self.key
        for key, value in dotpay_response.items():
            str_to_decode += value
            
        server_signature = hashlib.sha256(bytes(str_to_decode, 'utf-8')).hexdigest()
        
        if server_signature == dotpay_response:
            return True
        else:
            return False
            
