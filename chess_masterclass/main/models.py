from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django.template.defaultfilters import slugify

# Create your models here.


class ChessCourse(models.Model):
    name = models.CharField(max_length=255)
    body = models.TextField()
    slug = models.SlugField(blank=True, null=True)

    price = models.DecimalField(default=0, decimal_places=2, max_digits=6)

    def __str__(self):
        return f'{self.name} || {self.price}' 

@receiver(pre_save, sender=ChessCourse)
def chess_course_pre_save_receiver(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = slugify(instance.name)