import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ProductContext, ProductContextType } from '../contexts/ProductContext';
import { AuthContext, AuthContextType } from '../contexts/AuthContext';

const Products = () => {
  const { state, onRemove } = useContext(ProductContext) as ProductContextType;
  const { isCollapsed } = useContext(AuthContext) as AuthContextType;
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const { formatPrice } = useContext(ProductContext) as ProductContextType;


  return (
    <div className={`${!isCollapsed ? 'w-[1125px] ml-[340px]' : 'w-[1340px] ml-[125px]'} pt-16 h-[auto]  pb-20 text-[#123448]`}>
        <div className={`flex justify-between items-center border-b-2 pb-2  text-gray-700`}>
          <h2 className="font-medium ">QUẢN LÍ SẢN PHẨM</h2>
          <Link to="/admin/products-add" className='border-2 rounded-xl px-6 py-2 hover:shadow-md bg-white '>
           Thêm mới <i className="fa-solid fa-plus"></i>
          </Link>
        </div>
        <div className=''>
          <div className={` text-gray-700`}>
            <div className="flex text-[15px] uppercase font-medium pb-2 pt-4">
              <div className=" px-10  ">Ảnh</div>
              <div className=" px-24  ">Tên sản phẩm</div>
              <div className=" px-10  ml-[75px]">Giá sản phẩm</div>
              <div className=" px-10  ml-11">Mô tả</div>
              <div className=" px-10  "></div>
            </div>


            {state.products?.map((p, index) => (
              <div key={index} className={`flex items-center border rounded-xl bg-white text-[14px] mt-3 hover:shadow-md`}
                onMouseEnter={() => setHoveredRow(index)}
                onMouseLeave={() => setHoveredRow(null)}>
                <Link to={`/admin/products-edit/${p._id}`} className="flex items-center w-full  ">
                  <div className="py-1 px-9 ">
                    <img src={p.thumbnail} alt={p.title} width={'70px'} />
                  </div>
                  <div className="py-2 w-[260px] pl-[20px] ml-[50px] ">
                    <div className='font-medium'>{p.title}</div>
                    <div> {p.category?.title} </div>
                  </div>
                  <div className="py-2 px-20 ">
                    {formatPrice(p.price)}
                  </div>
                  <div className="py-2 px-20 pl-20">
                    {p.description}
                  </div>
                </Link>

                {hoveredRow === index && (
                  <div className="py-2 px-10 flex space-x-2">
                    <div className="relative group">
                      <button onClick={(e) => e.stopPropagation()} className="relative">
                        <Link to={`/admin/products-edit/${p._id}`}>
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

  );
};

export default Products;
