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

# custom serializer with some extra methods
class ChessStudySerializer(serializers.ModelSerializer):
    study = serializers.StringRelatedField()
    username = serializers.SerializerMethodField()
    followers = serializers.SerializerMethodField()         
    class Meta:
        model = ChessStudy
        fields = ['name', 'body', 'id', 'author', 'slug', 'representationChessBoard', 'private', 'username', 'study', 'number_of_likes', 'followers']
        
    def get_username(self, study):                  # get auhtor's username (by default it shows user's id)
        return study.author.username
    def get_followers(self, study):                 # get list of users which likes study
        return [_.user.id for _ in ChessStudyLikes.objects.filter(study=study)]   

class ChessStudyTableSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChessStudyTable
        fields = '__all__'