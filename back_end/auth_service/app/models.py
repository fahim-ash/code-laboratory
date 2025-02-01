from django.db import models
from django.contrib.auth.models import AbstractUser


class Demo(models.Model):
    name = models.CharField(max_length=100)
    date = models.DateField()

    @property
    def name_with_date(self):
        return str(self.name) + str(self.date)


class CustomUser(AbstractUser):
    email = models.EmailField(blank=True, null=True)
    username = models.CharField(max_length=150, unique=True)
    REQUIRED_FIELDS = ['email']
    USERNAME_FIELD = 'username'


