from django.contrib import admin
from .models import User, User_edit_keys
from .forms import CustomUserForm
from django.contrib.auth.admin import UserAdmin
# Register your models here.

# to extended user work properly i need to add new form to service it.
# added new form in .forms and loaded it here to admin panel
class CustomUserAdmin(UserAdmin):
    model = User
    add_form = CustomUserForm

    # create our custom fields in admin panel
    fieldsets = (
        *UserAdmin.fieldsets, (
            'User info',
            {
                'fields': (
                   'credit',
                   'expiration_date', 
                   'is_creator',
                   'is_activated',
                )
            }
        )
    )


admin.site.register(User, CustomUserAdmin)
admin.site.register(User_edit_keys)