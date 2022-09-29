# Generated by Django 4.1.1 on 2022-09-28 19:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('member', '0002_user_is_creator_alter_user_is_active'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='is_activated',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='is_active',
            field=models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active'),
        ),
    ]
