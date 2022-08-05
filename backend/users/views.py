from rest_framework.viewsets import ModelViewSet
from users.models import CustomUser
from users.serializers import CustomUserModelSerializer

class CustomUserModelViewSet(ModelViewSet):
    serializer_class = CustomUserModelSerializer
    queryset = CustomUser.objects.all()
    