from rest_framework import serializers
from .models import Chat, Message

class MessageSerializer(serializers.Serializer):
    sender = serializers.CharField()
    content = serializers.CharField()
    timestamp = serializers.DateTimeField(required=False)

class ChatSerializer(serializers.Serializer):
    id = serializers.CharField(read_only=True)  # MongoDB ObjectId
    user_id = serializers.CharField()
    messages = MessageSerializer(many=True)
    created_at = serializers.DateTimeField(read_only=True)

    def create(self, validated_data):
        messages_data = validated_data.pop('messages')
        chat = Chat(user_id=validated_data['user_id'])
        
        for message_data in messages_data:
            chat.messages.append(Message(**message_data))
        
        chat.save()
        return chat
