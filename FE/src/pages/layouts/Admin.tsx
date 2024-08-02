import { Outlet, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { toast } from 'react-toastify'
import Navbar from '../../components/Navbar'
import { AuthContext, AuthContextType } from '../../contexts/AuthContext'


const Admin = () => {
  const { user } = useContext(AuthContext) as AuthContextType
  const nav = useNavigate()
  if (!user || user?.role !== "admin") {
     toast.error("Tài khoản bạn không được cấp quyền!")
     nav('/login')
  }
  return (
    <div className="font-sans bg-gray-100 min-w-full  min-h-[720px]" >
      <Navbar />
      <Outlet/>
    </div>
  )
}

export default Admin