import React, { createContext, useEffect, useReducer } from "react";
import { instance } from "../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Category } from "../interface/category";
import { categoryReducer } from "../reducers/categoryReducers";

export type CategoryContextType = {
  stateC: {categories: Category[]},
  onRemove: (id: string) => void
  handleCategory: (data: Category) => void,
  dispatch: React.Dispatch<any>;

  totalCategories:number

}

export const CategoryContext = createContext<CategoryContextType | undefined>(undefined)

export const CategoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [stateC, dispatch] = useReducer(categoryReducer, { categories: [] })
  const nav = useNavigate()

  const totalCategories = stateC.categories.length
  useEffect(() => {
    (async () => {
      try {
        const { data } = await instance.get('/categories')
        dispatch({ type: "SET_CATEGORIES", payload: data.data })
      } catch (error) {
        // toast.error('Không thể tải danh sách danh mục')
        console.log(error)
      }
    })()
  }, [])
  const onRemove = async (id: string) => {
    try {
      if (window.confirm('Bạn chắc chắn muốn xóa danh mục này?')) {
        await instance.delete(`/categories/${id}`)
        dispatch({ type: "REMOVE_CATEGORY", payload: id })
        toast.success('Xóa danh mục thành công!')
      }
    } catch (error) {
      toast.error('Không thể xóa danh mục')
      console.error(error)
    }
  }
  const handleCategory = async (category: Category) => {
    try {
      if (category._id) {
        const {data} = await instance.patch(`/categories/${category._id}`, category)
        dispatch({ type: "EDIT_CATEGORY", payload: data.data })

        toast.success('Cập nhật danh mục thành công!')
      } else {
        const {data} = await instance.post('/categories', category)
        dispatch({ type: "ADD_CATEGORY", payload: data.data })

        toast.success('Thêm mới danh mục thành công!')
      }
      nav('/admin/categories')
    } catch (error) {
      toast.error(category._id ? 'Không thể cập nhật danh mục' : 'Không thể thêm mới danh mục');
      console.error(error);
    }
  }


  return (
    <CategoryContext.Provider value={{ stateC,dispatch, onRemove, handleCategory,totalCategories }}>
      {children}
    </CategoryContext.Provider>
  );
}

