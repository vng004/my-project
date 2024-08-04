import React, { createContext, useEffect, useReducer, useState } from "react";
import { Product } from "../interface/product";
import { instance } from "../api";
import { toast } from "react-toastify";
import { productReducer } from "../reducers/productReducers";

export type ProductContextType = {
  state: { products: Product[] };
  dispatch: React.Dispatch<any>;
  onRemove: (id: string) => void;
  handleProduct: (data: Product) => void;
  formatPrice: (price: number) => string;
  totalProducts: number;
  filterProducts: (categoryID: string, page: number, limit: number) => void;
  productsByCate: Product[];
  filterByPrice: (minPrice: number, maxPrice: number) => void;
  sortByPrice: (order: "asc" | "desc") => void;
  currentPage: number;
  totalPages: number;

};

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(productReducer, { products: [] });
  const [productsByCate, setProductsByCate] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await instance.get('/products');
        dispatch({ type: "SET_PRODUCTS", payload: data.data.docs });
      } catch (error) {
        // toast.error('Không thể tải danh sách sản phẩm');
        console.log(error);
      }
    })();
  }, []);

  const filterProducts = async (categoryID: string, page: number, limit: number) => {
    try {
      const { data } = await instance.get(`/products?category=${categoryID}&_page=${page}&_limit=${limit}`);
      setProductsByCate(data.data.docs);
      setTotalPages(data.data.totalPages);
      setCurrentPage(page);
    } catch (error) {
      toast.error('Không thể tải sản phẩm theo danh mục');
      console.error(error);
    }
  };


  const filterByPrice = (minPrice: number, maxPrice: number) => {
    const filtered = state.products.filter(product => product.price >= minPrice && product.price <= maxPrice);
    setProductsByCate(filtered);
  };

  const sortByPrice = (order: "asc" | "desc") => {
    const sorted = [...productsByCate].sort((a, b) => {
      return order === "asc" ? a.price - b.price : b.price - a.price;
    });
    setProductsByCate(sorted);
  };

  const onRemove = async (id: string) => {
    try {
      if (window.confirm('Bạn chắc chắn muốn xóa sản phẩm này?')) {
        await instance.delete(`/products/${id}`);
        dispatch({ type: "REMOVE_PRODUCT", payload: id });
        toast.success('Xóa sản phẩm thành công!');
      }
    } catch (error) {
      toast.error('Không thể xóa sản phẩm');
      console.error(error);
    }
  };

  const handleProduct = async (product: Product) => {
    try {
      if (product._id) {
        const { data } = await instance.patch(`/products/${product._id}`, product);
        dispatch({ type: "EDIT_PRODUCT", payload: data.data });
        toast.success('Cập nhật sản phẩm thành công!');
      } else {
        const { data } = await instance.post("/products", product);
        dispatch({ type: "ADD_PRODUCT", payload: data.data });
        toast.success('Thêm sản phẩm mới thành công!');
      }
    } catch (error) {
      toast.error('Không thể xử lý sản phẩm');
      console.error(error);
    }
  };

  const formatPrice = (price: number): string => {
    return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    });
  };

  return (
    <ProductContext.Provider
      value={{
        state, dispatch, onRemove, handleProduct, formatPrice, totalProducts: state.products.length, filterProducts, productsByCate, filterByPrice, sortByPrice, currentPage, totalPages  }}
    >
      {children}
    </ProductContext.Provider>
  );
};
