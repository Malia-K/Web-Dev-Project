from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from ..models import User, Category, Task


class TodoCatSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField()
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    def create(self, validated_data):
        return Category.objects.create(user=self.context['request'].user, **validated_data)

    def update(self, instance, validated_data):
        instance.id = instance.id
        instance.title = validated_data.get('title', instance.title)
        instance.save()
        return instance


class TodoTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('id', 'description', 'completed', 'category')
