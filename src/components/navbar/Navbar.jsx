import React, { useEffect, useState } from "react";
import { BsHandbag } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { RxCountdownTimer } from "react-icons/rx";

const Navbar = () => {
  const [userId, setUID] = useState("");
  const [name, setName] = useState("");
  const [img, setImg] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUID(user._id);
      setName(user.name);
      setImg(user.userImg);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  return (
    <div className="relative">
      <div className="fixed top-0 left-0 w-full h-16 bg-white shadow-md z-50 flex items-center justify-between px-5 text-[#24251F] text-[20px] ">
        <NavLink to="/shop">S h o p</NavLink>

        <NavLink to="/" className="text-[30px] font-bold">
          B u y z y
        </NavLink>

        <div className="flex gap-5 items-center">
          <NavLink to="/order" className="hover:scale-105">
            <RxCountdownTimer className="text-[25px]" />
          </NavLink>
          <NavLink to="/cart" className="p-2 hover:scale-105 ">
            <BsHandbag className="text-[25px]" />
          </NavLink>

          <div className="relative group">
            <div className="flex gap-2 items-center cursor-pointer">
              <img
                src={img}
                alt="Profile"
                className="h-[40px] w-[40px] rounded-full border border-[#D2C69E] shadow-md"
              />
              <div className="text-[15px]">
                <div>{name}</div>
                <div className="text-[12px]">user</div>
              </div>
            </div>

            <div
              className="absolute top-full  w-30 bg-white text-black rounded-md shadow-lg 
                         opacity-0 invisible group-hover:opacity-100 group-hover:visible transition 
                         duration-300 z-10 p-3"
            >
              <div
                className="cursor-pointer hover:text-orange-600 text-[15px]"
                onClick={handleLogout}
              >
                Log Out
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
