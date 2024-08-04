import { useForm } from 'react-hook-form';
import { User } from '../interface/user';
import { Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { instance } from '../api';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import { schemaUser } from '../utils/validation';
import logo from '../images/logo.png';

type Props = {
  isLogin?: boolean;
};

const AuthForm = ({ isLogin }: Props) => {
  const { login: contextLogin } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<User>({
    resolver: zodResolver(schemaUser),
  });

  const onSubmit = async (data: User) => {
    try {
      if (isLogin) {
        const res = await instance.post('auth/login', data);
        contextLogin(res.data.token, res.data.user);
        toast.success('Đăng nhập tài khoản thành công!');
      } else {
        await instance.post('/auth/register', { email: data.email, password: data.password, userName: data.userName });
        toast.success('Đăng kí tài khoản thành công!');
      }
    } catch (error) {
      if (isLogin) {
        toast.error('Email hoặc Password của bạn không đúng!');
      } else {
        toast.error('Email của bạn đã tồn tại!');
      }
      console.log(error);
    }
  };

  return (
    <div className='relative min-h-screen flex items-center justify-center'>

      <div className="bg-gray-100 absolute top-0 left-0 bg-gradient-to-b from-gray-700 via-gray-700 to-gray-100 bottom-0 leading-5 h-full w-full overflow-hidden z-0">
      </div>



      <div className='relative min-h-screen flex justify-center  space-x-[190px]  items-center  rounded-3xl z-10'>
        <div className="flex-col flex max-w-[400px]">
          <div className="self-start hidden lg:flex flex-col text-gray-300">
            <h1 className="my-3 font-semibold text-4xl">Chào mừng bạn!</h1>
            <div className='flex items-center'>
            <p className="pr-3 text-[16px] ">Đã đến và tham gia với chúng tôi</p>
            <img src={logo} className="w-[100px]" />
            </div>
          </div>
        </div>
        <div className="bg-white p-10 rounded-lg  shadow-2xl">
          <form className="space-y-3 w-[400px]" onSubmit={handleSubmit(onSubmit)}>
            <div className=" h-auto w-[420px]  font-medium text-[24px] text-gray-800">
              {isLogin
                ? "Nhập email của bạn để tham gia với chúng tôi"
                : "Hãy đăng ký để trở thành thành viên của VNG"}
            </div>
            {!isLogin && (
              <div className="custom-input-container">
                <input
                  id="userName"
                  className={`w-full border rounded-xl py-5 px-4 outline-none transition-all ${errors.userName
                    ? 'border-red-500 focus:border-red-500'
                    : 'border-[#003F62] focus:border-2 focus:border-black'
                    }`}
                  type="text"
                  placeholder=" "
                  {...register('userName')}
                />
                <label
                  htmlFor="userName"
                  className={`absolute left-4 top-3 transition-all ${errors.userName
                    ? 'text-red-500'
                    : 'text-[#003F62] pt-4'
                    }`}
                >
                  Tên người dùng
                </label>
                {errors.userName && <p className='text-red-500 pl-4'>{errors.userName.message}</p>}
              </div>
            )}
            <div className="custom-input-container">
              <input
                id="email"
                className={`w-full border rounded-xl py-5 px-4 outline-none transition-all ${errors.email
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-[#003F62] focus:border-2 focus:border-black'
                  }`}
                type="text"
                placeholder=" "
                {...register('email', { required: 'Email là bắt buộc' })}
              />
              <label
                htmlFor="email"
                className={`absolute left-4 top-3 transition-all ${errors.email
                  ? 'text-red-500'
                  : 'text-[#003F62] pt-4'
                  }`}
              >
                Email
              </label>
              {errors.email && <p className='text-red-500 pl-4'>{errors.email.message}</p>}
            </div>
            <div className="custom-input-container">
              <input
                id="password"
                className={`w-full border rounded-xl py-5 px-4 outline-none transition-all ${errors.password
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-[#003F62] focus:border-2 focus:border-black'
                  }`}
                type="password"
                placeholder=" "
                {...register('password', { required: 'Mật khẩu là bắt buộc' })}
              />
              <label
                htmlFor="password"
                className={`absolute left-4 top-3 transition-all ${errors.password
                  ? 'text-red-500'
                  : 'text-[#003F62] pt-4'
                  }`}
              >
                Mật khẩu
              </label>
              {errors.password && <p className='text-red-500 pl-4'>{errors.password.message}</p>}
            </div>
            <div className="text-center text-sm flex justify-center space-x-2 pt-5">
              <a href="#" className="underline hover:text-gray-400">Chính sách quyền riêng tư</a>
              <p>và</p>
              <a href="#" className="underline hover:text-gray-400">Điều khoản sử dụng của VNG.</a>
            </div>
            <div className="text-center pt-5">
              <button
                type="submit"
                className="w-full bg-black text-white py-5 rounded-xl hover:bg-gray-500 font-semibold transition duration-300">
                {isLogin ? "Đăng nhập" : "Đăng Ký"}
              </button>
            </div>
          </form>

          {!isLogin ? (
            <div className="mt-6 text-center">
              Bạn đã có tài khoản? <Link to={'/login'} className="hover:text-gray-400 underline">Đăng nhập<i className="fa-solid fa-person-circle-check"></i></Link>
            </div>
          ) : (
            <div>
              <div className="mt-6 pb-2 text-center">
              <Link to={'/forgot-password'} className="hover:text-gray-400 underline">Quên mật khẩu <i className="fa-solid fa-person-circle-exclamation"></i>
              </Link>
            </div>
              <div className=" text-center">
              Bạn chưa có tài khoản? <Link to={'/register'} className="hover:text-gray-400 underline">Tham gia với chúng tôi <i className="fa-solid fa-person-circle-plus"></i></Link>
            </div>
            
            </div>
          )}
        </div>
        <div className='absolute right-[-180px] top-2 text-gray-200 hover:text-red-500 text-[30px]  z-10 '>
          <Link to={'/'} ><i className="fa-solid fa-circle-xmark"></i></Link>
        </div>
      </div>
      <svg className="absolute bottom-0 left-0 w-full z-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#fff" fillOpacity="1" d="M0,0L40,42.7C80,85,160,171,240,197.3C320,224,400,192,480,154.7C560,117,640,75,720,74.7C800,75,880,117,960,154.7C1040,192,1120,224,1200,213.3C1280,203,1360,149,1400,122.7L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path></svg>
    </div>
  );
};

export default AuthForm;
