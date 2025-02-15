from django.http import JsonResponse
from .models import Message


def get_chat_messages(request, room_name):
    messages = Message.objects.filter(room=room_name).order_by("timestamp")
    print("ALl messages---:", messages)
    message_list = [
        {
            "sender": msg.sender,
            "message": msg.message,
            "timestamp": msg.timestamp.strftime('%Y-%m-%d %H:%M:%S')
        }
        for msg in messages
    ]
    return JsonResponse(message_list, safe=False)
