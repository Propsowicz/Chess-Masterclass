from django.shortcuts import render
from rest_framework.parsers import JSONParser
from django.http import JsonResponse
import json
import jwt
import os
from django.contrib.auth import login, logout, authenticate
from django.shortcuts import redirect

from rest_framework import generics
from .serializers import UserSerializer
# Create your views here.

class RegisterAPI(generics.CreateAPIView):
    authentication_classes = []
    permission_classes = []    

    serializer_class = UserSerializer
    
