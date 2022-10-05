from .models import ChessCourse
from django.core.paginator import Paginator

class ChessCoursesPaginator():
    def __init__(self, ChessCourse):
        self.ChessCourse = ChessCourse
        self.all_courses = self.ChessCourse.objects.all().order_by('price')        
        # attr
        self.items_per_page = 2

        self.paginator = Paginator(self.all_courses, self.items_per_page)

    def getPageItems(self, page_number):
        return self.paginator.get_page(page_number)

    def getPageCount(self):
        return self.paginator.num_pages