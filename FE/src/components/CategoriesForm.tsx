import { useForm } from "react-hook-form";
import { Category } from "../interface/category";
import { useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { instance } from "../api";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema } from "../utils/validation";
import { CategoryContext, CategoryContextType } from "../contexts/CategoryContext";

const CategoriesForm = () => {
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
    <div className="flex justify-center mt-4">
      <div className="w-full max-w-[1030px] border-t-8 border-r-2 border-l-2 border-b-8 h-auto flex justify-center shadow-2xl rounded-[60px] mt-2">
        <div className="w-full p-4">
          <form className="space-y-6" onSubmit={handleSubmit((data) => handleCategory({ ...data, _id: id }))}>
            <div className="p-4 rounded-lg mb-6">
              <div className="flex justify-between items-center mb-6 px-6 py-4 rounded-lg bg-white border border-gray-500 shadow-lg text-lg font-bold">
                <h2>{id ? "CẬP NHẬT DANH MỤC" : "THÊM MỚI DANH MỤC"}</h2>
              </div>
              <div className="border p-6 rounded-lg text-lg shadow-xl">
                <div className="mb-4">
                  <input
                    type="text"
                    id="title"
                    className={`w-full border rounded-lg p-4 outline-none ${
                      errors.title
                        ? 'border-red-500 placeholder-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-300 placeholder-gray-500 focus:ring-black'
                    }`}
                    placeholder="Tên danh mục"
                    {...register("title", { required: 'Tên danh mục là bắt buộc' })}
                  />
                  {errors.title && <p className="text-red-500 mt-1">{errors.title.message}</p>}
                </div>
                <div className="mb-4">
                  <textarea
                    id="description"
                    className={`w-full border rounded-lg p-4 outline-none ${
                      errors.description
                        ? 'border-red-500 placeholder-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-gray-300 placeholder-gray-500 focus:ring-black'
                    }`}
                    placeholder="Mô tả"
                    {...register("description")}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-lg text-lg bg-black text-white hover:bg-gray-700 transition duration-300"
                >
                  {id ? "CẬP NHẬT" : "THÊM MỚI"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoriesForm;
