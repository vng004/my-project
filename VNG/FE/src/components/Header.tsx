import { Link } from 'react-router-dom'
import logo from '../images/logo.png'
import { useContext, useState } from 'react';
import { AuthContext, AuthContextType } from '../contexts/AuthContext';

const Header = () => {
  const [hover, setHover] = useState(false);
  const [hover1, setHover1] = useState(false);
  const { user } = useContext(AuthContext) as AuthContextType
  
  return (
    <div>
      <header className='mb-10'>
        <div className='flex justify-between bg-black py-2 text-white text-[13px] items-center '>
          <div className='pl-[55px] space-x-2'>
            <span>Cần giúp đỡ?</span> <span><i className="fa-solid fa-phone"></i> (+84) 1234 456 789 </span>
          </div>
          {!user ? (<Link to={`/login`} className='pr-14 hover:text-[#858585]'>
            Đăng nhập
            <i className='fa-regular fa-user ml-1 text-[11px]' />
          </Link>):(<Link to={`/profile`} className='pr-14 hover:text-[#858585]'>
            {user.userName}
            <i className='fa-regular fa-user ml-1 text-[11px]' />
          </Link>)}
        </div>
        <div className='flex justify-between  h-[100px] items-center  border'>
          <div className='pl-[52px]'>
            <Link to={`/`}>
              <img src={logo} width={'120px'} />
            </Link>
          </div>
          <ul className='pl-[160px] flex text-[18px] font-medium space-x-14 items-center'>
            <li className='hover:text-gray-400'>
              <Link to={''}>Mới và nổi bật</Link>
            </li>
            <li className='hover:text-gray-400'>
              <Link to={''}>Trẻ em</Link>
            </li>
            <li className='hover:text-gray-400'>
              <Link to={''}>Nữ</Link>
            </li>
            <li className='hover:text-gray-400'>
              <Link to={''}>Nam</Link>
            </li>
          </ul>
          <div className='flex space-x-[20px] items-center font-semibold  pr-14'>
            <div className='flex items-center bg-gray-100 border  rounded-full text-gray-400'>
              <div className='relative'>
                <form className=' flex items-center'>
                  <input className='py-[7px] w-[210px] pl-2 bg-gray-100 border-none border-gray-300 rounded-full focus:outline-none' type='text' name='kyw' placeholder='Tìm kiếm' />
                  <button className='absolute left-44 text-[20px] bg-gray-100 border-none' type='submit'>
                    <i className='fa-solid fa-magnifying-glass'></i>
                  </button>
                </form>
              </div>
            </div>

            <div className='text-[25px]'>
              <Link to='' onMouseEnter={()=>setHover(true)}
              onMouseLeave={()=>setHover(false)}>
                {!hover ? (
                  <i className="fa-regular fa-heart "></i>
                ) : (
                  <i className="fa-regular fa-heart hover:text-gray-400">
                    <p className='text-[12px] font-sans absolute ml-5 mt-1 bg-gray-600 text-gray-50 px-3 py-[6px] rounded-xl '>Yêu thích</p>
                  </i>
                )}
              </Link>
            </div>
            <div className='text-[25px]'>
              <Link to='' onMouseEnter={()=>setHover1(true)}
              onMouseLeave={()=>setHover1(false)}>
                {!hover1 ? (
                  <i className='fa-brands fa-opencart'></i>
                ) : (
                  <i className="fa-brands fa-opencart hover:text-gray-400">
                    <p className='text-[12px] font-sans absolute ml-4 mt-1 bg-gray-600 text-gray-50 px-[10px] py-[6px] rounded-xl '>Giỏ hàng</p>
                  </i>
                )}
              </Link>
            </div>

          </div>
        </div>
      </header>
    </div>
  )
}

export default Header
