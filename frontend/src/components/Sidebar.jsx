import React from "react";
import { NavLink, Link } from "react-router-dom";
import { RiHome7Fill } from "react-icons/ri";

import logo from "../assets/logo.png";
import { categories } from "../utils/data";

const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";

const isActiveStyle =
  "flex items-center px-5 gap-3 font-bold border-r-2 border-black transition-all duration-200 ease-in-out capitalize";

function Sidebar({ user, closeToggle }) {
  function handleCloseSidebar() {
    if (closeToggle) closeToggle(false);
  }

  return (
    <div className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-210 hide-scrollbar">
      <div className="flex flex-col">
        <Link
          to="/"
          className="flex px-5 gap-2 my-3 pt-1 w-full items-center"
          onClick={handleCloseSidebar}
        >
          <img src={logo} alt="logo" className="w-32" />
        </Link>
        <div className="flex flex-col gap-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <RiHome7Fill /> Home
          </NavLink>
          <h3 className="mt-2 px-5 text-base 2xl:text-xl">
            Discover Categories
          </h3>
          {categories.slice(0, categories.length).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              onClick={handleCloseSidebar}
              key={category.name}
            >
              <img
                src={category.image}
                className="w-8 h-8 rounded-full shadow-sm"
                alt="category"
              />
              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user._id}`}
          className="flex my-5 mb-3 gap-2 p-2 items-center bg-white rounded-lg shadow-lg mx-3"
          onClick={handleCloseSidebar}
        ></Link>
      )}
    </div>
  );
}

export default Sidebar;
