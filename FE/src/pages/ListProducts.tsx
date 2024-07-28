import { useContext, useEffect } from "react";
import { CategoryContext, CategoryContextType } from "../contexts/CategoryContext";
import { Link, useParams } from "react-router-dom";
import { ProductContext, ProductContextType } from "../contexts/ProductContext";

const ListProducts = () => {
  const { stateC } = useContext(CategoryContext) as CategoryContextType;
  const { productsByCate, productsByCategory } = useContext(ProductContext) as ProductContextType;
  const { id: categoryId } = useParams<{ id: string }>();

  useEffect(() => {
    productsByCategory(categoryId || "");
  }, [categoryId]);

  return (
    <div className="flex mt-40 ml-10 space-x-20">
  <div className="text-[16px] w-[315px] h-[calc(100vh-100px)] overflow-y-auto ">
    <div className="space-y-4">
      <div className="flex justify-between">
      <div className="space-y-3 ">
        <div className="font-semibold text-[#003F62]">Danh mục</div>
        {stateC.categories.map(c => (
          <Link to={`/products/category/${c._id}`} key={c._id}>
            <div>{c.title}</div>
          </Link>
        ))}
        
      </div>
      <div className="text-[#595959] hover:text-black cursor-pointer">
          <Link to="/products/category">Đặt lại</Link>
        </div>
      </div>

      <div className='bg-gray-300 w-full h-[1px]'></div>

      <div>
        <div className="font-semibold text-[#003F62] mt-4 mb-4">Tình trạng</div>
        <div className="space-y-3">
          <div className="font-semibold text-[#303030]">0 đã chọn</div>
          <div className="space-y-4">
            <div className="flex items-center">
              <input className="w-[25px] h-[25px] mr-2" type="checkbox" />
              <p>Còn hàng</p>
            </div>
          </div>
        </div>
        
      </div>

      <div className='bg-gray-300 w-full h-[1px]'></div>

      <div>
        <div className="font-semibold text-[#003F62] mt-4 mb-4">Loại sản phẩm</div>
        <div className="space-y-3">
          <div className="font-semibold text-[#303030]">0 đã chọn</div>
          <div className="space-y-4">
            <div className="flex items-center">
              <input className="w-[25px] h-[25px] mr-2" type="checkbox" />
              <p>Đồng hồ thông minh</p>
            </div>
          </div>
        </div>
        
      </div>

      <div className='bg-gray-300 w-full h-[1px]'></div>

      <div>
        <div className="font-semibold text-[#003F62] mt-4 mb-4">Màu sắc</div>
        <div className="flex justify-center space-x-[22px] mt-5">
          <button className="w-[15px] h-[15px] bg-[#EDA415] rounded-full border focus:border-black"></button>
          <button className="w-[15px] h-[15px] bg-[#E42424] rounded-full border focus:border-black"></button>
          <button className="w-[15px] h-[15px] bg-[#1B5A7D] rounded-full border focus:border-black"></button>
          <button className="w-[15px] h-[15px] bg-[#ACACAC] rounded-full border focus:border-black"></button>
          <button className="w-[15px] h-[15px] bg-[#1D5F23] rounded-full border focus:border-black"></button>
          <button className="w-[15px] h-[15px] bg-[#2E56A3] rounded-full border focus:border-black"></button>
          <button className="w-[15px] h-[15px] bg-[#8131A7] rounded-full border focus:border-black"></button>
          <button className="w-[15px] h-[15px] bg-[#BC2944] rounded-full border focus:border-black"></button>
          <button className="w-[15px] h-[15px] bg-[#9BC14C] rounded-full border focus:border-black"></button>
        </div>
      </div>

      <div className='bg-gray-300 w-full h-[1px]'></div>

      <div>
        <div className="font-semibold text-[#003F62] mt-4 mb-4">Kích thước</div>
        <div className="space-y-3">
          <div className="font-semibold text-[#003F62]">0 đã chọn</div>
          <div className="space-y-4">
            <div className="flex items-center">
              <input className="w-[25px] h-[25px] mr-2" type="checkbox" />
              <p>M</p>
            </div>
            <div className="flex items-center">
              <input className="w-[25px] h-[25px] mr-2" type="checkbox" />
              <p>S</p>
            </div>
            <div className="flex items-center">
              <input className="w-[25px] h-[25px] mr-2" type="checkbox" />
              <p>X</p>
            </div>
            <div className="flex items-center">
              <input className="w-[25px] h-[25px] mr-2" type="checkbox" />
              <p>XX</p>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </div>
  
  <div>
    <p>SẢN PHẨM:</p>
    {productsByCate.map(p => (
      <Link to={`/product-detail/${p._id}`} key={p._id}>
        <div>{p.title}</div>
      </Link>
    ))}
  </div>
</div>


  );
};

export default ListProducts;
