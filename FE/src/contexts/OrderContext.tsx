// contexts/OrderContext.tsx
import React, { createContext, useEffect, useState, ReactNode } from 'react';
import { instance } from '../api'; // Đảm bảo instance là axios instance của bạn
import { toast } from 'react-toastify';
import { Order } from '../interface/order';
import { useNavigate } from 'react-router-dom';

export type OrderContextType = {
  orders: Order[];
  fetchOrders: () => void;
  updateOrderStatus: (id: string, status: string) => Promise<void>;
  totalOrder: number;
};

export const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [totalOrder, setTotalOrder] = useState<number>(0);

  const fetchOrders = async () => {
    try {
      const { data } = await instance.get('/orders');
      setOrders(data.data);
      setTotalOrder(data.data.length); // Cập nhật tổng số đơn hàng bằng số lượng đơn hàng
    } catch (error) {
      toast.error('Không thể tải danh sách đơn hàng');
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
    <OrderContext.Provider value={{ orders, fetchOrders, updateOrderStatus, totalOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
