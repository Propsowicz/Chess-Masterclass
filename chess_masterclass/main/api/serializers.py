from rest_framework import serializers  
from main.models import ChessCourse


class ChessCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChessCourse
        fields = '__all__'
