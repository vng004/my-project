import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import { useContext, useState, useEffect, useRef } from 'react';
import { AuthContext, AuthContextType } from '../contexts/AuthContext';

const Header = () => {
  const [hover, setHover] = useState(false);
  const [hover1, setHover1] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const { user } = useContext(AuthContext) as AuthContextType;
  const lastScrollY = useRef(0);
  const [search, setSearch] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    setIsHeaderVisible(currentScrollY < lastScrollY.current);
    lastScrollY.current = currentScrollY;
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', !search);
  }, [search]);

  const handleSearchFocus = () => setSearch(false);
  const handleSearchBlur = () => setSearch(true);
  const handleMouseEnter = (setter: React.Dispatch<React.SetStateAction<boolean>>) => () => setter(true);
  const handleMouseLeave = (setter: React.Dispatch<React.SetStateAction<boolean>>) => () => setter(false);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchKeyword.trim()) {
      window.location.href = `/search?keyword=${encodeURIComponent(searchKeyword)}`;
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full bg-white z-50 transition-transform duration-300 ${isHeaderVisible ? 'transform translate-y-0' : 'transform -translate-y-full'}`}
    >
      {search && (
        <div className='flex justify-between py-2 bg-gray-100 text-black text-[11px] items-center'>
          <div className='pl-[55px] space-x-2'>
            <span>Cần giúp đỡ?</span>
            <span>
              <i className='fa-solid fa-phone'></i> (+84) 1234 456 789
            </span>
          </div>
          <Link
            to={!user ? '/login' : user.role === 'admin' ? '/admin' : '/profile'}
            className='pr-[65px] hover:text-[#858585]'
          >
            {!user ? 'Đăng nhập' : user.role === 'admin' ? 'Vào Admin' : user.userName}
            <i className={`ml-1 text-[13px] fa-regular ${!user ? 'fa-user' : user.role === 'admin' ? 'fa-pen-to-square' : 'fa-user'}`} />
          </Link>
        </div>
      )}
      <div className={`${search ? 'flex justify-between border items-center' : ''}`}>
        {search && (
          <div className='pl-[55px]'>
            <Link to={`/`}>
              <img src={logo} width={'58px'} alt='Logo' />
            </Link>
          </div>
        )}

        {search && (
          <ul className='pl-[140px] flex text-[16px] font-medium space-x-14 items-center'>
            <Link to={'/products/category'} className='hover:border-b-4 hover:border-b-black border-4 border-white py-3'>
              <li>Mới và nổi bật</li>
            </Link>
            <Link to={'/products/category'} className='hover:border-b-4 hover:border-b-black border-4 border-white py-3'>
              <li>Nam Giới</li>
            </Link>
            <Link to={'/products/category'} className='hover:border-b-4 hover:border-b-black border-4 border-white py-3'>
              <li>Trẻ Em</li>
            </Link>
            <Link to={'/products/category'} className='hover:border-b-4 hover:border-b-black border-4 border-white py-3'>
              <li>Phụ Nữ</li>
            </Link>
          </ul>
        )}

        <div className='flex space-x-[20px] items-center mr-2'>
          <div className={`font-semibold ${search ? 'bg-gray-100 rounded-full' : 'h-[410px] bg-white w-[1529px]'}`}>
            <div className='relative'>
              <form
                className='relative flex items-center font-sans'
                onSubmit={handleSearchSubmit}
              >
                <input
                  className={` ${search ? 'py-[5px] w-[155px] pl-10' : 'w-[900px] py-2 pl-10 mt-3 ml-80 hover:placeholder:text-black placeholder:text-gray-500'} placeholder:text-gray-400 bg-gray-100 hover:bg-gray-200 border-none rounded-full focus:outline-none`}
                  type='text'
                  name='kyw'
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  placeholder='Tìm kiếm'
                  onFocus={handleSearchFocus}
                  onBlur={handleSearchBlur}
                />
                <button
                  className={` ${search ? 'absolute text-[16px] bg-gray-100 rounded-full ' : 'absolute bottom-1  pl-[325px]'}`}
                  type='submit'
                  aria-label='Search'
                >
                  <div className='px-2 py-1 text-gray-500'>
                    <i className='fa-solid fa-magnifying-glass'></i>
                  </div>
                </button>
                {!search && (
                  <span
                    className='pl-60 pt-3 hover:text-gray-400 cursor-pointer'
                    onClick={() => setSearch(true)}
                  >
                    Hủy
                  </span>
                )}
              </form>
            </div>
            {!search && (
              <div className='pl-[325px] pt-8 text-gray-600 text-[14px]'>Cụm từ tìm kiếm phổ biến</div>
            )}
            {!search && (
              <div className='bg-gray-400 h-[356px] w-full mt-[300px] opacity-60'></div>
            )}
          </div>

          {search && (
            <div className='text-[19px]'>
              <Link to='' onMouseEnter={handleMouseEnter(setHover)} onMouseLeave={handleMouseLeave(setHover)}>
                <i className={`fa-regular fa-heart ${hover ? 'text-gray-400' : ''}`}>
                  {hover && (
                    <p className='text-[12px] mt-1 ml-1 font-sans absolute bg-gray-600 text-gray-50 px-3 py-[5px] rounded-xl'>
                      Yêu thích
                    </p>
                  )}
                </i>
              </Link>
            </div>
          )}
          {search && (
            <div className='pr-14 text-[19px]'>
              <Link to='/cart' onMouseEnter={handleMouseEnter(setHover1)} onMouseLeave={handleMouseLeave(setHover1)}>
                <i className={`fa-brands fa-opencart ${hover1 ? 'text-gray-400' : ''}`}>
                  {hover1 && (
                    <p className='text-[12px] font-sans absolute ml-1 mt-1 bg-gray-600 text-gray-50 px-3 py-[5px] rounded-xl'>
                      Giỏ hàng
                    </p>
                  )}
                </i>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
