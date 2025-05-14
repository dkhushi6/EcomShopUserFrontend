import React, { useState } from "react";
import gIcon from "../../assets/googleicon.png";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [info, setInfo] = useState("");
  const [password, setPass] = useState("");
  const [user, setUser] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    const res = await axios.post(
      "https://shopecombackend-6e34.onrender.com/user/login",
      {
        email: info.includes("@") ? info : undefined,
        phoneNumber: info.startsWith("+") ? info : undefined,
        userUsername:
          !info.includes("@") && !info.startsWith("+") ? info : undefined,
        password,
      }
    );
    if (res.data.message === "login successfull !!!!!!!!!!") {
      console.log(res.data.user);
      setUser(res.data.user);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      console.log("user", user);

      navigate("/");
    } else {
      alert(res.data.message);
    }
  };

  return (
    <div className="text-[#24251F]">
      <div className="flex justify-center text-[40px] font-bold pt-10 pb-5 ">
        {" "}
        B u y z y
      </div>
      <div className="flex justify-center   ">
        <div className="py-5 w-[400px]  border border-[#D2C69E]  shadow-md pb-10 ">
          <div className="flex justify-center text-2xl font-semibold text-[#24251F] pb-5">
            Login
          </div>
          <div className="p-2 flex justify-center">
            <input
              type="text"
              placeholder="Username , email , phonenumber"
              className=" px-3 py-2    bg-[#f3eedd] focus:bg-white border border-[#D2C69E]  outline-none w-[300px]  "
              value={info}
              onChange={(e) => setInfo(e.target.value)}
            />
          </div>
          <div className="p-2 flex justify-center">
            <input
              type="text"
              placeholder="password"
              className=" px-3 py-2    bg-[#f3eedd] focus:bg-white border border-[#D2C69E]  outline-none w-[300px] "
              value={password}
              onChange={(e) => setPass(e.target.value)}
            />
          </div>
          <div className="p-2 flex justify-center">
            <button
              className=" px-3 py-2  bg-orange-500 text-white   transition duration-300 
             hover:bg-gradient-to-r hover:from-orange-500 hover:to-yellow-500 hover:shadow-orange-500/50 hover:shadow-md cursor-pointer hover:scale-105 w-[300px] "
              onClick={handleLogin}
            >
              Log-In
            </button>
          </div>
          <div className="flex items-center justify-center gap-2 ">
            <div className="w-[130px] border h-0  " />
            <div>or</div>
            <div className="w-[130px] border h-0" />
          </div>
          <div className="flex justify-center py-2">
            {" "}
            <div className="flex items-center gap-3 px-3 py-2   hover:bg-[#f3eedd] w-[300px] border border-[#D2C69E] justify-center text-[#24251F]">
              <img src={gIcon} alt="pic" className="h-5 w-5" />
              <div>Signin with Google</div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center pt-3">
        <div className="py-5 w-[400px] ">
          <div className="flex gap-2 justify-center">
            {" "}
            <div>Don't have an account</div>
            <NavLink
              to="/signup"
              className="text-[18px] font-light hover:underline hover:text-[#F75D2D] "
            >
              Sign-Up
            </NavLink>
          </div>

          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
