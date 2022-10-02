from django.contrib.auth import get_user_model
from rest_framework import serializers   
from ..models import User, User_edit_keys
from django.contrib.auth import get_user_model, authenticate
import datetime
import django.contrib.auth.password_validation as validators
from django.core import exceptions


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # fields = ['username', 'email', 'password']
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email'],
            expiration_date=datetime.date(2050,1,1),
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email already exists.")
        return value

    def validate(self, data):
        user = User(**data)
        password = data['password']
        errors = {}
        try:
            validators.validate_password(password=password, user=user)        
        except exceptions.ValidationError as e:
            errors['password'] = [(e.messages)]   
        if errors:
            raise serializers.ValidationError(errors)         
        return data
 

class EditProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        # fields = ['email', 'first_name', 'last_name', 'password']
        fields = '__all__'

            