import { NavLink } from 'react-router-dom'

import st from './Header.module.scss'

const Header = () => {
   return (
      <div className={st.header}>
         <NavLink className={({ isActive }) => (isActive ? st.active : '')} to={'/converter'}>
            Converter
         </NavLink>
         <NavLink className={({ isActive }) => (isActive ? st.active : '')} to={'/list'}>
            Currencies list
         </NavLink>
      </div>
   )
}

export default Header
