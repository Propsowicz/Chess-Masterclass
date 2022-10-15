from main.models import ChessCourse, ChessTable, ChessStudy, ChessStudyTable, ChessStudyLikes
from .serializers import ChessCourseSerializer, ChessTableSerializer, ChessStudySerializer

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAdminUser, IsAuthenticatedOrReadOnly
from django.core.paginator import Paginator
from ..utils import ChessCoursesPaginator
from member.models import User
from django.template.defaultfilters import slugify
from django.db.models import Count

import json
from django.utils import timezone
from datetime import datetime, timedelta
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
    authentication_classes = []
    permission_classes = []   

    def get(self, request, page, format=None):
        all_courses = ChessCourse.objects.all().order_by('price')
        paginator = ChessCoursesPaginator(all_courses)
        serializer = ChessCourseSerializer(paginator.getPageItems(page), many=True)

        return Response(serializer.data) 

# Filter
class coursesListAPI(APIView):
    authentication_classes = []
    permission_classes = []  

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
    authentication_classes = []
    permission_classes = []   

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
    authentication_classes = []
    permission_classes = []

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
    authentication_classes = []
    permission_classes = []

    def get(self, request, format=None):
        print('sessions storage result: ' +  str(request.session.get('number_of_pages')))

        return Response({'total_page_number': 4})

class EditStudyAPI(APIView):
    authentication_classes = []
    permission_classes = []

    

    def put(self, request, username, slug):
        study = ChessStudy.objects.get(id=id)
        serializer = ChessStudySerializer(study, many=False)

        return Response(serializer.data)




# create deafult study
class CreateStudyAPI(APIView):
    authentication_classes = []
    permission_classes = []    

    def post(self, request, username):
        user = User.objects.get(username=username)       
        all_user_studies = ChessStudy.objects.filter(author=user) 
        try: 
            user_study_next_id = all_user_studies.count() + 1
        except:
            user_study_next_id = 1

        body = 'Please insert description...'
        position = 'start'
        private = True
        name = f'My chess study #{user_study_next_id}'

        if user_study_next_id > 1:            
            last_users_study_pub_date = all_user_studies.order_by('-pub_date')[0].pub_date
            time_border = last_users_study_pub_date + timedelta(minutes = 5)            
            if timezone.now() > time_border:
                ChessStudy.objects.create(name=name, body=body, representationChessBoard=position, author=user, private=private)
                return Response({'msg': f'Study created at {datetime.now()}'}, status=status.HTTP_201_CREATED)
            else:
                return Response({'msg': 'Please wait before adding a new study.'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
            ChessStudy.objects.create(name=name, body=body, representationChessBoard=position, author=user, private=private)
            return Response({'msg': f'Study created at {datetime.now()}'}, status=status.HTTP_201_CREATED)

        return Response({'msg': 'stmh went wrong'}, status=status.HTTP_401_UNAUTHORIZED)

    def get(self, request, username, access, private, liked, search, sort, page):    
        if access == 'public':
            # public studies
            query_set_privacy = ChessStudy.objects.filter(private=False)
            if private == 'true':
                # user's public studies
                query_set_privacy = query_set_privacy.filter(author__username=username)
        else:
            # private studies
            query_set_privacy = ChessStudy.objects.filter(author__username=username, private=True)

        if liked == 'false':
            # all studies
            query_set_liked = query_set_privacy            
        else:
            # liked studies
            all_likes_by_user = ChessStudyLikes.objects.filter(user__username=username)
            list_of_liked_studies = []
            for _ in all_likes_by_user:
                list_of_liked_studies.append(_.study.id)                         
            query_set_liked = query_set_privacy.filter(id__in=list_of_liked_studies)

        if search == 'search':
            # not search option is used
            query_set_search = query_set_liked
        else:
            # search option
            query_set_search = query_set_liked.filter(name__icontains=search) | query_set_liked.filter(author__username__icontains=search)
        
        # added liked count filed to current query set
        studies_with_likes = query_set_search.annotate(likes=Count('chessstudylikes'))
        
        # sort by {sort}
        studies = studies_with_likes.order_by(sort)

        # pagination
        paginator = ChessCoursesPaginator(studies)
        number_of_pages = str(paginator.getPageCount())   # number of pages of current query set

        # query set to load and serialize
        loaded_studies = paginator.getPageItems(page)     
        serializer = ChessStudySerializer(loaded_studies, many=True)

        return Response({'data': serializer.data, 'number_of_pages': number_of_pages})
        