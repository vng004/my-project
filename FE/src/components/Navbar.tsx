import { Link } from 'react-router-dom'
import logo from '../images/logo.png'
import myFace from '../images/myFace.png'
import { useContext, useState } from 'react'
import { AuthContext, AuthContextType } from '../contexts/AuthContext'

const Navbar = () => {
  const { user, logout, isCollapsed, setIsCollapsed } = useContext(AuthContext) as AuthContextType

  const [hoverOut, setHoverOut] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setMenuOpen(!menuOpen);
  };
  return (
    <div className='absolute '>
      {/* Top Bar */}
      <div
        className={` bg-white ${!isCollapsed ? 'ml-[280px] w-[1250px] ' : 'w-[1465px] ml-[65px]'
          }  h-[56px] shadow-md flex items-center justify-between fixed top-0 left-0 z-50`}
      >
        <div className='pl-2'></div>
        <div className='pr-4'>
          <div className='flex items-center'>
            <div className='hover:text-red-500 text-xl'>
              <Link to='/' onMouseEnter={() => setHoverOut(true)} onMouseLeave={() => setHoverOut(false)}>
                <i className='fa-solid fa-circle-xmark'></i>
                {hoverOut && (
                  <p className='text-sm font-sans absolute top-[17px] right-11  bg-gray-600 text-gray-50 px-3 py-1 rounded-xl'>
                    Thoát
                  </p>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0  ${isCollapsed ? 'w-16 ' : 'w-[280px]'
          } rounded-3xl  bg-white transition-width duration-300 shadow-2xl`}
      >
        <div className='relative z-10 '>
          <div className={`${!isCollapsed ? 'flex border-2 border-blue-900 rounded-full h-[56px] shadow-sm' : ''} `}>
            <div className={`${isCollapsed ? 'w-0' : 'w-[75px] ml-7  -mt-3'}`}>
              <img src={logo} alt='vng' />
            </div>
            <button
              className={`transform text-black text-[25px] space-x-2  hover:text-gray-500 ${isCollapsed ? 'pt-2 pl-5' : 'pl-[135px] '
                } `}
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <i className={`fa-solid ${!isCollapsed ? 'fa-toggle-off' : 'fa-toggle-on'}`}></i>
            </button>
          </div>

          {/* Profile */}
          <div
            className={`flex ${isCollapsed
              ? 'w-16 rounded-none border-white mt-3  flex justify-center hover:border-2 hover:rounded-md '
              : 'w-56 ml-7 mt-2'
              } p-1  border-2 border-white hover:border-2 hover:border-blue-400  cursor-pointer rounded-full shadow-xl bg-white`}
          >
            <img src={myFace} className='w-12 h-12 rounded-full' alt='My Face' />
            {!isCollapsed && (
              <div className='pl-3'>
                <p className=''>{user?.userName}</p>
              </div>
            )}
          </div>

          <div className='flex flex-col text-sm mt-5'>
            <Link
              to='dashboard'
              className={`${isCollapsed
                ? 'w-16 pl-5 hover:text-gray-400 focus:border-l-4 focus:border-l-blue-900'
                : 'border-transparent pl-10 hover:rounded-r-full focus:rounded-r-full  hover:border hover:border-gray-300 hover:border-l-4 hover:shadow-lg border-2 focus:border-l-4 focus:border-l-blue-900 focus:shadow-xl focus:text-blue-400 hover:text-blue-400'
                } p-3`}
            >
              <div className='flex items-center space-x-3 '>
                <i className='fa-solid fa-house'></i>
                {!isCollapsed && (
                  <div className=' font-semibold flex justify-between items-center w-40'>
                    <span>Trang chủ</span>
                  </div>
                )}
              </div>
            </Link>

            <Link
              to='products'
              className={`${isCollapsed
                  ? 'w-16 pl-5 hover:text-gray-400 focus:border-l-4 focus:border-l-blue-900'
                  : 'border-transparent pl-10 hover:rounded-r-full focus:rounded-r-full  hover:border hover:border-gray-300 hover:border-l-4 hover:shadow-lg border-2 focus:border-l-4 focus:border-l-blue-900 focus:shadow-xl focus:text-blue-400 hover:text-blue-400'
                } p-3`}
              onClick={toggleSubMenu}
            >
              <div className='flex items-center space-x-3'>
              <i className="fa-solid fa-feather-pointed"></i>
                {!isCollapsed && (
                  <div className='font-semibold flex justify-between items-center w-full'>
                    <span>Sản Phẩm</span>
                    <i className={`fa-solid fa-chevron-${menuOpen ? 'up' : 'down'}`}></i>
                  </div>
                )}
              </div>
            </Link>
            {menuOpen && !isCollapsed && (
              <div className='ml-12 border-l-4 border-blue-200 '>
                <Link
                  to='products-add'
                  className='block p-3 pl-2 hover:shadow-md space-x-2  focus:text-blue-400 hover:text-blue-400 hover:border hover:border-gray-300 rounded-r-full  '
                >
                 <i className="fa-solid fa-heart-circle-plus"></i><span>Add</span>
                </Link>
                <Link
                  to='products-add'
                  className='block p-3 hover:shadow-md space-x-2  focus:text-blue-400 hover:text-blue-400 hover:border hover:border-gray-300 rounded-r-full  '
                >
                 <i className="fa-solid fa-heart-circle-plus"></i><span>Add</span>
                </Link>
                
              </div>
            )}
            <Link
              to='categories'
              className={`${isCollapsed
                ? 'w-16 pl-5 hover:text-gray-400 focus:border-l-4 focus:border-l-blue-900'
                : ' border-transparent pl-10 hover:rounded-r-full focus:rounded-r-full  hover:border hover:border-gray-300 hover:border-l-4 hover:shadow-lg border-2 focus:border-l-4 focus:border-l-blue-900 focus:shadow-xl focus:border-t focus:border-gray-300 focus:text-blue-400 hover:text-blue-400'
                } p-3`}
            >
              <div className='flex items-center space-x-3'>
                <i className='fa-solid fa-layer-group'></i>
                {!isCollapsed && <div className='font-semibold'>Danh mục</div>}
              </div>
            </Link>

            <Link
              to='/admin'
              className={`${isCollapsed
                ? 'w-16 pl-5 hover:text-gray-400 focus:border-l-4 focus:border-l-blue-900'
                : ' border-transparent pl-10 hover:rounded-r-full focus:rounded-r-full  hover:border hover:border-gray-300 hover:border-l-4 hover:shadow-lg border-2 focus:border-l-4 focus:border-l-blue-900 focus:shadow-xl focus:text-blue-400 hover:text-blue-400'
                } p-3`}
            >
              <div className='flex items-center space-x-3'>
                <i className='fa-solid fa-cart-shopping'></i>
                {!isCollapsed && <div className='font-semibold'>Đơn Hàng</div>}
              </div>
            </Link>
          </div>



          {/* Logout */}
          <div className='mt-[200px]'>
            <Link
              to='/login'
              onClick={logout}
              className={`font-semibold pl-5 hover:text-red-500 flex items-center ${isCollapsed ? 'w-16 pl-5 pt-20 text-[22px]' : 'w-44'
                }`}
            >
              <i className='fa-solid fa-right-from-bracket pt-[1px]'></i>
              {!isCollapsed && <span className='ml-2'>Đăng xuất</span>}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
