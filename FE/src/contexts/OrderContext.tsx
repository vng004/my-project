import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { toast } from 'react-toastify';
import { Order } from '../interface/order';
import { useNavigate } from 'react-router-dom';
import { instance } from '../api';

export type OrderContextType = {
  orders: Order[];
  fetchOrders: () => void;
  updateOrderStatus: (id: string, status: string) => Promise<void>;
};

export const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    try {
      const { data } = await instance.get('/orders');
      setOrders(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const nav = useNavigate();

  const updateOrderStatus = async (_id: string, status: string) => {
    try {
      await instance.patch(`/orders/${_id}/status`, { orderStatus: status });
      fetchOrders();
      nav('/admin/orders');
      toast.success('Cập nhật trạng thái đơn hàng thành công');
    } catch (error) {
      toast.error('Không thể cập nhật trạng thái đơn hàng');
    }
  };

  return (
    <OrderContext.Provider value={{ orders, fetchOrders, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
};
