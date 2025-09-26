from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db import transaction
from .models import Order, OrderItem
from .serializers import OrderSerializer
from products.models import Product


@api_view(['POST'])
def create_order(request):
    """
    Tạo đơn hàng từ dữ liệu cart được gửi từ frontend
    """
    try:
        # Lấy dữ liệu cart từ request
        cart_items = request.data.get('cart_items', [])
        customer_data = request.data.get('customer', {})
        
        if not cart_items:
            return Response({'error': 'Giỏ hàng trống'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Validate customer data
        required_fields = ['customer_name', 'customer_email', 'customer_phone', 'customer_address']
        for field in required_fields:
            if not customer_data.get(field):
                return Response({'error': f'Thiếu thông tin: {field}'}, status=status.HTTP_400_BAD_REQUEST)
        
        with transaction.atomic():
            # Calculate total amount
            total_amount = 0
            order_items_data = []
            
            for item in cart_items:
                product_id = item.get('product_id')
                quantity = item.get('quantity', 1)
                
                try:
                    product = Product.objects.get(id=product_id)
                except Product.DoesNotExist:
                    return Response({'error': f'Sản phẩm ID {product_id} không tồn tại'}, status=status.HTTP_404_NOT_FOUND)
                
                item_total = product.price * quantity
                total_amount += item_total
                
                order_items_data.append({
                    'product': product,
                    'quantity': quantity,
                    'price': product.price,
                    'total_price': item_total
                })
            
            # Create order
            order = Order.objects.create(
                customer_name=customer_data['customer_name'],
                customer_email=customer_data['customer_email'],
                customer_phone=customer_data['customer_phone'],
                customer_address=customer_data['customer_address'],
                total_amount=total_amount
            )
            
            # Create order items
            for item_data in order_items_data:
                OrderItem.objects.create(
                    order=order,
                    product=item_data['product'],
                    quantity=item_data['quantity'],
                    price=item_data['price']
                )
        
        serializer = OrderSerializer(order)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
        
    except Exception as e:
        return Response({'error': f'Lỗi tạo đơn hàng: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

