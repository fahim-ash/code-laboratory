from django.urls import path
from .views import FileUploadView, FileView, FileDownloadAPIView

urlpatterns = [
    path('upload/', FileUploadView.as_view(), name='file_upload'),
    path('files/', FileView.as_view(), name='file_list'),
    path('download/<str:file_name>/', FileDownloadAPIView.as_view(), name='file_download'),

]
