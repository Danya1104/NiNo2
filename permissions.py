from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsTeacherOrAdminForHomework(BasePermission):
    """
    Чтение (GET, HEAD, OPTIONS) доступно всем.
    Изменять домашние задания может:
    - администратор (is_staff),
    - преподаватель, который является автором задания (homework.teacher.user).
    """

    def has_permission(self, request, view):
        # Для чтения разрешаем всем
        if request.method in SAFE_METHODS:
            return True
        # Для записи — только авторизованным
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        # Для чтения разрешаем всем
        if request.method in SAFE_METHODS:
            return True

        user = request.user
        if not user or not user.is_authenticated:
            return False

        # Админ может всё
        if user.is_staff:
            return True

        # Преподаватель может менять только свои задания
        return hasattr(obj, "teacher") and obj.teacher.user == user
