from django.db import models
from django.contrib.auth.models import User


class Group(models.Model):
    """Учебная группа, например: ИВТ-21-1"""
    name = models.CharField("Название группы", max_length=50, unique=True)

    class Meta:
        verbose_name = "Группа"
        verbose_name_plural = "Группы"

    def __str__(self) -> str:
        return self.name


class Subject(models.Model):
    """Учебный предмет / дисциплина"""
    name = models.CharField("Название предмета", max_length=100)
    code = models.CharField("Код предмета", max_length=20, blank=True)

    class Meta:
        verbose_name = "Предмет"
        verbose_name_plural = "Предметы"

    def __str__(self) -> str:
        return self.name


class TeacherProfile(models.Model):
    """Профиль преподавателя, привязанный к пользователю Django"""
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name="teacher_profile",
        verbose_name="Пользователь",
    )
    full_name = models.CharField("ФИО", max_length=150)
    department = models.CharField("Кафедра / подразделение", max_length=150, blank=True)
    position = models.CharField("Должность", max_length=100, blank=True)
    work_email = models.EmailField("Рабочая почта")

    class Meta:
        verbose_name = "Преподаватель"
        verbose_name_plural = "Преподаватели"

    def __str__(self) -> str:
        return self.full_name


class StaffContact(models.Model):
    """Сотрудник/преподаватель для общего списка контактов"""
    full_name = models.CharField("ФИО", max_length=150)
    position = models.CharField("Должность", max_length=100)
    department = models.CharField("Кафедра / подразделение", max_length=150, blank=True)
    work_email = models.EmailField("Рабочая почта")

    class Meta:
        verbose_name = "Сотрудник"
        verbose_name_plural = "Сотрудники"

    def __str__(self) -> str:
        return f"{self.full_name} ({self.work_email})"


class Lesson(models.Model):
    """Элемент расписания"""
    date = models.DateField("Дата")
    start_time = models.TimeField("Время начала")
    end_time = models.TimeField("Время окончания")
    group = models.ForeignKey(
        Group,
        on_delete=models.CASCADE,
        related_name="lessons",
        verbose_name="Группа",
    )
    subject = models.ForeignKey(
        Subject,
        on_delete=models.CASCADE,
        related_name="lessons",
        verbose_name="Предмет",
    )
    teacher = models.ForeignKey(
        TeacherProfile,
        on_delete=models.CASCADE,
        related_name="lessons",
        verbose_name="Преподаватель",
    )
    classroom = models.CharField("Аудитория", max_length=50, blank=True)
    lesson_type = models.CharField("Тип занятия", max_length=50, blank=True)

    class Meta:
        verbose_name = "Занятие"
        verbose_name_plural = "Занятия"
        ordering = ["date", "start_time"]

    def __str__(self) -> str:
        return f"{self.date} {self.group} {self.subject}"


class Homework(models.Model):
    """Домашнее задание для группы по предмету"""
    subject = models.ForeignKey(
        Subject,
        on_delete=models.CASCADE,
        related_name="homeworks",
        verbose_name="Предмет",
    )
    group = models.ForeignKey(
        Group,
        on_delete=models.CASCADE,
        related_name="homeworks",
        verbose_name="Группа",
    )
    teacher = models.ForeignKey(
        TeacherProfile,
        on_delete=models.CASCADE,
        related_name="homeworks",
        verbose_name="Преподаватель",
    )
    title = models.CharField("Краткое название", max_length=200)
    description = models.TextField("Описание задания")
    due_date = models.DateField("Срок сдачи", blank=True, null=True)
    file = models.FileField(
        "Файл задания",
        upload_to="homework_files/",
        blank=True,
        null=True,
    )
    link = models.URLField("Ссылка", blank=True)

    created_at = models.DateTimeField("Создано", auto_now_add=True)
    updated_at = models.DateTimeField("Обновлено", auto_now=True)

    class Meta:
        verbose_name = "Домашнее задание"
        verbose_name_plural = "Домашние задания"
        ordering = ["-created_at"]

    def __str__(self) -> str:
        return f"{self.title} ({self.group})"
