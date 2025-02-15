import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime
from .models import Message


def get_room_id(sender, receiver):
    sorted_ids = sorted([str(sender), str(receiver)])
    return f"{sorted_ids[0]}_{sorted_ids[1]}"


@csrf_exempt
def message_view(request):
    if request.method == "POST":

        try:
            if not request.body:
                return JsonResponse({"status": "error", "message": "Empty request body"}, status=400)

            data = json.loads(request.body.decode('utf-8'))  # Decode for safety
            print("[DEBUG] Parsed JSON data:", data)

            sender = data.get('sender')
            receiver = data.get('receiver')
            content = data.get('content')

            if not sender or not receiver or not content:
                return JsonResponse({"status": "error", "message": "Missing required fields"}, status=400)

            room = get_room_id(sender, receiver)
            Message(
                room=room,
                sender=sender,
                message=content,
                timestamp=datetime.utcnow()
            ).save()

            return JsonResponse({"status": "success"}, status=200)

        except json.JSONDecodeError as e:
            return JsonResponse({"status": "error", "message": f"JSON Decode Error: {str(e)}"}, status=400)
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=400)

    return JsonResponse({"status": "error", "message": "Invalid method"}, status=405)
