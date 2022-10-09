from main.models import ChessCourse, ChessTable
from .serializers import ChessCourseSerializer, ChessTableSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAdminUser, IsAuthenticatedOrReadOnly
from django.core.paginator import Paginator
from ..utils import ChessCoursesPaginator
from member.models import User
# API views:

# class coursesListAPI(APIView):
#     authentication_classes = [SessionAuthentication, BasicAuthentication]
#     permission_classes = [IsAuthenticatedOrReadOnly]    

#     def get(self, request, format=None):
#         all_courses = ChessCourse.objects.all().order_by('price')
#         paginator = ChessCoursesPaginator(ChessCourse)
#         serializer = ChessCourseSerializer(paginator.getPageItems(1), many=True)

#         return Response(serializer.data)

class coursesListPaginatorAPI(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]   

    def get(self, request, page, format=None):
        all_courses = ChessCourse.objects.all().order_by('price')
        paginator = ChessCoursesPaginator(all_courses)
        serializer = ChessCourseSerializer(paginator.getPageItems(page), many=True)

        return Response(serializer.data) 

# Filter
class coursesListAPI(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]   

    def get(self, request, order_by, filter, search, page, format=None):
        filter_list = filter[6:].split(';')
        if filter == 'filter' and search == 'search':
            all_courses = ChessCourse.objects.all().order_by(order_by)
        elif search != 'search':            
            all_courses = ChessCourse.objects.all().order_by(order_by).filter(name__icontains=search)
        else:
            all_courses = ChessCourse.objects.all().order_by(order_by).filter(premiumPlan__in=filter_list)
        
        paginator = ChessCoursesPaginator(all_courses)
        request.session['number_of_pages'] = paginator.getPageCount()
        number_of_pages = str(paginator.getPageCount())

        loaded_courses = paginator.getPageItems(page)       

        serializer = ChessCourseSerializer(loaded_courses, many=True)

        return Response({'data': serializer.data, 'number_of_pages': number_of_pages}) 

class coursesLikedByUserListAPI(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]   

    def get(self, request, username, order_by, filter, search, page, format=None):
        filter_list = filter[6:].split(';')
        user = User.objects.get(username=username)
        if filter == 'filter' and search == 'search':
            all_courses = ChessCourse.objects.filter(liked_by=user).order_by(order_by)
        elif search != 'search':            
            all_courses = ChessCourse.objects.filter(liked_by=user).order_by(order_by).filter(name__icontains=search)
        else:
            all_courses = ChessCourse.objects.filter(liked_by=user).order_by(order_by).filter(premiumPlan__in=filter_list)
        
        paginator = ChessCoursesPaginator(all_courses)
        request.session['number_of_pages'] = paginator.getPageCount()
        number_of_pages = str(paginator.getPageCount())

        loaded_courses = paginator.getPageItems(page)       

        serializer = ChessCourseSerializer(loaded_courses, many=True)

        return Response({'data': serializer.data, 'number_of_pages': number_of_pages}) 

# # Filter
# class coursesListFilterAPI(APIView):
#     authentication_classes = [SessionAuthentication, BasicAuthentication]
#     permission_classes = [IsAuthenticatedOrReadOnly]   

#     def get(self, request, filter, page, format=None):
#         filter_list = filter[6:].split(';')
#         if filter == 'filter':
#             all_courses = ChessCourse.objects.all().order_by('price')
#         else:
#             all_courses = ChessCourse.objects.all().order_by('price').filter(premiumPlan__in=filter_list)
        
#         paginator = ChessCoursesPaginator(all_courses)
#         request.session['number_of_pages'] = paginator.getPageCount()
#         number_of_pages = str(paginator.getPageCount())


#         serializer = ChessCourseSerializer(paginator.getPageItems(page), many=True)

#         return Response({'data': serializer.data, 'number_of_pages': number_of_pages}) 


# class coursesListFilterAPI(APIView):
#     authentication_classes = [SessionAuthentication, BasicAuthentication]
#     permission_classes = [IsAuthenticatedOrReadOnly]   

#     def get(self, request, filter, format=None):
#         all_courses = ChessCourse.objects.all().order_by('price').filter(premiumPlan__exact=filter)
#         serializer = ChessCourseSerializer(all_courses, many=True)

#         return Response(serializer.data) 



class courseDetailAPI(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, slug, format=None):
        course = ChessCourse.objects.get(slug=slug)
        serializer = ChessCourseSerializer(course, many=False)

        return Response(serializer.data)

        

class courseDetailTablesAPI(APIView):
    authentication_classes = []
    permission_classes = []

    def get(self, request, slug, format=None):
        tables = ChessTable.objects.filter(course__slug=slug)        
        serializer = ChessTableSerializer(tables, many=True)        

        return Response(serializer.data)


class likeCourse(APIView):
    authentication_classes = []
    permission_classes = []

    def post(self, request, username, id, *args, **kwargs):
        course = ChessCourse.objects.get(id=id)
        user = User.objects.get(username=username)

        if user in course.liked_by.all():
            course.liked_by.remove(user)
            return Response('course disliked')
        else:
            course.liked_by.add(user)
            return Response('course liked')
                    



# to delete
class pagesTotalNumber(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get(self, request, format=None):
        print('sessions storage result: ' +  str(request.session.get('number_of_pages')))

        return Response({'total_page_number': 4})
