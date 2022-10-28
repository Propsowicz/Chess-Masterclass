from django.urls import path
from .views import premiumPlans, premiumPlan, payTransactionDone, payTransactionResponse, successLink, failureLink

urlpatterns = [
    path('premium-plans/', premiumPlans.as_view(), name='get-all-premiumPlans'),
    path('premium-plans/getpremium/<int:id>/<str:slug>', premiumPlan.as_view(), name='get-single-premiumPlan'),
    path('premium-plans/pay-back', payTransactionDone.as_view(), name='get-single-pay'),
    
    # api
    path('create-order/<int:id>/<str:credit>', premiumPlan.as_view(), name='create-order'),
    
    # Response from dotpay
    path('premium-plans/pay-response', payTransactionResponse.as_view(), name='get-single-pay'),        # response with POST data
    path('success', successLink, name='successLink'),                                                   # response with come back button
    path('failure', failureLink, name='failureLink'),                                                   # response with come back button
]