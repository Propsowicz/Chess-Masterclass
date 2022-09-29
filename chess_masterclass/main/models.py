from django.db import models

# Create your models here.


class ChessCourse(models.Model):
    name = models.CharField(max_length=255)
    body = models.TextField()

    price = models.DecimalField(default=0, decimal_places=2, max_digits=6)

    def __str__(self):
        return f'{self.name} || {self.price}' 