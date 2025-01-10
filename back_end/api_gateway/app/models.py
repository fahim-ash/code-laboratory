from django.db import models

class Demo(models.Model):
    name = models.CharField(max_length=100)
    date = models.DateField()

    @property
    def name_with_date(self):
        return str(self.name) + str(self.date)
