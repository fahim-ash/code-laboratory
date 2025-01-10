from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class Greeting(APIView):
    def get(self, request):
        response = {"message": "you are in api gateway"}
        return Response(response)