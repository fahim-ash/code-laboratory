from django.db import models
from django.contrib.auth.models import AbstractUser


class Demo(models.Model):
    name = models.CharField(max_length=100)
    date = models.DateField()

    @property
    def name_with_date(self):
        return str(self.name) + str(self.date)


class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=True)
    REQUIRED_FIELDS = ['email']
    USERNAME_FIELD = 'username'


class UrlToServer(models.Model):
    url_address = models.CharField(max_length=200)
    port = models.IntegerField()
    active = models.IntegerField()

class Server(models.Model):
    server = models.ForeignKey(UrlToServer, on_delete=models.CASCADE)
    service_name = models.CharField(max_length=100, unique=True)

