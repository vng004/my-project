import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CartContext, CartContextType } from '../contexts/CartContext';
import { Order } from '../interface/order';
import { CartItem } from '../reducers/cartReducers';
import myFace from '../images/myFace.png';
import { ProductContext, ProductContextType } from '../contexts/ProductContext';

const Checkout = () => {
  const { state, checkout, totalQuantity } = useContext(CartContext) as CartContextType;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Order>();
  const [paymentMethod, setPaymentMethod] = useState<string>('COD');
  const { formatPrice } = useContext(ProductContext) as ProductContextType;


  const onSubmit = (data: Order) => {
    checkout({ ...data });
    console.log(data);
  };

  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full mt-40 flex justify-center space-x-10'>
      <div className=''>
        <div>Bạn muốn đặt hàng bằng cách nào</div>
        <div className='flex items-center justify-center border py-5 rounded-lg'>
          <i className='fa-solid fa-box'></i>
          <span>Giao hàng trực tiếp</span>
          <i className='fa-solid fa-circle text-[8px] text-green-500'></i>
        </div>
        <div className='grid'>
          <label htmlFor='name' className='mb-2 '>
            Nhập tên và địa chỉ
          </label>
          <input
            id='name'
            type='text'
            {...register('shippingDetails.name', { required: 'Tên là bắt buộc' })}
            className='py-5 pl-3 border rounded-lg'
            placeholder='Tên'
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
        <div className='flex items-center justify-center border py-5 rounded-lg'>
          <i className="fa-solid fa-location-dot"></i>
          <span>Việt Nam</span>
          <i className='fa-solid fa-circle text-[8px] text-green-500'></i>
        </div>

        <div className='grid'>
          <label htmlFor='phone' className='mb-2 '>
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

        <div className=''>
          <label className='mb-2 '>Phương thức thanh toán</label>
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
            <div className='flex flex-col items-center mb-4'>
              <label className='mb-2 '>Mã QR</label>
              <div className='w-48 h-48 bg-gray-200 flex items-center border justify-center'>
                <img src={myFace} alt='QR Code ' />
              </div>
              <div className='flex items-center mt-4'>
                <input
                  type='checkbox'
                  {...register('isTransferConfirmed', { required: 'Bạn phải xác nhận đã chuyển khoản' })}
                  className='mr-2'
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

      <div className='w-[500px]'>
        <div>
          {state.products.map((product: CartItem) => (
            <div key={product.product._id} className='flex  mb-4 border p-4'>
              <img src={product.product.thumbnail} alt={product.product.title} className='w-24 object-cover mr-4' />
              <div className='space-y-2'>
                <p className='font-semibold'>{product.product.title}</p>
                <p className='text-gray-500'>Số lượng: <span className='font-semibold text-black'>x{product.quantity}</span></p>
                <p className='text-gray-500'>Đơn giá: <span className='font-semibold text-black'>{formatPrice(product.product.price)}</span></p>
              </div>
            </div>
          ))}

          <div className=''>
            <p className='flex justify-between'><span className='text-gray-500'>Tổng số lượng:</span> <span className='font-semibold'>x{totalQuantity}</span></p>
            <p className='flex justify-between'><span className='text-gray-500'>Tổng tiền:</span> <span className='font-semibold'>{formatPrice(state.totalPrice)}</span></p>
            <button
              type='submit'
              className='bg-blue-500 text-white py-4 rounded-full w-full hover:bg-blue-600 text-center'
            >
              Thanh toán
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Checkout;
