from django.contrib import admin
from .models import Order, OrderItem

class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0
    readonly_fields = ['total_price']
    
    def total_price(self, obj):
        if obj.price and obj.quantity:
            return obj.price * obj.quantity
        return 0
    total_price.short_description = 'Thành tiền'

# CartItemAdmin đã được loại bỏ vì không còn CartItem model

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['id', 'customer_name', 'customer_email', 'total_amount', 'status', 'created_at']
    list_filter = ['status', 'created_at']
    search_fields = ['customer_name', 'customer_email', 'customer_phone']
    list_per_page = 20
    inlines = [OrderItemInline]
    
    fieldsets = (
        ('Thông tin khách hàng', {
            'fields': ('customer_name', 'customer_email', 'customer_phone', 'customer_address')
        }),
        ('Thông tin đơn hàng', {
            'fields': ('total_amount', 'status')
        }),
    )
    
    readonly_fields = ['created_at', 'updated_at', 'total_amount']
    
    def get_queryset(self, request):
        return super().get_queryset(request).prefetch_related('items__product')

@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ['id', 'order', 'product', 'quantity', 'price', 'total_price']
    search_fields = ['order__customer_name', 'product__name']
    list_per_page = 20
    
    fieldsets = (
        ('Thông tin đơn hàng', {
            'fields': ('order',)
        }),
        ('Thông tin sản phẩm', {
            'fields': ('product', 'quantity', 'price')
        }),
    )
    
    def total_price(self, obj):
        if obj.price and obj.quantity:
            return obj.price * obj.quantity
        return 0
    total_price.short_description = 'Thành tiền'
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('order', 'product')
