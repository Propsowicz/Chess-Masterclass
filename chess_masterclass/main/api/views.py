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
        serializer = ChessCourseSerializer(paginator.getPageItems(1), many=True)

        return Response(serializer.data)

class coursesListPaginatorAPI(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]   

    def get(self, request, page, format=None):
        all_courses = ChessCourse.objects.all().order_by('price')
        paginator = ChessCoursesPaginator(all_courses)
        serializer = ChessCourseSerializer(paginator.getPageItems(page), many=True)

        return Response(serializer.data) 

# Filter
class coursesListFilterAPI(APIView):
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

        course_main_chesstable_coors = {}
        for item in loaded_courses:
            try:
                course_main_chesstable_coors[item.slug] = item.chesstable_set.all()[0].coord
            except:
                pass

        serializer = ChessCourseSerializer(loaded_courses, many=True)

        return Response({'data': serializer.data, 'number_of_pages': number_of_pages, 'course_main_chesstable_coors': course_main_chesstable_coors}) 

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
        print('sessions storage result: ' +  str(request.session.get('number_of_pages')))

        return Response({'total_page_number': 4})
