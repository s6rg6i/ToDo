# Generated by Django 3.2.15 on 2022-08-15 19:51

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('todoapp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todo',
            name='created_at',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='todo',
            name='modified_at',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
