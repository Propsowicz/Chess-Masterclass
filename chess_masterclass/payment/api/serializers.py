from payment.models import PremiumPlansDescriptions
from rest_framework import serializers  

class PremiumPlansDescriptionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PremiumPlansDescriptions
        fields = '__all__'