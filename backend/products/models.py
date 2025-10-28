from django.db import models
from decimal import Decimal


class Product(models.Model):
    CATEGORY_CHOICES = [
        ('water_flosser', 'Máy tăm nước'),
        ('electric_brush', 'Bàn chải điện'),
        ('mouthwash', 'Nước súc miệng'),
        ('other', 'Sản phẩm khác'),
    ]
    
    name = models.CharField(max_length=200, verbose_name="Tên sản phẩm")
    description = models.TextField(verbose_name="Mô tả")
    price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name="Giá")
    image = models.ImageField(upload_to='products/', verbose_name="Hình ảnh")
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, verbose_name="Danh mục")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Sản phẩm"
        verbose_name_plural = "Sản phẩm"
        ordering = ['-created_at']
    
    def __str__(self):
        return self.name