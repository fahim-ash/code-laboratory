from django.apps import AppConfig
import mongoengine


class ChatConfig(AppConfig):
    name = 'app'

    def ready(self):
        mongoengine.connect(db='chat_app', host='mongodb://mongodb:27017/chat_app')
