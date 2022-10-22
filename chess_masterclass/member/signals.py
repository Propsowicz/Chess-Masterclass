from .models import User, User_edit_keys
from django.dispatch import receiver
from django.db.models.signals import pre_save, post_save
from .utils import AccountOperations

# signal receiver which creates user key, url and send email with that data to User (by AccountOperations class)
@receiver(post_save, sender=User, dispatch_uid='member_post_save')
def user_post_save_create(sender, instance, created, **kwargs):
    if created:
        User_edit_keys.objects.create(user=instance)
        user = AccountOperations(instance)
        user.createUserKeys()
        user.sendWelcomeEmail()
    else:
        print('the user data was edited')


