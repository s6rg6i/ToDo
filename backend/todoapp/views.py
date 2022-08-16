from rest_framework.pagination import LimitOffsetPagination
from rest_framework.viewsets import ModelViewSet

from .filters import ToDoFilter
from .models import Project, ToDo
from .serializers import ProjectModelSerializer, ToDoModelSerializer


class ProjectModelViewSet(ModelViewSet):
    class Paginator(LimitOffsetPagination):
        default_limit = 10

    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = Paginator
    filterset_fields = ['title']  # 2-й выриант через фильтр

    # 1-й выриант через кварисет get_queryset
    
    # def get_queryset(self):  # фильтр по названию проекта http://localhost:8000/api/project/?title=Проект 3
    #     if name := self.request.query_params.get('title', None):
    #         return Project.objects.filter(title__contains=name)
    #     return Project.objects.all()


class ToDoModelViewSet(ModelViewSet):
    class Paginator(LimitOffsetPagination):
        default_limit = 20

    queryset = ToDo.objects.all()
    serializer_class = ToDoModelSerializer
    pagination_class = Paginator
    filterset_class = ToDoFilter  # 2-й выриант через фильтр

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()

    # 1-й выриант через кварисет get_queryset
    
    # def get_queryset(self):
    #     project_id = self.request.query_params.get('project_id', None)
    #     if project_id:
    #         return ToDo.objects.filter(project=project_id)
    #     return ToDo.objects.all()
