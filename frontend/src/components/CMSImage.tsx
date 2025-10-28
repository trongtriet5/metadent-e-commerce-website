'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { cmsApi, PageImage, getImageUrl } from '@/lib/cms';

interface CMSImageProps {
  position: string;
  className?: string;
  alt?: string;
  fallback?: string;
  fallbackComponent?: React.ReactNode;
}

export default function CMSImage({ 
  position, 
  className = '',
  alt = '',
  fallback,
  fallbackComponent 
}: CMSImageProps) {
  const [image, setImage] = useState<PageImage | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const img = await cmsApi.getPageImageByPosition(position);
        if (img && img.is_active) {
          setImage(img);
        }
      } catch (error) {
        console.error(`Error fetching ${position} image:`, error);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [position]);

  if (loading) {
    return fallbackComponent || (
      <div className={`bg-gray-200 animate-pulse ${className}`} />
    );
  }

  if (!image && !fallback) {
    return fallbackComponent || null;
  }

  const imageUrl = image 
    ? getImageUrl(image.image) 
    : fallback || '/placeholder.jpg';

  return (
    <div className={`relative ${className}`}>
      <Image
        src={imageUrl}
        alt={image?.name || alt || position}
        fill
        className="object-cover"
        unoptimized
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          if (fallback) {
            target.src = fallback;
          } else {
            target.style.display = 'none';
          }
        }}
      />
    </div>
  );
}

