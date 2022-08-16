from django.db import models
from django.utils.timezone import now
from users.models import CustomUser

class Project(models.Model):
    title = models.CharField(max_length=128, unique=True)
    repository_url = models.URLField(max_length=256, blank=True)
    users = models.ManyToManyField(CustomUser)

    def __str__(self):
        return f"{self.title}"

class ToDo(models.Model):
    text = models.TextField()
    created_at = models.DateTimeField(default=now)  # auto_now_add=True - в adminPanel нет 
    modified_at = models.DateTimeField(default=now)
    is_active = models.BooleanField(default=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    author = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.text}"
