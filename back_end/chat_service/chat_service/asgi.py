import os
import django
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
from .routing import websocket_urlpatterns

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "chat_service.settings")
django.setup()

application = ProtocolTypeRouter({
    "http": get_asgi_application(),  # HTTP Requests
    "websocket": URLRouter(websocket_urlpatterns),  # WebSocket Requests
})
