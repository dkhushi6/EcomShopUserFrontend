import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa6";

const NewProducts = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchNewPro = async () => {
      const res = await axios.get("http://localhost:4010/product/newlymade");
      setProducts(res.data.products);
    };
    fetchNewPro();
  }, []);
  const navigate = useNavigate();

  return (
    <div className=" p-8 mt-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-md  border border-[#D2C69E] hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <div className="h-50 w-full flex items-center justify-center overflow-hidden rounded-lg ">
              <img
                src={product.media}
                alt={product.title}
                className=" w-full object-contain  transition-transform duration-300 hover:scale-105"
              />
            </div>
            <div className="p-3">
              <h2
                className="text-[15px]  text-gray-800 mt-4 hover:underline flex justify-center"
                onClick={() => {
                  localStorage.setItem("product", JSON.stringify(product));
                  navigate("/shop/product");
                }}
              >
                {product.title}
              </h2>
              <div className="flex gap- justify-center py-1">
                <FaStar className="text-[13px] text-[#E3C01C]" />
                <FaStar className="text-[13px] text-[#E3C01C]" />
                <FaStar className="text-[13px] text-[#E3C01C]" />
                <FaStar className="text-[13px] text-[#E3C01C]" />
                <FaStar className="text-[13px] text-[#E3C01C]" />
                <FaStar className="text-[13px] text-[#E3C01C]" />
              </div>
              {product.discountprice ? (
                <div className="flex gap-2 justify-center items-baseline">
                  <div className="text-[18px] text-[#CA1515] ">
                    ${product.discountprice}
                  </div>
                  <div className="text-[#B1B0B0] text-[16px] line-through">
                    {" "}
                    $ {product.price}
                  </div>
                </div>
              ) : (
                <p className="text-[16px] font-semibold  mt-1 flex justify-center">
                  $ {product.price}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewProducts;
