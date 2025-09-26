export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'water_flosser' | 'electric_brush' | 'mouthwash';
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  id: string; // Changed to string for local cart items
  product: Product;
  quantity: number;
  total_price: number;
}

export interface Order {
  id: number;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  total_amount: number;
  status: string;
  items: OrderItem[];
  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
  price: number;
  total_price: number;
}

export interface CartStore {
  items: CartItem[];
  fetchItems: () => Promise<CartItem[]>;
  addItem: (product: Product, quantity?: number) => Promise<CartItem>;
  removeItem: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => Promise<void>;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}
