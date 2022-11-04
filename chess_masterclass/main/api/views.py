from main.models import ChessCourse, ChessTable, ChessStudy, ChessStudyTable, ChessStudyLikes
from .serializers import ChessCourseSerializer, ChessTableSerializer, ChessStudySerializer, ChessStudyTableSerializer

from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAdminUser, IsAuthenticatedOrReadOnly, IsAuthenticated
from django.core.paginator import Paginator
from ..utils import ChessCoursesPaginator
from member.models import User
from django.template.defaultfilters import slugify
from django.db.models import Count

import json
from django.utils import timezone
from datetime import datetime, timedelta

# CHESS COURSES VIEW CLASSES
# DISPLAY ALL COURSES (HOMEPAGE)
class coursesListAPI(APIView):    
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

# DISPLAY LIKED COURSES
class coursesLikedByUserListAPI(APIView):
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

# DISPLAY SINGLE COURSE
class courseDetailAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, slug, format=None):
        course = ChessCourse.objects.get(slug=slug)
        serializer = ChessCourseSerializer(course, many=False)

        return Response(serializer.data)
     
# DISPLAY TABLES OF EACH COURSE
class courseDetailTablesAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, slug, format=None):
        tables = ChessTable.objects.filter(course__slug=slug)        
        serializer = ChessTableSerializer(tables, many=True)        

        return Response(serializer.data)

