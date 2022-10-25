from django.urls import path
from .views import premiumPlans, premiumPlan, payView, payViewOK, payResponse, fetchDATA

urlpatterns = [
    path('premium-plans/', premiumPlans.as_view(), name='get-all-premiumPlans'),
    path('premium-plans/getpremium/<str:slug>', premiumPlan.as_view(), name='get-single-premiumPlan'),
    path('premium-plans/pay', payView, name='get-single-pay'),
    path('premium-plans/pay-ok', payResponse.as_view(), name='get-single-pay'),
    
]