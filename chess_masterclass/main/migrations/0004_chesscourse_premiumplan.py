# Generated by Django 4.0.6 on 2022-10-03 16:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_remove_chesscourse_premiumplan'),
    ]

    operations = [
        migrations.AddField(
            model_name='chesscourse',
            name='premiumPlan',
            field=models.CharField(blank=True, max_length=150, null=True),
        ),
    ]
