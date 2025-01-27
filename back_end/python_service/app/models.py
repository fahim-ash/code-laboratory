from django.db import models


class File(models.Model):
    file_name = models.CharField(max_length=255)
    uploaded_at = models.DateTimeField(auto_now_add=True)
    file_size = models.BigIntegerField()
    file_path = models.FileField(upload_to='uploads/')
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.file_name
