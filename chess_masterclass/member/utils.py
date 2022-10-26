import random
import math
from .models import User, User_edit_keys
from django.contrib.auth import get_user_model, authenticate
from django.core.mail import send_mail
import os
from datetime import date
from dotenv import load_dotenv



# * Class created to service user operations: creating user's secret key and URL (activate account and forgot password case)
# * checking correctness of password, sending emails to user and checking user's current payment plan
# *! at this moment (22-10-2022) cannot resolve problem with host (render.com) firewall blocking sending emails
# *! as far i know i need to use API (mailjet - to 200 free email per day) to send mails - to do that i need email on my own domain -> working on this
# *TODO resolve email problem 

class AccountOperations():
    def __init__(self, user):
        self.user = user
    
    def createUserKeys(self):
        url = f'{random.randint(math.pow(100000, 10), math.pow(1000000, 10))}-{self.user}-account'
        key = f'{random.randint(1000, 9999)}'
        user_keys = User_edit_keys.objects.get(user=self.user)
        user_keys.url = url
        user_keys.secretkey = key
        user_keys.save()      

    def activateAccount(self, key):
        user_key = User_edit_keys.objects.get(user=self.user)
        if user_key.secretkey == key:
            self.user.is_activated = True
            self.user.save()

    def checkPassword(self, request, password, *args, **kwargs):
        user = authenticate(request, username=self.user.username, password=password)
        if user is not None:
            return True
        else:
            return False

    def sendProfileEditedEmail(self, changed_data):
        msg = f'Hi {self.user.username}. You {changed_data} was changed succesfully!'
        
        send_mail(      
        'Edited Profile - Chess Masterclass',
        msg,
        str(os.getenv('EMAIL2_HOST_USER')),
        [self.user.email],
        fail_silently=False,
        )                
        print('message was sended!')

    def sendWelcomeEmail(self):
        user_keys = User_edit_keys.objects.get(user=self.user)
        msg = f'Welcome on website. To finish your acount activation please visit the link: https://chess-masterclass.onrender.com/member/activate/{user_keys.url} and verify login with password: {user_keys.secretkey}'
        
        send_mail(      
        'Acount Activation - Chess Masterclass',
        msg,
        str(os.getenv('EMAIL2_HOST_USER')),
        [self.user.email],
        fail_silently=False,
        )                
        print('message was sended!')
    
    def sendNewUserKey(self):
        user_keys = User_edit_keys.objects.get(user=self.user)
        msg = f'Hello. To change your password visit the link: https://chess-masterclass.onrender.com/member/set-new-pass/{user_keys.url} and set new password using this key: {user_keys.secretkey}'
        
        send_mail(      
        'Change password - Chess Masterclass',
        msg,
        str(os.getenv('EMAIL2_HOST_USER')),
        [self.user.email],
        fail_silently=False,
        )                
        print('message was send!')

    def getUserPaymentPlan(self):
        premiumPlans = {
            0 : 'free',
            9.99 : 'master',
            19.99 : 'international_master',
            34.99 : 'grandmaster',
        }
        currentPlan = '' 
        today = date.today()
        
        if today <= self.user.expiration_date:
            currentPlan = premiumPlans[float(self.user.credit)]
        else:
            currentPlan = premiumPlans[0]

        return currentPlan