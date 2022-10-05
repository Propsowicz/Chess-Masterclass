from main.models import ChessCourse, ChessTable
from .serializers import ChessCourseSerializer, ChessTableSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAdminUser, IsAuthenticatedOrReadOnly
from django.core.paginator import Paginator
from ..utils import ChessCoursesPaginator
# API views:

class coursesListAPI(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]    

    def get(self, request, format=None):
        all_courses = ChessCourse.objects.all().order_by('price')
        paginator = ChessCoursesPaginator(ChessCourse)
        serializer = ChessCourseSerializer(paginator.getPageItems(page), many=True)

        return Response(serializer.data)

class coursesListPaginatorAPI(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]   

    def get(self, request, page, format=None):
        all_courses = ChessCourse.objects.all().order_by('price')
        paginator = ChessCoursesPaginator(ChessCourse)
        serializer = ChessCourseSerializer(paginator.getPageItems(page), many=True)

        return Response(serializer.data) 

class courseDetailAPI(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, slug, format=None):
        course = ChessCourse.objects.get(slug=slug)
        serializer = ChessCourseSerializer(course, many=False)

        return Response(serializer.data)

class courseDetailTablesAPI(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, slug, format=None):
        tables = ChessTable.objects.filter(course__slug=slug)
        serializer = ChessTableSerializer(tables, many=True)        

        return Response(serializer.data)

class pagesTotalNumber(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, format=None):
        paginator = ChessCoursesPaginator(ChessCourse)

        return Response({'total_page_number': paginator.getPageCount()})
