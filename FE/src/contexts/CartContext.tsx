import React, { createContext, ReactNode, useEffect, useReducer } from 'react';
import { instance } from '../api';
import { toast } from 'react-toastify';
import { Product } from '../interface/product';
import CartReducers, { CartItem } from '../reducers/cartReducers';
import { Order } from '../interface/order';

export type CartContextType = {
  state: {
    products: CartItem[];
    totalPrice: number;
  };
  dispatch: React.Dispatch<any>;
  addToCart: (product: Product, quantity: number, size: string) => void;
  getCart: () => void;
  removeFromCart: (productId: string) => void;
  checkout: (order: Order) => void;
  totalQuantity: number;
}

const initialState = {
  products: [] as CartItem[],
  totalPrice: 0
};

export const CartContext = createContext<CartContextType>({} as CartContextType);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(CartReducers, initialState);
  const totalQuantity = state.products.reduce((total, item) => total + item.quantity, 0);

  const getCart = async () => {
    try {
      const res = await instance.get('/cart');
      dispatch({ type: "SET_CART", payload: { products: res.data.products, totalPrice: res.data.totalPrice } });
    } catch (error) {
      console.error(error);
        // toast.error('Không thể tải giỏ hàng');
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  const addToCart = async (product: Product, quantity: number, size: string) => {
    try {
      const res = await instance.post('/cart', { productId: product._id, quantity, size });
      dispatch({ type: 'ADD_TO_CART', payload: { product: res.data.product, quantity, size } });
      toast.success('Thêm sản phẩm vào giỏ hàng thành công!');
    } catch (error) {
      toast.error('Thêm sản phẩm vào giỏ hàng thất bại!');
      console.error(error);
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      await instance.delete(`/cart/${productId}`);
      dispatch({ type: "REMOVE_FROM_CART", payload: { productId } });
      toast.success('Xóa sản phẩm khỏi giỏ hàng thành công!');
      getCart();
    } catch (error) {
      toast.error('Lỗi khi xóa sản phẩm khỏi giỏ hàng.');
      console.error(error);
    }
  };

  const checkout = async (order: Order) => {
    try {
      await instance.post("/cart/checkout", order);
      dispatch({ type: "CHECKOUT", payload: { products: [], totalPrice: 0 } });
      toast.success('Thanh toán thành công!');
    } catch (error) {
      toast.error('Thanh toán thất bại.');
      console.error('Error during checkout:', error);
    }
  };

  return (
    <CartContext.Provider value={{ state, dispatch, addToCart, getCart, removeFromCart, checkout, totalQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
