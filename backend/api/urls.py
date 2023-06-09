from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)

urlpatterns = [
    path('token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
    path('', views.getRoutes),
    path('test/', views.testEndPoint, name='test'),
    path('subjects/', views.getSubjectsAPI),
    path('subjects/<str:offerCode>', views.getSubjectsAPI),
    path('colleges/', views.getCollegesAPI),
    path('colleges/<str:title>', views.getCollegesAPI),
    path('enroll/', views.enrollment_list),
]