import axios from "axios";
import React, { useEffect, useState } from "react";

const Order = () => {
  const [orders, setOrder] = useState([]);

  useEffect(() => {
    const handleOrder = async () => {
      const userString = localStorage.getItem("user");
      if (!userString) {
        return console.log("user not found in local storage");
      }
      if (userString) {
        const userID = JSON.parse(userString)._id;

        try {
          const res = await axios.post(
            "https://shopecombackend-6e34.onrender.com/purchase/user",
            {
              userID,
            }
          );
          console.log(res.data);
          setOrder(res.data.orders);
        } catch (err) {
          console.error("Error fetching orders:", err);
        }
      }
    };
    handleOrder();
  }, []);
  if (!Array.isArray(orders) || orders.length === 0) {
    return (
      <div className="text-center text-gray-500 text-xl py-10">
        No item purchased
      </div>
    );
  }

  return (
    <div className="pt-10 px-5 md:px-20 bg-[#f9f9f9] min-h-screen">
      <h2 className="text-3xl font-bold mb-8 text-center">Order History</h2>

      {orders.length === 0 ? (
        <div className="text-center text-gray-500">No orders found.</div>
      ) : (
        <div className="space-y-6">
          {orders.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-md  p-5 flex flex-col md:flex-row gap-5"
            >
              <div className="w-full md:w-[150px] h-[150px] flex-shrink-0">
                <img
                  src={item.productID.media}
                  alt="product"
                  className="w-full h-full object-cover "
                />
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-sm text-gray-500 mb-1">
                    Category: {item.productID.category}
                  </p>
                  <h3 className="text-xl font-semibold mb-1">
                    {item.productID.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Size: {item.productID.size} | Qty: {item.quantity}
                  </p>
                  <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full w-fit">
                    Delivered
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm text-gray-400">
                    #OrderNo: {item._id}
                  </div>
                  <button className="px-4 py-2 bg-orange-500 text-white  font-medium hover:bg-orange-600 transition transform hover:scale-105">
                    Buy Again
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;
