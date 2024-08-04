import { useContext, useEffect, useState } from "react";
import { CategoryContext, CategoryContextType } from "../contexts/CategoryContext";
import { Link, useParams } from "react-router-dom";
import { ProductContext, ProductContextType } from "../contexts/ProductContext";

const ListProducts = () => {
  const { stateC } = useContext(CategoryContext) as CategoryContextType;
  const { productsByCate, filterProducts, sortByPrice, formatPrice, currentPage, totalPages } = useContext(ProductContext) as ProductContextType;
  const { id: categoryId } = useParams<{ id: string }>();
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | "">("");

  useEffect(() => {
    filterProducts( categoryId || "",currentPage, 3);
  }, [categoryId, currentPage]);

  useEffect(() => {
    if (sortOrder) {
      sortByPrice(sortOrder);
    }
  }, [sortOrder, sortByPrice]);

  const handleSortOrderChange = (order: "asc" | "desc") => {
    setSortOrder(order);
  };

  const handlePageChange = (page: number) => {
    filterProducts( categoryId || "",page, 3);
  };

  return (
    <div className="flex mt-40 ml-10 gap-14">
      <div className="text-[16px] w-[270px] h-[calc(100vh-100px)] overflow-y-auto">
        <div className="space-y-4">
          <div className="flex justify-between">
            <div className="space-y-3">
              <div className="font-semibold text-[#003F62] pb-3">Loại sản phẩm</div>
              {stateC.categories
                .filter(c => c._id !== '669c02529765efdfc6352752')
                .map(c => (
                  <Link to={`/products/category/${c._id}`} key={c._id} className="text-[14px]">
                    <div className="pb-2 hover:text-gray-400">{c.title}</div>
                  </Link>
                ))}
            </div>
            <div className="text-[#595959] hover:text-black cursor-pointer">
              <Link to="/products/category">Đặt lại</Link>
            </div>
          </div>

          <div className='bg-gray-300 w-full h-[1px]'></div>

          <div>
            <div className="font-semibold text-[#003F62] mt-4 mb-4">Giá tiền</div>
            <div className="space-y-3">
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    className="w-[15px] h-[15px] mr-2"
                    type="radio"
                    checked={sortOrder === "asc"}
                    onChange={() => handleSortOrderChange("asc")}
                  />
                  <p>Tăng dần</p>
                </div>
                <div className="flex items-center">
                  <input
                    className="w-[15px] h-[15px] mr-2"
                    type="radio"
                    checked={sortOrder === "desc"}
                    onChange={() => handleSortOrderChange("desc")}
                  />
                  <p>Giảm dần</p>
                </div>
              </div>
            </div>
          </div>
          <div className='bg-gray-300 w-full h-[1px]'></div>
        </div>
      </div>

      <div className="flex-1">
        <div className="flex gap-10 pt-5 h-[500px] ">
          {productsByCate.map((product) => (
            <div key={product._id} className="product-container relative">
              <div className="">
                <Link to={`/product-detail/${product._id}`}>
                  <img
                    src={product.thumbnail}
                    className="product-image w-[340px]"
                    alt={product.title}
                  />
                </Link>
              </div>

              <div className="product-details  text-[17px] font-medium">
                <div>{product.title}</div>
                <div className="text-[14px]">
                  <div className="font-normal text-gray-600">{product.category.title}</div>
                  <div>{formatPrice(product.price)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 border cursor-pointer rounded-full hover:border-black"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <span className="px-4 py-2">{currentPage} / {totalPages}</span>
          <button
            className="px-4 py-2 border cursor-pointer rounded-full hover:border-black"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>

      </div>
    </div>
  );
};

export default ListProducts;
