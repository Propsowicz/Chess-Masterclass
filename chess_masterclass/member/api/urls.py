
from django.urls import path, include


from .views import RegisterAPI, EditProfileAPI

urlpatterns = [
    # POST user
    path('register/', RegisterAPI.as_view(), name='user-register'),
    path('edit/<str:username>', EditProfileAPI.as_view(), name='user-edit'),
    
]
