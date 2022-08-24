from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.viewsets import GenericViewSet, ModelViewSet
from rest_framework.permissions import DjangoModelPermissions

from users.models import CustomUser
from users.serializers import CustomUserModelSerializer


# class CustomUserModelViewSet(ModelViewSet):
# нельзя удалять и создавать: не наследуем в ModelViewSet (CreateModelMixin, DestroyModelMixin)
class CustomUserModelViewSet(RetrieveModelMixin, ListModelMixin, UpdateModelMixin, GenericViewSet):
    serializer_class = CustomUserModelSerializer
    queryset = CustomUser.objects.all()
    permission_classes = [DjangoModelPermissions]
