import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaStar, FaStarHalf, FaRegStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const DetailProduct = () => {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState({});
  const [productID, setPID] = useState("");
  const [userID, setUID] = useState("");

  useEffect(() => {
    const productString = localStorage.getItem("product");
    const userString = localStorage.getItem("user");

    if (productString) {
      const parsedProduct = JSON.parse(productString);
      setProduct(parsedProduct);
      setPID(parsedProduct._id);
    }

    if (userString) {
      const parsedUser = JSON.parse(userString);
      setUID(parsedUser._id);
    }
  }, []);

  const addToCart = async () => {
    const res = await axios.post("http://localhost:4010/cart", {
      productID,
      userID,
      quantity,
    });
    console.log(res.data);
    if (res.data.message === "item added to cart successfully ") {
      return alert("Item added to the cart successfully!");
    } else return alert("user id not found");
  };

  const handlePurchase = async () => {
    const res = await axios.post("http://localhost:4010/purchase", {
      productID,
      userID,
      quantity,
    });
    console.log(res.data);
    if (res.data.message === "purchase successfully done") {
      return alert("Item purchased successfully!");
    } else return alert("user id not found");
  };

  const handleQuantityPlus = () => {
    setQuantity(quantity + 1);
  };
  const handleQuantityMinus = () => {
    setQuantity(quantity - 1);
  };
  const navigate = useNavigate();
  return (
    <div className="flex  justify-center items-center pt-10 h-screen  ">
      <div className="flex  justify-center items-center gap-4">
        <div>
          <img
            src={product.media}
            alt={product.title}
            className="h-[500px] w-[500px] rounded-lg"
          />
        </div>
        <div>
          <div>
            {" "}
            <div className="text-[15px] font-light text-[#24251F]">
              {product.category}
            </div>
            <div className="text-[35px] font-bold text-[#24251F]">
              {product.title}
            </div>
            <div className="text-[#24251F] font-light text-[15px]">
              {product._id}
            </div>
            <div className="flex justify-between items-center">
              {" "}
              <div className="text-[30px] font-semibold text-orange-500">
                ${product.price}
              </div>
              <div className="flex gap-1">
                <div className="flex gap-1">
                  <FaStar className="text-[20px] text-[#E3C01C]" />
                  <FaStar className="text-[20px] text-[#E3C01C]" />
                  <FaStarHalf className="text-[20px] text-[#E3C01C]" />
                </div>
                <div className="font-light">(reviews:00)</div>
              </div>
            </div>
            <div className="flex text-[#24251F]">
              <div>Color:</div>
              <div className="font-semibold"> {product.color}</div>{" "}
            </div>
            <div className="flex text-[18px] text-[#24251F]">
              <div>Size:</div>
              <div className="font-semibold"> {product.size}</div>{" "}
            </div>
            <div className="text-[20px] font-light text-[#24251F]">
              {product.description}
            </div>
          </div>
          <div className=" flex  gap-3 py-2">
            <div className="flex items-center  ">
              <button
                onClick={handleQuantityMinus}
                className="text-[25px] hover:text-orange-500  px-2 bg-[#EEEEEE] hover:bg-[#cfcece] h-[40px]  rounded-l-full "
              >
                -
              </button>
              <div className="text-[20px] bg-[#EEEEEE] px-2 h-[40px] flex items-center">
                {quantity}
              </div>
              <button
                onClick={handleQuantityPlus}
                className="text-[25px] hover:text-orange-500  px-2  bg-[#EEEEEE] hover:bg-[#cfcece] h-[40px] rounded-r-full"
              >
                +
              </button>
            </div>
            <div
              className="px-3 py-2  rounded-lg w-full flex justify-center bg-[#D2C69E] hover:bg-[#b6aa85] text-white "
              onClick={addToCart}
            >
              Add to cart
            </div>
          </div>
          <div
            className="px-3 py-2 border  w-full flex justify-center rounded-lg bg-orange-500 text-white   transition duration-300 
             hover:bg-gradient-to-r hover:from-orange-500 hover:to-yellow-500 hover:shadow-orange-500/50 hover:shadow-md cursor-pointer hover:scale-105  "
            onClick={handlePurchase}
          >
            Buy now
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;
