from .models import ChessCourse
from django.core.paginator import Paginator

class ChessCoursesPaginator():
    def __init__(self, all_courses):        
        self.all_courses = all_courses        
        # attr
        self.items_per_page = 2

        self.paginator = Paginator(self.all_courses, self.items_per_page)

    def getPageItems(self, page_number):
        return self.paginator.get_page(page_number)

    def getPageCount(self):
        return self.paginator.num_pages