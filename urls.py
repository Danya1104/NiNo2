from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import (
    GroupViewSet,
    SubjectViewSet,
    StaffContactViewSet,
    LessonViewSet,
    HomeworkViewSet,
)

router = DefaultRouter()
router.register(r"groups", GroupViewSet, basename="group")
router.register(r"subjects", SubjectViewSet, basename="subject")
router.register(r"staff", StaffContactViewSet, basename="staff")
router.register(r"lessons", LessonViewSet, basename="lesson")
router.register(r"homework", HomeworkViewSet, basename="homework")

urlpatterns = [
    path("", include(router.urls)),
]
