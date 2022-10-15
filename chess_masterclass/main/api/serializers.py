from rest_framework import serializers  
from main.models import ChessCourse, ChessTable, ChessStudy, ChessStudyTable
from member.api.serializers import UserSerializer

class ChessCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChessCourse
        fields = '__all__'

class ChessTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChessTable
        fields = '__all__'

class ChessStudySerializer(serializers.ModelSerializer):
    study = serializers.StringRelatedField()
    username = serializers.SerializerMethodField()

    class Meta:
        model = ChessStudy
        fields = ['name', 'body', 'author', 'slug', 'representationChessBoard', 'private', 'username', 'study']
    def get_username(self, study):
        return study.author.username

