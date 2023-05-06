from django.urls import path, re_path


from .views.sign_up_view import UserSignUpAPIView
from .views.event_view import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views.habit_view import *
from .views.todo_view import *

urlpatterns = [
    path('sign-in/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('sign-in/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('sign-up/', UserSignUpAPIView.as_view(), name='user-sign-up'),
    path('events/', EventAPIView.as_view(), name='event'),

    path('<int:user_id>/habit/', habits_list, name='habit'),
    path('/<int:user_id>/habit/<int:habit_id>', about_habit, name='habit_id'),

    path('events/<int:event_id>/', EventDetailView.as_view(), name='event_id'),

    path('<int:user_id>/categories/', CategoryAPIView.as_view(), name='category'),
    path('<int:user_id>/categories/<int:category_id>', CategoryDetailView.as_view(), name='category_id'),
    path('<int:user_id>/categories/<int:category_id>/tasks', get_tasks_by_category, name="category_id"),
    path('<int:user_id>/tasks/', task_list, name='task'),
    path('<int:user_id>/tasks/<int:task_id>', task_detail, name='task_id'),

]