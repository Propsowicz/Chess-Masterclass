# Generated by Django 4.0.6 on 2022-10-14 17:17

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('main', '0012_chessstudy_alter_chesscourse_liked_by_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='chessstudytable',
            old_name='course',
            new_name='study',
        ),
        migrations.RemoveField(
            model_name='chessstudy',
            name='liked_by',
        ),
        migrations.AlterField(
            model_name='chessstudy',
            name='author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='ChessStudyLikes',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('study', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.chessstudy')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
