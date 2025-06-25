import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleShopNowClick = () => {
    if (pathname === "/shop") {
      navigate("/"); // Go home if already on shop
    } else {
      navigate("/shop"); // Go to shop otherwise
    }
  };

  return (
    <section className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Latest Mobile Tech
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Discover cutting-edge smartphones and premium accessories
          </p>
          <button
            onClick={handleShopNowClick}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-200"
          >
            {pathname === "/shop" ? "Home" : "Shop Now"}
          </button>
        </div>
      </div>
    </section>
  );
}
