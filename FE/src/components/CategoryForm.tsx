import { zodResolver } from "@hookform/resolvers/zod";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { instance } from "../api";
import { AuthContext, AuthContextType } from "../contexts/AuthContext";
import { CategoryContext, CategoryContextType } from "../contexts/CategoryContext";
import { Category } from "../interface/category";
import { categorySchema } from "../utils/validation";

const CategoryForm = () => {
  const { isCollapsed } = useContext(AuthContext) as AuthContextType;
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
    <div>
      <div className={`${isCollapsed ? 'w-[1460px] pl-[130px]' : 'w-[1460px] pl-[345px]'} text-gray-700 pb-10 pt-24`}>
        <form className="space-y-6" onSubmit={handleSubmit((data) => handleCategory({ ...data, _id: id }))}>
          <div className="border-2 border-gray-300 p-6 rounded-3xl ">
            <div className="text-[17px] mb-5 ">
              <h2 className='font-semibold bg-gray-100 absolute border border-black py-2 px-2 rounded-full  top-[75px]'>{id ? "CẬP NHẬT DANH MỤC" : "THÊM MỚI DANH MỤC"}</h2>
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
    </div>
  )
}

export default CategoryForm