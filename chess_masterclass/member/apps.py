from django.apps import AppConfig


class MemberConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'member'


# done this to let signals.py work. Needed to path to it in INSTALLED_APP 
class MemberConfig(AppConfig):
    name = 'member'

    def ready(self):
        import member.signals