import { Route, Routes } from 'react-router-dom'
import Products from './components/Products'
import ProductForm from './components/ProductForm'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CategoriesForm from './components/CategoriesForm'
import AuthForm from './components/AuthForm'
import Admin from './pages/layouts/Admin'
import Home from './pages/Home'
import Categories from './components/Categories'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import Client from './pages/layouts/Client'
import Notfound from './pages/NotFound'
import Dashboard from './components/Dasboard'
// import ProductsByCategory from './pages/ProductsByCategory'
import ListProducts from './pages/ListProducts'

function App() {


  return (
    <>
      <Routes>

        <Route path='/admin' element={<Admin />}>
        <Route path='/admin/dashboard' element={<Dashboard />} />
          <Route path='/admin/products' element={<Products />} />
          <Route path='/admin/products-add' element={<ProductForm />} />
          <Route path='/admin/products-edit/:id' element={<ProductForm />} />
          <Route path='/admin/categories' element={<Categories />} />
          <Route path='/admin/categories-add' element={<CategoriesForm />} />
          <Route path='/admin/categories-edit/:id' element={<CategoriesForm />} />
        </Route>

        <Route path='/' element={<Client />}>
          <Route index element={<Home />} />
          <Route path='/register' element={<AuthForm />} />
          <Route path='/login' element={<AuthForm isLogin />} />
          <Route path='/product-detail/:id' element={<ProductDetail />} />
          <Route path='/products/category/:id' element={<ListProducts />} />
          <Route path='/products/category' element={<ListProducts />} />
          <Route path='/cart' element={<Cart />} />
        </Route>
        <Route path='*' element={<Notfound />} />

      </Routes>
      <ToastContainer position="bottom-right"autoClose={2000}/>
    </>
  )
}

export default App
