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


# activate User's account template
def activate(request, url):
    user_keys = User_edit_keys.objects.get(url=url)

    context = {
        'key': user_keys.secretkey,
        'user_id': user_keys.user.id,
    }

    return render(request, 'ActivateAccount.html', context)

# activate User's account API link
def activateAPI(request):
    data = json.loads(request.body)
    user = User.objects.get(id=data['userID'])
    key = data['secretKey']

    user_keys = AccountOperations(user)
    user_keys.activateAccount(key)

    return JsonResponse('account was activated', safe=False)

# forgot User's password template
def setNewPassword(request, url):
    user_keys = User_edit_keys.objects.get(url=url)

    context = {
        'key': user_keys.secretkey,
        'user_id': user_keys.user.id,
        'user_name': user_keys.user.username,
    }

    return render(request, 'SetNewPassword.html', context)

# forgot User's password API link
def setNewPasswordAPI(request):
    data = json.loads(request.body)
    user = User.objects.get(id=data['userID'])

    if data['password'] == data['password2']:
        user.set_password(data['password'])
        user.save()
        AccountOperations(user).sendProfileEditedEmail('password')

    return JsonResponse('password has been changed', safe=False)