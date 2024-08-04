import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useContext, useEffect, useState } from 'react';
import { AuthContext, AuthContextType } from '../contexts/AuthContext';
import { instance } from '../api';
import { User } from '../interface/user';

const UserForm = () => {
  const { id } = useParams();
  const { isCollapsed, updateUserRole } = useContext(AuthContext) as AuthContextType;
  const [user, setUser] = useState<User | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<User>({});

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const { data } = await instance.get(`/auth/user/${id}`);
          reset(data);
          setUser(data.user);
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [id, reset]);

  const onSubmit = async (data: User) => {
    if (id && updateUserRole) {
      try {
        await updateUserRole(id, data.role);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className={`${!isCollapsed ? 'w-[1110px] ml-[350px]' : 'w-[1330px] ml-[130px]'} text-gray-700 pt-20`}>
      <form className="pt-[10px]" onSubmit={handleSubmit(onSubmit)}>
        <div className="border-2 border-gray-300 p-6 rounded-3xl">
          <div className="text-[18px] mb-5 text-center">
            <h2 className='font-semibold bg-gray-100 absolute border border-black py-2 px-2 rounded-full top-[69px]'>
              CẬP NHẬT VAI TRÒ NGƯỜI DÙNG
            </h2>
          </div>

          <div className="text-[16px] space-y-5">
            <div className='flex gap-4 '>
              Vai trò hiện tại: <p className={`font-semibold text-[15px] ${user?.role === "admin" ? 'text-red-500' : user?.role === "member" ? 'text-green-500' : ''}`}>{user?.role}</p>
            </div>
            <div className="relative">
              <select
                id="role"
                className={`w-full border rounded-lg py-4 px-4 outline-none ${errors.role
                  ? 'border-red-500 placeholder-red-500 focus:border-red-500 focus:ring-red-500'
                  : 'border border-gray-300 focus:border-2 focus:border-black'
                  }`}
                {...register("role", { required: 'Vai trò là bắt buộc' })}
              >
                <option value="">Chọn vai trò</option>
                <option value="admin">admin</option>
                <option value="member">member</option>
              </select>
              {errors.role && <p className="pl-[17px] text-red-500">{errors.role.message}</p>}
            </div>
            <button
              type="submit"
              className={`w-full py-4 rounded-full text-[16px]  bg-black text-white hover:bg-gray-700 cursor-pointer`}
              disabled={user?.role === 'admin'}
            >
              CẬP NHẬT VAI TRÒ
            </button>

          </div>
        </div>
      </form >
    </div >
  );
};

export default UserForm;
