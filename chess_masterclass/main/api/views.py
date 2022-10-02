from main.models import ChessCourse
from .serializers import ChessCourseSerializer
from django.contrib.auth import get_user_model

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAdminUser, IsAuthenticatedOrReadOnly

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

from datetime import date

from django.shortcuts import render

# Create custom token's information

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):    
    @classmethod
    def get_token(cls, user):               
        token = super().get_token(user)

        # send custom info via access token
        # check if user's premium expired
        today = date.today()
        if today > user.expiration_date:
            token['isActive'] = 'false'
        else:
            token['isActive'] = 'true'        

        token['username'] = str(user.username)
        token['credit'] = str(user.credit)
        token['exp_date'] = str(user.expiration_date)
        token['user_acc_actv'] = str(user.is_activated)
        token['user_creator'] = str(user.is_creator)

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# API views:

class coursesListAPI(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]    

    def get(self, request, format=None):
        all_courses = ChessCourse.objects.all()
        serializer = ChessCourseSerializer(all_courses, many=True)

        return Response(serializer.data)



class courseDetailAPI(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, slug, format=None):
        course = ChessCourse.objects.get(slug=slug)
        serializer = ChessCourseSerializer(course, many=False)

        return Response(serializer.data)


