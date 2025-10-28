'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { getImageUrl } from '@/lib/cms';
import { PageImage } from '@/lib/cms';

interface HorizontalHeroSliderProps {
  images: PageImage[];
  settings: Record<string, string>;
}

export default function HorizontalHeroSlider({ images, settings }: HorizontalHeroSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, images.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToPrevious = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const goToNext = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const currentImage = images[currentIndex];
  const title = settings.hero_title || 'Chuyên gia răng miệng';
  const subtitle = settings.hero_subtitle || 'Giải pháp chăm sóc răng miệng toàn diện';
  const description = settings.hero_description || 'Khám phá bộ sưu tập sản phẩm chăm sóc răng miệng chất lượng cao, giúp bạn có nụ cười khỏe đẹp và tự tin.';

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <section className="relative bg-gradient-to-r from-[#0077B6] to-[#005a8b] text-white py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center group">
          {/* Left Side - Content */}
          <div className="space-y-8 z-10">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight animate-fade-in">
              {title}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 animate-fade-in delay-100">
              {subtitle}
            </p>
            <p className="text-lg text-blue-200 animate-fade-in delay-200">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in delay-300">
              <Link
                href={currentImage?.link_url || '/products'}
                className="bg-white text-[#0077B6] px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center space-x-2 shadow-lg"
              >
                <span>Khám phá sản phẩm</span>
                <ArrowRight size={20} />
              </Link>
              <Link
                href="/about"
                className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-[#0077B6] transition-colors duration-200 shadow-lg"
              >
                Tìm hiểu thêm
              </Link>
            </div>
          </div>

          {/* Right Side - Image Slider */}
          <div className="relative aspect-square">
            <div className="rounded-3xl overflow-hidden shadow-2xl relative group aspect-square">
              {images.map((image, index) => (
                <div
                  key={image.id}
                  className={`absolute inset-0 transition-opacity duration-1000 ${
                    index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <Image
                    src={getImageUrl(image.image)}
                    alt={image.name}
                    fill
                    className="object-contain bg-white/5"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.parentElement?.classList.add('bg-white/10');
                    }}
                  />
                </div>
              ))}

              {/* Navigation Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft size={28} className="text-white" />
                  </button>
                  <button
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 hover:bg-white/30 backdrop-blur-sm p-3 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
                    aria-label="Next slide"
                  >
                    <ChevronRight size={28} className="text-white" />
                  </button>
                </>
              )}

              {/* Dots Indicator */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => goToSlide(index)}
                      className={`h-3 rounded-full transition-all duration-300 shadow-lg ${
                        index === currentIndex
                          ? 'w-10 bg-white'
                          : 'w-3 bg-white/50 hover:bg-white/75'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .delay-100 {
          animation-delay: 0.1s;
          animation-fill-mode: both;
        }
        .delay-200 {
          animation-delay: 0.2s;
          animation-fill-mode: both;
        }
        .delay-300 {
          animation-delay: 0.3s;
          animation-fill-mode: both;
        }
      `}</style>
    </section>
  );
}

