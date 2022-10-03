from django.urls import path, include
from .views import coursesListAPI, courseDetailAPI

urlpatterns = [
    # GET courses
    path('courses/', coursesListAPI.as_view(), name='all-courses'),
    path('courses/<str:slug>', courseDetailAPI.as_view(), name='course-detail'),


]
