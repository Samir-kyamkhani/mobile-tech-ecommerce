import React from "react";
import HeroSection from "../Sections/HeroSection";
import FeaturedCategories from "../Sections/FeaturedCategories";
import FeaturedProducts from "../Sections/FeaturedProducts";
import Features from "../Sections/Features";

const HomePage = () => {
  return (
    <div>
      <div className="px-4 sm:px-6">
        <HeroSection />
      </div>
      <FeaturedCategories />
      <FeaturedProducts />
      <Features />
    </div>
  );
};

export default HomePage;
