from django.urls import path
from .views import Greeting

urlpatterns = [
    path('greet/', Greeting.as_view()),
]
