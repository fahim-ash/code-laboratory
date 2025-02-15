import json
from channels.generic.websocket import AsyncWebsocketConsumer
from datetime import datetime
from .models import Message


def get_room_id(sender, receiver):
    sorted_ids = sorted([str(sender), str(receiver)])
    return f"{sorted_ids[0]}_{sorted_ids[1]}"


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        print("CONNECTED TO WEBSOCKET")

        await self.accept()

    async def disconnect(self, close_code):
        print("DISCONNECTED FROM WEBSOCKET")

        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )

    async def receive(self, text_data):
        data = json.loads(text_data)

        sender = data.get('sender')
        receiver = data.get('receiver')
        message = data.get('message')

        if not sender or not receiver:
            print("ERROR: Sender or Receiver missing in message payload")
            return

        self.room_name = get_room_id(sender, receiver)
        self.room_group_name = f"chat_{self.room_name}"

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        Message(
            room=self.room_name,
            sender=sender,
            message=message,
            timestamp=datetime.utcnow()
        ).save()
        await self.channel_layer.group_send(
            self.room_group_name,
            {
                'type': 'chat_message',
                'sender': sender,
                'message': message,
            }
        )

    async def chat_message(self, event):
        await self.send(text_data=json.dumps({
            'sender': event['sender'],
            'message': event['message'],
        }))
