# Generated by Django 4.0.6 on 2022-10-04 16:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0005_chesstable'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chesstable',
            name='text',
            field=models.TextField(),
        ),
    ]
