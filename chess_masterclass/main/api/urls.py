from django.urls import path, include
from .views import ( coursesListAPI, courseDetailAPI, courseDetailTablesAPI, 
                coursesLikedByUserListAPI, likeCourse, StudyAPI, AllStudiesAPI, StudyTableAPI, editCourse)

urlpatterns = [
    # * CHESS COURSES
    # GET -- courses are loaded using sorting, search and filtering:
    path('courses/<str:order_by>/<str:filter>/<str:search>/<int:page>', coursesListAPI.as_view(), name='courses-filter'),                                   # all courses
    path('courses/<str:username>/<str:order_by>/<str:filter>/<str:search>/<int:page>', coursesLikedByUserListAPI.as_view(), name='liked-courses-filter'),   # courses liked by user
    path('courses/<str:slug>', courseDetailAPI.as_view(), name='course-detail'),                                                                            # single course details
    path('courses/<str:slug>/table', courseDetailTablesAPI.as_view(), name='course-detail-table'),                                                          # all courses chess tables
    # POST:  
    path('courses/<str:username>/<int:id>', likeCourse.as_view(), name='like-course'),                                                                      # like course
    # UPDATE -- service editing already created courses (at this moment new courses can be created through admin panel - it can be changed to some kind of custom panel if needed):
    # * note: only user with permisson (user's column is_creator == True) are able to edit courses
    path('course/creator-mode/edit/<int:id>', editCourse.as_view()),                                                                                        # edit course descrip
    path('course/creator-mode/edit/<int:id>/<int:tableId>', editCourse.as_view()),                                                                          # edit tables descrip
        
    # * CHESS STUDIES
    # chess studies, due to their nature (creating, editing, deleting etc..), are made more RESTful than courses (also i learned a lot through process of creating app ;))
    # each url is described in name attr    
    # url above is tricky: due to nature of displaying studies interface is loading: all public studies, user's public studies, private studies, liked studies. 
    # dynamic attributes send info what is needed to be loaded
    path('study/<str:username>/<str:access>/<str:private>/<str:liked>/<str:search>/<str:sort>/<int:page>', AllStudiesAPI.as_view()),                        
    path('study/detail/<str:username>/<int:id>', StudyAPI.as_view(), name='single-study'),    
    path('study/detail/<str:username>/<int:id>/table', StudyTableAPI.as_view(), name='study-tables'),
    # POST:
    path('study/<str:username>/create', AllStudiesAPI.as_view(), name='create-study'),
    path('study/detail/<str:username>/<int:id>/table/like', StudyTableAPI.as_view(), name='single-study-like'),
    path('study/detail/<str:username>/<int:id>/table/change-privacy', StudyTableAPI.as_view(), name='single-study-change-priv'),
    path('study/detail/<str:username>/<int:id>/table/delete-study', StudyTableAPI.as_view(), name='single-study-del-study'),
    path('study/detail/<str:username>/<int:id>/table/<int:tableId>', StudyTableAPI.as_view(), name='single-study-table-edit'),
    path('study/detail/<str:username>/<int:id>/table/<int:tableId>/delete', StudyTableAPI.as_view(), name='single-study-table-del'),
    path('study/detail/<str:username>/<int:id>/table/create', StudyTableAPI.as_view(), name='single-study-table-create'),
    path('study/detail/<str:username>/<int:id>/table/<int:tableId>/set-repr', StudyTableAPI.as_view(), name='single-study-table-set-representative'),
]
