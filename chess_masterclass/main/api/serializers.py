from rest_framework import serializers  
from main.models import ChessCourse, ChessTable, ChessStudy, ChessStudyTable, ChessStudyLikes
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
    followers = serializers.SerializerMethodField()

    class Meta:
        model = ChessStudy
        fields = ['name', 'body', 'id', 'author', 'slug', 'representationChessBoard', 'private', 'username', 'study', 'number_of_likes', 'followers']
    def get_username(self, study):
        return study.author.username

    def get_followers(self, study):        
        return [_.user.id for _ in ChessStudyLikes.objects.filter(study=study)]   


class ChessStudyTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChessStudyTable
        fields = '__all__'