# LIKE COURSE
class likeCourse(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

    def post(self, request, username, id, *args, **kwargs):
        course = ChessCourse.objects.get(id=id)
        user = User.objects.get(username=username)

        if user in course.liked_by.all():
            course.liked_by.remove(user)
            return Response('course disliked')
        else:
            course.liked_by.add(user)
            return Response('course liked')
                    
# EDIT COURSES -- ONLY TO USER WITH is_creator == True
class editCourse(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, id, tableId):
        data = request.data
        table = ChessTable.objects.get(id=tableId)
        if data['method'] == 'COORD':
            table.coord = data['coord']            
        elif data['method'] == 'BODY':
            table.text = data['text']            
       
        table.save() 
        return Response({'msg':'Course content has been edited'})

    def put(self, request, id):
        data = request.data
        course = ChessCourse.objects.get(id=id)             
        if data['method'] == 'TITLE':
            course.name = data['title']            
        elif data['method'] == 'COURSE-BODY':
            course.body = data['body']            
        course.save()
        return Response({'msg':'Course content has been edited'})

# CHESS STUDY VIEW CLASSES
# DISPLAY ALL STUDIES AND CREATE NEW STUDY (with some deafaults)
class AllStudiesAPI(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]    

    def post(self, request, username): # create deafult study (deafult: private, deafault name: My chess study #{next free number})
        user = User.objects.get(username=username)
        # get next free chess study number by username   
        all_user_studies = ChessStudy.objects.filter(author=user) 
        try: 
            user_study_next_id = all_user_studies.count() + 1
        except:
            user_study_next_id = 1
        # some deafults
        body = 'Please insert description...'
        position = '{a1:"wR",a2:"wP",a7:"bP",a8:"bR",b1:"wN",b2:"wP",b7:"bP",b8:"bN",c1:"wB",c2:"wP",c7:"bP",c8:"bB",d1:"wQ",d2:"wP",d7:"bP",d8:"bQ",e1:"wK",e2:"wP",e7:"bP",e8:"bK",f1:"wB",f2:"wP",f7:"bP",f8:"bB",g1:"wN",g2:"wP",g7:"bP",g8:"bN",h1:"wR",h2:"wP",h7:"bP",h8:"bR"}'
        private = True
        name = f'My chess study #{user_study_next_id}'

        # security from overcreating a lot of studies - you need to w8 5 minutes to create new study
        if user_study_next_id > 1:      # if it is your >1 study - w8 5 minutes till creating a new one      
            last_users_study_pub_date = all_user_studies.order_by('-pub_date')[0].pub_date  # get last created study
            time_border = last_users_study_pub_date + timedelta(minutes = 5)                # create time border (adding 5 minutes to creation time) which has to be crossed before creating a new study
            if timezone.now() > time_border:
                ChessStudy.objects.create(name=name, body=body, representationChessBoard=position, author=user, private=private)
                return Response({'msg': f'Study created at {datetime.now()}'}, status=status.HTTP_201_CREATED)
            else:
                return Response({'msg': 'Please wait before adding a new study.'}, status=status.HTTP_401_UNAUTHORIZED)
        else:   # if it is your first study - create it
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
        
        # added liked count field to current query set
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

# DISPLAY SINGE STUDY (AND EDIT IT)
class StudyAPI(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]    

    def get(self, request, username, id):
        user = User.objects.get(username=username)
        study = ChessStudy.objects.get(author=user, id=id)

        serializer = ChessStudySerializer(study, many=False)

        return Response(serializer.data)
    
    def put(self, request, username, id):
        user = User.objects.get(username=username)
        data = request.data
       
        study = ChessStudy.objects.get(id=id, author=user)
        try:
            study.name = data['name']
        except:
            pass
        try:
            study.body = data['body']
        except:
            pass
        study.save()
        return Response({'msg': 'ok'})

# DISPLAY CHESS TABLES FOR EACH STUDY (also create, delete and edit it)
class StudyTableAPI(APIView):
    permission_classes = [IsAuthenticatedOrReadOnly]   

    # get table data
    def get(self, request, username, id):
        user = User.objects.get(username=username)
        study = ChessStudy.objects.get(id=id, author=user)

        tables = ChessStudyTable.objects.filter(study=study)
        serializer = ChessStudyTableSerializer(tables, many=True)
    
        return Response(serializer.data)

    # edit table data
    def put(self, request, username, id, tableId):
        table = ChessStudyTable.objects.get(id=tableId)
        data = request.data
        print(data)
        try:
            table.text = data['text']
        except:
            pass
        try:
            table.coord = data['coord']
        except:
            pass
        table.save()
        return Response({'msg': 'table was edited'})
    
    # delete table
    def delete(self, request, username, id, tableId):
        table = ChessStudyTable.objects.get(id=tableId)
        table.delete()

        return Response({'msg': 'table has been deleted'})

    # set table as representative table of study
    def patch(self, request, username, id, tableId):
        data = request.data
        study = ChessStudy.objects.get(id=id)        
        study.representationChessBoard = data['coord']
        study.save()

        return Response({'msg': 'selected position is now representative to Study'})

    # post method which handle a few operations
    def post(self, request, username, id):
        data = request.data
        study = ChessStudy.objects.get(id=id)

        # create new table with position of full chesstable
        if data['method'] == 'CREATE':
            body = 'Please insert description...'
            position = '{a1:"wR",a2:"wP",a7:"bP",a8:"bR",b1:"wN",b2:"wP",b7:"bP",b8:"bN",c1:"wB",c2:"wP",c7:"bP",c8:"bB",d1:"wQ",d2:"wP",d7:"bP",d8:"bQ",e1:"wK",e2:"wP",e7:"bP",e8:"bK",f1:"wB",f2:"wP",f7:"bP",f8:"bB",g1:"wN",g2:"wP",g7:"bP",g8:"bN",h1:"wR",h2:"wP",h7:"bP",h8:"bR"}'

            ChessStudyTable.objects.create(study=study, coord=position, text=body)
            return Response({'msg': 'a new table has been created'})    
        
        # like study
        if data['method'] == 'LIKE':   
            user = User.objects.get(username=data['user'])
            if ChessStudyLikes.objects.filter(user=user, study=study).exists():
                ChessStudyLikes.objects.get(user=user, study=study).delete()
            else:
                ChessStudyLikes.objects.create(user=user, study=study)

            return Response({'msg': 'liked or disliked'})   
        
        # set privacy of study (public or private) 
        if data['method'] == 'PRIVACY':
            current_privacy = data['current_privacy']

            if current_privacy:
                study.private = False
            else:
                study.private = True
            study.save()

            return Response({'msg': 'privacy of study has been changed'})    
        
        # delete study
        if data['method'] == 'DELETE-STUDY':
            study.delete()

            return Response({'msg': 'study has been deleted'}) 

