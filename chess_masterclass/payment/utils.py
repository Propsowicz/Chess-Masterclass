from datetime import date, timedelta
import json
import hmac
import hashlib
import binascii
import base64

def exp_date():
    today = date.today()
    time_delta = timedelta(days=30)
    exp_date = today + time_delta    
    return exp_date

def createCHK(key, dict):
    json_dict = json.dumps(dict)
    json_dict = json_dict.replace(' ', "")
    print(json_dict)
    print(type(json_dict))
    return hmac.new(bytes(key, 'utf-8'), msg=bytes(json_dict,'utf-8'), digestmod=hashlib.sha256).hexdigest()
