from rest_framework.exceptions import AuthenticationFailed
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import (RegisterSerializer, LoginSerializer,
                          ServerSerializer, UrlToServerSerializer,
                          UserSerializer)
from .models import Server, UrlToServer, CustomUser
from rest_framework_simplejwt.authentication import JWTAuthentication


class Greeting(APIView):
    def get(self, request):
        response = {"message": "you are in api gateway"}
        return Response(response)


class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            user = authenticate(username=username, password=password)
            if user:
                refresh = RefreshToken.for_user(user)
                return Response({
                    "success": True,
                    "refresh": str(refresh),
                    "access": str(refresh.access_token),
                    "user": {"id": user.id, "username": user.username}
                }, status=status.HTTP_200_OK)
            return Response({"success": False, "message": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        return Response({"success": False, "message": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)



class UserView(APIView):
    def get(self, request):
        urls = CustomUser.objects.all()
        serializer = UserSerializer(urls, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class CheckValidUser(APIView):
    def post(self, request):
        print("request user---:", request.user)
        if not request.user or not request.user.is_authenticated:
            return Response({"success": False, "message": "Unauthorized"}, status=401)

        return Response({"success": True, "user": {"id": request.user.id, "username": request.user.username}})


class LogoutView(APIView):
    def post(self, request):
        response = Response({"success": True, "message": "Logged out successfully."})
        response.delete_cookie('jwt')
        return response
