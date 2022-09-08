import graphene
from graphene_django import DjangoObjectType

from .models import Project, ToDo
from users.models import CustomUser


class ProjectList(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class ToDoList(DjangoObjectType):
    class Meta:
        model = ToDo
        fields = '__all__'


class UserList(DjangoObjectType):
    class Meta:
        model = CustomUser
        fields = '__all__'


class Query(graphene.ObjectType):
    # {hello} -> {"data": {"hello": "world!"}}
    hello = graphene.String(default_value="World")  # проверка настройки GraphQL

    # {projectList {title repositoryUrl
    #   users {username}
    #   todoSet {text isActive}}}
    project_list = graphene.List(ProjectList)

    def resolve_project_list(self, info):
        return Project.objects.all()

    # {todoList {id text createdAt isActive project {id title repositoryUrl}}}
    todo_list = graphene.List(ToDoList)

    def resolve_todo_list(self, info):
        return ToDo.objects.all()

    # { userList {id username email isStaff}}
    user_list = graphene.List(UserList)

    def resolve_user_list(self, info):
        return CustomUser.objects.all()

    # вывод ToDо по id проекта
    # {todoInProjectId(pk:1) { text project {title} author {username} }}
    todo_in_project_id = graphene.List(ToDoList, pk=graphene.Int(required=True))

    def resolve_todo_in_project_id(self, info, pk):
        return ToDo.objects.all().filter(project__id=pk)


# мутация для создания "todo"
class CreateToDoMutation(graphene.Mutation):
    class Arguments:
        text = graphene.String(required=True)
        is_active = graphene.Boolean(required=True)
        project = graphene.Int(required=True)
        author = graphene.Int(required=True)

    todo = graphene.Field(ToDoList)

    @classmethod
    def mutate(cls, root, info, text, is_active, project, author):
        todo = ToDo(
            text=text, is_active=is_active, project=Project(id=project), author=CustomUser(id=author))
        todo.save()
        return cls(todo)


# mutation { createTodo(text:"all done" isActive:true project:1 author:1) {todo {text}}}
class Mutations(graphene.ObjectType):
    create_todo = CreateToDoMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutations)
