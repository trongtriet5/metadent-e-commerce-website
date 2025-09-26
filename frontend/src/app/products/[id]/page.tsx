'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ShoppingCart, Star, Truck, Shield, RotateCcw } from 'lucide-react';
import { Product } from '@/types';
import { productsApi } from '@/lib/api';
import { useCartStore } from '@/store/cartStore';
import Swal from 'sweetalert2';
import SkeletonImage from '@/components/SkeletonImage';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = parseInt(params.id as string);
  
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  
  const { addItem } = useCartStore();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const fetchedProduct = await productsApi.getById(productId);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  const handleAddToCart = async () => {
    if (!product) return;
    
    setAddingToCart(true);
    console.log('Adding product to cart:', product, 'quantity:', quantity);
    try {
      const result = await addItem(product, quantity);
      console.log('Add to cart result:', result);
      // Show success message
      Swal.fire({
        title: 'Thành công!',
        text: `Đã thêm ${product.name} vào giỏ hàng!`,
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#0077B6',
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
      Swal.fire({
        title: 'Lỗi!',
        text: 'Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng. Vui lòng thử lại.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#dc2626',
      });
    } finally {
      setAddingToCart(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const getCategoryLabel = (category: string) => {
    const labels = {
      water_flosser: 'Máy tăm nước',
      electric_brush: 'Bàn chải điện',
      mouthwash: 'Nước súc miệng',
    };
    return labels[category as keyof typeof labels] || category;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="animate-pulse">
              <div className="aspect-square bg-gray-200 rounded-2xl" />
            </div>
            <div className="space-y-6 animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4" />
              <div className="h-6 bg-gray-200 rounded w-1/2" />
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded w-2/3" />
              </div>
              <div className="h-12 bg-gray-200 rounded w-1/3" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Sản phẩm không tồn tại</h1>
          <Link
            href="/products"
            className="bg-[#0077B6] text-white px-6 py-3 rounded-2xl hover:bg-[#005a8b] transition-colors"
          >
            Quay lại danh sách sản phẩm
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center text-[#0077B6] hover:text-[#005a8b] transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Quay lại danh sách sản phẩm
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-white rounded-2xl shadow-lg overflow-hidden">
              <SkeletonImage
                src={product.image ? (product.image.startsWith('http') ? `${product.image}?v=${Date.now()}` : `http://localhost:8000${product.image}?v=${Date.now()}`) : '/placeholder-product.jpg'}
                alt={product.name}
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = '/placeholder-product.jpg';
                }}
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <span className="bg-[#0077B6] text-white px-3 py-1 rounded-full text-sm font-medium">
                {getCategoryLabel(product.category)}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {product.name}
            </h1>

            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} className="text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-gray-600">(4.8/5 - 127 đánh giá)</span>
            </div>

            <div className="text-3xl font-bold text-[#0077B6]">
              {formatPrice(product.price)}
            </div>

            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 font-medium">Số lượng:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 hover:bg-gray-100 transition-colors"
                >
                  -
                </button>
                <span className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 hover:bg-gray-100 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={addingToCart}
              className="w-full bg-[#0077B6] text-white py-4 rounded-2xl font-semibold hover:bg-[#005a8b] transition-colors duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {addingToCart ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <ShoppingCart size={20} />
              )}
              <span>{addingToCart ? 'Đang thêm...' : 'Thêm vào giỏ hàng'}</span>
            </button>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <Truck className="text-[#0077B6]" size={24} />
                <div>
                  <p className="font-medium text-gray-900">Giao hàng nhanh</p>
                  <p className="text-sm text-gray-600">1-2 ngày làm việc</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="text-[#0077B6]" size={24} />
                <div>
                  <p className="font-medium text-gray-900">Bảo hành</p>
                  <p className="text-sm text-gray-600">12 tháng</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="text-[#0077B6]" size={24} />
                <div>
                  <p className="font-medium text-gray-900">Đổi trả</p>
                  <p className="text-sm text-gray-600">30 ngày</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Sản phẩm liên quan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Placeholder for related products */}
            <div className="text-center py-8 text-gray-500">
              <p>Sản phẩm liên quan sẽ được hiển thị ở đây</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
