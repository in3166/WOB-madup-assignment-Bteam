import { Outlet } from 'react-router-dom'

import Header from 'routes/_shared/Header'
import LNB from 'routes/_shared/LNB'

const Layout = () => {
  return (
    <div>
      <LNB />
      <Header />
      <Outlet />
    </div>
  )
}

export default Layout
