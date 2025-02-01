from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Chat
from .serializers import ChatSerializer


class ChatListCreateView(APIView):
    def get(self, request):
        """Retrieve all chats."""
        chats = Chat.objects.all()
        serializer = ChatSerializer(chats, many=True)
        return Response(serializer.data)

    def post(self, request):
        """Create a new chat."""
        serializer = ChatSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ChatDetailView(APIView):
    def get(self, request, chat_id):
        """Retrieve a single chat by ID."""
        try:
            chat = Chat.objects.get(id=chat_id)
            serializer = ChatSerializer(chat)
            return Response(serializer.data)
        except Chat.DoesNotExist:
            return Response({"error": "Chat not found"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, chat_id):
        """Delete a chat by ID."""
        try:
            chat = Chat.objects.get(id=chat_id)
            chat.delete()
            return Response({"message": "Chat deleted"}, status=status.HTTP_204_NO_CONTENT)
        except Chat.DoesNotExist:
            return Response({"error": "Chat not found"}, status=status.HTTP_404_NOT_FOUND)
