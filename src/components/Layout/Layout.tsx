import { Outlet } from 'react-router-dom'

import Header from '../Header/Header'
import st from './Layout.module.scss'
const Layout = () => {
   return (
      <div className={st.layout}>
         <div className={st.shadow}>
            <Header />
            <Outlet />
         </div>
      </div>
   )
}

export default Layout
