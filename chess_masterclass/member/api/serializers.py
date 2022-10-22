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
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):           # method to create new user
        user = User(
            username=validated_data['username'],
            email=validated_data['email'],
            expiration_date=datetime.date(2050,1,1),
        )
        user.set_password(validated_data['password'])
        user.save()
        return user

    def validate_email(self, value):        # validation of email existance (method raise error whenever new email address already exists in database)
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("This email already exists.")
        return value

    def validate(self, data):               # validator of password -> check if password meet the requirements of django pass validation -> if it's not OK create list of errors (ie: password is too short, etc.)
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
        fields = '__all__'

            