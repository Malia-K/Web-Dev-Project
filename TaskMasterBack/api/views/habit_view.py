
from ast import Delete
from http.client import REQUEST_URI_TOO_LONG
from urllib import request
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render

from api.serializers.habit_serializer import *
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from django.contrib.auth.decorators import login_required

User = get_user_model()


@api_view(['GET', 'POST'])
@login_required
def habits_list(request):
    if request.method == 'GET':
        habits = Habit.objects.filter(user=request.user)
        serializer = HabitSerializer(habits, many=True)
        return Response(serializer.data, status=200)

    elif request.method == 'POST': 
        serializer = HabitSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

@api_view(['GET', 'PUT', 'DELETE'])
@login_required
def about_habit(request, habit_id):
    try:
        habit = Habit.objects.get(id=habit_id)
    except Habit.DoesNotExist as err:
        return Response({'message': str(err)}, status=400)

    if request.method == 'GET':
        serializer = HabitSerializer(habit)
        return Response(serializer.data, status=200)

    elif request.method == 'PUT':
        serializer = HabitSerializer(data=request.data, instance=habit)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response(serializer.data, status=200)
    
    elif request.method == 'DELETE':
        habit.delete()
        return Response({'message': 'delete company ' + str(habit)})


