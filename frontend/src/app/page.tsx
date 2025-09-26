'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Star, Shield, Truck } from 'lucide-react';
import { Product } from '@/types';
import { productsApi } from '@/lib/api';
import ProductCard from '@/components/ProductCard';

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const products = await productsApi.getAll();
        // Lấy 6 sản phẩm đầu tiên làm sản phẩm nổi bật
        setFeaturedProducts(products.slice(0, 6));
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  const categories = [
    {
      name: 'Máy tăm nước',
      description: 'Làm sạch kẽ răng hiệu quả',
      image: '/category-water-flosser.jpg',
      href: '/products?category=water_flosser',
    },
    {
      name: 'Bàn chải điện',
      description: 'Làm sạch răng chuyên nghiệp',
      image: '/category-electric-brush.jpg',
      href: '/products?category=electric_brush',
    },
    {
      name: 'Nước súc miệng',
      description: 'Bảo vệ răng miệng toàn diện',
      image: '/category-mouthwash.jpg',
      href: '/products?category=mouthwash',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#0077B6] to-[#005a8b] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Chuyên gia răng miệng
              </h1>
              <p className="text-xl md:text-2xl text-blue-100">
                Giải pháp chăm sóc răng miệng toàn diện
              </p>
              <p className="text-lg text-blue-200">
                Khám phá bộ sưu tập sản phẩm chăm sóc răng miệng chất lượng cao, 
                giúp bạn có nụ cười khỏe đẹp và tự tin.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/products"
                  className="bg-white text-[#0077B6] px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <span>Khám phá sản phẩm</span>
                  <ArrowRight size={20} />
                </Link>
                <Link
                  href="/about"
                  className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-[#0077B6] transition-colors duration-200"
                >
                  Tìm hiểu thêm
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square bg-white/10 rounded-3xl p-8 backdrop-blur-sm">
                <Image
                  src="http://localhost:8000/media/logo.jpg"
                  alt="Chăm sóc răng miệng"
                  fill
                  className="object-cover rounded-2xl"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-[#0077B6] rounded-full flex items-center justify-center mx-auto">
                <Star className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Chất lượng cao</h3>
              <p className="text-gray-600">
                Sản phẩm được chọn lọc từ các thương hiệu uy tín, đảm bảo chất lượng tốt nhất.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-[#0077B6] rounded-full flex items-center justify-center mx-auto">
                <Shield className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">An toàn tuyệt đối</h3>
              <p className="text-gray-600">
                Tất cả sản phẩm đều được kiểm định và đảm bảo an toàn cho sức khỏe.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-[#0077B6] rounded-full flex items-center justify-center mx-auto">
                <Truck className="text-white" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Giao hàng nhanh</h3>
              <p className="text-gray-600">
                Giao hàng toàn quốc với thời gian nhanh chóng và dịch vụ chuyên nghiệp.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Danh mục sản phẩm
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Khám phá các danh mục sản phẩm chăm sóc răng miệng đa dạng và chất lượng
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={category.href}
                className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                      <p className="text-lg">{category.description}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Sản phẩm nổi bật
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Những sản phẩm được yêu thích nhất với chất lượng vượt trội
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                  <div className="aspect-square bg-gray-200 rounded-lg mb-4" />
                  <div className="h-4 bg-gray-200 rounded mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
                  <div className="h-6 bg-gray-200 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              href="/products"
              className="bg-[#0077B6] text-white px-8 py-4 rounded-2xl font-semibold hover:bg-[#005a8b] transition-colors duration-200 inline-flex items-center space-x-2"
            >
              <span>Xem tất cả sản phẩm</span>
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}