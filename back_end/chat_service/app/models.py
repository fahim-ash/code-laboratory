from mongoengine import Document, StringField, DateTimeField, ListField, EmbeddedDocument, EmbeddedDocumentField, \
    BooleanField


class Reaction(EmbeddedDocument):
    user = StringField(required=True)
    reaction = StringField(required=True)  # E.g., "like", "dislike"


class Message(Document):
    room = StringField(required=True, index=True)  # Index for room-based queries
    sender = StringField(required=True)
    message = StringField(required=True)
    timestamp = DateTimeField(required=True)
    # read = BooleanField(default=False) # Optional
    # delivered = BooleanField(default=False) # Optional
    # attachments = ListField(StringField()) # Optional
    # reactions = ListField(EmbeddedDocumentField(Reaction)) # Optional
    meta = {'collection': 'message'}

    def __str__(self):
        return f"From: {self.sender} in {self.room}: {self.message} at {self.timestamp}"