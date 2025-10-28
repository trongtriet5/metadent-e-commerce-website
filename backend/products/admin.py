from django.contrib import admin
from .models import Product


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'category', 'price', 'created_at', 'updated_at']
    list_filter = ['category', 'created_at', 'updated_at']
    search_fields = ['name', 'description']
    list_editable = ['price']
    list_per_page = 20
    
    fieldsets = (
        ('Thông tin cơ bản', {
            'fields': ('name', 'description', 'category')
        }),
        ('Giá và hình ảnh', {
            'fields': ('price', 'image')
        }),
        ('Thời gian', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    readonly_fields = ['created_at', 'updated_at']
