
from django.urls import path, include


from .views import RegisterAPI

urlpatterns = [
    # POST user
    path('register/', RegisterAPI.as_view(), name='user-register'),
    
]
