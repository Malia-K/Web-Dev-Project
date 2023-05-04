from api.models import *
from rest_framework import serializers

class HabitSerializer(serializers.ModelSerializer):
     class Meta:
        model = Habit
        fields = '__all__'