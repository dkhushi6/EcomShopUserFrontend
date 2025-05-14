import React, { useState } from "react";
import gIcon from "../../assets/googleicon.png";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [phoneNumber, setPhoneNo] = useState("");
  const [userImg, setImg] = useState("");
  const [shippingAddress, setAddress] = useState("");
  const [userUsername, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    const res = await axios.post(
      "https://shopecombackend-6e34.onrender.com/user/signup",
      {
        name,
        email,
        password,
        phoneNumber,
        shippingAddress,
        userImg,
        userUsername,
      }
    );
    console.log(res.data);
    if (res.data.message === "user created successfully !!") {
      alert("account created succesfully");
      navigate("/login");
    } else {
      alert(res.data.message);
    }
  };

  return (
    <div className="flex justify-center pt-3 text-[#24251F] ">
      <div className="py-5 w-[500px]  border border-[#D2C69E]  shadow-md pb-5 ">
        <div className="flex justify-center text-2xl font-semibold text-[#24251F]">
          Sign up for an account!{" "}
        </div>
        <div className="p-2 flex justify-center gap-3">
          <div className="">
            <input
              type="text"
              placeholder="create username"
              className=" px-3 py-2    bg-[#f3eedd] focus:bg-white border border-[#D2C69E]  outline-none w-[200px]  "
              value={userUsername}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="">
            <input
              type="text"
              placeholder="enter full name"
              className=" px-3 py-2   bg-[#f3eedd] focus:bg-white border border-[#D2C69E]  outline-none w-[200px]  "
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div className="p-2 flex justify-center">
          <input
            type="text"
            placeholder="enter email"
            className=" px-3 py-2   bg-[#f3eedd] focus:bg-white border border-[#D2C69E]  outline-none w-[410px]  "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="p-2 flex justify-center">
          <input
            type="text"
            placeholder="enter phonenumber"
            className=" px-3 py-2   bg-[#f3eedd] focus:bg-white border border-[#D2C69E]  outline-none w-[410px]  "
            value={phoneNumber}
            onChange={(e) => setPhoneNo(e.target.value)}
          />
        </div>
        <div className="p-2 flex justify-center">
          <input
            type="text"
            placeholder="enter your image url"
            className=" px-3 py-2   bg-[#f3eedd] focus:bg-white border border-[#D2C69E]  outline-none w-[410px]  "
            value={userImg}
            onChange={(e) => setImg(e.target.value)}
          />
        </div>
        <div className="p-2 flex justify-center">
          <input
            type="text"
            placeholder="address"
            className=" px-3 py-2  bg-[#f3eedd] focus:bg-white border border-[#D2C69E]  outline-none w-[410px] "
            value={shippingAddress}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div className="p-2 flex justify-center">
          <input
            type="text"
            placeholder="password"
            className=" px-3 py-2  bg-[#f3eedd] focus:bg-white border border-[#D2C69E]  outline-none w-[410px] "
            value={password}
            onChange={(e) => setPass(e.target.value)}
          />
        </div>
        <div className="p-2 flex justify-center">
          <button
            className=" px-3 py-2  bg-orange-500 text-white   transition duration-300 
             hover:bg-gradient-to-r hover:from-orange-500 hover:to-yellow-500 hover:shadow-orange-500/50 hover:shadow-md cursor-pointer hover:scale-105 w-[410px] "
            onClick={handleSignup}
          >
            Create account{" "}
          </button>
        </div>
        <div className="flex items-center justify-center gap-2 ">
          <div className="w-[160px] border h-0  " />
          <div>or</div>
          <div className="w-[160px] border h-0" />
        </div>
        <div className="flex justify-center py-2">
          {" "}
          <div className="flex items-center gap-3 px-3 py-2   hover:bg-[#f3eedd] w-[410px] border border-[#D2C69E] justify-center text-[#24251F]">
            <img src={gIcon} alt="pic" className="h-5 w-5" />
            <div>Signin with Google</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
