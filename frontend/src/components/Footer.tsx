'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaFacebook, FaTiktok } from 'react-icons/fa';
import { Mail, Phone, MapPin } from 'lucide-react';
import { cmsApi, getImageUrl } from '@/lib/cms';
import { SiteSetting } from '@/lib/cms';

export default function Footer() {
  const [settings, setSettings] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settingsMap = await cmsApi.getAllSiteSettingsMap();
        setSettings(settingsMap);
      } catch (error) {
        console.error('Error fetching settings:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // Get values with fallback
  const companyName = settings.company_name || 'Chuyên gia răng miệng';
  const companyDescription = settings.company_description || 'Chuyên cung cấp các sản phẩm chăm sóc răng miệng chất lượng cao, giúp bạn có nụ cười khỏe đẹp và tự tin.';
  const address = settings.company_address || '19V Nguyễn Hữu Cảnh, Phường 19, Quận Bình Thạnh, TP.HCM';
  const phone = settings.contact_phone || '(+84) 866 940 279';
  const email = settings.contact_email || 'chuyengiarangmieng@gmail.com';
  const facebookUrl = settings.facebook_url || 'https://www.facebook.com/chuyengiarangmiengcom';
  const tiktokUrl = settings.tiktok_url || 'https://www.tiktok.com/@chuyengiarangnieng';
  const logoUrl = settings.logo_url || 'http://localhost:8000/media/logo.jpg';

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image
                  src={logoUrl}
                  alt={companyName}
                  fill
                  className="object-cover rounded-full"
                  style={{ borderRadius: '50%' }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
              <span className="text-xl font-bold">{companyName}</span>
            </div>
            <p className="text-gray-300 text-sm">
              {companyDescription}
            </p>
            <div className="flex space-x-4">
              {facebookUrl && (
                <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0077B6] transition-colors">
                  <FaFacebook size={20} />
                </a>
              )}
              {tiktokUrl && (
                <a href={tiktokUrl} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0077B6] transition-colors">
                  <FaTiktok size={20} />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-[#0077B6] transition-colors text-sm">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-gray-300 hover:text-[#0077B6] transition-colors text-sm">
                  Sản phẩm
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-[#0077B6] transition-colors text-sm">
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-[#0077B6] transition-colors text-sm">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Danh mục sản phẩm</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/products?category=water_flosser" className="text-gray-300 hover:text-[#0077B6] transition-colors text-sm">
                  Máy tăm nước
                </Link>
              </li>
              <li>
                <Link href="/products?category=electric_brush" className="text-gray-300 hover:text-[#0077B6] transition-colors text-sm">
                  Bàn chải điện
                </Link>
              </li>
              <li>
                <Link href="/products?category=mouthwash" className="text-gray-300 hover:text-[#0077B6] transition-colors text-sm">
                  Nước súc miệng
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Thông tin liên hệ</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-[#0077B6]" />
                <span className="text-gray-300 text-sm">
                  {address}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-[#0077B6]" />
                <a href={`tel:${phone.replace(/[^0-9+]/g, '')}`} className="text-gray-300 text-sm hover:text-[#0077B6] transition-colors">
                  {phone}
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-[#0077B6]" />
                <a href={`mailto:${email}`} className="text-gray-300 text-sm hover:text-[#0077B6] transition-colors">
                  {email}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} {companyName}. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
}
