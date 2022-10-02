from django.shortcuts import render
from rest_framework.parsers import JSONParser
from django.http import JsonResponse
import json
import jwt
import os
from django.contrib.auth import login, logout, authenticate
from django.shortcuts import redirect
import django.contrib.auth.password_validation as validators
from django.core import exceptions

from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import UserSerializer, EditProfileSerializer
from ..utils import AccountOperations
from ..models import User
# Create your views here.

class RegisterAPI(generics.CreateAPIView):
    authentication_classes = []
    permission_classes = []    

    serializer_class = UserSerializer

class EditProfileAPI(APIView):
    authentication_classes = []
    permission_classes = []  
    
    def get(self, *args, **kwargs):        
        user = User.objects.get(username=kwargs['username'])  
        serializer = EditProfileSerializer(user, many=False)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):     
        data = request.data
        user = User.objects.get(username=kwargs['username']) 
        user_acc_operations = AccountOperations(user)
        serializer = EditProfileSerializer(user, many=False)

        if data['operation'] == 'email-edit':
            edited_data = {'email': data['email']}   
            if user_acc_operations.checkPassword(request, data['password']):
                serializer = EditProfileSerializer(instance=user, data=edited_data, partial=True)
                if serializer.is_valid() and not User.objects.filter(email=edited_data['email']).exists():
                    serializer.save()
                    # user_acc_operations.sendProfileEditedEmail('email address')
                    return Response({'Response msg': 'Email has been changed.'}, status=status.HTTP_200_OK)                    
                else:
                    return Response({'Response msg': 'This email already exists.'}, status=status.HTTP_406_NOT_ACCEPTABLE)                    
            else:
                serializer = EditProfileSerializer(instance=user, data=edited_data, partial=True)
                return Response({'Response msg': 'Password is not correct.'}, status=status.HTTP_401_UNAUTHORIZED)

        if data['operation'] == 'name-edit':
            edited_data = {'first_name': data['first_name'], 'last_name': data['last_name']}
            serializer= EditProfileSerializer(instance=user, data=edited_data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'Response msg': 'Name has been changed.'}, status=status.HTTP_200_OK)
            else:
                return Response({'Response msg': 'Invalid data'})

        if data['operation'] == 'password-edit':
            edited_data = {'password': data['new_password']}
            errors = {}
            if user_acc_operations.checkPassword(request, data['old_password']):
                try: 
                    validators.validate_password(password=edited_data['password'], user=user)
                    user.set_password(edited_data['password'])
                    user.save()
                    return Response({'Response msg': 'Password has been changed.'}, status=status.HTTP_200_OK)

                except exceptions.ValidationError as e:
                    errors['password'] = [(e.messages)]
                    return Response(errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'Response msg': 'Password is not correct.'}, status=status.HTTP_401_UNAUTHORIZED)


class ForgotPassAPI(APIView):
    authentication_classes = []
    permission_classes = []  

    def post(self, request, *args, **kwargs):        
        data = request.data
        
        if data['operation'] == 'send-new-key':
            if data['username']:
                user = User.objects.get(username=data['username'])             
            else:
                user = User.objects.get(email=data['email'])   
            user_acc_operations = AccountOperations(user)
            user_acc_operations.createUserKeys()          
            user_acc_operations.sendNewUserKey()
            
        return Response({'Response msg': 'User key has been send to your email.'})
                   