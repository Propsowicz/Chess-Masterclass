from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.template.defaultfilters import slugify
from member.models import User

# Create your models here.


class ChessCourse(models.Model):
    name = models.CharField(max_length=255)
    body = models.TextField()
    slug = models.SlugField(blank=True, null=True)
    representationChessBoard = models.CharField(max_length=255, blank=True, null=True)

    price = models.DecimalField(default=0, decimal_places=2, max_digits=6)
    premiumPlan = models.CharField(max_length=150, blank=True, null=True)
    liked_by = models.ManyToManyField(User, null=True, blank=True)

    def __str__(self):
        return f'{self.name} || {self.price}' 

@receiver(pre_save, sender=ChessCourse)
def chess_course_pre_save_receiver(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = slugify(instance.name)
    if not instance.premiumPlan:        
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

    coord = models.CharField(max_length=300)
    text = models.TextField()

    def __str__(self):
        return f'{self.course.name}'