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

    frequency_choices = [
        ('D', 'Daily'),
        ('W', 'Weekly'),
        ('M', 'Mounthly'),
    ]
    name = models.CharField(max_length=255)
    description = models.TextField(default='')
    frequency = models.CharField(max_length=1, choices=frequency_choices, default=[('D', 'Daily')])
    isDone = models.BooleanField(default=False)
    likes = models.FloatField(default=0)
    user_id = models.ForeignKey

    def __str__(self) -> str:
        return self.name
