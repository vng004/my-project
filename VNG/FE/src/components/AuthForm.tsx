import { useForm } from 'react-hook-form';
import { User } from '../interface/user';
import { Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { instance } from '../api';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import { schemaUser } from '../utils/validation';

type Props = {
  isLogin?: boolean
}

const AuthForm = ({ isLogin }: Props) => {
  const { login: contextLogin } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm<User>({
    resolver: zodResolver(schemaUser),
  });

  const onSubmit = async (data: User) => {
    try {
      if (isLogin) {
        const res = await instance.post('auth/login', data)
        contextLogin(res.data.token, res.data.user)
        toast.success('Đăng nhập tài khoản thành công!')

      } else {
        await instance.post('/auth/register', { email: data.email, password: data.password, userName: data.userName });
        toast.success('Đăng kí tài khoản thành công!');
        console.log()
      }

    } catch (error) {
      if (isLogin) {
        toast.error('Email hoặc Password của bạn không đúng!')
      } else {
        toast.error('Email của bạn đã tồn tại!');
      }
      console.log(error)
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center shadow-lg">
        <div className="bg-white sm:p-10 rounded-lg w-full max-w-lg ">
          <form className="space-y-7" onSubmit={handleSubmit(onSubmit)}>
            <div className="w-[440px] font-medium text-[24px] text-gray-800">
              {isLogin
                ? "Nhập email của bạn để tham gia với chúng tôi"
                : "Hãy đăng ký để trở thành thành viên của VNG"}
            </div>
            {!isLogin && (
              <div className="mb-4 space-y-1">
                <input
                  className={`w-full border rounded-full py-5 px-4 outline-none ${errors.userName
                      ? 'border-red-500 placeholder-red-500 focus:border-red-500 focus:ring-red-500'
                      : 'border-[#003F62] placeholder-[#003F62] focus:border-2 focus:border-black'
                    }`}
                  type="text"
                  placeholder="Tên người dùng"
                  {...register('userName')}
                />
                {errors.userName && <p className='text-red-500 pl-4'>{errors.userName.message}</p>}
              </div>
            )}
            <div className="mb-4 space-y-1">
              <input
                className={`w-full border rounded-full py-5 px-4 outline-none ${errors.email
                    ? 'border-red-500 placeholder-red-500 focus:border-red-500 focus:ring-red-500'
                    : 'border-[#003F62] placeholder-[#003F62] focus:border-2 focus:border-black'
                  }`}
                type="text"
                placeholder="Email"
                {...register('email', { required: 'Email là bắt buộc' })}
              />
              {errors.email && <p className='text-red-500 pl-4'>{errors.email.message}</p>}
            </div>
            <div className="mb-4 space-y-1">
              <input
                className={`w-full border rounded-full py-5 px-4 outline-none ${errors.password
                    ? 'border-red-500 placeholder-red-500 focus:border-red-500 focus:ring-red-500'
                    : 'border-[#003F62] placeholder-[#003F62] focus:border-2 focus:border-black'
                  }`}
                type="password"
                placeholder="Mật khẩu"
                {...register('password', { required: 'Mật khẩu là bắt buộc' })}
              />
              {errors.password && <p className='text-red-500 pl-4'>{errors.password.message}</p>}
            </div>
            <div className="mb-4 text-center text-sm flex justify-center space-x-2">
              <a href="#" className="underline hover:text-gray-400">Chính sách quyền riêng tư</a>
              <p>và</p>
              <a href="#" className="underline hover:text-gray-400">Điều khoản sử dụng của VNG.</a>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="w-full bg-black text-white py-5 rounded-full hover:bg-gray-500 font-semibold transition duration-300">
                {isLogin ? "Đăng nhập" : "Đăng Ký"}
              </button>
            </div>
          </form>

          {!isLogin ? <div className="mt-6 text-center">
            Bạn đã có tài khoản? <Link to={'/login'} className="hover:text-gray-400 underline">Đăng nhập<i className="fa-solid fa-person-circle-check"></i></Link>
          </div> :
            <div className="mt-6 text-center">
              Bạn chưa có tài khoản? <Link to={'/register'} className=" hover:text-gray-400 underline">Tham gia với chúng tôi <i className="fa-solid fa-person-circle-plus"></i></Link>
            </div>}
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
