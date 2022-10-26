from django.urls import path
from .views import premiumPlans, premiumPlan, payTransactionDone, payViewOK, payTransactionResponse

urlpatterns = [
    path('premium-plans/', premiumPlans.as_view(), name='get-all-premiumPlans'),
    path('premium-plans/getpremium/<int:id>/<str:slug>', premiumPlan.as_view(), name='get-single-premiumPlan'),
    path('premium-plans/pay-back', payTransactionDone.as_view(), name='get-single-pay'),
    path('premium-plans/pay-response', payTransactionResponse.as_view(), name='get-single-pay'),
    
]