from django.test import TestCase
from member.models import User, User_edit_keys
import django.contrib.auth.password_validation as validators
from datetime import date, timedelta
from .utils import AccountOperations
import json
from django.contrib.auth import authenticate

# User managment tests
class MemberServiceTest(TestCase):
    def setUp(self):
        user_1 = User.objects.create(username='user1', email='somerandom@notexistingmail.com')
        user_1.set_password = 'password_123'
        user_1.save()
        user_2 = User.objects.create(username='user2', email='thesame@email.cass')
        self.password = 'password_123'
        self.today = date.today()

    # PREMIUM PLANS -- start
    # no money, exp date - today => free
    def test_is_free_user_no_credits_at_exp_day(self):
        user_1 = User.objects.get(username='user1')
        user_1.credit = 0    
        t_delta = timedelta(days=0)                                     
        user_1.expiration_date = self.today + t_delta
        user_1.save()                               
        acc_operations = AccountOperations(user_1)
        current_plan = acc_operations.getUserPaymentPlan()
        self.assertEqual(current_plan, 'free')

    # no money, exp date - yesterday => free
    def test_is_free_user_no_credits_post_exp_day(self):
        user_1 = User.objects.get(username='user1')
        user_1.credit = 0
        t_delta = timedelta(days=-1)                           
        user_1.expiration_date = self.today + t_delta         
        user_1.save()                               
        acc_operations = AccountOperations(user_1)
        current_plan = acc_operations.getUserPaymentPlan()
        self.assertEqual(current_plan, 'free')

    # no money, exp date - tomorrow => free
    def test_is_free_user_no_credits_pre_exp_day(self):
        user_1 = User.objects.get(username='user1')
        user_1.credit = 0       
        t_delta = timedelta(days=1)                       
        user_1.expiration_date = self.today + t_delta           
        user_1.save()                               
        acc_operations = AccountOperations(user_1)
        current_plan = acc_operations.getUserPaymentPlan()
        self.assertEqual(current_plan, 'free')

    # 9,99$, exp date - today => master
    def test_is_master_user_with_credits_at_exp_day(self):
        user_1 = User.objects.get(username='user1')
        user_1.credit = 9.99       
        t_delta = timedelta(days=0)                       
        user_1.expiration_date = self.today + t_delta           
        user_1.save()                               
        acc_operations = AccountOperations(user_1)
        current_plan = acc_operations.getUserPaymentPlan()
        self.assertEqual(current_plan, 'master')
    
    # 9,99$, exp date - yesterday => free
    def test_is_master_user_with_credits_post_exp_day(self):
        user_1 = User.objects.get(username='user1')
        user_1.credit = 9.99       
        t_delta = timedelta(days=-1)                       
        user_1.expiration_date = self.today + t_delta           
        user_1.save()                               
        acc_operations = AccountOperations(user_1)
        current_plan = acc_operations.getUserPaymentPlan()
        self.assertEqual(current_plan, 'free')
    
    # 9,99$, exp date - tomorrow => master
    def test_is_master_user_with_credits_pre_exp_day(self):
        user_1 = User.objects.get(username='user1')
        user_1.credit = 9.99       
        t_delta = timedelta(days=1)                       
        user_1.expiration_date = self.today + t_delta           
        user_1.save()                               
        acc_operations = AccountOperations(user_1)
        current_plan = acc_operations.getUserPaymentPlan()
        self.assertEqual(current_plan, 'master')

    # 19,99$, exp date - today => international_master
    def test_is_im_user_with_credits_at_exp_day(self):
        user_1 = User.objects.get(username='user1')
        user_1.credit = 19.99       
        t_delta = timedelta(days=0)                       
        user_1.expiration_date = self.today + t_delta           
        user_1.save()                               
        acc_operations = AccountOperations(user_1)
        current_plan = acc_operations.getUserPaymentPlan()
        self.assertEqual(current_plan, 'international_master')
    
    # 19,99$, exp date - yesterday => free
    def test_is_im_user_with_credits_post_exp_day(self):
        user_1 = User.objects.get(username='user1')
        user_1.credit = 19.99       
        t_delta = timedelta(days=-1)                       
        user_1.expiration_date = self.today + t_delta           
        user_1.save()                               
        acc_operations = AccountOperations(user_1)
        current_plan = acc_operations.getUserPaymentPlan()
        self.assertEqual(current_plan, 'free')
    
    # 19,99$, exp date - tomorrow => international_master
    def test_is_im_user_with_credits_pre_exp_day(self):
        user_1 = User.objects.get(username='user1')
        user_1.credit = 19.99       
        t_delta = timedelta(days=1)                       
        user_1.expiration_date = self.today + t_delta           
        user_1.save()                               
        acc_operations = AccountOperations(user_1)
        current_plan = acc_operations.getUserPaymentPlan()
        self.assertEqual(current_plan, 'international_master')

    # 34,99$, exp date - today => grandmaster
    def test_is_gm_user_with_credits_at_exp_day(self):
        user_1 = User.objects.get(username='user1')
        user_1.credit = 34.99       
        t_delta = timedelta(days=0)                       
        user_1.expiration_date = self.today + t_delta           
        user_1.save()                               
        acc_operations = AccountOperations(user_1)
        current_plan = acc_operations.getUserPaymentPlan()
        self.assertEqual(current_plan, 'grandmaster')
    
    # 34,99$, exp date - yesterday => free
    def test_is_gm_user_with_credits_post_exp_day(self):
        user_1 = User.objects.get(username='user1')
        user_1.credit = 34.99       
        t_delta = timedelta(days=-1)                       
        user_1.expiration_date = self.today + t_delta           
        user_1.save()                               
        acc_operations = AccountOperations(user_1)
        current_plan = acc_operations.getUserPaymentPlan()
        self.assertEqual(current_plan, 'free')
    
    # 34,99$, exp date - tomorrow => grandmaster
    def test_is_gm_user_with_credits_pre_exp_day(self):
        user_1 = User.objects.get(username='user1')
        user_1.credit = 34.99       
        t_delta = timedelta(days=1)                       
        user_1.expiration_date = self.today + t_delta           
        user_1.save()                               
        acc_operations = AccountOperations(user_1)
        current_plan = acc_operations.getUserPaymentPlan()
        self.assertEqual(current_plan, 'grandmaster')
    # PREMIUM PLANS -- end

    # FORGOT PASSWORD -- start
    # check if creating user, generated (via signals) user's activation key and URL
    def test_is_key_and_URL_created(self):
        is_key_created = User_edit_keys.objects.filter(user=User.objects.get(username='user1')).exists()
        self.assertTrue(is_key_created)

    # check if forgot password get POST request and if creating new key (by knowledge of username)
    def test_check_if_forgot_password_works_by_username(self):
        url = '/member/api/forgot-pass/send'
        data = {'operation': 'send-new-key', 'email': '', 'username': 'user1'}
        old_key = User_edit_keys.objects.get(user=User.objects.get(username=data['username'])).secretkey
        response = self.client.post(url, data, follow=True)
        new_key = User_edit_keys.objects.get(user=User.objects.get(username=data['username'])).secretkey
        self.assertNotEqual(old_key, new_key)
        self.assertEqual(response.status_code, 200)

    # check if forgot password get POST request and if creating new key (by knowledge of email)
    def test_check_if_forgot_password_works_by_email(self):
        url = '/member/api/forgot-pass/send'
        data = {'operation': 'send-new-key', 'email': 'somerandom@notexistingmail.com', 'username': ''}
        old_key = User_edit_keys.objects.get(user=User.objects.get(email=data['email'])).secretkey
        response = self.client.post(url, data, follow=True)
        new_key = User_edit_keys.objects.get(user=User.objects.get(email=data['email'])).secretkey
        self.assertNotEqual(old_key, new_key)
        self.assertEqual(response.status_code, 200)

    def test_set_new_password(self):
        user_1 = User.objects.get(username='user1')
        user_keys = User_edit_keys.objects.get(user=user_1)
        userURL = user_keys.url
        userSecretKey = user_keys.secretkey
        curr_pass = user_1.password
        set_password = 'strong__password1'
        data = {"secretKey": userSecretKey, "userID": user_1.id, 'password': set_password, 'password2': set_password}
        url = '/member/set-new-pass/api/'
        response = self.client.post(url, json.dumps(data), content_type='application/json', follow=True)
        new_password = User.objects.get(username='user1').password
        self.assertNotEqual(curr_pass, new_password)
        self.assertEqual(response.status_code, 200)
    # FORGOT PASSWORD -- end

    # ACCOUNT ACTIVATION -- start
    def test_account_activation(self):
        user_1 = User.objects.get(username='user1')
        pre_isActiv = user_1.is_activated
        user_keys = User_edit_keys.objects.get(user=user_1)
        userURL = user_keys.url
        userSecretKey = user_keys.secretkey
        url = '/member/activate/api/'
        data = {"secretKey": userSecretKey, "userID": user_1.id}
        response = self.client.post(url, json.dumps(data), content_type='application/json', follow=False)
        post_isActiv = User.objects.get(username='user1').is_activated
        self.assertNotEqual(pre_isActiv, post_isActiv)
        self.assertEqual(response.status_code, 200)
    # ACCOUNT ACTIVATION -- end

    # EDIT PROFILE -- start
    def test_edit_user_names(self):
        user_1 = User.objects.get(username='user1')
        f_name = 'Jan'
        l_name = 'Kowalski'
        url = f'/member/api/edit/{user_1.username}'
        data = {'operation': 'name-edit', 'first_name': f_name, 'last_name': l_name}
        response = self.client.post(url, json.dumps(data), content_type='application/json', follow=False)
        self.assertEqual(User.objects.get(username='user1').first_name, 'Jan')
        self.assertEqual(User.objects.get(username='user1').last_name, 'Kowalski')
        self.assertEqual(response.status_code, 200)

    def test_edit_user_email(self):
        user_1 = User.objects.get(username='user1')
        user_1.set_password('new_password123123')   # dunno why i need to do that
        user_1.save()
        email = 'anotheremailfromnowhere@dot.dot'
        url = f'/member/api/edit/{user_1.username}'
        data = {'operation': 'email-edit', 'email': email, 'password': 'new_password123123'}
        response = self.client.post(url, json.dumps(data), content_type='application/json', follow=False)
        self.assertEqual(response.status_code, 200)
        self.assertEqual(User.objects.get(username='user1').email, 'anotheremailfromnowhere@dot.dot')

    def test_edit_user_email_wrong_password(self):  
        user_1 = User.objects.get(username='user1')
        user_1.set_password('new_password123123')   # dunno why i need to do that
        user_1.save()
        email = 'anotheremailfromnowhere@dot.dot'
        url = f'/member/api/edit/{user_1.username}'
        data = {'operation': 'email-edit', 'email': email, 'password': 'wrong_password'}
        response = self.client.post(url, json.dumps(data), content_type='application/json', follow=False)
        self.assertEqual(response.status_code, 401)

    def test_edit_user_email_email_already_exist(self):
        user_1 = User.objects.get(username='user1')
        user_1.set_password('new_password123123')   # dunno why i need to do that
        user_1.save()
        email = 'thesame@email.cass'
        url = f'/member/api/edit/{user_1.username}'
        data = {'operation': 'email-edit', 'email': email, 'password': 'new_password123123'}
        response = self.client.post(url, json.dumps(data), content_type='application/json', follow=False)
        self.assertEqual(response.status_code, 406)

    def test_edit_user_email_change_pasword_correct(self):
        user_1 = User.objects.get(username='user1')
        user_1.set_password('new_password123123')   # dunno why i need to do that
        user_1.save()
        new_password = 'newStrongPass'
        old_password = 'new_password123123'
        url = f'/member/api/edit/{user_1.username}'
        data = {'operation': 'password-edit', 'new_password': new_password, 'old_password': old_password}
        response = self.client.post(url, json.dumps(data), content_type='application/json', follow=False)
        self.assertEqual(response.status_code, 200)

    def test_edit_user_email_change_pasword_too_short(self):
        user_1 = User.objects.get(username='user1')
        user_1.set_password('new_password123123')   # dunno why i need to do that
        user_1.save()
        new_password = 'new'
        old_password = 'new_password123123'
        url = f'/member/api/edit/{user_1.username}'
        data = {'operation': 'password-edit', 'new_password': new_password, 'old_password': old_password}
        response = self.client.post(url, json.dumps(data), content_type='application/json', follow=False)
        self.assertEqual(response.status_code, 400)

    def test_edit_user_email_change_pasword_digit_only(self):
        user_1 = User.objects.get(username='user1')
        user_1.set_password('new_password123123')   # dunno why i need to do that
        user_1.save()
        new_password = '123456789'
        old_password = 'new_password123123'
        url = f'/member/api/edit/{user_1.username}'
        data = {'operation': 'password-edit', 'new_password': new_password, 'old_password': old_password}
        response = self.client.post(url, json.dumps(data), content_type='application/json', follow=False)
        self.assertEqual(response.status_code, 400)
    # EDIT PROFILE -- end
