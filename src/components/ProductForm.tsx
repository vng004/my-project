import { useParams } from 'react-router-dom'
import { Product } from '../interface/product'
import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import axios from 'axios'

type Props = {
  onSubmitProduct: (product: Product, id?: number) => void
}

const ProductForm = ({ onSubmitProduct }: Props) => {

  const { register, handleSubmit, reset } = useForm<Product>()
  const { id } = useParams()
  const onSubmit = (data: Product) => {
    onSubmitProduct(data, id ? Number(id) : undefined );
  };
  useEffect(() => {
    ; (async () => {
      const { data } = await axios.get(`http://localhost:3000/products/${id}`)
      reset(data)
    })()
  }, [id])
  return (
    <div>
      <div className="border-t-8 border-r-2 border-b-8 h-auto rounded-r-[130px] shadow-2xl mt-2">
        <div className="w-[1280px] ml-[340px] pt-10 ">
          <form className="px-4 py-3 " onSubmit={handleSubmit(onSubmit)} >
            <div className=" p-4 rounded-lg mb-10">
              <div
                className="flex justify-between items-center mb-10 px-6 py-10 rounded-lg bg-white border border-gray-500 shadow-lg text-[21px]">
                <h2 className="font-bold">{id ? "CẬP NHẬT SẢN PHẨM" : "THÊM MỚI SẢN PHẨM"}</h2>
              </div>
              <div className="border p-6 text-[18px] space-y-10 shadow-xl">
                <div className="">
                  <input type="text" id="title" className="w-full border border-gray-300 rounded-lg p-4" placeholder="Tên sản phẩm"
                    {...register("title")} />
                </div>
                <div className="">
                  <input type="number" id="price" className="w-full border border-gray-300 rounded-lg p-4"
                    placeholder="Giá sản phẩm"  {...register("price")} />
                </div>
                <div className="">
                  <input type="text" id="thumbnail" className="w-full border border-gray-300 rounded-lg p-4" placeholder="URL hình ảnh"
                    {...register("thumbnail")} />

                </div>
                <div className="">
                  <textarea id="description" className="w-full border border-gray-300 rounded-lg p-4" placeholder="Mô tả" {...register("description")} />
                </div>
                <button type="submit" className=" py-3 px-12 rounded-lg text-[19px] bg-black text-white  hover:bg-gray-700"
                >
                  {id ? "CẬP NHẬT " : "THÊM MỚI "}
                </button>
              </div>


            </div>
          </form>
        </div>
      </div >
    </div >
  )
}

export default ProductForm