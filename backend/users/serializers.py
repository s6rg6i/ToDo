from rest_framework.serializers import ModelSerializer
from .models import CustomUser


class CustomUserModelSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'first_name', 'last_name', 'email']


class CustomUserModelSerializerV2(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'first_name', 'last_name', 'email', 'is_superuser', 'is_staff']
