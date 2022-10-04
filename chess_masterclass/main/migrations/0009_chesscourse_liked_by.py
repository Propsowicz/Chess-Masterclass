# Generated by Django 4.0.6 on 2022-10-04 19:14

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('main', '0008_remove_chesscourse_liked_by'),
    ]

    operations = [
        migrations.AddField(
            model_name='chesscourse',
            name='liked_by',
            field=models.ManyToManyField(to=settings.AUTH_USER_MODEL),
        ),
    ]
