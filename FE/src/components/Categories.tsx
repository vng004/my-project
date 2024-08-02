import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CategoryContext, CategoryContextType } from "../contexts/CategoryContext";
import { AuthContext, AuthContextType } from "../contexts/AuthContext";


const Categories = () => {
  const { isCollapsed } = useContext(AuthContext) as AuthContextType;
  const { stateC, onRemove } = useContext(CategoryContext) as CategoryContextType;
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);




  return (
    <div className={`${isCollapsed ? 'w-[1460px] pl-[130px]' : 'w-[1460px] pl-[345px]'} text-gray-700 pb-10 pt-20`}>
      <div className={` transition-all pb-20`}>
      <div className={`flex justify-between items-center border-b-2 pb-2  text-gray-700`}>
          <h2 className="font-medium ">QUẢN LÍ DANH MỤC</h2>
          <Link to="/admin/categories-add" className='border-2 rounded-xl px-6 py-2 hover:shadow-md bg-white '>
           Thêm mới <i className="fa-solid fa-plus"></i>
          </Link>
        </div>
        <div className=''>
          <div className={` text-gray-700`}>
            <div className="flex text-[16px] uppercase font-medium pb-2 pt-4">
              <div className=" px-10  w-[300px]">Tên sản phẩm</div>
              <div className=" px-10   ml-20">Mô tả</div>
            </div>


            {stateC.categories?.map((p, index) => (
              <div key={index} className={`flex items-center border rounded-xl bg-white text-[17px] mt-3 hover:shadow-md`}
                onMouseEnter={() => setHoveredRow(index)}
                onMouseLeave={() => setHoveredRow(null)}>
                <Link to={`/admin/categories-edit/${p._id}`} className="flex items-center w-full space-x-7 ">

                  <div className="py-5 px-10 w-[312px]">
                    <div className='font-medium'>{p.title}</div>
                  </div>
                  <div className="py-5 px-20 pl-20">
                    {p.description}
                  </div>
                </Link>
                {hoveredRow === index && (
                  <div className="py-2 px-10 flex space-x-2">
                    <div className="relative group">
                      <button onClick={(e) => e.stopPropagation()} className="relative">
                        <Link to={`/admin/categories-edit/${p._id}`}>
                          <i className="fa-regular fa-pen-to-square text-gray-400 hover:text-black text-[22px]"></i>
                          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100">
                            Sửa
                          </span>
                        </Link>
                      </button>
                    </div>
                    <div className="relative group">
                      <button onClick={(e) => { e.stopPropagation(); onRemove(p._id!); }} className="relative">
                        <i className="fa-regular fa-trash-can text-gray-400 hover:text-black text-[22px]"></i>
                        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-max px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100">
                          Xóa
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
