import { CartItem } from '../reducers/cartReducers';
import { ShippingDetails } from './shippingDetails';
import { User } from './user';

export interface Order {
  _id?: string;
  user: User;
  products: CartItem[];
  totalPrice: number;
  shippingDetails: ShippingDetails;
  paymentMethod: string;
  isTransferConfirmed?: boolean; 
  orderStatus: 'Chờ xử lý' | 'Đang xử lý' | 'Đã gửi hàng' | 'Đã giao hàng' ; 
  createdAt: Date
}
