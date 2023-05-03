from django.urls import path, re_path
from .views.sign_up_view import UserSignUpAPIView
from .views.event_view import EventAPIView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('sign-in/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('sign-in/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('sign-up/', UserSignUpAPIView.as_view(), name='user-sign-up'),
    path('events/', EventAPIView.as_view(), name='event'),
]