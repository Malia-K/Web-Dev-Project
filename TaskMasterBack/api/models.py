from django.db import models
from django.contrib.auth import get_user_model
# Create your models here.

User = get_user_model()

class Event(models.Model):
    title = models.CharField(max_length=200)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

    def __str__(self):
        return self.title

    def to_json(self):
        return {
            'id': self.id,
            'title': self.title,
            'start_time': self.start_time,
            'end_time': self.end_time
        }


class Habit(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(default='')
    isDone = models.BooleanField(default=False)
    likes = models.FloatField(default=0)
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)

    def __str__(self) -> str:
        return self.name


class Category(models.Model):
    title = models.CharField(max_length=255)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.title


class Task(models.Model):
    description: models.CharField(max_length=255)
    completed = models.BooleanField(default=False)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.title




