import { useContext } from 'react'
import { ProductContext, ProductContextType } from '../contexts/ProductContext'
import { Link } from 'react-router-dom'

const Home = () => {
  // const { state, formatPrice } = useContext(ProductContext) as ProductContextType
  return (
    <div>
      {/* <div className='flex justify-center h-auto pt-40'>
      <div className='flex space-x-8 mb-20'>
        {state.products.slice(0, 4).map((p) => (
          <div className='w-[320px] h-[300px]'>
            <Link className='' to={`/product-detail/${p._id}`}>
              <div className='border-2 hover:border-black rounded-lg p-5'>
                <img src={p.thumbnail} className='w-[700px]' />
                <p className='text-[19px] font-semibold'>{p.title}</p>
                <div className='text-[14px] text-gray-500 font-medium'>{p.category.title} </div>
                <div className='text-[15px] pt-4 font-semibold'>
                  {formatPrice(Number(p.price))}
                  <i className='fa-solid fa-dong-sign text-[11px] absolute mt-[7px] pl-[2px]'></i>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
    <div className='flex justify-center h-auto'>
      <div className='flex space-x-8 mb-20'>
        {state.products.slice(0, 4).map((p) => (
          <div className='w-[320px] h-[300px]'>
            <Link className='' to={`/product-detail/${p._id}`}>
              <div className='border-2 hover:border-black rounded-lg p-5'>
                <img src={p.thumbnail} className='w-[700px]' />
                <p className='text-[19px] font-semibold'>{p.title}</p>
                <div className='text-[14px] text-gray-500 font-medium'>{p.category.title} </div>
                <div className='text-[15px] pt-4 font-semibold'>
                  {formatPrice(Number(p.price))}
                  <i className='fa-solid fa-dong-sign text-[11px] absolute mt-[7px] pl-[2px]'></i>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
    <div className='flex justify-center h-auto'>
      <div className='flex space-x-8 mb-20'>
        {state.products.slice(0, 4).map((p) => (
          <div className='w-[320px] h-[300px]'>
            <Link className='' to={`/product-detail/${p._id}`}>
              <div className='border-2 hover:border-black rounded-lg p-5'>
                <img src={p.thumbnail} className='w-[700px]' />
                <p className='text-[19px] font-semibold'>{p.title}</p>
                <div className='text-[14px] text-gray-500 font-medium'>{p.category.title} </div>
                <div className='text-[15px] pt-4 font-semibold'>
                  {formatPrice(Number(p.price))}
                  <i className='fa-solid fa-dong-sign text-[11px] absolute mt-[7px] pl-[2px]'></i>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
    <div className='flex justify-center h-auto'>
      <div className='flex space-x-8 mb-20'>
        {state.products.slice(0, 4).map((p) => (
          <div className='w-[320px] h-[300px]'>
            <Link className='' to={`/product-detail/${p._id}`}>
              <div className='border-2 hover:border-black rounded-lg p-5'>
                <img src={p.thumbnail} className='w-[700px]' />
                <p className='text-[19px] font-semibold'>{p.title}</p>
                <div className='text-[14px] text-gray-500 font-medium'>{p.category.title} </div>
                <div className='text-[15px] pt-4 font-semibold'>
                  {formatPrice(Number(p.price))}
                  <i className='fa-solid fa-dong-sign text-[11px] absolute mt-[7px] pl-[2px]'></i>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div> */}
    </div>
  )
}

export default Home
