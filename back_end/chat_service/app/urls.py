from django.urls import path
from .views import message_view

urlpatterns = [
    path('messages/', message_view, name='message_view'),
]
