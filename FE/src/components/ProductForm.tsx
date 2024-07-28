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
  const {stateC} = useContext(CategoryContext) as CategoryContextType
  const { id } = useParams();
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const {isCollapsed } = useContext(AuthContext) as AuthContextType
  
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

  const onSubmit = (data:Product)=>{
    handleProduct({...data, _id:id})
  }
  
  return (
    <div>
            <div className={`${!isCollapsed ?' w-[1270px] ml-[270px]' :'w-[1350px]'}  mt-20   h-[auto] flex justify-center`}>

        <div className="w-[1130px]">
          <form className="px-4 py-3  " onSubmit={handleSubmit(onSubmit)}>
            <div className="pt-[20px] ">
              <div className=" mb-10 px-6 py-7 rounded-full bg-white border border-blue-500 text-[19px] shadow-xl">
                <h2 className="font-bold text-blue-400">{id ? "CẬP NHẬT SẢN PHẨM" : "THÊM MỚI SẢN PHẨM"}</h2>
              </div>
              <div className="border p-6  shadow-xl rounded-b-[50px] ">
                <div>
                  {thumbnailUrl && (
                    <img src={thumbnailUrl} alt="Product Thumbnail" className=' mt-10 w-[300px]' />
                  )}
                </div>
                <div className='text-[16px] space-y-10'>
                  <div className="">
                    <input type="text" id="title"  className={`w-full border rounded-full py-5 px-4 outline-none ${errors.title
                      ? 'border-red-500 placeholder-red-500 focus:border-red-500 focus:ring-red-500'
                      : 'border border-gray-300 focus:border-2 focus:border-black'
                    }`} placeholder="Tên sản phẩm" {...register("title", { required: true })} />
                    {errors.title && <p className="text-red-500">{errors.title.message}</p>}
                  </div>
                  <div className="">
                    <input type="number" id="price"  className={`w-full border rounded-full py-5 px-4 outline-none ${errors.price
                      ? 'border-red-500 placeholder-red-500 focus:border-red-500 focus:ring-red-500'
                      : 'border border-gray-300 focus:border-2 focus:border-black'
                    }`} placeholder="Giá sản phẩm" {...register("price", { required: true, valueAsNumber: true })} />
                    {errors.price && <p className="text-red-500">{errors.price.message}</p>}
                  </div>
                  <div>
                    <input type="file" id="thumbnail" className={`w-full border rounded-full py-5 px-4 outline-none ${errors.thumbnail
                      ? 'border-red-500 placeholder-red-500 focus:border-red-500 focus:ring-red-500'
                      : 'border border-gray-300 focus:border-2 focus:border-black'}`} {...register("thumbnail", { required: true })} />
                    {errors.thumbnail && <p className="text-red-500">{errors.thumbnail.message}</p>}
                  </div>

                  <div className="w-full border border-gray-300 rounded-full p-4 space-x-4">
                    <label htmlFor="category" className="">
                      Danh mục sản phẩm
                    </label>
                    <select id="category" {...register('category', { required: true })} className='border-2'>
                      {stateC.categories?.map((category) => (
                        <option key={category._id} value={category._id}>{category.title}</option>
                      ))}
                    </select>
                    {errors.category && <p className="text-red-500">{errors.category.message}</p>}
                  </div>
                  <div className="">
                    <textarea id="description" className="w-full border border-gray-300 rounded-full p-6" placeholder="Mô tả" {...register("description")} />
                  </div>
                  <button type="submit" className="w-full py-4 rounded-full text-[16px] bg-black text-white hover:bg-gray-700">
                    {id ? "CẬP NHẬT " : "THÊM MỚI "}
                  </button>
                </div>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductForm;
