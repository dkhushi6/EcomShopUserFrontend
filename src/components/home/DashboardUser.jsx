import React from "react";
import ImgSlidTop from "./ImgSlidTop";
import NewProducts from "./NewProducts";

const DashboardUser = () => {
  return (
    <div className=" mt-0 ">
      {" "}
      <ImgSlidTop />
      <div></div>
      <div className="px-5 pt-3">
        <div className="text-[30px] flex justify-center font-semibold px-8">
          Newest Products
        </div>
        <div>
          {" "}
          <NewProducts />
        </div>
      </div>
    </div>
  );
};

export default DashboardUser;
