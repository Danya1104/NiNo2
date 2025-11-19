from django.contrib import admin
from .models import (
    Group,
    Subject,
    TeacherProfile,
    StaffContact,
    Lesson,
    Homework,
)


@admin.register(Group)
class GroupAdmin(admin.ModelAdmin):
    list_display = ("name",)
    search_fields = ("name",)


@admin.register(Subject)
class SubjectAdmin(admin.ModelAdmin):
    list_display = ("name", "code")
    search_fields = ("name", "code")


@admin.register(TeacherProfile)
class TeacherProfileAdmin(admin.ModelAdmin):
    list_display = ("full_name", "department", "position", "work_email")
    search_fields = ("full_name", "department", "position", "work_email")


@admin.register(StaffContact)
class StaffContactAdmin(admin.ModelAdmin):
    list_display = ("full_name", "position", "department", "work_email")
    search_fields = ("full_name", "position", "department", "work_email")


@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    list_display = ("date", "start_time", "end_time", "group", "subject", "teacher", "classroom")
    list_filter = ("date", "group", "subject", "teacher")
    search_fields = ("group__name", "subject__name", "teacher__full_name", "classroom")


@admin.register(Homework)
class HomeworkAdmin(admin.ModelAdmin):
    list_display = ("title", "group", "subject", "teacher", "due_date", "created_at")
    list_filter = ("group", "subject", "teacher", "due_date")
    search_fields = ("title", "description", "group__name", "subject__name", "teacher__full_name")
    readonly_fields = ("created_at", "updated_at")
