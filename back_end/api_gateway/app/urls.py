from django.urls import path
from .views import Greeting, RegisterView, LoginView, UrlToServerApiView, ServerView, UserView, \
    LogoutView, CheckValidUser

urlpatterns = [
    path('greet/', Greeting.as_view()),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('url-to-server/', UrlToServerApiView.as_view(), name='url-to-server-api'),
    path('server/', ServerView.as_view(), name='server-api'),
    path('users/', UserView.as_view(), name='user-api'),
    path('valid_user/', CheckValidUser.as_view(), name='validate-token'),
    path('logout/', LogoutView.as_view(), name='logout-api'),
]
