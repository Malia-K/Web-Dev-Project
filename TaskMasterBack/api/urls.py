from django.urls import path, re_path


from .views.sign_up_view import UserSignUpAPIView
from .views.event_view import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from .views.habit_view import *

urlpatterns = [
    path('sign-in/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('sign-in/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('sign-up/', UserSignUpAPIView.as_view(), name='user-sign-up'),
    path('events/', EventAPIView.as_view(), name='event'),

    path('habit/', habits_list, name='habit' ),
    path('habit/<int:habit_id>', about_habit, name='habit_id'),

    path('events/<int:event_id>/', EventDetailView.as_view(), name='event_id'),

]