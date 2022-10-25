
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('main.urls')),
    path('api/', include('main.api.urls')),
    path('member/', include('member.urls')),
    path('member/api/', include('member.api.urls')),
    path('payment/', include('payment.api.urls')),
]
