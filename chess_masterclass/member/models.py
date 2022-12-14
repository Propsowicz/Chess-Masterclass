from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):                           # extension of django's user deafult model
    credit = models.DecimalField(default=0, decimal_places=2, max_digits=6)
    expiration_date = models.DateField(blank=True, null=True)
    is_creator = models.BooleanField(default=False, blank=True, null=True)
    is_activated = models.BooleanField(default=False, blank=True, null=True)
# * to make extension of database work properly neede to create extra fields in admin.py (to create forms in admin panel)
    
# database which stores user key and url to activate account or in case of forgotten password. Database is created via signals.py or in ForgotPassAPI in member/api/views.py
class User_edit_keys(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    secretkey = models.CharField(max_length=10, blank=True, null=True)
    url = models.CharField(max_length=99, blank=True, null=True)

    def __str__(self):
        return f'{self.user} keys'
