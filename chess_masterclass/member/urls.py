
from django.urls import path


from .views import activate, activateAPI
urlpatterns = [
    
    # api
    path('activate/<str:url>', activate, name='activate-account'),
    path('activated/api/', activateAPI, name='activate-account-API'),
]
