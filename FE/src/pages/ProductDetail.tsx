import { Link, useParams } from 'react-router-dom'
import { instance } from '../api'
import { Product } from '../interface/product'
import { useState, useEffect, useContext } from 'react'
import { ProductContext, ProductContextType } from '../contexts/ProductContext'

const ProductDetail = () => {
  const [click, setClick] = useState(false)
  const [clickDesc, setClickDesc] = useState(false)
  const [clickHeart, setClickHeart] = useState(false)
  // const [selectedSize, setSelectedSize] = useState<string | null>(null)
  // const [selectedCart, setSelectedCart] = useState<string | null>(null)

  // const handleSizeClick = (size: string) => {
  //   setSelectedSize(size)
  //   console.log(selectedSize)
  // }
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const { formatPrice } = useContext(ProductContext) as ProductContextType
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

  return (

    <div>
      <div>
        <div className='flex  justify-center  pt-60 mb-20 w-full gap-20'>

          <div>
            <div className='w-[640px] pt-24 h-[561px] flex items-center'>
              <img src={product?.thumbnail} alt={product?.title} className='w-[648px]' />
            </div>
            {/* <div className='flex gap-7'>amh phu</div> */}
          </div>
          <div className='space-y-7 '>
            <form className="space-y-6">
              <div className='font-semibold'>
                <h1 className='text-[29px]'>{product?.title}</h1>
                <p className='text-[14px]'>{product?.category.title} </p>
                <p className='text-[20px] pt-3 '>
                  <span>{formatPrice(Number(product?.price))} </span>
                  <i className='fa-solid fa-dong-sign text-[11px] absolute mt-[7px]'></i>
                </p>
              </div>
              <div className='space-y-2'>
                <div className='flex items-center'>
                  <p className='text-[15px] font-semibold'>Khả dụng:</p>
                  <i className='fa-solid fa-check text-[#30BD57] pl-3 pr-1   text-[12px] pt-1'></i>
                  <p className='text-[#30BD57] text-[13px]'>Trong kho</p>
                </div>
                <p className='text-[12px] text-[#5D5D5D]'>Nhanh lên! Chỉ còn 1 sản phẩm trong kho!</p>
              </div>

              <div className='space-y-2 pb-2'>
                <p className='font-semibold'>Kích thước</p>
                <div className='grid grid-cols-3 gap-y-2 w-[335px] justify-center'>
                  {['27', '28', '29', '30', '32', '34'].map((size) => (
                    <button type='button'
                      className={`w-[100px] h-[45px] border-2 hover:border-2 hover:border-black focus:border-black focus:font-bold rounded-lg`}
                    // onClick={() => handleSizeClick(size)} 
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
              <div className='bg-gray-300 w-[325px] h-[1px]'></div>

              <div className='space-y-4 pt-5 pb-5'>
                <div className=''>
                  <Link to={'/cart'}>
                    <button
                      type='submit'
                      className='font-semibold bg-black hover:bg-[#727272] text-white  rounded-full w-[325px] h-[60px] transition-all duration-300 text-[17px] '
                    >
                      Thêm vào giỏ hàng<i className="pl-1 text-[17px] fa-solid fa-cart-plus"></i>
                    </button>
                  </Link>
                </div>
                <div className='' onClick={() => setClickHeart(!clickHeart)}>
                  {!clickHeart ? (<button
                    type='button'
                    className='font-bold bg-white hover:border-2  border-2 hover:border-black border-gray-300   rounded-full w-[325px] h-[60px] transition-all duration-300 text-[17px]'>
                    <span>Yêu thích<i className="pl-1 text-[17px] fa-regular fa-heart"></i></span> </button>) : (<button
                      type='button'
                      className='font-bold bg-white   border-2  border-red-600 rounded-full w-[325px] h-[60px] transition-all duration-300 text-[17px]'><span className='text-red-600'>Yêu thích<i className="pl-1 text-[17px] fa-solid fa-heart "></i></span></button>)}

                </div>
              </div>
            </form>

            <div className='bg-gray-300 w-[325px] h-[1px]'></div>

            <div className='flex w-[325px] space-x-[189px] text-[16px] cursor-pointer' onClick={() => setClickDesc(!clickDesc)}>
              <span className='font-semibold'>
                Mô tả sản phẩm
              </span>

              <p className=' font-medium text-[14px] pt-[3px] flex text-[#4A4A4A]' >
                {!clickDesc ? (
                  <i className='fa-solid fa-angle-down text-[20px]'></i>
                ) : (
                  <div className='h-[200px]'>
                    <i className='fa-solid fa-angle-up absolute pb-5 text-[20px]'></i>
                    <div className='w-[200px]  mt-8 absolute left-[950px] '>
                      <p>{product?.description}</p>
                    </div>
                  </div>
                )}
              </p>
            </div>

            <div className='bg-gray-300 w-[325px] h-[1px]'></div>

            <div className='flex  w-[325px]  space-x-[100px] text-[16px] cursor-pointer' onClick={() => setClick(!click)}>
              <span className='font-semibold'>Nhận xét(0)</span>
              <div className='space-x-4 flex'>
                <div className='space-x-1'>
                  <i className='fa-regular fa-star'></i>
                  <i className='fa-regular fa-star'></i>
                  <i className='fa-regular fa-star'></i>
                  <i className='fa-regular fa-star'></i>
                  <i className='fa-regular fa-star'></i>
                </div>
                <p className=' font-medium text-[14px] pt-1  flex text-[#4A4A4A]' >
                  {!click ? (
                    <i className='fa-solid fa-angle-down text-[20px]'></i>
                  ) : (
                    <div className='h-[100px]'>
                      <i className='fa-solid fa-angle-up absolute pb-5 text-[20px]'></i>
                      <div className='w-[400px] mt-8 absolute left-[953px] '>
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
                <i className='fa-brands fa-whatsapp'></i>
              </div>
            </div>
            <div className='bg-gray-300 w-[325px] h-[1px]'></div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
