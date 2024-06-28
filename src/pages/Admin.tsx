import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

type Props = {}

const Admin = (props: Props) => {
  return (
    <>
    <Navbar/>
      <Outlet />
    </>
  )
}

export default Admin