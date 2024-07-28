import { Link } from 'react-router-dom';
import { ProductContext, ProductContextType } from '../contexts/ProductContext';
import { useContext, useState } from 'react';
import { AuthContext, AuthContextType } from '../contexts/AuthContext';

const Products = () => {
  const { state, onRemove } = useContext(ProductContext) as ProductContextType;
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [hoveredRemoveButton, setHoveredRemoveButton] = useState<number | null>(null);
  const {isCollapsed } = useContext(AuthContext) as AuthContextType


  return (
    <div>
      <div className={`${!isCollapsed ?' w-[1270px] ml-[270px]' :'w-[1350px]'}  mt-20   h-[auto] flex justify-center`}>
        <div className='w-[1100px]  pt-[30px]'>
          <div className="flex justify-between items-center mb-10 px-6 py-7 rounded-full bg-white border border-blue-400 text-[19px] shadow-xl">
            <h2 className="font-bold text-blue-400">QUẢN LÍ SẢN PHẨM</h2>
            <Link to="/admin/products-add" className='border-2 border-blue-400 px-6 hover:text-black text-blue-400 hover:border-black'>
              <i className="fa-solid fa-plus text-[22px]"></i>
            </Link>
          </div>
          <div className='pb-10 text-[19px]'>
            <table className={`${!isCollapsed ?'w-[1100px] shadow-xl' :"w-[1340px]"}`}>
              <thead>
                <tr className="bg-gray-100 text-gray-700 uppercase text-[13px] leading-normal">
                  <th className="py-4 px-6 text-left pl-4 ">Ảnh</th>
                  <th className="py-4 px-6 text-left pl-10 ">Tên sản phẩm</th>
                  <th className="py-4 px-6 text-left pl-10 ">Giá sản phẩm</th>
                  <th className="py-4 px-6 text-left pl-10 ">Mô tả</th>
                  <th className="py-4 px-6 text-left pl-10 ">Danh mục</th>
                  <th className="py-4 px-6 text-left pl-10 "></th>
                </tr>
              </thead>

              <tbody className="text-gray-400 text-[13px] border-2">
                {state.products?.map((p, index) => (
                  <tr
                    className="relative hover:text-black hover:border hover:border-black cursor-pointer"
                    key={index}
                    onMouseEnter={() => setHoveredRow(index)}
                    onMouseLeave={() => {
                      setHoveredRow(null);
                      setHoveredRemoveButton(null);
                    }}
                  >
                    <td
                      onClick={() => {
                        window.location.href = `/admin/products-edit/${p._id}`;
                      }}
                      className="py-2 px-10 pl-2 flex justify-center transition-all  border-t-gray-500"
                    >
                      <img src={p.thumbnail} alt={p.title} width={'50px'} />
                      {hoveredRow === index && hoveredRemoveButton === null && (
                        <span className='text-[12px] font-sans absolute bottom-[15px] left-[-85px] bg-black text-gray-50 px-3 py-[6px] rounded-full'>
                          Nhấn để sửa
                        </span>
                      )}
                    </td>
                    <td
                      onClick={() => {
                        window.location.href = `/admin/products-edit/${p._id}`;
                      }}
                      className="py-2 px-10 transition-all"
                    >
                      {p.title}
                    </td>
                    <td
                      onClick={() => {
                        window.location.href = `/admin/products-edit/${p._id}`;
                      }}
                      className="py-2 px-10 transition-all"
                    >
                      {p.price}
                    </td>
                    <td
                      onClick={() => {
                        window.location.href = `/admin/products-edit/${p._id}`;
                      }}
                      className="py-2 px-10 transition-all"
                    >
                      {p.description}
                    </td>
                    <td
                      onClick={() => {
                        window.location.href = `/admin/products-edit/${p._id}`;
                      }}
                      className="py-2 px-10 transition-all"
                    >
                      {p.category?.title}
                    </td>
                    <td className="py-2 px-5  transition-all ">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemove(p._id!);
                        }}
                        onMouseEnter={() => setHoveredRemoveButton(index)}
                        onMouseLeave={() => setHoveredRemoveButton(null)}
                        className="relative"
                      >
                        {hoveredRow === index && hoveredRemoveButton === index ? (
                          <span className='text-[12px] font-sans bg-black text-white p-3 absolute top-[-26px] right-[-32px]  rounded-full'>
                            Xóa
                          </span>
                        ) : (
                          <i className="fa-regular fa-trash-can text-gray-400 hover:text-black text-[22px]"></i>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products;
