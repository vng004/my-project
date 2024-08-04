import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { instance } from '../api';
import { Product } from '../interface/product';
import { ProductContext, ProductContextType } from '../contexts/ProductContext';
import { CartContext } from '../contexts/CartContext';

const ProductDetail = () => {
  const [click, setClick] = useState(false);
  const [clickDesc, setClickDesc] = useState(false);
  const [clickHeart, setClickHeart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState<string>(''); // Add state for size
  const [attemptedToAdd, setAttemptedToAdd] = useState(false); // Track if user has attempted to add to cart
  const { id } = useParams<{ id: string }>();
  const { formatPrice } = useContext(ProductContext) as ProductContextType;
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await instance.get(`/products/${id}`);
        setProduct(data.data);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    })();
  }, [id]);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(Number(e.target.value));
  };

  const handleSizeChange = (selectedSize: string) => {
    setSize(selectedSize);
  };

  const handleAddToCart = () => {
    setAttemptedToAdd(true);
    if (product && size) {
      addToCart(product, quantity, size);
    } 
  };

  return (
    <div>
      <div className='flex justify-center pt-36 mb-20 w-full gap-20'>
        <div>
          <div className='w-[640px] pt-2 flex items-center'>
            <img src={product?.thumbnail} alt={product?.title} className='w-[600px]' />
          </div>
        </div>
        <div className='space-y-7'>
          <form className='space-y-6 max-w-[325px]'>
            <div className='font-semibold'>
              <h1 className='text-[29px]'>{product?.title}</h1>
              <p className='text-[14px]'>{product?.category.title}</p>
              <p className='text-[20px] pt-3'>
                <span>{formatPrice(Number(product?.price))}</span>
               
              </p>
            </div>

            <div className='space-y-2'>
              <div className='flex items-center'>
                <p className='text-[15px] font-semibold'>Khả dụng:</p>
                <i className='fa-solid fa-check text-[#30BD57] pl-3 pr-1 text-[12px] pt-1'></i>
                <p className='text-[#30BD57] text-[13px]'>Trong kho</p>
              </div>
              <p className='text-[12px] text-[#5D5D5D]'>Nhanh lên! Chỉ còn 1 sản phẩm trong kho!</p>
            </div>

            <div className='space-y-2 pb-2'>
              <p className=''>
                <span className={`font-semibold ${size || !attemptedToAdd ? "" : "text-red-600"}`}>Kích thước </span>
                {attemptedToAdd && !size ? <span className='text-red-600 float-right'>Vui lòng chọn kích thước</span> : ''}
              </p>
              <div className={`grid grid-cols-3 gap-2 rounded-lg w-full border-2 ${!size && attemptedToAdd ? "border-2 border-red-600" : 'border-none'}`}>
                {['27', '28', '29', '30', '32', '34'].map((sizeOption) => (
                  <button
                    key={sizeOption}
                    type='button'
                    className={`w-full h-[45px] border-2 rounded-lg ${size === sizeOption ? 'bg-black text-white' : 'hover:border-2 focus:border-black'}`}
                    onClick={() => handleSizeChange(sizeOption)}
                  >
                    {sizeOption}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <select
                value={quantity}
                onChange={ handleQuantityChange}
                className='border-2 border-gray-300 rounded-lg p-2 w-full'
              >
                {[...Array(10).keys()].map(i => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </select>
            </div>
           
            <div className='space-y-4 pt-5 pb-5'>
              <div>
                <button
                  onClick={handleAddToCart}
                  type='button'
                  className={`font-semibold bg-black text-white rounded-full w-[325px] h-[60px] transition-all duration-300 text-[17px] ${!size && attemptedToAdd ? 'cursor-not-allowed opacity-50 hover:bg-black' : 'hover:bg-[#727272]'}`}
                >
                  Thêm vào giỏ hàng<i className='pl-1 text-[17px] fa-solid fa-cart-plus'></i>
                </button>
              </div>
              <button
                type='button'
                className={`font-bold border-2 rounded-full w-[325px] h-[60px] transition-all duration-300 text-[17px] ${clickHeart ? 'bg-white border-red-600 text-red-600' : 'bg-white border-gray-300'}`}
                onClick={() => setClickHeart(!clickHeart)}
              >
                <span>{clickHeart ? 'Yêu thích' : 'Thêm vào yêu thích'}<i className={`pl-1 text-[17px] ${clickHeart ? 'fa-solid fa-heart' : 'fa-regular fa-heart'}`}></i></span>
              </button>
            </div>
          </form>

          <div className='bg-gray-300 w-[325px] h-[1px]'></div>

          <div className='flex w-[325px] space-x-[189px] text-[16px] cursor-pointer' onClick={() => setClickDesc(!clickDesc)}>
            <span className='font-semibold'>Mô tả sản phẩm</span>
            <p className='font-medium text-[14px] pt-1 flex text-[#4A4A4A]'>
              {!clickDesc ? (
                <i className='fa-solid fa-angle-down text-[20px]'></i>
              ) : (
                <div className='h-[200px]'>
                  <i className='fa-solid fa-angle-up absolute pb-5 text-[20px]'></i>
                  <div className='w-[200px] mt-8 absolute left-[950px]'>
                    <p>{product?.description}</p>
                  </div>
                </div>
              )}
            </p>
          </div>

          <div className='bg-gray-300 w-[325px] h-[1px]'></div>

          <div className='flex w-[325px] space-x-[100px] text-[16px] cursor-pointer' onClick={() => setClick(!click)}>
            <span className='font-semibold'>Nhận xét(0)</span>
            <div className='space-x-4 flex'>
              <div className='space-x-1'>
                <i className='fa-regular fa-star'></i>
                <i className='fa-regular fa-star'></i>
                <i className='fa-regular fa-star'></i>
                <i className='fa-regular fa-star'></i>
                <i className='fa-regular fa-star'></i>
              </div>
              <p className='font-medium text-[14px] pt-1 flex text-[#4A4A4A]'>
                {!click ? (
                  <i className='fa-solid fa-angle-down text-[20px]'></i>
                ) : (
                  <div className='h-[100px]'>
                    <i className='fa-solid fa-angle-up absolute pb-5 text-[20px]'></i>
                    <div className='w-[400px] mt-8 absolute left-[953px]'>
                      <p>Chưa có đánh giá nào!</p>
                      <p>Hãy là người đánh giá đầu tiên!</p>
                    </div>
                  </div>
                )}
              </p>
            </div>
          </div>

          <div className='bg-gray-300 w-[325px] h-[1px]'></div>

          <div className='text-[18px] space-y-6'>
            <div className='flex gap-3'>
              <p className='font-semibold'>Sku:</p>
              <p>01133-9-9</p>
            </div>
            <div className='bg-gray-300 w-[325px] h-[1px]'></div>

            <div className='flex items-center gap-4'>
              <p className='font-semibold'>Chia sẻ:</p>
              <i className='fa-brands fa-google'></i>
              <i className='fa-brands fa-facebook'></i>
              <i className='fa-brands fa-twitter'></i>
              <i className='fa-brands fa-pinterest'></i>
            </div>
          </div>
        </div>
      </div>
    </div>  
  );
}

export default ProductDetail;
