import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useContext, useEffect, useState } from 'react';
import { OrderContext, OrderContextType } from '../contexts/OrderContext';
import { AuthContext, AuthContextType } from '../contexts/AuthContext';
import { Order } from '../interface/order';
import { instance } from '../api';

const OrderForm = () => {
  const { id } = useParams();
  const { isCollapsed } = useContext(AuthContext) as AuthContextType;
  const { updateOrderStatus } = useContext(OrderContext) as OrderContextType;
  const [order, setOrder] = useState<Order | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<Order>({});

  useEffect(() => {
    if (id) {
      const fetchOrder = async () => {
        try {
          const { data } = await instance.get(`/orders/${id}`);
          reset(data);
          setOrder(data);
        } catch (error) {
          console.error(error);
        }
      };
      fetchOrder();
    }
  }, [id, reset]);

  const onSubmit = async (data: Order) => {
    if (id) {
      try {
        await updateOrderStatus(id, data.orderStatus);
      } catch (error) {
        console.log(error)
      }
    }
  };

  return (
    <div className={`${!isCollapsed ? 'w-[1110px] ml-[350px]' : 'w-[1330px] ml-[130px]'} text-gray-700 pt-20`}>
      <form className="pt-[10px]" onSubmit={handleSubmit(onSubmit)}>
        <div className="border-2 border-gray-300 p-6 rounded-3xl">
          <div className="text-[18px] mb-5 text-center">
            <h2 className='font-semibold bg-gray-100 absolute border border-black py-2 px-2 rounded-full top-[69px]'>
              CẬP NHẬT TRẠNG THÁI ĐƠN HÀNG
            </h2>
          </div>

          <div className="text-[16px] space-y-5">
            {order && (
              <div className='flex gap-4'><span>Trạng thái hiện tại:</span>
                <div className={`font-semibold ${order.orderStatus === 'Chờ xử lý' ? 'text-red-500' : 
                  order.orderStatus === 'Đang xử lý' ? 'text-yellow-500' :
                    order.orderStatus === 'Đã gửi hàng' ? 'text-blue-500' :
                      'text-green-500'
                  }`}>{order.orderStatus}</div>
              </div>
            )}
            <div className="relative">
              <select
                id="orderStatus"
                className={`w-full border rounded-lg py-4 px-4 outline-none ${errors.orderStatus
                  ? 'border-red-500 placeholder-red-500 focus:border-red-500 focus:ring-red-500'
                  : 'border border-gray-300 focus:border-2 focus:border-black'
                  }`}
                {...register("orderStatus", { required: 'Trạng thái là bắt buộc' })}
                disabled={order?.orderStatus === 'Đã giao hàng'}
              >
                <option value="Chờ xử lý " className='text-red-500'>Chờ xử lý</option>
                <option value="Đang xử lý " className='text-yellow-500'>Đang xử lý</option>
                <option value="Đã gửi hàng " className='text-blue-500'>Đã gửi hàng</option>
                <option value="Đã giao hàng " className='text-green-500'>Đã giao hàng</option>
              </select>
              {errors.orderStatus && <p className="pl-[17px] text-red-500">{errors.orderStatus.message}</p>}
            </div>
            <button
              type="submit"
              className={`w-full py-4 rounded-full text-[16px] ${order?.orderStatus === 'Đã giao hàng' ? 'bg-gray-400' : 'bg-black text-white hover:bg-gray-700'}`}
              disabled={order?.orderStatus === 'Đã giao hàng'}
            >
              CẬP NHẬT TRẠNG THÁI
            </button>

          </div>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
