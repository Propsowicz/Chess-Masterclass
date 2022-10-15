from django.contrib import admin
from .models import ChessCourse, ChessTable, ChessStudy, ChessStudyTable, ChessStudyLikes
# Register your models here.


admin.site.register(ChessCourse)
admin.site.register(ChessTable)
admin.site.register(ChessStudy)
admin.site.register(ChessStudyTable)
admin.site.register(ChessStudyLikes)
