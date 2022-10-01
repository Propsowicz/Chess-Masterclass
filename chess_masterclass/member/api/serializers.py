from django.contrib.auth import get_user_model
from rest_framework import serializers   
from ..models import User, User_edit_keys
from django.contrib.auth import get_user_model, authenticate
import datetime

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email'],
            expiration_date=datetime.datetime(2050,1,1),
        )

        user.set_password(validated_data['password'])
        user.save()      
        return user


class EditProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # fields = ['email', 'first_name', 'last_name', 'password']
        fields = '__all__'

    


        