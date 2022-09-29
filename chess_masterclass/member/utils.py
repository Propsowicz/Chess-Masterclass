import random
import math
from .models import User, User_edit_keys
from django.contrib.auth import get_user_model
from django.core.mail import send_mail
import os


class activateAccount():
    def __init__(self, user):
        self.user = user
    
    def createKeys(self):
        url = f'{random.randint(math.pow(100000, 10), math.pow(1000000, 10))}-{self.user}-account-activation'
        key = f'{random.randint(1000, 9999)}'
        user_keys = User_edit_keys.objects.get(user=self.user)
        user_keys.url = url
        user_keys.secretkey = key
        user_keys.save()
        

    def sendEmail(self):
        user_keys = User_edit_keys.objects.get(user=self.user)

        msg = f'Hello on website. To finish your acount activation please visit the link: http://127.0.0.1:8000/member/activate/{user_keys.url} and verify login with password: {user_keys.secretkey}'
        
        send_mail(      
        'Acount Activation - Chess Masterclass',
        msg,
        str(os.getenv('EMAIL_HOST_USER')),
        [self.user.email],
        fail_silently=False,
        )        
        
        print('message was sended!')



    def activate(self, key):
        user_key = User_edit_keys.objects.get(user=self.user)
        if user_key.secretkey == key:
            self.user.is_activated = True
            self.user.save()


