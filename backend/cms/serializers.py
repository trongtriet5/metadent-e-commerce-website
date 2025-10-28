from rest_framework import serializers
from .models import PageImage, SiteSetting


class PageImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PageImage
        fields = ['id', 'name', 'position', 'image', 'link_url', 'is_active', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class SiteSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSetting
        fields = ['id', 'key', 'value', 'description', 'category']
        read_only_fields = ['id']

