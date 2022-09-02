from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from users.models import CustomUser
from users.serializers import CustomUserModelSerializer
from .models import Project, ToDo

class ProjectModelSerializer(ModelSerializer):
    # users = serializers.StringRelatedField(many=True)
    users = serializers.SlugRelatedField(queryset=CustomUser.objects.all(), many=True, slug_field='last_name')
    # users = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all(), many=True)

    class Meta:
        model = Project
        fields = ['id', 'title', 'repository_url', 'users']


class ToDoModelSerializer(ModelSerializer):
    # project = serializers.CharField(source='project.title')
    author = serializers.CharField(source='author.username')

    class Meta:
        model = ToDo
        fields = '__all__'