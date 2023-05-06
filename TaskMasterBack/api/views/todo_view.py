from django.contrib.auth.decorators import login_required
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from django.views.decorators.csrf import csrf_exempt
from django.http.response import JsonResponse
from rest_framework.response import Response
from rest_framework import status

from api.models import Category, Task
from api.serializers.todo_serializer import TodoCatSerializer, TodoTaskSerializer


def get_category(category_id):
    try:
        return Category.objects.get(id=category_id)
    except Category.DoesNotExist as dne:
        return Response(str(dne), status=status.HTTP_400_BAD_REQUEST)


class CategoryAPIView(APIView):
    def get(self, request, user_id):
        categories = Category.objects.filter(user=user_id)
        serializer = TodoCatSerializer(categories, many=True)
        return JsonResponse(serializer.data, safe=False, json_dumps_params={'ensure_ascii': False, 'indent': 2},
                            status=200)

    def post(self, request, user_id):
        serializer = TodoCatSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return JsonResponse(serializer.data)


class CategoryDetailView(APIView):
    def get(self, request,user_id, category_id):
        category = get_category(category_id)
        serializer = TodoCatSerializer(category)
        return Response(serializer.data)

    def put(self, request, user_id, category_id):
        category = get_category(category_id)
        serializer = TodoCatSerializer(category, request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, user_id, category_id):
        category = get_category(category_id)
        category.delete()
        return Response({'deleted': True})






@api_view(['GET', 'POST', 'DELETE'])
def task_list(request, user_id):
    if request.method == 'GET':
        tasks = Task.objects.filter(category__user_id=user_id)
        serializer = TodoTaskSerializer(tasks, many=True)
        return Response(serializer.data, status=200)

    elif request.method == 'POST':
        serializer = TodoTaskSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


def get_tasks_by_category(request, user_id, category_id):
    if request.method == 'GET':
        tasks = Task.objects.all().filter(category_id=category_id )
        serializer = TodoTaskSerializer(tasks, many=True)

        return JsonResponse(serializer.data, safe=False)


@api_view(['GET', 'PUT', 'DELETE'])
def task_detail(request, task_id, user_id):
    try:
        task = Task.objects.get(id=task_id)
    except Task.DoesNotExist as err:
        return Response({'message': str(err)}, status=400)

    if request.method == 'GET':
        serializer = TodoTaskSerializer(task)
        return Response(serializer.data, status=200)

    elif request.method == 'PUT':
        serializer = TodoTaskSerializer(data=request.data, instance=task)
        serializer.is_valid(raise_exception=True)
        serializer.save(user=request.user)
        return Response(serializer.data, status=200)

    elif request.method == 'DELETE':
        task.delete()
        return Response({'message': 'delete task ' + str(task)})

