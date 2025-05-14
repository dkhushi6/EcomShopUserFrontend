import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const Shop = () => {
  const [category, setCategory] = useState("all");
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await axios.post("http://localhost:4010/product/category", {
          category,
        });
        setProducts(res.data.catProduct);
        console.log(res.data.catProduct);
      } catch (err) {
        console.error("Error fetching category:", err);
      }
    };

    if (category) fetchCategory();
  }, [category]);
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex gap-4 cursor-pointer justify-end text-[18px] pt-4 px-8 font-semibold">
        <button
          className="hover:underline focus:underline focus:text-orange-500 "
          onClick={() => {
            setCategory("all");
          }}
        >
          All products
        </button>
        <button
          className="hover:underline focus:underline focus:text-orange-500 "
          onClick={() => {
            setCategory("Women");
          }}
        >
          Women
        </button>
        <button
          className="hover:underline focus:underline focus:text-orange-500 "
          onClick={() => {
            setCategory("Men");
          }}
        >
          Men
        </button>
        <button
          className="hover:underline focus:underline focus:text-orange-500 "
          onClick={() => {
            setCategory("Bag");
          }}
        >
          Bags
        </button>
        <button
          className="hover:underline focus:underline focus:text-orange-500 "
          onClick={() => {
            setCategory("Watch");
          }}
        >
          Watches
        </button>
        <button
          className="hover:underline focus:underline focus:text-orange-500 "
          onClick={() => {
            setCategory("Shoes");
          }}
        >
          Shoes
        </button>
      </div>
      <div className=" px-18 mt-4 py-5 ">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-md  border border-[#D2C69E] hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <div className="h-50 w-full flex items-center justify-center overflow-hidden rounded-lg relative ">
                <img
                  src={product.media}
                  alt={product.title}
                  className=" w-full object-contain  transition-transform duration-300 hover:scale-105"
                />
                {product.inStock === true ? (
                  <div> </div>
                ) : (
                  <button className="absolute font-semibold rounded-lg px-2 py-1 bg-[#24251F] text-[#D2C69E]  top-2 left-2">
                    {" "}
                    out of stock{" "}
                  </button>
                )}
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
                  <div className="flex gap-2 justify-center font-semibold items-baseline">
                    <div className="text-[16px] text-[#CA1515] ">
                      ${product.discountprice}
                    </div>
                    <div className="text-[#B1B0B0] text-[14px] line-through">
                      {" "}
                      $ {product.price}
                    </div>
                  </div>
                ) : (
                  <p className="text-[16px] font-semibold   flex justify-center">
                    $ {product.price}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
