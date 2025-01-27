import os
from django.core.files.storage import FileSystemStorage
from .models import File


class FileService:
    storage = FileSystemStorage()

    @staticmethod
    def save_file(uploaded_file, description):
        file_path = FileService.storage.save(uploaded_file.name, uploaded_file)
        file_size = uploaded_file.size
        new_file = File.objects.create(
            file_name=uploaded_file.name,
            file_path=file_path,
            file_size=file_size,
            description=description
        )
        return new_file


