from django.urls import path, include
from .views import ( coursesListAPI, courseDetailAPI, courseDetailTablesAPI, coursesListPaginatorAPI,
                pagesTotalNumber, coursesLikedByUserListAPI, likeCourse )

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
    


    path('courses/<str:slug>', courseDetailAPI.as_view(), name='course-detail'),
    path('courses/<str:slug>/table', courseDetailTablesAPI.as_view(), name='course-detail-table'),
    path('courses/<str:username>/<int:id>', likeCourse.as_view(), name='like-course'),


]
