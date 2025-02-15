from django.urls import path
from .views import get_chat_messages

urlpatterns = [
    path('messages/<str:room_name>/', get_chat_messages, name='message_view'),
]
