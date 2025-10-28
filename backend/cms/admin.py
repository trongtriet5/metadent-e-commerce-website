from django.contrib import admin
from django.utils.html import format_html
from django.urls import reverse, path
from django.shortcuts import render
from django import forms
from .models import PageImage, SiteSetting
from products.models import Product


class PageImageAdminForm(forms.ModelForm):
    """Form tùy chỉnh để chọn hình ảnh từ Products"""
    select_product = forms.ChoiceField(
        required=False,
        label='Chọn từ sản phẩm (nếu muốn dùng lại hình ảnh sản phẩm)',
        widget=forms.Select(attrs={'style': 'width: 100%; max-width: 500px;'}),
        choices=[('', '--- Không chọn ---')],
    )
    
    class Meta:
        model = PageImage
        fields = '__all__'
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Populate choices with products that have images
        products = Product.objects.filter(image__isnull=False).exclude(image='')
        self.fields['select_product'].choices = [('', '--- Không chọn ---')] + [
            (str(p.id), f"{p.name} ({p.get_category_display()})") 
            for p in products
        ]
    
    def save(self, commit=True):
        instance = super().save(commit=False)
        
        # Nếu chọn sản phẩm, copy hình ảnh
        if self.cleaned_data.get('select_product'):
            try:
                product = Product.objects.get(id=int(self.cleaned_data['select_product']))
                if product.image:
                    # Nếu user chọn từ product, dùng hình ảnh đó
                    instance.image = product.image
            except Product.DoesNotExist:
                pass
        
        if commit:
            instance.save()
        return instance


@admin.register(PageImage)
class PageImageAdmin(admin.ModelAdmin):
    form = PageImageAdminForm
    list_display = ['name', 'position', 'image_thumbnail', 'usage_info', 'is_active', 'created_at']
    list_filter = ['position', 'is_active', 'created_at']
    search_fields = ['name', 'position']
    list_editable = ['is_active']
    readonly_fields = ['created_at', 'updated_at', 'image_preview', 'position_help']
    
    fieldsets = (
        ('Thông tin chung', {
            'fields': ('name', 'position', 'position_help', 'is_active')
        }),
        ('Hình ảnh - Upload mới hoặc chọn từ sản phẩm', {
            'fields': ('image', 'select_product', 'image_preview', 'link_url')
        }),
        ('Thời gian', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

    def image_thumbnail(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 4px; border: 2px solid #ddd;" />',
                obj.image.url
            )
        return format_html('<span style="color: #999;">Chưa có</span>')
    image_thumbnail.short_description = 'Hình ảnh'

    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<div style="margin: 10px 0;">'
                '<img src="{}" style="max-width: 500px; height: auto; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); border: 2px solid #ddd;" />'
                '</div>',
                obj.image.url
            )
        return format_html(
            '<div style="padding: 20px; background: #f5f5f5; border-radius: 8px; color: #999; text-align: center;">'
            'Chưa có hình ảnh - Vui lòng upload hoặc chọn từ sản phẩm'
            '</div>'
        )
    image_preview.short_description = 'Preview Hình ảnh'
    
    def position_help(self, obj=None):
        """Hiển thị hướng dẫn về các vị trí"""
        position_info = {
            'hero': 'Hero Section - Slider ở đầu trang chủ',
            'tamnuoc_banner': 'Banner Máy tăm nước - Hiển thị ở section danh mục 1',
            'banchaidien_banner': 'Banner Bàn chải điện - Hiển thị ở section danh mục 2',
            'nuocsucmieng_banner': 'Banner Nước súc miệng - Hiển thị ở section danh mục 3',
            'sanphamkhac_banner': 'Banner Sản phẩm khác - Hiển thị ở section danh mục 4',
            'hero_section': 'Hero Section (Trang Giới thiệu) - Banner đầu trang About',
            'story_section': 'Story Section (Trang Giới thiệu) - Hình ảnh câu chuyện công ty',
            'ourteam_section': 'Our Team (Trang Giới thiệu) - Hình ảnh 3 lãnh đạo công ty',
        }
        
        info_html = '<div style="background: #f0f9ff; border: 1px solid #0284c7; border-radius: 8px; padding: 16px; margin: 10px 0;">'
        info_html += '<h4 style="margin-top: 0; color: #0284c7;">💡 Vị trí được sử dụng trên website:</h4><ul style="margin: 10px 0; padding-left: 20px;">'
        
        for pos, desc in position_info.items():
            info_html += f'<li><strong>{pos}</strong> - {desc}</li>'
        
        info_html += '</ul></div>'
        return format_html(info_html)
    position_help.short_description = 'Hướng dẫn vị trí'
    
    def usage_info(self, obj):
        """Hiển thị thông tin nơi hình ảnh được sử dụng"""
        if obj.is_active:
            return format_html(
                '<span style="color: green; font-weight: bold;">✓ Đang hiển thị tại "{position}"</span>',
                position=obj.get_position_display()
            )
        else:
            return format_html(
                '<span style="color: #999;">⚠ Chưa kích hoạt - Không hiển thị</span>'
            )
    usage_info.short_description = 'Trạng thái hiển thị'


@admin.register(SiteSetting)
class SiteSettingAdmin(admin.ModelAdmin):
    list_display = ['key', 'category', 'value_preview', 'description']
    list_filter = ['category']
    search_fields = ['key', 'description', 'value']
    
    fieldsets = (
        ('Thông tin', {
            'fields': ('key', 'category', 'value', 'description')
        }),
    )
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related()

    def value_preview(self, obj):
        if len(obj.value) > 50:
            return obj.value[:50] + '...'
        return obj.value
    value_preview.short_description = 'Giá trị'
