'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, X } from 'lucide-react';
import { CartItem } from '@/types';
import { orderApi } from '@/lib/api';
import { useCartStore } from '@/store/cartStore';
import Swal from 'sweetalert2';
import SkeletonImage from '@/components/SkeletonImage';
import Select from 'react-select';
import { addressApi, AddressOption } from '@/lib/addressApi';

// Validation functions
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^(0|\+84)[3|5|7|8|9][0-9]{8}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderData, setOrderData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    customer_address: '',
  });
  const [addressData, setAddressData] = useState({
    province: null as AddressOption | null,
    district: null as AddressOption | null,
    ward: null as AddressOption | null,
    street: '',
  });
  const [addressOptions, setAddressOptions] = useState({
    provinces: [] as AddressOption[],
    districts: [] as AddressOption[],
    wards: [] as AddressOption[],
  });
  const [loadingAddress, setLoadingAddress] = useState({
    provinces: false,
    districts: false,
    wards: false,
  });
  const [errors, setErrors] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    address: '',
  });
  const [touched, setTouched] = useState({
    customer_name: false,
    customer_email: false,
    customer_phone: false,
    address: false,
  });
  const [submitting, setSubmitting] = useState(false);

  const { clearCart, fetchItems, removeItem, updateQuantity } = useCartStore();

  useEffect(() => {
    fetchCartItems();
    loadProvinces();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Load provinces on component mount
  const loadProvinces = async () => {
    setLoadingAddress(prev => ({ ...prev, provinces: true }));
    try {
      console.log('Loading provinces...');
      const provinces = await addressApi.getProvinces();
      console.log('Loaded provinces:', provinces.slice(0, 3));
      setAddressOptions(prev => ({ ...prev, provinces }));
    } catch (error) {
      console.error('Error loading provinces:', error);
    } finally {
      setLoadingAddress(prev => ({ ...prev, provinces: false }));
    }
  };

  // Sync with cart store
  useEffect(() => {
    const { items } = useCartStore.getState();
    setCartItems(items);
  }, []);

  const fetchCartItems = async () => {
    try {
      const items = await fetchItems();
      setCartItems(items);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(itemId);
      return;
    }

    setUpdating(itemId);
    try {
      await updateQuantity(itemId, newQuantity);
      await fetchCartItems();
    } catch (error) {
      console.error('Error updating quantity:', error);
    } finally {
      setUpdating(null);
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    setUpdating(itemId);
    try {
      await removeItem(itemId);
      await fetchCartItems();
      Swal.fire({
        title: 'Đã xóa!',
        text: 'Sản phẩm đã được xóa khỏi giỏ hàng.',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#0077B6',
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error('Error removing item:', error);
      Swal.fire({
        title: 'Lỗi!',
        text: 'Có lỗi xảy ra khi xóa sản phẩm khỏi giỏ hàng.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#dc2626',
      });
    } finally {
      setUpdating(null);
    }
  };

  // Real-time validation functions
  const validateField = (field: string, value: string) => {
    switch (field) {
      case 'customer_name':
        if (!value.trim()) {
          return 'Vui lòng nhập họ và tên';
        }
        return '';

      case 'customer_email':
        if (!value.trim()) {
          return 'Vui lòng nhập email';
        } else if (!validateEmail(value)) {
          return 'Email không hợp lệ';
        }
        return '';

      case 'customer_phone':
        if (!value.trim()) {
          return 'Vui lòng nhập số điện thoại';
        } else if (!validatePhone(value)) {
          return 'Số điện thoại không hợp lệ (VD: 0123456789 hoặc +84123456789)';
        }
        return '';

      default:
        return '';
    }
  };

  // Validation function for form submission
  const validateForm = (): boolean => {
    const newErrors = {
      customer_name: '',
      customer_email: '',
      customer_phone: '',
      address: '',
    };

    // Validate name
    newErrors.customer_name = validateField('customer_name', orderData.customer_name);

    // Validate email
    newErrors.customer_email = validateField('customer_email', orderData.customer_email);

    // Validate phone
    newErrors.customer_phone = validateField('customer_phone', orderData.customer_phone);

    // Validate address
    if (!addressData.province || !addressData.district || !addressData.ward || !addressData.street.trim()) {
      newErrors.address = 'Vui lòng chọn đầy đủ thông tin địa chỉ';
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  // Handle address changes
  const handleProvinceChange = async (selectedOption: AddressOption | null) => {
    setAddressData({
      province: selectedOption,
      district: null,
      ward: null,
      street: addressData.street,
    });

    // Reset districts and wards
    setAddressOptions(prev => ({
      ...prev,
      districts: [],
      wards: [],
    }));

    if (selectedOption) {
      setLoadingAddress(prev => ({ ...prev, districts: true }));
      try {
        const districts = await addressApi.getDistricts(selectedOption.value);
        setAddressOptions(prev => ({ ...prev, districts }));
      } catch (error) {
        console.error('Error loading districts:', error);
      } finally {
        setLoadingAddress(prev => ({ ...prev, districts: false }));
      }
    }
  };

  const handleDistrictChange = async (selectedOption: AddressOption | null) => {
    setAddressData({
      ...addressData,
      district: selectedOption,
      ward: null,
    });

    // Reset wards
    setAddressOptions(prev => ({
      ...prev,
      wards: [],
    }));

    if (selectedOption) {
      setLoadingAddress(prev => ({ ...prev, wards: true }));
      try {
        const wards = await addressApi.getWards(selectedOption.value);
        setAddressOptions(prev => ({ ...prev, wards }));
      } catch (error) {
        console.error('Error loading wards:', error);
      } finally {
        setLoadingAddress(prev => ({ ...prev, wards: false }));
      }
    }
  };

  const handleWardChange = (selectedOption: AddressOption | null) => {
    setAddressData({
      ...addressData,
      ward: selectedOption,
    });
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setSubmitting(true);
    
    try {
      // Build full address
      const fullAddress = `${addressData.street}, ${addressData.ward?.label}, ${addressData.district?.label}, ${addressData.province?.label}`;
      
      // Prepare cart items for order
      const cartItemsForOrder = cartItems.map(item => ({
        product_id: item.product.id,
        quantity: item.quantity,
      }));

      const order = await orderApi.create({
        cart_items: cartItemsForOrder,
        customer: {
          ...orderData,
          customer_address: fullAddress,
        },
      });
      
      await clearCart();
      setCartItems([]);
      setShowCheckout(false);
      
      // Show success message with more details
      Swal.fire({
        title: '🎉 Đặt hàng thành công!',
        html: `
          <div class="text-left">
            <p><strong>Mã đơn hàng:</strong> #${order.id}</p>
            <p><strong>Tổng tiền:</strong> ${formatPrice(order.total_amount)}</p>
            <br>
            <p>Cảm ơn bạn đã mua sắm tại Chuyên gia răng miệng!</p>
          </div>
        `,
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#0077B6',
        width: '500px',
      });
      
      // Reset form
      setOrderData({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        customer_address: '',
      });
      setAddressData({
        province: null,
        district: null,
        ward: null,
        street: '',
      });
      setErrors({
        customer_name: '',
        customer_email: '',
        customer_phone: '',
        address: '',
      });
      setTouched({
        customer_name: false,
        customer_email: false,
        customer_phone: false,
        address: false,
      });
    } catch (error) {
      console.error('Error creating order:', error);
      Swal.fire({
        title: '❌ Lỗi đặt hàng',
        text: 'Có lỗi xảy ra khi đặt hàng. Vui lòng kiểm tra thông tin và thử lại.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#dc2626',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(price);
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.total_price, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8" />
            <div className="space-y-4">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-gray-200 rounded-lg" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                      <div className="h-4 bg-gray-200 rounded w-1/2" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={48} className="text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Giỏ hàng trống</h1>
            <p className="text-gray-600 mb-8">
              Bạn chưa có sản phẩm nào trong giỏ hàng. Hãy khám phá các sản phẩm của chúng tôi!
            </p>
            <Link
              href="/products"
              className="bg-[#0077B6] text-white px-8 py-4 rounded-2xl font-semibold hover:bg-[#005a8b] transition-colors duration-200 inline-flex items-center space-x-2"
            >
              <span>Khám phá sản phẩm</span>
              <ArrowLeft size={20} className="rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center text-[#0077B6] hover:text-[#005a8b] transition-colors mb-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Tiếp tục mua sắm
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Giỏ hàng</h1>
          <p className="text-gray-600 mt-2">
            Bạn có {totalItems} sản phẩm trong giỏ hàng
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center space-x-4">
                  <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                    <SkeletonImage
                      src={item.product.image ? (item.product.image.startsWith('http') ? `${item.product.image}?v=${Date.now()}` : `http://localhost:8000${item.product.image}?v=${Date.now()}`) : '/placeholder-product.jpg'}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/placeholder-product.jpg';
                      }}
                    />
                  </div>

                  <div className="flex-1">
                    <Link
                      href={`/products/${item.product.id}`}
                      className="text-lg font-semibold text-gray-900 hover:text-[#0077B6] transition-colors"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-[#0077B6] font-bold text-lg">
                      {formatPrice(item.product.price)}
                    </p>
                  </div>

                  <div className="flex items-center space-x-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={updating === item.id}
                        className="px-3 py-2 hover:bg-gray-100 transition-colors disabled:opacity-50"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center">
                        {updating === item.id ? '...' : item.quantity}
                      </span>
                      <button
                        onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        disabled={updating === item.id}
                        className="px-3 py-2 hover:bg-gray-100 transition-colors disabled:opacity-50"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      disabled={updating === item.id}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                      title="Xóa sản phẩm"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end">
                  <span className="text-lg font-semibold text-gray-900">
                    Tổng: {formatPrice(item.total_price)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Tóm tắt đơn hàng</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Số lượng sản phẩm:</span>
                  <span className="font-medium">{totalItems}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tạm tính:</span>
                  <span className="font-medium">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phí vận chuyển:</span>
                  <span className="font-medium text-green-600">Miễn phí</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-900">Tổng cộng:</span>
                    <span className="text-lg font-bold text-[#0077B6]">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowCheckout(true)}
                className="w-full bg-[#0077B6] text-white py-4 rounded-2xl font-semibold hover:bg-[#005a8b] transition-colors duration-200"
              >
                Tiến hành đặt hàng
              </button>
            </div>
          </div>
        </div>

        {/* Checkout Modal */}
        {showCheckout && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto relative">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Thông tin đặt hàng</h2>
              <button
                onClick={() => setShowCheckout(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
              
                 <form onSubmit={handleCheckout} className="space-y-4">
                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">
                       Họ và tên *
                     </label>
                     <input
                       type="text"
                       value={orderData.customer_name}
                       onChange={(e) => {
                         const value = e.target.value;
                         setOrderData({ ...orderData, customer_name: value });
                         
                         // Real-time validation
                         if (touched.customer_name) {
                           const error = validateField('customer_name', value);
                           setErrors(prev => ({ ...prev, customer_name: error }));
                         }
                       }}
                       onBlur={() => {
                         setTouched(prev => ({ ...prev, customer_name: true }));
                         const error = validateField('customer_name', orderData.customer_name);
                         setErrors(prev => ({ ...prev, customer_name: error }));
                       }}
                       className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0077B6] focus:border-transparent ${
                         touched.customer_name && errors.customer_name ? 'border-red-500' : 'border-gray-300'
                       }`}
                       placeholder="Nhập họ và tên"
                     />
                     {touched.customer_name && errors.customer_name && (
                       <p className="text-red-500 text-sm mt-1">{errors.customer_name}</p>
                     )}
                   </div>

                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">
                       Email *
                     </label>
                     <input
                       type="email"
                       value={orderData.customer_email}
                       onChange={(e) => {
                         const value = e.target.value;
                         setOrderData({ ...orderData, customer_email: value });
                         
                         // Real-time validation
                         if (touched.customer_email) {
                           const error = validateField('customer_email', value);
                           setErrors(prev => ({ ...prev, customer_email: error }));
                         }
                       }}
                       onBlur={() => {
                         setTouched(prev => ({ ...prev, customer_email: true }));
                         const error = validateField('customer_email', orderData.customer_email);
                         setErrors(prev => ({ ...prev, customer_email: error }));
                       }}
                       className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0077B6] focus:border-transparent ${
                         touched.customer_email && errors.customer_email ? 'border-red-500' : 'border-gray-300'
                       }`}
                       placeholder="example@email.com"
                     />
                     {touched.customer_email && errors.customer_email && (
                       <p className="text-red-500 text-sm mt-1">{errors.customer_email}</p>
                     )}
                   </div>

                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">
                       Số điện thoại *
                     </label>
                     <input
                       type="tel"
                       value={orderData.customer_phone}
                       onChange={(e) => {
                         const value = e.target.value;
                         setOrderData({ ...orderData, customer_phone: value });
                         
                         // Real-time validation
                         if (touched.customer_phone) {
                           const error = validateField('customer_phone', value);
                           setErrors(prev => ({ ...prev, customer_phone: error }));
                         }
                       }}
                       onBlur={() => {
                         setTouched(prev => ({ ...prev, customer_phone: true }));
                         const error = validateField('customer_phone', orderData.customer_phone);
                         setErrors(prev => ({ ...prev, customer_phone: error }));
                       }}
                       className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0077B6] focus:border-transparent ${
                         touched.customer_phone && errors.customer_phone ? 'border-red-500' : 'border-gray-300'
                       }`}
                       placeholder="0123456789 hoặc +84123456789"
                     />
                     {touched.customer_phone && errors.customer_phone && (
                       <p className="text-red-500 text-sm mt-1">{errors.customer_phone}</p>
                     )}
                   </div>

                   <div>
                     <label className="block text-sm font-medium text-gray-700 mb-2">
                       Địa chỉ giao hàng *
                     </label>
                     <div className="space-y-3">
                       {/* Tỉnh/Thành phố */}
                       <div>
                         <label className="block text-xs font-medium text-gray-600 mb-1">
                           Tỉnh/Thành phố *
                         </label>
                         <Select
                           value={addressData.province}
                           onChange={handleProvinceChange}
                           options={addressOptions.provinces}
                           placeholder="Chọn tỉnh/thành phố"
                           isLoading={loadingAddress.provinces}
                           className="react-select-container"
                           classNamePrefix="react-select"
                           styles={{
                             control: (base) => ({
                               ...base,
                               borderColor: touched.address && errors.address ? '#ef4444' : '#d1d5db',
                               '&:hover': {
                                 borderColor: touched.address && errors.address ? '#ef4444' : '#9ca3af',
                               },
                             }),
                           }}
                           onBlur={() => {
                             setTouched(prev => ({ ...prev, address: true }));
                             if (!addressData.province || !addressData.district || !addressData.ward || !addressData.street.trim()) {
                               setErrors(prev => ({ ...prev, address: 'Vui lòng chọn đầy đủ thông tin địa chỉ' }));
                             } else {
                               setErrors(prev => ({ ...prev, address: '' }));
                             }
                           }}
                         />
                       </div>

                       {/* Quận/Huyện */}
                       <div>
                         <label className="block text-xs font-medium text-gray-600 mb-1">
                           Quận/Huyện *
                         </label>
                         <Select
                           value={addressData.district}
                           onChange={handleDistrictChange}
                           options={addressOptions.districts}
                           placeholder="Chọn quận/huyện"
                           isDisabled={!addressData.province}
                           isLoading={loadingAddress.districts}
                           className="react-select-container"
                           classNamePrefix="react-select"
                           styles={{
                             control: (base) => ({
                               ...base,
                               borderColor: touched.address && errors.address ? '#ef4444' : '#d1d5db',
                               '&:hover': {
                                 borderColor: touched.address && errors.address ? '#ef4444' : '#9ca3af',
                               },
                             }),
                           }}
                         />
                       </div>

                       {/* Phường/Xã */}
                       <div>
                         <label className="block text-xs font-medium text-gray-600 mb-1">
                           Phường/Xã *
                         </label>
                         <Select
                           value={addressData.ward}
                           onChange={handleWardChange}
                           options={addressOptions.wards}
                           placeholder="Chọn phường/xã"
                           isDisabled={!addressData.district}
                           isLoading={loadingAddress.wards}
                           className="react-select-container"
                           classNamePrefix="react-select"
                           styles={{
                             control: (base) => ({
                               ...base,
                               borderColor: touched.address && errors.address ? '#ef4444' : '#d1d5db',
                               '&:hover': {
                                 borderColor: touched.address && errors.address ? '#ef4444' : '#9ca3af',
                               },
                             }),
                           }}
                         />
                       </div>

                       {/* Tên đường */}
                       <div>
                         <label className="block text-xs font-medium text-gray-600 mb-1">
                           Tên đường/Số nhà *
                         </label>
                         <input
                           type="text"
                           value={addressData.street}
                           onChange={(e) => {
                             const value = e.target.value;
                             setAddressData({ ...addressData, street: value });
                             
                             // Real-time validation for address
                             if (touched.address) {
                               if (!addressData.province || !addressData.district || !addressData.ward || !value.trim()) {
                                 setErrors(prev => ({ ...prev, address: 'Vui lòng chọn đầy đủ thông tin địa chỉ' }));
                               } else {
                                 setErrors(prev => ({ ...prev, address: '' }));
                               }
                             }
                           }}
                           onBlur={() => {
                             setTouched(prev => ({ ...prev, address: true }));
                             if (!addressData.province || !addressData.district || !addressData.ward || !addressData.street.trim()) {
                               setErrors(prev => ({ ...prev, address: 'Vui lòng chọn đầy đủ thông tin địa chỉ' }));
                             } else {
                               setErrors(prev => ({ ...prev, address: '' }));
                             }
                           }}
                           className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#0077B6] focus:border-transparent ${
                             touched.address && errors.address ? 'border-red-500' : 'border-gray-300'
                           }`}
                           placeholder="Số nhà, tên đường"
                         />
                       </div>
                     </div>
                     {touched.address && errors.address && (
                       <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                     )}
                   </div>

                <div className="flex space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCheckout(false)}
                    className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 bg-[#0077B6] text-white px-4 py-3 rounded-lg hover:bg-[#005a8b] transition-colors disabled:opacity-50"
                  >
                    {submitting ? 'Đang xử lý...' : 'Đặt hàng'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
