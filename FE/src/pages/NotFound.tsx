import { Link } from 'react-router-dom';
import logo from '../images/logo.png';

const NotFound = () => {
  return (
    <div className="flex justify-center text-center w-full">
      <div className="bg-red-400 absolute top-0 left-0 bg-gradient-to-b from-gray-50 via-gray-50 to-redbg-red-400 bottom-0 leading-5 h-full w-full overflow-hidden z-0">
      </div>
      <div className="p-8 absolute">
        
        <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Trang không tồn tại!</h2>
        <p className="mb-8 text-gray-600">Rất tiếc, trang bạn đang tìm kiếm không tồn tại.</p>
        <Link 
          to="/"
          className="inline-flex items-center px-4 py-2  text-black text-lg border-2 border-black font-medium rounded-full hover:border-2 hover:text-gray-400 hover:border-gray-400"
        >
          <i className="fa-solid fa-house mr-2"></i> Quay về trang chủ <img src={logo} alt="vng" className='w-[50px] pl-2' />
        </Link>
      </div>
    </div>
  )
};

export default NotFound;
