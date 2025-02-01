from mongoengine import Document, EmbeddedDocument, StringField, DateTimeField, ListField, EmbeddedDocumentField
import datetime

class Message(EmbeddedDocument):
    sender = StringField(max_length=255)  # "user" or "bot"
    content = StringField()
    timestamp = DateTimeField(default=datetime.datetime.utcnow)

class Chat(Document):
    user_id = StringField(required=True)  # User's ID or session ID
    messages = ListField(EmbeddedDocumentField(Message))  # Embedded messages
    created_at = DateTimeField(default=datetime.datetime.utcnow)

    meta = {'collection': 'chats'}  # Optional: Custom MongoDB collection name
