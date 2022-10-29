from datetime import date, timedelta
import json
import hmac
import hashlib

# function to get today date + 30 days
def exp_date():
    today = date.today()
    time_delta = timedelta(days=30)
    exp_date = today + time_delta    
    return exp_date

# dotpay API parser
def parse_dotpay_response(data):
    # data need to be parsed 
    data_to_encode = {}
    for key, value in data.items():
        data_to_encode[key] = value[0]
    data_to_encode.pop("b'id")
    data_to_encode['signature'] = data_to_encode['signature'][:-1]    
    return data_to_encode

# class to handle dotpay API
class DotPayHandler():
    def __init__(self, key, shop_id):
        self.key = key
        self.shop_id = shop_id
        
    # method to create GET content -> create dict with values which gonna be sended to dotpay server
    def createDotPayRequest(self, price, user_id):
        url = 'https://chess-masterclass.onrender.com/payment/premium-plans/pay-back'
        urlc = 'https://chess-masterclass.onrender.com/payment/premium-plans/pay-response'
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
        chk = hmac.new(bytes(str(self.key), 'utf-8'), msg=bytes(str(json_dict),'utf-8'), digestmod=hashlib.sha256).hexdigest()
        attr_dict['chk'] = chk
        return attr_dict
    
    # method to handle POST (urlc) from dotpay server -> checking correctness of signature and data sended by external server (should be dotpay server but who knows..)
    def checkResponseSignature(self, dotpay_response):
        dotpay_signature = dotpay_response['signature']
        dotpay_response.pop('signature')
        
        str_to_decode = self.key + self.shop_id
        for key, value in dotpay_response.items():
            str_to_decode += value
        server_signature = hashlib.sha256(bytes(str_to_decode, 'utf-8')).hexdigest()
        
        if server_signature == dotpay_signature and dotpay_response['operation_status'] == 'completed':
            print(True)
            return True
        else:
            print(False)
            return False
            
