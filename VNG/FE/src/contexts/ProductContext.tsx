import React, { createContext, useEffect, useReducer } from "react";
import { Product } from "../interface/product";
import { instance } from "../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { productReducer } from "../reducers/productReducers";

export type ProductContextType = {
  state: { products: Product[] };
  dispatch: React.Dispatch<any>;
  onRemove: (id: string) => void;
  handleProduct: (data: Product) => void;
  formatPrice: (price: number)=> string
};

export const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(productReducer, { products: [] });
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await instance.get('/products');
        dispatch({ type: "SET_PRODUCTS", payload: data.data });
      } catch (error) {
        toast.error('Không thể tải danh sách sản phẩm');
        console.log(error);
      }
    })();
  }, []);

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
        const {data} =  await instance.patch(`/products/${product._id}`, product);
        dispatch({ type: "EDIT_PRODUCT", payload: data.data });
        toast.success('Cập nhật sản phẩm thành công!');
      } else {
        const {data} = await instance.post('/products', product);
        dispatch({ type: "ADD_PRODUCT", payload: data.data });
        toast.success('Thêm mới sản phẩm thành công!');
      }
      const {data} = await instance.get('/products');
      dispatch({ type: "SET_PRODUCTS", payload: data.data });
      nav('/admin/products');
    } catch (error) {
      toast.error(product._id ? 'Không thể cập nhật sản phẩm' : 'Không thể thêm mới sản phẩm');
      console.error(error);
    }
  };
   const formatPrice = (price: number) => {
    return  Intl.NumberFormat('vi').format(price);
  };

  return (
    <ProductContext.Provider value={{ state, dispatch, onRemove, handleProduct,formatPrice  }}>
      {children}
    </ProductContext.Provider>
  );
};
