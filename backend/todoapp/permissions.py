"""Базовая авторизация для Projects"""

from rest_framework.permissions import BasePermission

class CustomProjectPermission(BasePermission):
    def has_permission(self, request, view):
        if request.user.is_staff:
            return True  # superuser
        usr = request.user  # пользователь
        groups = {x.name for x in usr.groups.all()}  # К каким группам принадлежит
        if not request.user.is_authenticated or not groups:
            return False  # или незарега или нет группы
        if view.action not in ['list', 'retrieve'] and {'Developers'} >= groups:
            return False  # Для группы 'Developers' только чтение
        return groups < {'Administrators', 'Developers', 'Owners'}  # False если не входит в allowed_group
