import { Link } from 'react-router-dom'

type Props = {}

const Navbar = (props: Props) => {
  return (
    <div>
    <div className='fixed inset-y-0 z-10 flex w-80'>
      <svg
        className='absolute inset-0 h-full text-white'
        style={{ filter: 'drop-shadow(10px 0 10px #00000030)' }}
        preserveAspectRatio='none'
        viewBox='0 0 309 800'
        fill='currentColor'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path d='M268.487 0H0V800H247.32C207.957 725 207.975 492.294 268.487 367.647C329 243 314.906 53.4314 268.487 0Z' />
      </svg>
      <div className='z-10 flex flex-col flex-1 textdecoration-none'>
        {/* --LOGO */}

        <div className='flex items-center justify-between flex-shrink-0 w-64 p-4'>
          <img src={'logo'} alt='vng' width='180px' />
        </div>
        {/* --Menu */}
        <div className='space-y-1'>
          <nav className=' ml-1 flex flex-col flex-1 w-64 p-3 hover:bg-gray-100 border-l-4 border-transparent hover:border-blue-400 hover:pl-8 rounded-r-lg'>
            <div className='flex items-center space-x-2 no-underline text-sm ml-2'>
              <i className='fa-solid fa-house'></i>
              <Link to={`/admin`} className='text-black'>
                Trang Chủ
              </Link>
            </div>
          </nav>
          <nav className=' ml-1 flex flex-col flex-1 w-64 p-3 hover:bg-gray-100 border-l-4 border-transparent hover:border-blue-400 hover:pl-8 rounded-r-lg'>
            <div className='flex items-center space-x-2 no-underline text-sm ml-2'>
              <i className='fa-solid fa-shop '></i>
              <Link to={`products`} className='text-black '>
                Sản Phẩm
              </Link>
            </div>
          </nav>
          <nav className=' ml-1 flex flex-col flex-1 w-64 p-3 hover:bg-gray-100 border-l-4 border-transparent hover:border-blue-400 hover:pl-8 rounded-r-lg'>
            <div className='flex items-center space-x-2 no-underline text-sm ml-2'>
              <i className='fa-solid fa-cart-shopping'></i>
              <a href='#'>Đơn Hàng</a>
            </div>
          </nav>
          <nav className=' ml-1 flex flex-col flex-1 w-64 p-3 hover:bg-gray-100 border-l-4 border-transparent hover:border-blue-400 hover:pl-8 rounded-r-lg'>
            <div className='flex items-center space-x-2 no-underline text-sm ml-2'>
              <i className='fa-solid fa-chart-simple'></i>
              <a href='#'>Biểu Đồ</a>
            </div>
          </nav>
        </div>

        {/* --thoat */}

        <div className='mt-[450px] ml-7'>
          <div className='flex '>
            <img src={''} className='w-12 h-12 rounded-full' alt='My Face' />
            <div className='ml-2 mt-1'>
              <p className='no-underline font-bold'>VNG</p>
              <p className='ad no-underline text-[12px] text-gray-400'>ADMIN</p>
            </div>
          </div>
          <button className='flex items-center space-x-2 no-underline  hover:text-gray-400 ml-1'>
            <i className='fa-solid fa-right-from-bracket'></i>
            <Link to={`/`} className='text-black '>
            <button className="hover:text-gray-400 text-[17px]" >Đăng xuất</button>
            </Link>
          </button>
        </div>
      </div>
    </div>
  </div>

  )
}

export default Navbar