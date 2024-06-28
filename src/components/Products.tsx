import { Link } from 'react-router-dom'
import { Product } from '../interface/product'

type Props = {
  products: Product[],
  onRemove: (id:number)=>void
}

const Products = ({ products,onRemove }: Props) => {
  return (
    <div className='border-t-8 border-r-2 border-b-8 h-[auto] shadow-2xl rounded-r-[130px] '>
      <div className='w-[1200px] ml-[380px] pt-[71px] mb-10 '>
      <div
      className="flex justify-between items-center mb-10 px-6 py-7 rounded-lg bg-white border border-gray-500 text-[21px] shadow-xl">
      <h2 className="font-bold text-gray-700">QUẢN LÍ SẢN PHẨM</h2>
      <Link to="/admin/products/add" className="bg-black text-white  hover:bg-gray-700 transition px-6 py-3 rounded-xl">Thêm
        sản phẩm</Link>
    </div>
      <div className='pb-10 text-[19px] '>
      <table className="w-full border border-gray-200 shadow-lg rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-100 text-gray-700 uppercase text-lg leading-normal">
            <th className="py-4 px-6 text-center  border-gray-200">STT</th>
            <th className="py-4 px-6 text-center  border-gray-200">Tên sản phẩm</th>
            <th className="py-4 px-6 text-center  border-gray-200">Ảnh</th>
            <th className="py-4 px-6 text-center  border-gray-200">Giá sản phẩm</th>
            <th className="py-4 px-6 text-center  border-gray-200">Mô tả</th>
            <th className="py-4 px-6 text-center  border-gray-200">Thao tác</th>
          </tr>
        </thead>
        <tbody className="text-black text-[16px] font-light border-2">
          {products?.map((p, index)=>(
            <tr className='hover:border-t-2 hover:border-b-2 transition' key={index}>
              <td className='py-4 px-6 text-center whitespace-nowrap  border-gray-200"'>{p.id}</td>
              <td className='py-4 px-6 text-center whitespace-nowrap  border-gray-200"'>{p.title}</td>
              <td className='py-4 px-6 text-center whitespace-nowrap  border-gray-200"'>{p.thumbnail}</td>
              <td className='py-4 px-6 text-center whitespace-nowrap  border-gray-200"'>{p.price}</td>
              <td className='py-4 px-6 text-center whitespace-nowrap  border-gray-200"'>{p.description}</td>
              <td className='py-4 px-6 text-center whitespace-nowrap  border-gray-200"'>
                <Link to={`/admin/products/edit/${p.id}`} >Sua</Link>
                <button onClick={()=>onRemove(Number(p.id))}>Xoa</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div> 
      </div>
    </div>
  )
}

export default Products