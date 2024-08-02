import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext, AuthContextType } from '../contexts/AuthContext';
import { ProductContext, ProductContextType } from '../contexts/ProductContext';
import { Order } from '../interface/order';
import { instance } from '../api';
import { toast } from 'react-toastify';

const Orders = () => {
  const { isCollapsed } = useContext(AuthContext) as AuthContextType;
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const { formatPrice } = useContext(ProductContext) as ProductContextType;
  const [orders, setOrders] = useState<Order[]>([]);

  const fetchOrders = async () => {
    try {
      const res = await instance.get('/orders');
      setOrders(res.data);
    } catch (error) {
      toast.error('Không thể tải danh sách đơn hàng');
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className={`${!isCollapsed ? 'w-[1125px] ml-[340px]' : 'w-[1340px] ml-[125px]'} pt-16 h-[auto] pb-20 text-[#123448]`}>
      <div className={`flex justify-between items-center border-b-2 pb-2 text-gray-700`}>
        <h2 className="font-medium">QUẢN LÍ ĐƠN HÀNG</h2>
      </div>
      <div className=''>
        <div className={`text-gray-700`}>
          <div className="flex text-[15px] uppercase font-medium pb-2 pt-4">
            <div className="px-6">Tên khách hàng</div>
            <div className="px-16 ml-8">Tổng tiền</div>
            <div className="px-10">Thông tin sản phẩm</div>
            <div className="px-10 ml-32">Trạng thái đơn hàng</div>
          </div>

          {orders?.map((order, index) => (
            <div
              key={order._id}
              className={`flex items-center border rounded-xl bg-white text-[14px] mt-3 hover:shadow-md`}
              onMouseEnter={() => setHoveredRow(index)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              <Link to={`/admin/orders-edit/${order._id}`} className="flex items-center w-full space-x-10">
                <div className="px-7  w-[195px] ">
                  <div className='font-semibold text-[16px]'>
                    {order.shippingDetails.name}
                  </div>
                </div>
                <div className="py-2 px-10 w-[100px]">
                  {formatPrice(order.totalPrice)}
                </div>
                <div className="py-2 px-20">
                  {order.products.map((p, idx) => (
                    <div key={idx} className='flex space-x-1 items-center  w-[210px]'>
                      <div>{p.product.title}</div>
                      <div className='text-[13px] '>x{p.quantity}</div>
                      <div className='pl-3'>Size: {p.size}</div>
                    </div>
                  ))}
                </div>
                <div className="py-2 px-11 text-green-400">
                  {order.orderStatus}
                </div>
              </Link>

              {hoveredRow === index && (
                <div className="py-2 px-10 flex space-x-2">
                  <div className="relative group">
                    <button onClick={(e) => e.stopPropagation()} className="relative">
                      <Link to={`/admin/orders-edit/${order._id}`}>
                        <i className="fa-regular fa-pen-to-square text-gray-400 hover:text-black text-[22px]"></i>
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100">
                          Sửa
                        </span>
                      </Link>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
