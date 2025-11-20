from rest_framework import viewsets, filters
from rest_framework.permissions import AllowAny
from django_filters.rest_framework import DjangoFilterBackend

from .models import (
    Group,
    Subject,
    TeacherProfile,
    StaffContact,
    Lesson,
    Homework,
)
from .serializers import (
    GroupSerializer,
    SubjectSerializer,
    TeacherProfileSerializer,
    StaffContactSerializer,
    LessonSerializer,
    HomeworkSerializer,
)
from .permissions import IsTeacherOrAdminForHomework


class GroupViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Список учебных групп (только чтение).
    """
    queryset = Group.objects.all().order_by("name")
    serializer_class = GroupSerializer
    permission_classes = [AllowAny]


class SubjectViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Список предметов (только чтение).
    """
    queryset = Subject.objects.all().order_by("name")
    serializer_class = SubjectSerializer
    permission_classes = [AllowAny]


class StaffContactViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Список сотрудников и контактных почт (только чтение).
    """
    queryset = StaffContact.objects.all().order_by("full_name")
    serializer_class = StaffContactSerializer
    permission_classes = [AllowAny]
    filter_backends = [filters.SearchFilter]
    search_fields = ["full_name", "position", "department"]


class LessonViewSet(viewsets.ReadOnlyModelViewSet):
    """
    Расписание занятий (только чтение).
    Поддерживает фильтрацию по группе и дате.
    """
    queryset = Lesson.objects.select_related(
        "group", "subject", "teacher"
    ).all()
    serializer_class = LessonSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ["group", "date"]  # /api/lessons/?group=1&date=2025-10-29


class HomeworkViewSet(viewsets.ModelViewSet):
    """
    Домашние задания:
    - чтение доступно всем
    - изменение/создание только для авторизованных (препод/админ)
    """
    queryset = Homework.objects.select_related(
        "group", "subject", "teacher"
    ).all()
    serializer_class = HomeworkSerializer
    permission_classes = [IsTeacherOrAdminForHomework]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ["group", "subject", "due_date"]
    ordering_fields = ["due_date", "created_at"]
    ordering = ["-created_at"]

    def perform_create(self, serializer):
        """
        При создании задания автоматически подставим teacher,
        если он есть у текущего пользователя.
        """
        user = self.request.user
        teacher_profile = getattr(user, "teacher_profile", None)
        serializer.save(teacher=teacher_profile)
