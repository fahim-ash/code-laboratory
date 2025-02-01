import os
from django.core.files.storage import FileSystemStorage
from .models import File


class FileService:
    storage = FileSystemStorage()

    @staticmethod
    def save_chunked_file(file_chunk, file_name):
        file_path = os.path.join("media/", file_name)

        with open(file_path, "ab") as f:  # Append mode to store chunks
            f.write(file_chunk.read())

    @staticmethod
    def finalize_file(file_name, file_size, description):
        file_path = os.path.join("media/", file_name)
        new_file = File.objects.create(
            file_name=file_name,
            file_path=file_path,
            file_size=file_size,
            description=description
        )
        return new_file
