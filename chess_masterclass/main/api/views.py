from main.models import ChessCourse
from .serializers import ChessCourseSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAdminUser, IsAuthenticatedOrReadOnly


# API views:

class coursesListAPI(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]    

    def get(self, request, format=None):
        all_courses = ChessCourse.objects.all().order_by('price')
        serializer = ChessCourseSerializer(all_courses, many=True)

        return Response(serializer.data)


class courseDetailAPI(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, slug, format=None):
        course = ChessCourse.objects.get(slug=slug)
        serializer = ChessCourseSerializer(course, many=False)

        return Response(serializer.data)


