import React, { useContext} from 'react';
import { NavLink } from "react-router-dom";
import { IoHomeOutline , IoBagAddOutline } from "react-icons/io5";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { GoComment } from "react-icons/go";
import { FiUsers } from "react-icons/fi";
import { TbDiscount  } from "react-icons/tb";
import { ThemeContext } from '../Context/ThemeContext';
import './Sidebar.css'

export default function Sidebar() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className={`sidebar ${theme}`}>
      <h2 className="sidebar-title"> به پنل داشبورد خوش آمدید</h2>
      <ul className="sidebar-list">
        <NavLink to="/">
          <IoHomeOutline className="icon" />
            صفحه اصلی
        </NavLink>
        <NavLink to="/Products">
          <MdOutlineProductionQuantityLimits className="icon"/>
            محصولات
        </NavLink>
        <NavLink to="/Comments">
          <GoComment className="icon"/>
            کامنت ها
        </NavLink>
        <NavLink to="/Users">
          <FiUsers className="icon"/>
            کاربران
        </NavLink>
        <NavLink to="/Orders">
          <IoBagAddOutline className="icon"/>
            سفارشات
        </NavLink>
        <NavLink to="/Discounts">
          <TbDiscount className="icon" />
            تخفیفات
        </NavLink>
      </ul>
    </div>
  )
}
