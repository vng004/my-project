import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext, AuthContextType } from '../contexts/AuthContext';
import { instance } from '../api';
import { User } from '../interface/user';

const Users = () => {
  const { isCollapsed } = useContext(AuthContext) as AuthContextType;
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    try {
      const res = await instance.get('/auth/users');
      setUsers(res.data.users);
    } catch (error) {
      console.error("Không thể tải danh sách người dùng", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className={`${!isCollapsed ? 'w-[1125px] ml-[340px]' : 'w-[1340px] ml-[125px]'} pt-16 h-auto pb-20 text-[#123448]`}>
      <div className="flex justify-between items-center border-b-2 pb-2 text-gray-700">
        <h2 className="font-medium">QUẢN LÍ TÀI KHOẢN</h2>
      </div>
      <div>
        <div className="text-gray-700">
          <div className="flex text-[13px] uppercase font-medium pb-2 pt-4">
            <div className="px-5">Tên tài khoản</div>
            <div className="px-28 ml-4 ">Gmail</div>
            <div className="px-20 ml-2">Ngày tạo</div>
            <div className="px-20">Vai trò</div>
            <div className="px-10"></div>
          </div>

          {users?.map((user, index) => (
            <div
              key={index}
              className="flex items-center border rounded-xl bg-white text-[14px] mt-3 hover:shadow-md"
              onMouseEnter={() => setHoveredRow(index)}
              onMouseLeave={() => setHoveredRow(null)}
            >
              <Link to={`/admin/users-edit/${user._id}`} className="flex items-center w-full space-x-10 py-1">
                <div className="p-5 h-[60px] w-[203px] font-semibold">
                  {user.userName}
                </div>
                <div className="p-5 h-[60px] w-[201px]">
                  {user.email}
                </div>
                <div className="p-5 h-[60px]  w-[182px]">
                  {new Date(user.createdAt).toLocaleDateString()}
                </div>
                <div className={`p-5 h-[60px] text-[15px] font-semibold ${user.role === 'admin' ? 'text-red-500' : 'text-green-500'
                  }`}>
                  {user.role}
                </div>

              </Link>

              {hoveredRow === index && (
                <div className="py-2 px-10 flex space-x-2">
                  <div className="relative group">
                    <button onClick={(e) => e.stopPropagation()} className="relative">
                      <Link to={`/admin/users-edit/${user._id}`}>
                        <i className="fa-regular fa-pen-to-square text-gray-400 hover:text-black text-[22px]"></i>
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100">
                          Sửa
                        </span>
                      </Link>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Users;
