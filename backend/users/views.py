from rest_framework.mixins import ListModelMixin, RetrieveModelMixin, UpdateModelMixin
from rest_framework.permissions import DjangoModelPermissions
from rest_framework.viewsets import GenericViewSet, ModelViewSet

from users.models import CustomUser
from users.serializers import CustomUserModelSerializer, CustomUserModelSerializerV2


# нельзя удалять и создавать: не наследуем в ModelViewSet (CreateModelMixin, DestroyModelMixin)
class CustomUserModelViewSet(RetrieveModelMixin, ListModelMixin, UpdateModelMixin, GenericViewSet):
    queryset = CustomUser.objects.all()
    # serializer_class = CustomUserModelSerializer
    # permission_classes = [DjangoModelPermissions]
    
    def get_serializer_class(self):
        return CustomUserModelSerializerV2 if self.request.version == '2.0' else CustomUserModelSerializer