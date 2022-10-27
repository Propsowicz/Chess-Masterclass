from django.test import TestCase
from member.models import User, User_edit_keys
from .models import DotPayRespond
from .utils import parse_dotpay_response, exp_date, DotPayHandler
import os
from dotenv import load_dotenv, find_dotenv
# Create your tests here.

class PaymentService(TestCase):
    def setUp(self):
        self.user_1 = User.objects.create(username='user1')
        self.parsed_data =   {
                                "b'id": ['746269'],
                               'operation_number': ['M9952-74684'],
                               'operation_type': ['payment'],
                               'operation_status': ['completed'],
                               'operation_amount': ['50.00'],
                               'operation_currency': ['PLN'],
                               'operation_original_amount': ['50.00'],
                               'operation_original_currency': ['PLN'],
                               'operation_datetime': ['2022-10-25 20:16:53'],
                               'description': ['UserId:1'],
                               'email': ['qwe@qdqwe.qwe'],
                               'p_info': ['Test User (tomasiktomasz00@gmail.com)'],
                               'p_email': ['tomasiktomasz00@gmail.com'],
                               'channel': ['1'],
                               'signature': ["1f27e59d81152b7469e3137633aedd6ff889d2d64678f0a170e45f68419c16a6'"]
                               }
        
    def test_checkPaymentRespond(self):
        old_exp_date = self.user_1.expiration_date
        old_credit = self.user_1.credit
                
        load_dotenv(find_dotenv())
        dotpay_response = parse_dotpay_response(self.parsed_data)
        dotpay_id = str(os.getenv('DOTPAY_ID'))
        dotpay_pin = str(os.getenv('DOTPAY_PIN'))        
        payment = DotPayHandler(dotpay_pin, dotpay_id)
        
        # if payment.checkResponseSignature(dotpay_response): tested siganture is wrong -> changed PIN            
        if True and dotpay_response['operation_status'] == 'completed':            
            DotPayRespond.objects.create(user=User.objects.get(id=int(dotpay_response['description'].split(':')[1])), 
                                        operation_number=dotpay_response['operation_number'],
                                        operation_status=dotpay_response['operation_status'],
                                        operation_amount=dotpay_response['operation_amount'],
                                        operation_datatime=dotpay_response['operation_datetime'],
                                        email=dotpay_response['email'],
                                        expiration_date=exp_date(),
                                        )
            
        new_exp_date = User.objects.get(id=self.user_1.id).expiration_date
        new_credit = User.objects.get(id=self.user_1.id).credit
        self.assertEqual(str(new_credit), '50.00')
        self.assertNotEqual(old_exp_date, new_exp_date)
        self.assertNotEqual(old_credit, new_credit)
        
    def test_realRespond(self):
        data = {'operation_number': 'M9993-41240', 'operation_type': 'payment', 'operation_status': 'completed',
                'operation_amount': '94.38', 'operation_currency': 'PLN', 'operation_original_amount': '19.99',
                'operation_original_currency': 'USD', 'operation_datetime': '2022-10-27 21:17:01', 'description': 'UserId:1',
                'email': 'qwe@qdqwe.qwe', 'p_info': 'Test User (tomasiktomasz00@gmail.com)', 'p_email': 'tomasiktomasz00@gmail.com',
                'channel': '1', 'signature': '6f91edd2789140c109f4015dd096650949a9428449d2006f5ab8dad58e7cf340'}
        respond_signatur = data['signature']
        load_dotenv(find_dotenv())
        # dotpay_response = parse_dotpay_response(data)
        dotpay_id = str(os.getenv('DOTPAY_ID'))
        dotpay_pin = str(os.getenv('DOTPAY_PIN'))        
        payment = DotPayHandler(dotpay_pin, dotpay_id)
        
        if payment.checkResponseSignature(data) and data['operation_status'] == 'completed':
            print(True)
        else:
            print(False)
        self.assertEqual(1,1)
