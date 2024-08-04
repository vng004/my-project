import { useContext, useEffect } from 'react';
import { CartContext, CartContextType } from '../contexts/CartContext';
import { CartItem } from '../reducers/cartReducers';
import { ProductContext, ProductContextType } from '../contexts/ProductContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { state, removeFromCart, getCart, totalQuantity } = useContext(CartContext) as CartContextType;
  const { formatPrice } = useContext(ProductContext) as ProductContextType;

  useEffect(() => {
    getCart();
  }, [getCart]);

  return (
    <div className='flex justify-center space-x-10 mt-32'>
      <div className='p-6 w-full max-w-[700px]'>
        <div className='text-2xl font-semibold mb-5'>Giỏ hàng</div>
        <div className='flex flex-col p-1 w-full'>
          {state.products.map((product: CartItem, index: number) => (
            <div key={index} className='flex border-b-2 py-3'>
              <Link to={`/product-detail/${product.product?._id}`}>
                <img
                  src={product.product?.thumbnail}
                  alt={product.product?.title}
                  className='w-32 h-32 object-cover mr-3 mt-1'
                />
              </Link>
              <div className='flex-1'>
                <div className='text-lg font-semibold mb-2'>
                  <Link to={`/product-detail/${product.product?._id}`}>{product.product?.title}</Link>
                </div>
                <div className='text-gray-600'>
                  <div className='text-md mb-1'>Kích thước: {product.size}</div>
                  <div className='text-md mb-1'>Số lượng: {product.quantity}</div>
                </div>
                <div className='space-x-5 text-[20px]'>
                  <button className='py-2 rounded hover:text-red-600'>
                    <i className='fa-regular fa-heart text-[21px]'></i>
                  </button>
                  <button
                    onClick={() => removeFromCart(product.product?._id!)}
                    className='py-2 rounded hover:text-red-600'
                  >
                    <i className='fa-regular fa-trash-can'></i>
                  </button>
                </div>
              </div>
              <div className='text-[17px] mb-2 font-semibold'>
                {formatPrice(Number(product.product?.price * product.quantity))}
                
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='w-full max-w-sm space-y-7 p-6'>
        <div className='text-2xl font-semibold mb-5'>Tóm tắt</div>
        <div className='flex justify-between mb-2'>
          <div>Tổng số lượng sản phẩm:</div>
          <div className='text-[16px] font-semibold'>x{totalQuantity}</div>
        </div>
        <div className='flex justify-between mb-5'>
          <div>Tổng tiền sản phẩm:</div>
          <div className='text-[16px] font-semibold'>
            {formatPrice(Number(state.totalPrice))}
          </div>
        </div>
        <div className='bg-gray-300 w-full h-[1px]'></div>
       <Link to={'/checkout'}>
       <button
          type='button'
          className='font-semibold bg-black mt-10 hover:bg-[#727272] text-white rounded-full w-full h-[60px] transition-all duration-300 text-[17px]'
        >
          Thanh toán<i className='pl-2 fa-solid fa-money-check-dollar'></i>
        </button></Link>
      </div>
    </div>
  );
};

export default Cart;
