from rest_framework import serializers

from ..models import Event

class EventSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    title = serializers.CharField()
    start_time = serializers.DateTimeField()
    end_time = serializers.DateTimeField()

    def create(self, validated_data):
        return Event.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.id = instance.id
        instance.title = validated_data.title("title", instance.title)
        instance.start_time = validated_data.start_time("start_time", instance.start_time)
        instance.end_time = validated_data.end_time("end_time", instance.end_time)

        instance.save()
        return instance