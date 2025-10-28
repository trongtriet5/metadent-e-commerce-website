from django.urls import path
from . import views

urlpatterns = [
    # Page Images
    path('page-images/', views.PageImageListAPIView.as_view(), name='page-image-list'),
    path('page-images/<int:pk>/', views.PageImageDetailAPIView.as_view(), name='page-image-detail'),
    
    # Site Settings
    path('settings/', views.SiteSettingListAPIView.as_view(), name='setting-list'),
    path('settings/<int:pk>/', views.SiteSettingDetailAPIView.as_view(), name='setting-detail'),
]

