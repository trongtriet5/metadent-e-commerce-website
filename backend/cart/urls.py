from django.urls import path
from . import views

urlpatterns = [
    path('order/', views.create_order, name='create-order'),
    path('orders/', views.OrderListAPIView.as_view(), name='order-list'),
    path('orders/<int:pk>/', views.OrderDetailAPIView.as_view(), name='order-detail'),
]
