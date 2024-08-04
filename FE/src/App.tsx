import { Route, Routes } from 'react-router-dom'
import Products from './components/Products'
import ProductForm from './components/ProductForm'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AuthForm from './components/AuthForm'
import Admin from './pages/layouts/Admin'
import Home from './pages/Home'
import Categories from './components/Categories'
import ProductDetail from './pages/ProductDetail'
import Client from './pages/layouts/Client'
import Notfound from './pages/NotFound'
import Dashboard from './components/Dasboard'
import ListProducts from './pages/ListProducts'
import Cart from './pages/Cart'
import Profile from './pages/Profile'
import Checkout from './pages/Checkout'
import Orders from './components/Orders'
import OrderForm from './components/OrderForm'
import CategoryForm from './components/CategoryForm'
import SearchPage from './pages/SearchPage'
import ForgotPassword from './pages/ForgotPassword'
import Users from './components/User'
import UserForm from './components/UserForm'

function App() {


  return (
    <>
      <Routes>

        <Route path='/admin' element={<Admin />}>
        <Route index element={<Dashboard />} />
          <Route path='/admin/products' element={<Products />} />
          <Route path='/admin/products-add' element={<ProductForm />} />
          <Route path='/admin/products-edit/:id' element={<ProductForm />} />
          <Route path='/admin/categories' element={<Categories />} />
          <Route path='/admin/categories-add' element={<CategoryForm />} />
          <Route path='/admin/orders' element={<Orders />} />
          <Route path='/admin/orders-edit/:id' element={<OrderForm />} />
          <Route path='/admin/categories-edit/:id' element={<CategoryForm />} />
          <Route path='/admin/users' element={<Users />} />
          <Route path='/admin/users-edit/:id' element={<UserForm />} />

        </Route>

        <Route path='/' element={<Client />}>
          <Route index element={<Home />} />
          <Route path='/register' element={<AuthForm />} />
          <Route path='/login' element={<AuthForm isLogin />} />
          <Route path='/product-detail/:id' element={<ProductDetail />} />
          <Route path='/products/category/:id' element={<ListProducts />} />
          <Route path='/products/category' element={<ListProducts />} />
          <Route path='/cart' element={<Cart />} />
          {/* <Route path='/profile' element={<Profile />} /> */}
          <Route path='/checkout' element={<Checkout />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>
        <Route path='*' element={<Notfound />} />

      </Routes>
      <ToastContainer position="bottom-right"autoClose={2000}/>
    </>
  )
}

export default App
