from .models import User, User_edit_keys
from django.dispatch import receiver
from django.db.models.signals import pre_save, post_save
from .utils import activateAccount

@receiver(post_save, sender=User, dispatch_uid='member_post_save')
def user_post_save_create(sender, instance, created, **kwargs):
    
    if created:
        User_edit_keys.objects.create(user=instance)
        user = activateAccount(instance)
        user.createKeys()
        user.sendEmail()
    else:
        print('the user data was edited')


