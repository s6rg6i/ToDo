from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    GENDERS = (
        ('m', 'Мужчина'),
        ('f', 'Женщина'),
    )
    email = models.EmailField(verbose_name='email address', max_length=255, unique=True)
    gender = models.CharField('Пол', max_length=1, choices=GENDERS, default='')
