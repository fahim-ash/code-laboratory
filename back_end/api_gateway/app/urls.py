from django.urls import path
from .views import Greeting, RegisterView, LoginView

urlpatterns = [
    path('greet/', Greeting.as_view()),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
]
