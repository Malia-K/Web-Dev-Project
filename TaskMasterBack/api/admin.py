from django.contrib import admin
from .models import Event, Habit, Category, Task
# Register your models here.
admin.site.register(Event)
admin.site.register(Habit)
admin.site.register(Category)
admin.site.register(Task)