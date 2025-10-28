from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import PageImage, SiteSetting
from .serializers import PageImageSerializer, SiteSettingSerializer


class PageImageListAPIView(generics.ListCreateAPIView):
    queryset = PageImage.objects.all()
    serializer_class = PageImageSerializer


class PageImageDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = PageImage.objects.all()
    serializer_class = PageImageSerializer


class SiteSettingListAPIView(generics.ListCreateAPIView):
    queryset = SiteSetting.objects.all()
    serializer_class = SiteSettingSerializer


class SiteSettingDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = SiteSetting.objects.all()
    serializer_class = SiteSettingSerializer
