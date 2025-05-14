import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const slides = [
  {
    image:
      "https://d1hjkbq40fs2x4.cloudfront.net/2021-03-02/files/03_-_SURROUNDINGS.jpg",
    gradient: "from-[#24251F] to-[#D2C69E]/40 ",
    quote: "Bold Looks for Bold Women",
  },
  {
    image:
      "https://caroseditorial.com/wp-content/uploads/2021/05/Black-male-model-fashion-photoshoot-9-thegem-blog-timeline-large.jpg",
    gradient: "from-[#24251F] to-[#D2C69E]/40 ",
    quote: "Crafted for the Modern Man",
  },
  {
    image:
      "https://justintime.in/cdn/shop/files/Mens_Watches_M_1500x.jpg?v=8590229654416472155",
    gradient: "from-[#24251F] to-[#D2C69E]/30 ",
    quote: "Smart Tech. Smarter Living",
  },
];

const ImgSlidTop = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentSlide = slides[currentIndex];

  // Auto-slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[522px] w-full  overflow-hidden">
      {/* Image + Gradient wrapper */}
      <div className="relative w-full h-full">
        <img
          src={currentSlide.image}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-all duration-1500 ease-in-out"
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t ${currentSlide.gradient}`}
        ></div>
      </div>

      {/* Centered Quote + Button */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
        <h1 className="text-[70px]  font-bold mb-4 max-w-2xl leading-snug">
          {currentSlide.quote}
        </h1>
        <NavLink
          to="/shop"
          className="mt-2 px-6 py-3 border-2 border-white  hover:text-[#24251F]  text-[30px] font-medium scale-3d hover:bg-white transition"
        >
          Shop Now
        </NavLink>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`rounded-full p-1 cursor-pointer ${
              index === currentIndex ? "border border-white" : ""
            }`}
          >
            <div
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-white" : "bg-white/50"
              }`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImgSlidTop;
