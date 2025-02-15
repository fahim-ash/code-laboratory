import json
from channels.generic.websocket import AsyncWebsocketConsumer
from datetime import datetime
from .models import Message


def get_room_id(sender, receiver):
    sorted_ids = sorted([str(sender), str(receiver)])
    return f"{sorted_ids[0]}_{sorted_ids[1]}"


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = f"chat_{self.room_name}"

        # Group add (for real-time updates)
        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name
        )

        await self.accept()
        print(f"✅ Connected to Room: {self.room_group_name}")

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(
            self.room_group_name,
            self.channel_name
        )
        print(f"Disconnected from Room: {self.room_group_name}")

    async def receive(self, text_data):
        data = json.loads(text_data)
        sender = data.get('sender')
        receiver = data.get('receiver')
        message = data.get('message')

        if not sender or not receiver or not message:
            print("ERROR: Invalid message format!")
            return

        self.room_name = get_room_id(sender, receiver)
        self.room_group_name = f"chat_{self.room_name}"

        msg = Message(
            room=self.room_name,
            sender=sender,
            message=message,
            timestamp=datetime.utcnow()
        )
        msg.save()
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
            'room': self.room_name,
            'sender': event['sender'],
            'message': event['message'],
        }))
