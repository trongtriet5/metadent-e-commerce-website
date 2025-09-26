from django.urls import path
from . import views

urlpatterns = [
    path('', views.ProductListAPIView.as_view(), name='product-list'),
    path('<int:pk>/', views.ProductDetailAPIView.as_view(), name='product-detail'),
    path('category/<str:category>/', views.products_by_category, name='products-by-category'),
]
