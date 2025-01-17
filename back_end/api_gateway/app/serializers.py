from rest_framework import serializers
from .models import Demo, CustomUser, Server, UrlToServer
from django.contrib.auth.hashers import make_password


class DemoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Demo
        fields = '__all__'


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'password']

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()


class ServerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Server
        fields = '__all__'


class UrlToServerSerializer(serializers.ModelSerializer):
    class Meta:
        model = UrlToServer
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'date_joined']
