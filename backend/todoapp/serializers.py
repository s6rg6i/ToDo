from rest_framework.serializers import ModelSerializer
from todoapp.models import Project, ToDo

class ProjectModelSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class ToDoModelSerializer(ModelSerializer):
    class Meta:
        model = ToDo
        fields = ['text', 'is_active', 'project', 'author', 'created_at',]

