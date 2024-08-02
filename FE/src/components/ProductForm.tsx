import { useParams } from 'react-router-dom';
import { Product } from '../interface/product';
import { useForm } from 'react-hook-form';
import { useContext, useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { instance } from '../api';
import { schemaProduct } from '../utils/validation';
import { ProductContext, ProductContextType } from '../contexts/ProductContext';
import { CategoryContext, CategoryContextType } from '../contexts/CategoryContext';
import { AuthContext, AuthContextType } from '../contexts/AuthContext';
// const { VITE_CLOUD_NAME } = import.meta.env;
// const { VITE_UPLOAD_PRESET } = import.meta.env;

const ProductForm = () => {
  const { handleProduct } = useContext(ProductContext) as ProductContextType
  const { stateC } = useContext(CategoryContext) as CategoryContextType
  const { id } = useParams();
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const { isCollapsed } = useContext(AuthContext) as AuthContextType

  const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm<Product>({
    resolver: zodResolver(schemaProduct),
  });

  if (id) {
    useEffect(() => {
      (async () => {
        const { data } = await instance.get(`/products/${id}`);
        reset(data.data);
        setThumbnailUrl(data.data.thumbnail);
        setValue('category', data.data.category?._id);
      })();
    }, [id]);

  }
  // const uploadImage = async (file:string)=>{
  //    const formData = new FormData 
  // }

  const onSubmit = (data: Product) => {
    handleProduct({ ...data, _id: id })
  }

  return (
    <div className={`${!isCollapsed ? 'w-[1110px] ml-[350px]' : 'w-[1330px] ml-[130px]'} text-gray-700 pt-20`}>
      <form className="pt-[10px]" onSubmit={handleSubmit(onSubmit)}>
        <div className="border-2 border-gray-300 p-6 rounded-3xl ">
          <div className="text-[18px] mb-5 text-center">
            <h2 className='font-semibold bg-gray-100 absolute border border-black py-2 px-2 rounded-full top-[69px]'>{id ? "CẬP NHẬT DANH MỤC" : "THÊM MỚI DANH MỤC"}</h2>
          </div>
          <div>
            <div className='text-[16px] space-y-5'>
              <div className="relative">
                <input
                  type="text"
                  id="title"
                  className={`w-full border rounded-lg py-4 px-4 outline-none ${errors.title
                    ? 'border-red-500 placeholder-red-500 focus:border-red-500 focus:ring-red-500'
                    : 'border border-gray-300 focus:border-2 focus:border-black'
                    }`}
                  placeholder="Tên sản phẩm"
                  {...register("title", { required: true })}
                />
                {errors.title && <p className="pl-[17px] text-red-500">{errors.title.message}</p>}
              </div>

              <div className="relative">
                <input
                  type="number"
                  id="price"
                  className={`w-full border rounded-lg py-4 px-4 outline-none ${errors.price
                    ? 'border-red-500 placeholder-red-500 focus:border-red-500 focus:ring-red-500'
                    : 'border border-gray-300 focus:border-2 focus:border-black'
                    }`}
                  placeholder="Giá sản phẩm"
                  {...register("price", { required: true, valueAsNumber: true })}
                />
                {errors.price && <p className="pl-[17px] text-red-500">{errors.price.message}</p>}
              </div>

              <div className='flex items-center space-x-20'>
                <div className='space-y-10'>
                  <div className="relative">
                    <input
                      type="text"
                      id="thumbnail"
                      className={`w-full border rounded-lg py-4 px-4 outline-none ${errors.thumbnail
                        ? 'border-red-500 placeholder-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border border-gray-300 focus:border-2 focus:border-black'
                        }`}
                      placeholder="Ảnh sản phẩm"
                      {...register("thumbnail", { required: true })}
                    />
                    {errors.thumbnail && <p className="pl-[17px] text-red-500">{errors.thumbnail.message}</p>}
                  </div>

                  <div className="w-full border border-gray-300 rounded-lg p-4 space-x-4 bg-white">
                    <label htmlFor="category" className="">
                      Danh mục sản phẩm
                    </label>
                    <select
                      id="category"
                      {...register('category', { required: true })}
                      className='border-2 rounded-md py-2 px-4 cursor-pointer'
                    >
                      {stateC.categories?.map((category) => (
                        <option key={category._id} value={category._id}>{category.title}</option>
                      ))}
                    </select>
                    {errors.category && <p className="pl-[17px] text-red-500">{errors.category.message}</p>}
                  </div>
                </div>
                <div>
                  {thumbnailUrl && (
                    <img src={thumbnailUrl} alt="Product Thumbnail" className='w-[200px]' />
                  )}
                </div>
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

export default ProductForm;
