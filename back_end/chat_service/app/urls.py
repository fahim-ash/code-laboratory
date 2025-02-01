from django.urls import path
from .views import ChatListCreateView, ChatDetailView

urlpatterns = [
    path('api/chats/', ChatListCreateView.as_view(), name='chat-list-create'),
    path('api/chats/<str:chat_id>/', ChatDetailView.as_view(), name='chat-detail'),
]
