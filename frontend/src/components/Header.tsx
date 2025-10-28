'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';
import { cmsApi } from '@/lib/cms';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [totalItems, setTotalItems] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [companyName, setCompanyName] = useState('Metadent');
  const [logoUrl, setLogoUrl] = useState('http://localhost:8000/media/logo.jpg');
  const { getTotalItems, fetchItems } = useCartStore();

  // Fetch cart items and settings on component mount
  useEffect(() => {
    fetchItems();
    setIsClient(true);

    // Fetch company settings
    const fetchSettings = async () => {
      try {
        const name = await cmsApi.getSiteSetting('company_name');
        const logo = await cmsApi.getSiteSetting('logo_url');
        if (name) setCompanyName(name);
        if (logo) setLogoUrl(logo);
      } catch (error) {
        console.error('Error fetching company settings:', error);
      }
    };

    fetchSettings();
  }, [fetchItems]);

  // Update total items when cart changes
  useEffect(() => {
    if (isClient) {
      setTotalItems(getTotalItems());
    }
  }, [getTotalItems, isClient]);

  // Listen to cart store changes
  useEffect(() => {
    if (isClient) {
      const unsubscribe = useCartStore.subscribe((state) => {
        setTotalItems(state.items.reduce((total, item) => total + item.quantity, 0));
      });
      
      return unsubscribe;
    }
  }, [isClient]);

  const menuItems = [
    { href: '/', label: 'Trang chủ' },
    { href: '/products', label: 'Sản phẩm' },
    { href: '/about', label: 'Giới thiệu' },
    { href: '/contact', label: 'Liên hệ' },
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-12 h-12 flex-shrink-0">
              <Image
                src={logoUrl}
                alt={companyName}
                fill
                className="object-cover"
                style={{ borderRadius: '50%' }}
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </div>
            <span className="text-xl font-bold text-[#0077B6]">
              {companyName}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-[#0077B6] transition-colors duration-200 font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Cart and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link
              href="/cart"
              className="relative p-2 text-gray-700 hover:text-[#0077B6] transition-colors duration-200"
            >
              <ShoppingCart size={24} />
              {isClient && totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#0077B6] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-[#0077B6] transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-700 hover:text-[#0077B6] transition-colors duration-200 font-medium px-4 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
