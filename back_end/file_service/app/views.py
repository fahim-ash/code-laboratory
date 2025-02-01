from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
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
