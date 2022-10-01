
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,    
)

from .views import coursesListAPI, courseDetailAPI, MyTokenObtainPairView

urlpatterns = [
    # GET courses
    path('courses/', coursesListAPI.as_view(), name='all-courses'),
    path('courses/<str:slug>', courseDetailAPI.as_view(), name='course-detail'),

    # Tokens
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]
