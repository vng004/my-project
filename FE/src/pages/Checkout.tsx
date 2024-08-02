import { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CartContext, CartContextType } from '../contexts/CartContext';
import { Order } from '../interface/order';
import { CartItem } from '../reducers/cartReducers';
import myFace from '../images/myFace.png';

const Checkout = () => {
  const { state, checkout, totalQuantity } = useContext(CartContext) as CartContextType;
  const { register, handleSubmit, formState: { errors } } = useForm<Order>();
  const [paymentMethod, setPaymentMethod] = useState<string>('COD');

  const onSubmit = (data: Order) => {
    checkout({ ...data });
    console.log(data);
  };

  const handlePaymentMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentMethod(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="border w-full flex justify-center items-center">
      <div>
        <div className="flex flex-col mb-4">
          <label htmlFor="name" className="mb-2 font-semibold">Tên</label>
          <input
            id="name"
            type="text"
            {...register('shippingDetails.name', { required: 'Tên là bắt buộc' })}
            className="p-2 border rounded"
          />
          {errors.shippingDetails?.name && <p className="text-red-500 text-sm mt-1">{errors.shippingDetails.name.message}</p>}
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="address" className="mb-2 font-semibold">Địa chỉ</label>
          <input
            id="address"
            type="text"
            {...register('shippingDetails.address', { required: 'Địa chỉ là bắt buộc' })}
            className="p-2 border rounded"
          />
          {errors.shippingDetails?.address && <p className="text-red-500 text-sm mt-1">{errors.shippingDetails.address.message}</p>}
        </div>

        <div className="flex flex-col mb-4">
          <label htmlFor="phone" className="mb-2 font-semibold">Số điện thoại</label>
          <input
            id="phone"
            type="text"
            {...register('shippingDetails.phone', {
              required: 'Số điện thoại là bắt buộc',
              pattern: {
                value: /^[0-9]+$/,
                message: 'Số điện thoại không hợp lệ'
              }
            })}
            className="p-2 border rounded"
          />
          {errors.shippingDetails?.phone && <p className="text-red-500 text-sm mt-1">{errors.shippingDetails.phone.message}</p>}
        </div>

        <div className="flex flex-col mb-4">
          <label className="mb-2 font-semibold">Phương thức thanh toán</label>
          <div>
            <label className="inline-flex items-center mr-4">
              <input
                type="radio"
                value="COD"
                {...register('paymentMethod', { required: 'Chọn phương thức thanh toán' })}
                className="form-radio"
                onChange={handlePaymentMethodChange}
              />
              <span className="ml-2">Thanh toán khi nhận hàng</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                value="BANK_TRANSFER"
                {...register('paymentMethod', { required: 'Chọn phương thức thanh toán' })}
                className="form-radio"
                onChange={handlePaymentMethodChange}
              />
              <span className="ml-2">Thanh toán qua chuyển khoản</span>
            </label>
          </div>
          {errors.paymentMethod && <p className="text-red-500 text-sm mt-1">{errors.paymentMethod.message}</p>}
        </div>

        {paymentMethod === 'BANK_TRANSFER' && (
          <div className="flex flex-col items-center mb-4">
            <label className="mb-2 font-semibold">Mã QR</label>
            <div className="w-48 h-48 bg-gray-200 flex items-center border justify-center">
              {/* Thay thế src bằng đường dẫn đến mã QR của bạn */}
              <img src={myFace} alt="QR Code " />
            </div>
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                {...register('isTransferConfirmed', { required: 'Bạn phải xác nhận đã chuyển khoản' })}
                className="mr-2"
              />
              <span>Xác nhận đã chuyển khoản</span>
            </div>
            {errors.isTransferConfirmed && <p className="text-red-500 text-sm mt-1">{errors.isTransferConfirmed.message}</p>}
          </div>
        )}
      </div>
      {/* Phần hiển thị thông tin giỏ hàng */}
      <div className="m-40 w-[500px] p-8">
        <h2 className="text-xl font-bold">Thông tin giỏ hàng</h2>
        {state.products.map((product: CartItem) => (
          <div key={product.product._id} className="flex items-center justify-center mb-4 border">
            <img src={product.product.thumbnail} alt={product.product.title} className="w-16 h-16 object-cover mr-4" />
            <div>
              <p>{product.product.title}</p>
              <p>Số lượng: x{product.quantity}</p>
              <p>Đơn giá: {product.product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</p>
            </div>
          </div>
        ))}
        <p className="font-bold">Tổng số lượng: x{totalQuantity}</p>
        <p className="font-bold">Tổng tiền: {state.totalPrice}</p>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Thanh toán</button>
      </div>
    </form>
  );
};

export default Checkout;
