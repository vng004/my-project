import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CategoryContext, CategoryContextType } from "../contexts/CategoryContext";
import { AuthContext, AuthContextType } from "../contexts/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { instance } from "../api";
import { Category } from "../interface/category";
import { categorySchema } from "../utils/validation";

const Categories = () => {
  const { isCollapsed } = useContext(AuthContext) as AuthContextType;
  const { stateC, onRemove } = useContext(CategoryContext) as CategoryContextType;
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const { handleCategory } = useContext(CategoryContext) as CategoryContextType;
  const { register, handleSubmit, formState: { errors }, reset } = useForm<Category>(
    { resolver: zodResolver(categorySchema) }
  );

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      (async () => {
        const { data } = await instance.get(`/categories/${id}`);
        reset(data.data);
      })();
    }
  }, [id, reset]);
  return (
    <div className={`${isCollapsed ? 'w-[1460px] pl-[130px]' : 'w-[1460px] pl-[345px]'} text-gray-700 pb-10 pt-20`}>
      <div className={` transition-all pb-20`}>
        <div className={`border-b-2 pb-6 text-gray-700`}>
          <h2 className="font-medium">QUẢN LÍ DANH MỤC</h2>
        </div>
        <div className=''>
          <div className={` text-gray-700`}>
            <div className="flex text-[15px] uppercase font-medium pb-2 pt-4">
              <div className=" px-10  ">Tên sản phẩm</div>
              <div className=" px-10 pl-[125px]  ">Mô tả</div>
            </div>


            {stateC.categories?.map((p, index) => (
              <div key={index} className={`flex items-center border rounded-xl bg-white text-[14px] mt-3 hover:shadow-md`}
                onMouseEnter={() => setHoveredRow(index)}
                onMouseLeave={() => setHoveredRow(null)}>
                <Link to={`/admin/categories-edit/${p._id}`} className="flex items-center w-full space-x-7 ">

                  <div className="py-6 px-10">
                    <div className='font-medium'>{p.title}</div>
                  </div>
                  <div className="py-6 px-20 pl-20">
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
      <form className="space-y-6" onSubmit={handleSubmit((data) => handleCategory({ ...data, _id: id }))}>
        <div className="border-2 border-gray-300 p-6 rounded-3xl ">
          <div className="text-[17px] mb-5 ">
            <h2 className='font-semibold bg-gray-100 absolute border border-black py-2 px-2 rounded-full  top-[54%]'>{id ? "CẬP NHẬT DANH MỤC" : "THÊM MỚI DANH MỤC"}</h2>
          </div>
          <div className="">
            <div className='text-[16px] space-y-5'>
              <div className="relative">
                <input
                  type="text"
                  id="title"
                  className={`w-full border rounded-lg py-4 px-4 outline-none ${errors.title
                    ? 'border-red-500 placeholder-red-500 focus:border-red-500 focus:ring-red-500'
                    : 'border border-gray-300 focus:border-2 focus:border-black'
                    }`}
                  placeholder="Tên danh mục"
                  {...register("title", { required: true })}
                />
                {errors.title && <p className="pl-[17px] text-red-500">{errors.title.message}</p>}
              </div>


              <div className="relative">
                <textarea
                  id="description"
                  className="w-full border border-gray-300 rounded-lg p-6 outline-none focus:border-2 focus:border-black"
                  placeholder="Mô tả"
                  {...register("description")}
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full text-[16px] bg-black text-white hover:bg-gray-700"
              >
                {id ? "CẬP NHẬT" : "THÊM MỚI"}
              </button>
            </div>
          </div>
        </div>
      </form>

    </div>
  );
}

export default Categories;
