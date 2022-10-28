from django.contrib import admin
from .models import PremiumPlansDescriptions, DotPayRespond, PaymentOrder
# Register your models here.

admin.site.register(PremiumPlansDescriptions)
admin.site.register(DotPayRespond)
admin.site.register(PaymentOrder)

