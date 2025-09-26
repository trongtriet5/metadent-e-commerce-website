import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartStore, Product, CartItem } from '@/types';

// Local cart item interface for frontend
interface LocalCartItem {
  id: string; // Generated ID for frontend
  product: Product;
  quantity: number;
  total_price: number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      fetchItems: async () => {
        // No need to fetch from backend, cart is stored locally
        return get().items;
      },

      addItem: async (product: Product, quantity: number = 1) => {
        try {
          console.log('CartStore: Adding item to cart', { productId: product.id, quantity });
          
          const existingItemIndex = get().items.findIndex(
            item => item.product.id === product.id
          );

          if (existingItemIndex >= 0) {
            // Update existing item
            const updatedItems = [...get().items];
            updatedItems[existingItemIndex].quantity += quantity;
            updatedItems[existingItemIndex].total_price = 
              updatedItems[existingItemIndex].product.price * updatedItems[existingItemIndex].quantity;
            
            set({ items: updatedItems });
            return updatedItems[existingItemIndex];
          } else {
            // Add new item
            const newItem: LocalCartItem = {
              id: `cart_${product.id}_${Date.now()}`,
              product,
              quantity,
              total_price: product.price * quantity,
            };
            
            set({ items: [...get().items, newItem] });
            return newItem;
          }
        } catch (error) {
          console.error('Error adding item to cart:', error);
          throw error;
        }
      },

      removeItem: async (itemId: string) => {
        try {
          const updatedItems = get().items.filter(item => item.id !== itemId);
          set({ items: updatedItems });
        } catch (error) {
          console.error('Error removing item from cart:', error);
        }
      },

      updateQuantity: async (itemId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }

        try {
          const updatedItems = get().items.map(item => {
            if (item.id === itemId) {
              return {
                ...item,
                quantity,
                total_price: item.product.price * quantity,
              };
            }
            return item;
          });
          
          set({ items: updatedItems });
        } catch (error) {
          console.error('Error updating item quantity:', error);
        }
      },

      clearCart: async () => {
        try {
          set({ items: [] });
        } catch (error) {
          console.error('Error clearing cart:', error);
        }
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.total_price, 0);
      },
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items }),
    }
  )
);
