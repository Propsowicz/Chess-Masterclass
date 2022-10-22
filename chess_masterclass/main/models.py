from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.template.defaultfilters import slugify
from member.models import User

# CHESS COURSES
class ChessCourse(models.Model):
    name = models.CharField(max_length=255)
    body = models.TextField()
    slug = models.SlugField(blank=True, null=True)
    representationChessBoard = models.CharField(max_length=600, blank=True, null=True)

    price = models.DecimalField(default=0, decimal_places=2, max_digits=6)
    premiumPlan = models.CharField(max_length=150, blank=True, null=True)       # set by receiver (pre save)
    liked_by = models.ManyToManyField(User, blank=True)                         

    def __str__(self):
        return f'{self.name} || {self.price}' 

@receiver(pre_save, sender=ChessCourse)
def chess_course_pre_save_receiver(sender, instance, *args, **kwargs):
    if not instance.slug:                                                       # set slug
        instance.slug = slugify(instance.name)
    if not instance.premiumPlan:                                                # set premium plan
        if float(instance.price) == 0.00:
            instance.premiumPlan = 'free'
        elif float(instance.price) == 9.99:
            instance.premiumPlan = 'master'
        elif float(instance.price) == 19.99:
            instance.premiumPlan = 'international master'
        elif float(instance.price) == 34.99:
            instance.premiumPlan = 'grandmaster'


class ChessTable(models.Model):
    course = models.ForeignKey(ChessCourse, on_delete=models.CASCADE)
    coord = models.CharField(max_length=600)
    text = models.TextField()

    def __str__(self):
        return f'{self.course.name}'

# CHESS STUDY
class ChessStudy(models.Model):
    name = models.CharField(max_length=255)
    body = models.TextField()
    slug = models.SlugField(blank=True, null=True)
    representationChessBoard = models.CharField(max_length=600, blank=True, null=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    private = models.BooleanField(default=True)
    pub_date = models.DateTimeField(auto_now_add=True, blank=True, null=True)

    def __str__(self):
        return f'{self.name} || {self.author}'

    @property
    def number_of_likes(self):                                                  # property of each instance of class -> get count of database record (from ChessStudyLikes table) related to this instance
        return self.chessstudylikes_set.all().count()
    
@receiver(pre_save, sender=ChessStudy)
def chess_study_pre_save_receiver(sender, instance, *args, **kwargs):
    if not instance.slug:                                                       # set slug
        instance.slug = slugify(instance.name)

class ChessStudyTable(models.Model):
    study = models.ForeignKey(ChessStudy, on_delete=models.CASCADE)
    coord = models.CharField(max_length=600)
    text = models.TextField()

    def __str__(self):
        return f'{self.study.name}'

class ChessStudyLikes(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    study = models.ForeignKey(ChessStudy, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.user.username} liked {self.study.name} by {self.study.author.username}'