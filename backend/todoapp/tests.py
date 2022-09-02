from django.test import TestCase
# from unittest import TestCase  # Created user in real DB
from mixer.backend.django import mixer
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APITestCase

from todoapp.models import Project
from todoapp.views import ProjectModelViewSet, ToDoModelViewSet
from users.models import CustomUser


#       1. Создаем тесты, используя APIRequestFactory
class TestAPIRequestFactory(TestCase):

    def setUp(self) -> None:
        self.admin = CustomUser.objects.create_superuser('root', 'root1@ru.ru', 'root', last_name="Ян")
        self.data_proj = {"title": "Pr_1", "repository_url": "https://github.com/Pr_1", "users": ["Ян"]}
        self.data_todo = {"author": 1, "text": "text", "project": 1}
        self.proj_get = ['api/project/', ProjectModelViewSet, {'get': 'list'}, {}]
        self.proj_post = ['api/project/', ProjectModelViewSet, {'post': 'create'}, self.data_proj]
        self.todo_get = ['api/todo/', ToDoModelViewSet, {'get': 'list'}, {}]
        self.todo_post = ['api/todo/', ToDoModelViewSet, {'post': 'create'}, self.data_todo]

    def tearDown(self) -> None:
        ...

    @staticmethod
    def run_apiRF_test(path, view, action, data, user=None):
        if 'get' in action:
            request = APIRequestFactory().get(path)
        elif 'post' in action:
            request = APIRequestFactory().post(path, data, format='json')
        else:
            return -1
        v = view.as_view(action)
        if user:
            force_authenticate(request, user)
        return v(request).status_code

    def test_get_unregistered(self):
        self.assertEqual(self.run_apiRF_test(*self.proj_get), status.HTTP_403_FORBIDDEN)
        self.assertEqual(self.run_apiRF_test(*self.todo_get), status.HTTP_403_FORBIDDEN)

    def test_get_registered(self):
        self.assertEqual(self.run_apiRF_test(*self.proj_get, self.admin), status.HTTP_200_OK)
        self.assertEqual(self.run_apiRF_test(*self.todo_get, self.admin), status.HTTP_200_OK)

    def test_post_registered(self):
        self.assertEqual(self.run_apiRF_test(*self.proj_post, self.admin), status.HTTP_201_CREATED)
        self.assertEqual(self.run_apiRF_test(*self.todo_post, self.admin), status.HTTP_201_CREATED)


#       2. Создаем тесты, используя APIClient
class TestAPIClient(TestCase):

    def setUp(self) -> None:
        self.admin = CustomUser.objects.create_superuser('root', 'root1@ru.ru', 'root')
        self.user = CustomUser.objects.create_user('user', 'user@ru.ru', 'user')
        self.client = APIClient()

    def test_user_detail(self):
        self.client.login(username='root', password='root')
        response = self.client.get(f'/api/users/{self.user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['username'], 'user')


#       3. Создаем тесты, используя APITestCase
class TestAPITestCase(APITestCase):

    def setUp(self) -> None:
        self.admin = CustomUser.objects.create_superuser('root', 'root1@ru.ru', 'root')
        self.data_proj = Project.objects.create(title='Pr_1', repository_url='https://github.com/Pr_1')

    def test_get_list(self):
        response = self.client.get('/api/project/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_get_list_1(self):
        self.client.login(username='root', password='root')
        response = self.client.get('/api/project/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.client.logout()
        response = self.client.get('/api/project/')
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


# 4.  Создаем данные для тестов с помощью mixer.
class TestAPITestCaseMixer(APITestCase):
    def setUp(self) -> None:
        self.admin = CustomUser.objects.create_superuser('root', 'root1@ru.ru', 'root')
        self.author = mixer.cycle(5).blend(Project)

    def test_get_list(self):
        self.client.login(username='root', password='root')
        response = self.client.get('/api/project/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 5)