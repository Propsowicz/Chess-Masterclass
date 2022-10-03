
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,    
)


from .views import RegisterAPI, EditProfileAPI, ForgotPassAPI, MyTokenObtainPairView

urlpatterns = [
    # POST user
    path('register/', RegisterAPI.as_view(), name='user-register'),
    path('edit/<str:username>', EditProfileAPI.as_view(), name='user-edit'),
    path('forgot-pass/send', ForgotPassAPI.as_view(), name='forgot-pass-send'),

    # Tokens
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
