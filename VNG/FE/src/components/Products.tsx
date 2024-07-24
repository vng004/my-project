import { Link } from 'react-router-dom';
import { ProductContext, ProductContextType } from '../contexts/ProductContext';
import { useContext } from 'react';



const Products = () => {
  const {state , onRemove} = useContext(ProductContext) as ProductContextType
  return (
    <div>
      <div className='w-[1170px] mt-20 ml-[330px] border-t-8 border-r-2 border-l-2 border-b-8 h-[auto] flex justify-center   shadow-2xl rounded-[60px] '>
        <div className='w-[1100px] text-center  pt-[30px] '>
          <div className="flex justify-between items-center mb-10 px-6 py-7 rounded-lg bg-white border border-blue-400 text-[21px] shadow-xl">
            <h2 className="font-bold text-blue-400">QUẢN LÍ SẢN PHẨM</h2>

            <Link to="/admin/products-add" className='border-2 border-blue-400 px-6 hover:text-black text-blue-400 hover:border-black'>
              <i className="fa-solid fa-plus text-[22px]"></i>
            </Link>
          </div>
          <div className='pb-10 text-[19px] '>
            <table className="w-[1100px] shadow-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-100 text-gray-700 uppercase text-[14px] leading-normal">
                  <th className="py-4 px-6 text-center border">Ảnh</th>
                  <th className="py-4 px-6 text-center border">Tên sản phẩm</th>
                  <th className="py-4 px-6 text-center border">Giá sản phẩm</th>
                  <th className="py-4 px-6 text-center border">Mô tả</th>
                  <th className="py-4 px-6 text-center border">Danh mục</th>
                  <th className="py-4 px-6 text-center border"></th>
                </tr>
              </thead>

              <tbody className="text-black  text-[13px]  border-2">
                {state.products?.map((p, index) => (
                  <tr className="hover:border-2 hover:border-blue-400" key={index}>
                    <td style={{ cursor: 'pointer' }}
                      onClick={() => {
                        window.location.href = `/admin/products-edit/${p._id}`;
                      }} className="py-2 px-10 flex justify-center  border-t-black transition-all  ">
                      <img src={p.thumbnail} alt={p.title} width={'50px'} />
                    </td>
                    <td style={{ cursor: 'pointer' }}
                      onClick={() => {
                        window.location.href = `/admin/products-edit/${p._id}`;
                      }} className="py-2 px-10 text-center  border-t-black transition-all  ">
                      {p.title}
                    </td>
                    <td style={{ cursor: 'pointer' }}
                      onClick={() => {
                        window.location.href = `/admin/products-edit/${p._id}`;
                      }} className="py-2 px-10 text-center  border-t-black transition-all  ">
                      {p.price}
                    </td>
                    <td style={{ cursor: 'pointer' }}
                      onClick={() => {
                        window.location.href = `/admin/products-edit/${p._id}`
                      }} className="py-2 px-10 text-center  border-t-black transition-all  ">
                      {p.description}
                    </td>
                    <td style={{ cursor: 'pointer' }}
                      onClick={() => {
                        window.location.href = `/admin/products-edit/${p._id}`
                      }} className="py-2 px-10 text-center  border-t-black transition-all  ">
                      {p.category?.title}
                    </td>
                    <td className="py-2 px-10 text-center  border-t-black transition-all  space-x-3">
                      <button onClick={() => onRemove(p._id!)}>
                        <i className="fa-regular fa-trash-can text-gray-400 hover:text-black text-[22px] "></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Products