from django.db import models


class PageImage(models.Model):
    """
    Model để quản lý hình ảnh trên các trang
    """
    POSITION_CHOICES = [
        ('hero', 'Hero Section (Trang chủ)'),
        ('tamnuoc_banner', 'Banner Máy tăm nước'),
        ('banchaidien_banner', 'Banner Bàn chải điện'),
        ('nuocsucmieng_banner', 'Banner Nước súc miệng'),
        ('sanphamkhac_banner', 'Banner Sản phẩm khác'),
        ('hero_section', 'Hero Section (Trang giới thiệu)'),
        ('story_section', 'Story Section (Trang giới thiệu)'),
        ('ourteam_section', 'Our Team (Trang giới thiệu)'),
    ]
    
    name = models.CharField(max_length=200, verbose_name="Tên")
    position = models.CharField(max_length=50, choices=POSITION_CHOICES, verbose_name="Vị trí")
    image = models.ImageField(upload_to='page_images/', verbose_name="Hình ảnh")
    link_url = models.URLField(blank=True, null=True, verbose_name="URL liên kết")
    is_active = models.BooleanField(default=True, verbose_name="Kích hoạt")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = "Hình ảnh trang"
        verbose_name_plural = "Hình ảnh trang"
        ordering = ['position', '-created_at']
        # Removed unique_together to allow multiple images per position for slider support
    
    def __str__(self):
        return f"{self.name} - {self.get_position_display()}"


class SiteSetting(models.Model):
    """
    Model để quản lý cài đặt trang web
    Ví dụ: Tên công ty, địa chỉ, số điện thoại, email, social media links, etc.
    """
    SETTING_CATEGORIES = [
        ('company', 'Thông tin công ty'),
        ('contact', 'Thông tin liên hệ'),
        ('social', 'Mạng xã hội'),
        ('seo', 'SEO & Tracking'),
        ('other', 'Khác'),
    ]
    
    key = models.CharField(max_length=100, unique=True, verbose_name="Key")
    value = models.TextField(verbose_name="Giá trị")
    description = models.CharField(max_length=200, blank=True, verbose_name="Mô tả")
    category = models.CharField(
        max_length=50, 
        choices=SETTING_CATEGORIES,
        default='other',
        verbose_name="Danh mục"
    )
    
    class Meta:
        verbose_name = "Cài đặt trang web"
        verbose_name_plural = "Cài đặt trang web"
        ordering = ['category', 'key']
    
    def __str__(self):
        return f"{self.get_category_display()}: {self.key} - {self.description or self.value[:50]}"
