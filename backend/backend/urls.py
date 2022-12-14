"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken import views
from todoapp.views import ProjectModelViewSet, ToDoModelViewSet
from users.views import CustomUserModelViewSet
from drf_yasg.views import get_schema_view
from drf_yasg.openapi import Info, License, Contact
from django.views.decorators.csrf import csrf_exempt
from graphene_django.views import GraphQLView
from django.views.generic import TemplateView


schema_view = get_schema_view(
    Info(
        title='ToDo',
        default_version='1.0',
        description='description',
        license=License(name='MIT'),
        contact=Contact(email='test@yandex.ru')
    )
)

router = DefaultRouter()
router.register('users', CustomUserModelViewSet)
router.register('project', ProjectModelViewSet)
router.register('todo', ToDoModelViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
    path('api-auth-token/', views.obtain_auth_token),
    path('swagger/', schema_view.with_ui('swagger')),
    path('redoc/', schema_view.with_ui('redoc')),
    path('graphql/',GraphQLView.as_view(graphiql=True)),  # (graphiql=True) включить веб-интерфейс
    path('',TemplateView.as_view(template_name='index.html'))
]
