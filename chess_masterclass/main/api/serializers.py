from rest_framework import serializers  
from main.models import ChessCourse, ChessTable


class ChessCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChessCourse
        fields = '__all__'

class ChessTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChessTable
        fields = '__all__'