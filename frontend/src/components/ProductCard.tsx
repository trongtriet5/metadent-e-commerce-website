'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import Swal from 'sweetalert2';
import SkeletonImage from './SkeletonImage';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Adding product to cart:', product);
    try {
      const result = await addItem(product);
      console.log('Add to cart result:', result);
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

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square overflow-hidden">
          <SkeletonImage
            src={product.image ? (product.image.startsWith('http') ? `${product.image}?v=${Date.now()}` : `http://localhost:8000${product.image}?v=${Date.now()}`) : '/placeholder-product.jpg'}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder-product.jpg';
            }}
          />
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-[#0077B6] text-white px-2 py-1 rounded-full text-xs font-medium">
              {getCategoryLabel(product.category)}
            </span>
          </div>
        </div>
      </Link>

      <div className="p-6">
        <Link href={`/products/${product.id}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-[#0077B6] transition-colors">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-[#0077B6]">
            {formatPrice(product.price)}
          </span>
          
          <button
            onClick={handleAddToCart}
            className="bg-[#0077B6] text-white p-2 rounded-full hover:bg-[#005a8b] transition-colors duration-200 group/btn"
            title="Thêm vào giỏ hàng"
          >
            <ShoppingCart size={20} className="group-hover/btn:scale-110 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
