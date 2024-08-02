import { useNavigate, useParams } from 'react-router-dom';
import { Product } from '../interface/product';
import { useForm } from 'react-hook-form';
import { useContext, useEffect, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { instance } from '../api';
import { schemaProduct } from '../utils/validation';
import { ProductContext, ProductContextType } from '../contexts/ProductContext';
import { CategoryContext, CategoryContextType } from '../contexts/CategoryContext';
import { AuthContext, AuthContextType } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
const VITE_CLOUD_NAME = "dikgwwjw9"
const  VITE_UPLOAD_PRESET="vng004"

const ProductForm = () => {
  const { dispatch } = useContext(ProductContext) as ProductContextType;
  const { stateC } = useContext(CategoryContext) as CategoryContextType;
  const { id } = useParams();
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const { isCollapsed } = useContext(AuthContext) as AuthContextType;
  const [loading, setLoading] = useState(false);
  const nav = useNavigate()
  const { register, handleSubmit, reset, formState: { errors }, setValue } = useForm<Product>({
    resolver: zodResolver(schemaProduct),
  });

  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          const { data } = await instance.get(`/products/${id}`);
          reset(data.data);
          setThumbnailUrl(data.data.thumbnail);
          setValue('category', data.data.category?._id);
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      }
    };
    fetchProduct();
  }, [id, reset, setValue]);
  
  const uploadImage = async (file: any): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append("upload_preset", VITE_UPLOAD_PRESET);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${VITE_CLOUD_NAME}/image/upload`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const onSubmit = async (product: Product) => {
    setLoading(true);
    let updatedProduct = { ...product, _id: id };

    try {
      if (product.thumbnail && product.thumbnail[0]) {
        const thumbnailUrl = await uploadImage(product.thumbnail[0]);
        updatedProduct = { ...updatedProduct, thumbnail: thumbnailUrl };
      }
      if (id) {
        await instance.patch(`/products/${id}`, updatedProduct);
        dispatch({ type: "EDIT_PRODUCT", payload: { id, product: updatedProduct } });
        toast.success('Cập nhật sản phẩm thành công!');
      } else {
        const { data } = await instance.post("/products", updatedProduct);
        dispatch({ type: "ADD_PRODUCT", payload: data });
        toast.success('Thêm sản phẩm mới thành công!');
      }
      const { data } = await instance.get('/products');
      dispatch({ type: "SET_PRODUCTS", payload: data.data.docs });
      nav('/admin/products')
    } catch (error) {
      toast.error('Không thể xử lý sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${!isCollapsed ? 'w-[1110px] ml-[350px]' : 'w-[1330px] ml-[130px]'} text-gray-700 pt-20`}>
      <form className="pt-[10px]" onSubmit={handleSubmit(onSubmit)}>
        <div className="border-2 border-gray-300 p-6 rounded-3xl">
          <div className="text-[18px] mb-5 text-center">
            <h2 className='font-semibold bg-gray-100 absolute border border-black py-2 px-2 rounded-full top-[69px]'>
              {id ? "CẬP NHẬT SẢN PHẨM" : "THÊM MỚI SẢN PHẨM"}
            </h2>
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
                      type="file"
                      id="thumbnail"
                      className={`w-full border rounded-lg py-4 px-4 outline-none ${errors.thumbnail
                        ? 'border-red-500 placeholder-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border border-gray-300 focus:border-2 focus:border-black'
                        }`}
                      placeholder="URL ảnh sản phẩm"
                      {...register("thumbnail")}
                    />
                    {errors.thumbnail && <p className="pl-[17px] text-red-500">{errors.thumbnail.message}</p>}
                  </div>

                  <div className="w-full border border-gray-300 rounded-lg p-4 space-x-4 bg-white">
                    <label htmlFor="category">
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
                disabled={loading}
              >
                {loading ? 'Đang xử lý...' : (id ? "CẬP NHẬT" : "THÊM MỚI")}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
