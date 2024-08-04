import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';
import { instance } from '../api';
import { toast } from 'react-toastify';
import logo from '../images/logo.png';

const schema = z.object({
  email: z.string().email("Email không được để trống!")
})
interface ForgotPasswordType {
  email: string
}

const ForgotPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordType>({
    resolver: zodResolver(schema),
  });
  const nav = useNavigate()
  const onSubmit =async(data:ForgotPasswordType)=>{
    try {
      const res = await instance.post('/auth/forgot-password',data)
      if (res) {
        toast.success("Lấy lại mật khẩu thành công, mật khẩu mới đã được gửi về mail của bạn!")
        nav('/login')
      }
    } catch (error) {
      toast.error("Lấy lại mật khẩu thất bại, do email này chưa được đăng kíkí!")
      
    }
  }
  return (
    <div className='relative min-h-screen flex items-center justify-center'>
    <div className="bg-gray-100 absolute top-0 left-0 bg-gradient-to-b from-gray-700 via-gray-700 to-gray-100 bottom-0 leading-5 h-full w-full overflow-hidden z-0">
    </div>
    <div className='relative min-h-screen flex justify-center space-x-[190px] items-center rounded-3xl z-10'>
      <div className="flex-col flex max-w-[400px]">
        <div className="self-start hidden lg:flex flex-col text-gray-300">
          <h1 className="my-3 font-semibold text-4xl">Chào mừng bạn!</h1>
          <div className='flex items-center'>
            <p className="pr-3 text-[16px] ">Đã đến và tham gia với chúng tôi</p>
            <img src={logo} className="w-[100px]" />
            </div>
        </div>
      </div>
      <div className="bg-white p-10 rounded-lg shadow-2xl">
        <form className="space-y-3 w-[400px]" onSubmit={handleSubmit(onSubmit)}>
          <div className="h-auto w-[420px] font-medium text-[24px] text-gray-800">
            Nhập email của bạn để lấy lại mật khẩu
          </div>
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
              className={`absolute left-4 top-4 transition-all ${errors.email
                ? 'text-red-500'
                : 'text-[#003F62] pt-4'
                }`}
            >
              Email
            </label>
            {errors.email && <p className='text-red-500 pl-4'>{errors.email.message}</p>}
          </div>
          <div className="text-center pt-5">
            <button
              type="submit"
              className="w-full bg-black text-white py-5 rounded-xl hover:bg-gray-500 font-semibold transition duration-300">
              Lấy lại mật khẩu
            </button>
          </div>
        </form>
        
      </div>
      <div className='absolute right-[-180px] top-2 text-gray-200 hover:text-red-500 text-[30px] z-10'>
        <Link to={'/'}><i className="fa-solid fa-circle-xmark"></i></Link>
      </div>
    </div>
    <svg className="absolute bottom-0 left-0 w-full z-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#fff" fillOpacity="1" d="M0,0L40,42.7C80,85,160,171,240,197.3C320,224,400,192,480,154.7C560,117,640,75,720,74.7C800,75,880,117,960,154.7C1040,192,1120,224,1200,213.3C1280,203,1360,149,1400,122.7L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path></svg>
  </div>
  )
}

export default ForgotPassword