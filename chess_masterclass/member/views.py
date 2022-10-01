from django.shortcuts import render
from rest_framework.parsers import JSONParser
from django.http import JsonResponse
import json
import jwt
import os
from django.contrib.auth import login, logout, authenticate
from .models import User, User_edit_keys
from django.shortcuts import redirect
from .utils import AccountOperations

# Create your views here.



def activate(request, url):

    user_keys = User_edit_keys.objects.get(url=url)

    context = {
        'key': user_keys.secretkey,
        'user_id': user_keys.user.id,
    }

    return render(request, 'ActivateAccount.html', context)

def activateAPI(request):
    data = json.loads(request.body)
    user = User.objects.get(id=data['userID'])
    key = data['secretKey']

    user_keys = AccountOperations(user)
    user_keys.activateAccount(key)

    return JsonResponse('account was activated', safe=False)