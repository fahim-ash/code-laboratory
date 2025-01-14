from django.urls import path
from .views import Greeting, RegisterView, LoginView, UrlToServerApiView, ServerView

urlpatterns = [
    path('greet/', Greeting.as_view()),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('url-to-server/', UrlToServerApiView.as_view(), name='url-to-server-api'),
    path('server/', ServerView.as_view(), name='server-api'),
]
