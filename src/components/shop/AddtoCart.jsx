import React, { useEffect, useState } from "react";
import axios from "axios";
import { RiDeleteBin2Line } from "react-icons/ri";
import { CiHeart } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { IoIosInformationCircleOutline } from "react-icons/io";

const AddtoCart = () => {
  const [items, setCart] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCart = async () => {
      const userString = localStorage.getItem("user");
      if (!userString) {
        return console.log("user not found in local storage");
      }
      if (userString) {
        const userID = JSON.parse(userString)._id;

        const res = await axios.post("http://localhost:4010/cart/user", {
          userID,
        });
        console.log("res.data:", res.data);
        setCart(res.data.cartItems);
      }
    };
    fetchCart();
  }, []);

  const handlePurchaseAll = async () => {
    const userString = localStorage.getItem("user");
    if (!userString) {
      return alert("login first!!!");
    }
    let parsedUser;
    if (userString) {
      parsedUser = JSON.parse(userString);
    }

    if (!parsedUser?._id) {
      alert("User id not found");
      return;
    }

    try {
      for (let cartItem of items) {
        await axios.post("http://localhost:4010/purchase", {
          userID: parsedUser._id,
          productID: cartItem.productID._id,
          quantity: cartItem.quantity,
        });

        await axios.delete("http://localhost:4010/cart/delete", {
          data: { cartID: cartItem._id },
        });
      }

      alert("All items purchased successfully!");
      setCart([]);
    } catch (err) {
      console.error("Purchase error:", err);
      alert("Failed to purchase all items");
    }
  };

  const calculateSubtotal = () => {
    return items
      .reduce((acc, cartItem) => {
        const price =
          cartItem.productID.discountprice || cartItem.productID.price;
        return acc + price * cartItem.quantity;
      }, 0)
      .toFixed(2);
  };

  const handleQuantityChange = async (cartID, type) => {
    const cartItem = items.find((item) => item._id === cartID);
    if (!cartItem) return;

    const currentQuantity = cartItem.quantity;
    const newQuantity =
      type === "increase" ? currentQuantity + 1 : currentQuantity - 1;

    if (newQuantity < 1) return;

    try {
      await axios.post("http://localhost:4010/cart/changequantity", {
        cartID,
        newQuantity,
      });

      const updatedItems = items.map((item) =>
        item._id === cartID ? { ...item, quantity: newQuantity } : item
      );
      setCart(updatedItems);
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const handleDelete = async (cartID) => {
    try {
      const res = await axios.delete("http://localhost:4010/cart/delete", {
        data: { cartID },
      });
      console.log("Deleted:", res.data);

      const updatedCart = await axios.get("http://localhost:4010/cart/all");
      setCart(updatedCart.data.cartItems);
    } catch (error) {
      console.error("Error deleting cart item:", error);
    }
  };
  if (!Array.isArray(items) || items.length === 0) {
    return (
      <div className="text-center text-gray-500 text-xl py-10">
        Your cart is empty.
      </div>
    );
  }

  return (
    <div className="bg-[#EEEEEE] min-h-screen flex gap-5 justify-center px-20 py-10">
      <div className="w-[600px]">
        <div className="h-[70px] bg-white flex items-center text-[25px] font-bold px-5">
          My bag
        </div>

        <div className="gap-y-3 pt-3">
          {items.length === 0 ? (
            <div className="text-center text-gray-500 text-xl py-10">
              Your cart is empty.
            </div>
          ) : (
            items.map((cartItem) => (
              <div
                key={cartItem._id}
                className="bg-white flex justify-between gap-5 px-5 py-2 mb-3"
              >
                <div className="flex gap-2 items-center">
                  <div>
                    <img
                      src={cartItem.productID.media}
                      alt={cartItem.productID.title}
                      className="h-[200px]"
                    />
                  </div>
                  <div>
                    <div className="font-bold text-[25px]">
                      {cartItem.productID.discountprice ? (
                        <div className="flex gap-1 items-baseline">
                          <div className="text-[#CA1515]">
                            ${cartItem.productID.discountprice}
                          </div>
                          <div className="text-[16px] line-through text-[#B1B0B0]">
                            ${cartItem.productID.price}
                          </div>
                        </div>
                      ) : (
                        <div>${cartItem.productID.price}</div>
                      )}
                    </div>
                    <div className="flex justify-between gap-10 items-center">
                      <div>
                        <div
                          className="text-[20px] hover:underline cursor-pointer"
                          onClick={() => {
                            localStorage.setItem(
                              "product",
                              JSON.stringify(cartItem.productID)
                            );
                            navigate("/shop/product");
                          }}
                        >
                          {cartItem.productID.title}
                        </div>
                        <div className="flex gap-3 text-[15px] text-[#8d8c8c]">
                          <div>{cartItem.productID.color}</div>
                          <div>{cartItem.productID.size}</div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <button
                          onClick={() =>
                            handleQuantityChange(cartItem._id, "decrease")
                          }
                          className="text-[25px] hover:text-orange-500 px-2 bg-[#EEEEEE] hover:bg-[#cfcece] h-[40px] rounded-l-full"
                        >
                          -
                        </button>
                        <div className="text-[20px] bg-[#EEEEEE] px-2 h-[40px] flex items-center">
                          {cartItem.quantity}
                        </div>
                        <button
                          onClick={() =>
                            handleQuantityChange(cartItem._id, "increase")
                          }
                          className="text-[25px] hover:text-orange-500 px-2 bg-[#EEEEEE] hover:bg-[#cfcece] h-[40px] rounded-r-full"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="pt-5 flex gap-2 items-center">
                      <div className="text-[18px]">Total:</div>
                      <div className="font-bold">
                        $
                        {(
                          (cartItem.productID.discountprice ||
                            cartItem.productID.price) * cartItem.quantity
                        ).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="pt-5 flex gap-4">
                  <div className="hover:text-orange-500 hover:scale-105">
                    <CiHeart className="text-[25px]" />
                  </div>
                  <div
                    onClick={() => {
                      handleDelete(cartItem._id);
                    }}
                  >
                    <RiDeleteBin2Line className="text-[25px] hover:scale-105 hover:text-orange-500" />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="bg-white">
        <div className="w-[300px] px-5">
          <div className="text-[25px] font-bold h-[70px] items-center flex border-[#EEEEEE] border-b">
            Total
          </div>
          <div className="border-b border-[#EEEEEE] pb-5">
            <div className="flex justify-between pt-5">
              <div className="text-[18px] font-bold">Sub-total</div>
              <div className="flex text-[#CA1515] font-bold text-[25px] items-baseline">
                <div>$</div>
                <div>{calculateSubtotal()}</div>
              </div>
            </div>
            <div className="flex justify-between pt-5">
              <div className="font-bold text-[18px] flex flex-wrap w-[100px]">
                Shipping sales tax
              </div>
              <div>
                <IoIosInformationCircleOutline className="text-[20px]" />
              </div>
            </div>
          </div>

          <div
            className="px-3 py-2 border justify-center font-semibold flex mt-5 bg-orange-500 text-white transition duration-300 hover:bg-gradient-to-r hover:from-orange-500 hover:to-yellow-500 hover:shadow-orange-500/50 hover:shadow-md cursor-pointer hover:scale-105"
            onClick={handlePurchaseAll}
          >
            Checkout
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddtoCart;
