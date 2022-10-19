from django.urls import path, include
from .views import ( coursesListAPI, courseDetailAPI, courseDetailTablesAPI, coursesListPaginatorAPI,
                pagesTotalNumber, coursesLikedByUserListAPI, likeCourse, StudyAPI, AllStudiesAPI, StudyTableAPI, editCourse)

urlpatterns = [
    # GET courses
    # list of courses:
    # page #1
    path('courses/', coursesListAPI.as_view(), name='courses-first-page'),
    # page #>1
    path('courses/page/<int:page>', coursesListPaginatorAPI.as_view(), name='courses-paginator'),
    # path('courses/page/total-page-number', pagesTotalNumber.as_view(), name='total-page-number'),


    # filtered Data
    # path('courses/<str:filter>/<int:page>', coursesListFilterAPI.as_view(), name='courses-filter'),
    # path('courses/<str:filter>/<int:page>', coursesListFilterAPI.as_view(), name='courses-filter'),
    path('courses/<str:order_by>/<str:filter>/<str:search>/<int:page>', coursesListAPI.as_view(), name='courses-filter'),
    path('courses/<str:username>/<str:order_by>/<str:filter>/<str:search>/<int:page>', coursesLikedByUserListAPI.as_view(), name='liked-courses-filter'),
    
    # Studies
    path('study/<str:username>/create', AllStudiesAPI.as_view(), name='create-study'),
    path('study/<str:username>/<str:access>/<str:private>/<str:liked>/<str:search>/<str:sort>/<int:page>', AllStudiesAPI.as_view()),
    path('study/detail/<str:username>/<int:id>', StudyAPI.as_view(), name='single-study'),
    path('study/detail/<str:username>/<int:id>/table', StudyTableAPI.as_view(), name='study-tables'),
    path('study/detail/<str:username>/<int:id>/table/like', StudyTableAPI.as_view(), name='single-study-like'),
    path('study/detail/<str:username>/<int:id>/table/change-privacy', StudyTableAPI.as_view(), name='single-study-change-priv'),
    path('study/detail/<str:username>/<int:id>/table/delete-study', StudyTableAPI.as_view(), name='single-study-change-del-study'),
    path('study/detail/<str:username>/<int:id>/table/<int:tableId>', StudyTableAPI.as_view(), name='single-study-table-edit'),
    path('study/detail/<str:username>/<int:id>/table/<int:tableId>/delete', StudyTableAPI.as_view(), name='single-study-table-del'),
    path('study/detail/<str:username>/<int:id>/table/create', StudyTableAPI.as_view(), name='single-study-table-create'),
    path('study/detail/<str:username>/<int:id>/table/<int:tableId>/set-repr', StudyTableAPI.as_view(), name='single-study-table-set-rep'),

    # courses
    path('courses/<str:slug>', courseDetailAPI.as_view(), name='course-detail'),
    path('courses/<str:slug>/table', courseDetailTablesAPI.as_view(), name='course-detail-table'),    
    path('courses/<str:username>/<int:id>', likeCourse.as_view(), name='like-course'),\
    path('course/creator-mode/edit/<int:id>', editCourse.as_view()),
    path('course/creator-mode/edit/<int:id>/<int:tableId>', editCourse.as_view()),
    


]
