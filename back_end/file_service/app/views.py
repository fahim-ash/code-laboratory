import os

from django.conf import settings
from django.http import StreamingHttpResponse

from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import File
from .serializers import FileSerializer
from .service import FileService


class FileUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)  # Add proper parsers

    def post(self, request):
        file_chunk = request.FILES.get("file")
        file_name = request.data.get("file_name", "uploaded_file")
        chunk_number = int(request.data.get("chunk_number", 0))
        total_chunks = int(request.data.get("total_chunks", 1))
        description = request.data.get("description", "")

        if not file_chunk:
            return Response({"error": "No file uploaded"}, status=status.HTTP_400_BAD_REQUEST)

        FileService.save_chunked_file(file_chunk, file_name)

        if chunk_number + 1 == total_chunks:
            saved_file = FileService.finalize_file(file_name, file_chunk.size * total_chunks, description)
            return Response({"message": "File uploaded successfully", "file_id": saved_file.id},
                            status=status.HTTP_201_CREATED)

        return Response({"message": f"Chunk {chunk_number + 1}/{total_chunks} uploaded"}, status=status.HTTP_200_OK)


class FileView(APIView):
    def get(self, request):
        files = File.objects.all()
        serializer = FileSerializer(files, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class FileDownloadAPIView(APIView):
    def get(self, request, file_name, format=None):
        try:
            file_instance = File.objects.get(file_name=file_name)
        except File.DoesNotExist:
            return Response({'error': 'File not found'}, status=status.HTTP_404_NOT_FOUND)

        file_path = os.path.join(settings.MEDIA_ROOT, file_instance.file_name)

        if not os.path.exists(file_path):
            return Response({'error': 'File not found on disk'}, status=status.HTTP_404_NOT_FOUND)

        def file_iterator(file_path, chunk_size=8192):
            with open(file_path, 'rb') as file:
                while chunk := file.read(chunk_size):
                    yield chunk

        try:
            response = StreamingHttpResponse(file_iterator(file_path), content_type='application/octet-stream')
            response['Content-Disposition'] = f'attachment; filename="{file_instance.file_name}"'
            return response
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
