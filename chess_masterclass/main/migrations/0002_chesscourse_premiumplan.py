# Generated by Django 4.0.6 on 2022-10-03 16:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='chesscourse',
            name='premiumPlan',
            field=models.CharField(default='free', max_length=150),
            preserve_default=False,
        ),
    ]
