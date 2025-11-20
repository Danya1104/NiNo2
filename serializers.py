from rest_framework import serializers
from .models import (
    Group,
    Subject,
    TeacherProfile,
    StaffContact,
    Lesson,
    Homework,
)


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ["id", "name"]


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ["id", "name", "code"]


class TeacherProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeacherProfile
        fields = [
            "id",
            "full_name",
            "department",
            "position",
            "work_email",
        ]


class StaffContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = StaffContact
        fields = [
            "id",
            "full_name",
            "position",
            "department",
            "work_email",
        ]


class LessonSerializer(serializers.ModelSerializer):
    group = GroupSerializer(read_only=True)
    subject = SubjectSerializer(read_only=True)
    teacher = TeacherProfileSerializer(read_only=True)

    class Meta:
        model = Lesson
        fields = [
            "id",
            "date",
            "start_time",
            "end_time",
            "group",
            "subject",
            "teacher",
            "classroom",
            "lesson_type",
        ]


class HomeworkSerializer(serializers.ModelSerializer):
    group = GroupSerializer(read_only=True)
    subject = SubjectSerializer(read_only=True)
    teacher = TeacherProfileSerializer(read_only=True)

    class Meta:
        model = Homework
        fields = [
            "id",
            "title",
            "description",
            "due_date",
            "file",
            "link",
            "group",
            "subject",
            "teacher",
            "created_at",
            "updated_at",
        ]
