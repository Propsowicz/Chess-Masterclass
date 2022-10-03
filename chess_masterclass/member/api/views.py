import django.contrib.auth.password_validation as validators
from django.core import exceptions

from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import UserSerializer, EditProfileSerializer
from ..utils import AccountOperations
from ..models import User

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# views:

# custom token serializer
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):    
    @classmethod
    def get_token(cls, user):
        # way to send custom data through JWT
        token = super().get_token(user)
            
        token['username'] = str(user.username)
        token['exp_date'] = str(user.expiration_date)
        token['user_acc_actv'] = str(user.is_activated)
        token['user_creator'] = str(user.is_creator)
        token['premium_plan'] = AccountOperations(user).getUserPaymentPlan()

        return token

# class to render JWT
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# class to create new User (generic)
class RegisterAPI(generics.CreateAPIView):
    authentication_classes = []
    permission_classes = []    

    serializer_class = UserSerializer

# serializer of User (GET&POST)
class EditProfileAPI(APIView):
    authentication_classes = []
    permission_classes = []  

    # GET
    def get(self, *args, **kwargs):        
        user = User.objects.get(username=kwargs['username'])  
        serializer = EditProfileSerializer(user, many=False)
        return Response(serializer.data)

    # POST
    # with every request frontend sends dict item with operation type (ie 'email-edit')
    # every operation has simple validation with reponse including msg&HTTP status
    def post(self, request, *args, **kwargs):
        # general usage data
        data = request.data
        user = User.objects.get(username=kwargs['username']) 
        user_acc_operations = AccountOperations(user)
        serializer = EditProfileSerializer(user, many=False)

        # edit email operation (also send email after edit is done)
        if data['operation'] == 'email-edit':
            edited_data = {'email': data['email']}   
            if user_acc_operations.checkPassword(request, data['password']):
                serializer = EditProfileSerializer(instance=user, data=edited_data, partial=True)
                if serializer.is_valid() and not User.objects.filter(email=edited_data['email']).exists():
                    serializer.save()
                    user_acc_operations.sendProfileEditedEmail('email address')             # email
                    return Response({'Response msg': 'Email has been changed.'}, status=status.HTTP_200_OK)                    
                else:
                    return Response({'Response msg': 'This email already exists.'}, status=status.HTTP_406_NOT_ACCEPTABLE)                    
            else:
                serializer = EditProfileSerializer(instance=user, data=edited_data, partial=True)
                return Response({'Response msg': 'Password is not correct.'}, status=status.HTTP_401_UNAUTHORIZED)

        # edit name operation
        if data['operation'] == 'name-edit':
            edited_data = {'first_name': data['first_name'], 'last_name': data['last_name']}
            serializer= EditProfileSerializer(instance=user, data=edited_data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response({'Response msg': 'Name has been changed.'}, status=status.HTTP_200_OK)
            else:
                return Response({'Response msg': 'Invalid data'})

        # edit password operation (also send password after edit is done)
        if data['operation'] == 'password-edit':
            edited_data = {'password': data['new_password']}
            errors = {}
            if user_acc_operations.checkPassword(request, data['old_password']):
                try: 
                    validators.validate_password(password=edited_data['password'], user=user)
                    user.set_password(edited_data['password'])
                    user.save()
                    user_acc_operations.sendProfileEditedEmail('password')             # email
                    return Response({'Response msg': 'Password has been changed.'}, status=status.HTTP_200_OK)

                except exceptions.ValidationError as e:
                    errors['password'] = [(e.messages)]
                    return Response(errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                return Response({'Response msg': 'Password is not correct.'}, status=status.HTTP_401_UNAUTHORIZED)

# forget password API -> when user forgot password he needs to give username OR email. Then email with key and link to change password is sent.
# without activated account User cant visit detail course page
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
                   