import { Route, Routes, useNavigate } from "react-router-dom"
import Admin from "./pages/Admin"
import Products from "./components/Products"
import { useEffect, useState } from "react"
import axios from "axios"
import { Product } from "./interface/product"
import ProductForm from "./components/ProductForm"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function App() {
  const [products, setProducts] = useState<Product[]>([])
  const navigate = useNavigate()

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/products')
      setProducts(data)
    } catch (error) {
      toast.error("Không thể tải danh sách sản phẩm")
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const handleRemove = async (id: number) => {
    try {
      if (confirm("Bạn chắc chắn muốn xóa sản phẩm này?")) {
        await axios.delete(`http://localhost:3000/products/${id}`)
        setProducts(products.filter(p => p.id !== id))
        toast.success("Xóa sản phẩm thành công!")
      }
    } catch (error) {
      toast.error("Không thể xóa sản phẩm")
    }
  }

  const handleSubmit = async (product: Product, id?: number) => {
    try {
      if (id) {
        await axios.put(`http://localhost:3000/products/${id}`, product)
        fetchProducts()
        toast.success("Cập nhật sản phẩm thành công!")
      } else {
        const { data } = await axios.post(`http://localhost:3000/products`, product)
        setProducts([...products, data])
        toast.success("Thêm mới sản phẩm thành công!")
      }
      navigate('/admin/products')
    } catch (error) {
      toast.error("Không thể lưu sản phẩm")
    }
  }

  return (
    <>
      <Routes>
        <Route path="/admin" element={<Admin />}>
          <Route path="/admin/products" element={<Products products={products} onRemove={handleRemove} />} />
          <Route path="/admin/products/add" element={<ProductForm onSubmitProduct={handleSubmit} />} />
          <Route path="/admin/products/edit/:id" element={<ProductForm onSubmitProduct={handleSubmit} />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App