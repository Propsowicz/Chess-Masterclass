# Generated by Django 4.0.6 on 2022-10-03 16:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0002_chesscourse_premiumplan'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='chesscourse',
            name='premiumPlan',
        ),
    ]
