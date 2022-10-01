from django.shortcuts import render
from rest_framework.parsers import JSONParser
from django.http import JsonResponse
import json
import jwt
import os
from django.contrib.auth import login, logout, authenticate
from django.shortcuts import redirect

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
                if serializer.is_valid():
                    serializer.save()
                    # user_acc_operations.sendProfileEdited('email address')
                    return Response({'Response msg': 'Email has been changed!'}, status=status.HTTP_200_OK)
                    
                else:
                    return Response({'Response msg': 'Invalid data'})
                    
            else:
                serializer = EditProfileSerializer(instance=user, data=edited_data, partial=True)
                return Response({'Response msg': 'Password is not correct!'}, status=status.HTTP_401_UNAUTHORIZED)

        if data['operation'] == 'name-edit':
            edited_data = {'first_name': data['first_name'], 'last_name': data['last_name']}

            serializer= EditProfileSerializer(instance=user, data=edited_data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'Response msg': 'Name has been changed!'}, status=status.HTTP_200_OK)
            else:
                return Response({'Response msg': 'Invalid data'})