import random
import math
from .models import User, User_edit_keys
from django.contrib.auth import get_user_model, authenticate
from django.core.mail import send_mail
import os


class AccountOperations():
    def __init__(self, user):
        self.user = user
    
    def createUserKeys(self):
        url = f'{random.randint(math.pow(100000, 10), math.pow(1000000, 10))}-{self.user}-account-activation'
        key = f'{random.randint(1000, 9999)}'
        user_keys = User_edit_keys.objects.get(user=self.user)
        user_keys.url = url
        user_keys.secretkey = key
        user_keys.save()
        

    def sendWelcomeEmail(self):
        user_keys = User_edit_keys.objects.get(user=self.user)
        msg = f'Welcome on website. To finish your acount activation please visit the link: http://127.0.0.1:8000/member/activate/{user_keys.url} and verify login with password: {user_keys.secretkey}'
        
        send_mail(      
        'Acount Activation - Chess Masterclass',
        msg,
        str(os.getenv('EMAIL_HOST_USER')),
        [self.user.email],
        fail_silently=False,
        )                
        print('message was sended!')


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

    def sendProfileEdited(self, changed_data):
        msg = f'Hi {self.user.username}. You {changed_data} was changed succesfully!'
        
        send_mail(      
        'Edited Profile - Chess Masterclass',
        msg,
        str(os.getenv('EMAIL_HOST_USER')),
        [self.user.email],
        fail_silently=False,
        )                
        print('message was sended!')