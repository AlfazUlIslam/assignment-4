import React from "react";
import { Link } from "react-router";
import NavLink from "./NavLink/NavLink";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";


const Nav: React.FC = () => {
  const [toggle, setToggle] = React.useState(false);

  const handleToggle = () => {
    setToggle(prev => !prev);
  };

  return (
    // Nav
    <nav className="bg-black text-white">
      {/* Nav container */}
      <div className="flex justify-start items-center py-2 px-6 md:px-20">
        {/* Nav logo */}
        <div className="font-bold text-[40px]">
          <Link to={"/"}>LOGO</Link>
        </div>
        {/* Nav menu */}
        <ul className="w-full justify-center items-center gap-[20px] 
        font-semibold hidden md:flex">
          <NavLink to={"/books"} content={"Books"} />
          <NavLink to={"/create-book"} content={"Add Book"} />
          <NavLink to={"/borrow-summary"} content={"Borrow Summary"} />
        </ul>
        {/* Nav mobile menu */}
        <div className="w-full relative flex justify-end items-center 
        md:hidden">
          {/* Nav mobile menu button */}
          <button className="text-3xl" onClick={handleToggle}>
            {toggle ? <RxCross1 /> : <RxHamburgerMenu />}
          </button>
          {/* Mobile menu */}
          {toggle && (
          <ul className="p-4 absolute right-[-20px] bottom-[-130px] 
          text-black list-none font-semibold rounded-xl bg-white shadow-xl 
          border border-slate-300">
            <NavLink to={"/books"} content={"Books"} />
            <NavLink to={"/create-book"} content={"Add Book"} />
            <NavLink to={"/borrow-summary"} content={"Borrow Summary"} />
          </ul>
          )}
        </div>
      </div>
    </nav>
  )
}
export default Nav