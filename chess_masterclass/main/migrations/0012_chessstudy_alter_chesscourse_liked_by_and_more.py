# Generated by Django 4.0.6 on 2022-10-13 18:43

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('main', '0011_alter_chesscourse_liked_by'),
    ]

    operations = [
        migrations.CreateModel(
            name='ChessStudy',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('body', models.TextField()),
                ('slug', models.SlugField(blank=True, null=True)),
                ('representationChessBoard', models.CharField(blank=True, max_length=255, null=True)),
                ('author', models.CharField(max_length=255)),
                ('private', models.BooleanField(default=True)),
                ('liked_by', models.ManyToManyField(blank=True, null=True, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AlterField(
            model_name='chesscourse',
            name='liked_by',
            field=models.ManyToManyField(blank=True, to=settings.AUTH_USER_MODEL),
        ),
        migrations.CreateModel(
            name='ChessStudyTable',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('coord', models.CharField(max_length=300)),
                ('text', models.TextField()),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.chessstudy')),
            ],
        ),
    ]
