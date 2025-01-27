from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .service import FileService
from .serializers import FileSerializer


class FileUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)  # Add proper parsers

    def post(self, request):
        file = request.FILES.get('file')
        description = request.data.get('description', '')
        user_id = request.headers.get('X-User-ID')
        print("USER ID---:", user_id)
        if not file:
            return Response({"error": "No file uploaded"}, status=status.HTTP_400_BAD_REQUEST)

        saved_file = FileService.save_file(file, description)
        return Response({"message": "File uploaded", "file_id": saved_file.id}, status=status.HTTP_201_CREATED)


