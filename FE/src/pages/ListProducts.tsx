import { useContext, useEffect } from "react";
import { CategoryContext, CategoryContextType } from "../contexts/CategoryContext";
import { Link, useParams } from "react-router-dom";
import { ProductContext, ProductContextType } from "../contexts/ProductContext";

const ListProducts = () => {
  const { stateC } = useContext(CategoryContext) as CategoryContextType;
  const { productsByCate, productsByCategory } = useContext(ProductContext) as ProductContextType;
  const { id: categoryId } = useParams<{ id: string }>();
  const { formatPrice } = useContext(ProductContext) as ProductContextType;

  useEffect(() => {
    productsByCategory(categoryId || "");
  }, [categoryId, productsByCategory]);

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
                  <p>Giày thể thao</p>
                </div>
              </div>
            </div>

          </div>

          <div className='bg-gray-300 w-full h-[1px]'></div>
        </div>
      </div>


      <div className="grid grid-cols-3 gap-6 mb-20 mr-40">
        {productsByCate.map((product) => (
          <div
            key={product._id}
            className="product-container border p-5 rounded-xl hover:border-black w-[280px] h-[360px] pt-8 relative"
          >
            <div className="flex justify-center">
              <div>
                <Link to={`/product-detail/${product._id}`}>
                  <img src={product.thumbnail} className="w-[240px]" />
                </Link>
              </div>
            </div>

            {/* Product Details */}
            <div className="product-details pt-2 space-y-1 text-[17px] font-medium">
              <div>{product.title}</div>
              <div className="text-[14px] text-gray-500">
              <div className="font-normal">{product.category.title}</div>
              <div>{formatPrice(product.price)}</div>
              </div>
            </div>

            {/* Buttons */}
            <div className="product-buttons flex mt-5 space-x-2 ">
            <Link to={`/product-detail/${product._id}`}>
            <button  className="border-2 w-[240px] h-[50px] text-black text-[15px] rounded-2xl font-semibold flex items-center justify-center space-x-2">
                  <div>Add to cart</div>
                  <i className="fa-brands fa-opencart"></i>
                </button>
              </Link>
            </div>
          </div>
        ))}

        {productsByCate.length === 0 && (
          <div className="mr-40 w-80 mb-[150px]">
            <p>Không có sản phẩm nào được tìm thấy.</p>
          </div>
        )}
      </div>
    </div>


  );
};

export default ListProducts;
