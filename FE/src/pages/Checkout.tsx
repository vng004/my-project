import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CartContext, CartContextType } from '../contexts/CartContext';
import { Order } from '../interface/order';
import { CartItem } from '../reducers/cartReducers';
import qr from '../images/qr.jpg';
import { ProductContext, ProductContextType } from '../contexts/ProductContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Checkout = () => {
  const { state, checkout, totalQuantity } = useContext(CartContext) as CartContextType;
  const { register, handleSubmit, formState: { errors } } = useForm<Order>();
  const [paymentMethod, setPaymentMethod] = useState<string>('COD');
  const { formatPrice } = useContext(ProductContext) as ProductContextType;
  const navigate = useNavigate();

  const onSubmit = (data: Order) => {
    checkout({ ...data });
    navigate('/')
  };

  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full mt-40 flex justify-center space-x-20'>
      <div className='space-y-6 pt-1'>
        <div className='text-[20px]'>Bạn muốn nhận đơn hàng bằng cách nào ?</div>
        <div className='flex items-center justify-between border py-5 rounded-lg p-4 border-black'>
          <div className='space-x-3'>
            <i className='fa-solid fa-box'></i>
            <span>Giao hàng trực tiếp</span>
          </div>
          <i className='fa-solid fa-circle text-[8px] text-green-500 '></i>
        </div>
        <div className='grid space-y-4'>
          <label htmlFor='name' className='mb-2 text-[20px]'>
            Nhập tên và địa chỉ:
          </label>
          <input
            id='name'
            type='text'
            {...register('shippingDetails.name', { required: 'Họ và Tên là bắt buộc' })}
            className='py-5 pl-3 border rounded-lg'
            placeholder='Họ và Tên'
          />
          {errors.shippingDetails?.name && (
            <p className='text-red-500 text-sm mt-1'>{errors.shippingDetails.name.message}</p>
          )}
          <input
            id='address'
            type='text'
            {...register('shippingDetails.address', { required: 'Địa chỉ là bắt buộc' })}
            className='py-5 pl-3 border rounded-lg'
            placeholder='Địa chỉ'
          />
          {errors.shippingDetails?.address && (
            <p className='text-red-500 text-sm mt-1'>{errors.shippingDetails.address.message}</p>
          )}
        </div>
        <div className='flex items-center justify-between border py-5 rounded-lg p-4 border-black'>
          <div className='space-x-3'>
            <i className="fa-solid fa-location-dot"></i>
            <span>Việt Nam</span>
          </div>
          <i className='fa-solid fa-circle text-[8px] text-green-500 '></i>
        </div>
        <div className='grid'>
          <label htmlFor='phone' className='mb-4 text-[20px]'>
            Thông tin liên lạc của bạn là gì
          </label>
          <input
            id='phone'
            type='text'
            {...register('shippingDetails.phone', {
              required: 'Số điện thoại là bắt buộc',
              pattern: {
                value: /^[0-9]+$/,
                message: 'Số điện thoại không hợp lệ',
              },
            })}
            className='py-5 pl-3 border rounded-lg'
            placeholder='Số điện thoại'
          />
          {errors.shippingDetails?.phone && (
            <p className='text-red-500 text-sm mt-1'>{errors.shippingDetails.phone.message}</p>
          )}
        </div>

        <div className='space-y-4'>
          <label className='text-[20px]'>Phương thức thanh toán</label>
          <select
            {...register('paymentMethod', { required: 'Chọn phương thức thanh toán' })}
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
            className='py-5 pl-3 border rounded-lg w-full'
          >
            <option value='COD'>Thanh toán khi nhận hàng</option>
            <option value='BANK_TRANSFER'>Thanh toán qua chuyển khoản</option>
          </select>
        </div>
        {errors.paymentMethod && <p className='text-red-500 text-sm mt-1'>{errors.paymentMethod.message}</p>}

        <div className='h-auto'>
          {paymentMethod === 'BANK_TRANSFER' && (
            <div className='flex flex-col items-center mb-6'>
              <div className='w-52 bg-gray-200 flex items-center border justify-center'>
                <img src={qr} alt='QR Code ' />
              </div>
              <div className='flex items-center mt-2'>
                <input
                  type='checkbox'
                  {...register('isTransferConfirmed', { required: 'Bạn phải xác nhận đã chuyển khoản' })}
                  className='mr-2 w-4 h-20'
                />
                <span>Xác nhận đã chuyển khoản</span>
              </div>
              {errors.isTransferConfirmed && (
                <p className='text-red-500 text-sm mt-1'>{errors.isTransferConfirmed.message}</p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className='w-[430px] pt-14'>
        <div className=''>
          {state.products.map((product: CartItem) => (
            <div key={product.product._id} className='flex  mb-6 border p-4 rounded-2xl'>
              <img src={product.product.thumbnail} alt={product.product.title} className='w-24 object-cover mr-4' />
              <div className='space-y-2'>
                <p className='font-semibold'>{product.product.title}</p>
                <p className='text-gray-500'>Số lượng: <span className='font-semibold text-black'>x{product.quantity}</span></p>
                <p className='text-gray-500'>Đơn giá: <span className='font-semibold text-black'>{formatPrice(product.product.price)}</span></p>
              </div>
            </div>
          ))}

          <div className=' h-auto'>
            <p className='flex justify-between pt-2'><span className='text-gray-500'>Tổng số lượng:</span> <span className='font-semibold'>x{totalQuantity}</span></p>
            <p className='flex justify-between pt-2'><span className='text-gray-500'>Tổng tiền:</span> <span className='font-semibold'>{formatPrice(state.totalPrice)}</span></p>
            <button
              type='submit'
              className='font-semibold mt-10 bg-black text-white rounded-full w-full h-[65px] hover:bg-gray-700 transition-all duration-300 text-[17px]'
            >
              Hoàn tất
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Checkout;
