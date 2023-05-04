import json
from rest_framework.views import APIView
from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from ..models import Event
from  ..serializers.event_serializer import EventSerializer
from django.shortcuts import Http404
from rest_framework.response import Response

from rest_framework import status

def get_event(event_id):
    try:
        return Event.objects.get(id=event_id)
    except Event.DoesNotExist as dne:
        return Response(str(dne), status=status.HTTP_400_BAD_REQUEST)

class EventAPIView(APIView):

    def get(self, request):
        events = Event.objects.all()
        serializer = EventSerializer(events, many=True)
        return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False, 'indent': 2},
                            status=200)

    def post(self, request):
        serializer = EventSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return JsonResponse(serializer.data)


class EventDetailView(APIView):
    def get(self, request, event_id):
        event = get_event(event_id)
        serializer = EventSerializer(event)
        return Response(serializer.data)

    def put(self, request, event_id):
        event = get_event(event_id)
        serializer = EventSerializer(event=event, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, event_id):
        event = get_event(event_id)
        event.delete()
        return Response({'deleted': True})