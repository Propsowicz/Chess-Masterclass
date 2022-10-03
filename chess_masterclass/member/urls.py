
from django.urls import path


from .views import activate, activateAPI, setNewPassword,setNewPasswordAPI
urlpatterns = [
    
    # activate account API
    path('activate/<str:url>', activate, name='activate-account'),
    path('activate/api/', activateAPI, name='activate-account-API'),

    # forgot password API
    path('set-new-pass/<str:url>', setNewPassword, name='set-new-pass'),
    path('set-new-pass/api/', setNewPasswordAPI, name='set-new-pass-API'),

]
