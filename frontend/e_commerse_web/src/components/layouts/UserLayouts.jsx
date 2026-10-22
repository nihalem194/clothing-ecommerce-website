import Footer from '../Common/Footer/Footer'
import Header from '../Common/Header/Header'
import { Outlet } from 'react-router-dom'

const UserLayouts = () => {
  return (
    <>
        <Header classname="border-b border-gray-50" />
            <Outlet />
        <Footer />
    
    </>
  )
}

export default UserLayouts
