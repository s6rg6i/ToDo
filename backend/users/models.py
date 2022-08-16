from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    email = models.EmailField(verbose_name='email address', max_length=255, unique=True)

    def __str__(self):
        return f'-{self.username}-'
        