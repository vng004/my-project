import { Link } from 'react-router-dom'
import logo from '../images/logo.png';
import myFace from '../images/myFace.png';
import { useContext } from 'react';
import { AuthContext, AuthContextType } from '../contexts/AuthContext';


const Navbar = () => {
  const { user, logout } = useContext(AuthContext) as AuthContextType

  return (
    <div>
      <div className='w-full bg-white border-2 shadow-md h-[50px] rounded-r-full border-l-0  flex items-center justify-between fixed top-0 left-0 z-50'>

        <div className=''>
          <div className='flex justify-center space-x-3 pr-10'>
            <div>'</div>
            <p className='ad no-underline text-[12px] text-gray-8border-blue-800'>ADMIN</p>
            <Link to={`/login`} onClick={logout} className=" font-semibold text-[14px] hover:text-black">
              <i className='fa-solid fa-right-from-bracket'></i>
            </Link>
          </div>
        </div>
      </div>
      <div className='fixed inset-y-0 flex w-[270px] pt-11'>
        <svg
          className='absolute text-white'
          style={{ filter: 'drop-shadow(10px 0 10px #00000030)' }}
          viewBox='0 0 309 800'
          fill='currentColor'
        >
          <path d='M268.487 0H0V800H247.32C207.957 725 207.975 492.294 268.487 367.647C329 243 314.906 53.4314 268.487 0Z' />
        </svg>
        <div className='z-10 '>
          <div className='pl-10'><img src={logo} alt='vng' width='100px' /></div>
          <div className='flex pl-7 w-[230px] p-1 bg-gray-100 rounded-r-full'>
            <img src={myFace} className='w-12 h-12 rounded-full' alt='My Face' />
            <p className='no-underline '>{user?.userName} user</p>
          </div>

          <div className='space-y-1 text-[14px] '>
            <Link to={`/admin`} className='ml-1 flex flex-col flex-1 w-[230px] p-3 hover:bg-gray-100 border-l-4 border-transparent hover:border-blue-800 hover:pl-3 border-2 hover:text-gray-500 rounded-r-full focus:border-3 focus:border-blue-800 focus:text-gray-500 focus:bg-gray-100'>
              <div className=' flex items-center space-x-4 no-underline ml-2'>
                <i className='fa-solid fa-house'></i>
                <div className=' font-semibold uppercase'>Trang Chủ</div>
              </div>
            </Link>
            <Link to={`products`} className='ml-1 flex flex-col flex-1 w-[230px] p-3 hover:bg-gray-100 border-l-4 border-transparent hover:border-blue-800 hover:pl-3 border-2 hover:text-gray-500 rounded-r-full focus:border-3 focus:border-blue-800 focus:text-gray-500 focus:bg-gray-100'>
              <div className=' flex items-center space-x-4 no-underline ml-2'>
                <i className='fa-solid fa-shop'></i>
                <div className=' font-semibold uppercase'>Sản Phẩm</div>
              </div>
            </Link>
            <Link to={`categories`} className='ml-1 flex flex-col flex-1 w-[230px] p-3 hover:bg-gray-100 border-l-4 border-transparent hover:border-blue-800 hover:pl-3 border-2 hover:text-gray-500 rounded-r-full focus:border-3 focus:border-blue-800 focus:text-gray-500 focus:bg-gray-100'>
              <div className=' flex items-center space-x-4 no-underline ml-2'>
                <i className="fa-solid fa-layer-group"></i>
                <div className=' font-semibold uppercase'>Danh mục </div>
              </div>
            </Link>
            <Link to={''} className='ml-1 flex flex-col flex-1 w-[230px] p-3 hover:bg-gray-100 border-l-4 border-transparent hover:border-blue-800 hover:pl-3 border-2 hover:text-gray-500 rounded-r-full focus:border-3 focus:border-blue-800 focus:text-gray-500 focus:bg-gray-100'>
              <div className=' flex items-center space-x-4 no-underline ml-2'>
                <i className='fa-solid fa-cart-shopping'></i>
                <div className=' font-semibold uppercase'>Đơn Hàng</div>
              </div>
            </Link>
            <Link to={''} className='ml-1 flex flex-col flex-1 w-[230px] p-3 hover:bg-gray-100 border-l-4 border-transparent hover:border-blue-800 border-2 hover:text-gray-500 rounded-r-full focus:border-3 focus:border-blue-800 focus:text-gray-500 focus:bg-gray-100 '>
              <div className=' flex items-center space-x-4 no-underline ml-3'>
                <i className='fa-solid fa-chart-simple'></i>
                <div className=' font-semibold uppercase'>BIỂU ĐỒ</div>
              </div>
            </Link>
          </div>

        </div>
      </div>
    </div>

  )
}

export default Navbar