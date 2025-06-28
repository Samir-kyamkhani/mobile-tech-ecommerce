import React, { useState, useEffect } from "react";
import { ArrowRight, Smartphone, Watch, Headphones } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: "Latest Mobile Tech",
      subtitle: "Discover cutting-edge smartphones and premium accessories",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=600&fit=crop&crop=center",
      icon: <Smartphone className="w-6 h-6" />,
    },
    {
      title: "Smart Gadgets Sale",
      subtitle: "Explore deals on smartwatches, earbuds, and more",
      image:
        "https://images.unsplash.com/photo-1434493907317-a46b5bbe7834?w=800&h=600&fit=crop&crop=center",
      icon: <Watch className="w-6 h-6" />,
    },
    {
      title: "Premium Audio",
      subtitle: "Experience crystal-clear sound with our headphone collection",
      image:
        "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&h=600&fit=crop&crop=center",
      icon: <Headphones className="w-6 h-6" />,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const currentSlideData = slides[currentSlide];

  const location = useLocation();

  const path = location.pathname;

  return (
    <section className="bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center h-[40rem] py-12 lg:py-0">
          {/* Left Content */}
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                {currentSlideData.icon}
              </div>
              <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                New Collection
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {currentSlideData.title}
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 mb-8 leading-relaxed max-w-lg">
              {currentSlideData.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              {path === "/" ? (
                <Link
                  to="/shop"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200"
                >
                  Shop Now
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              ) : (
                <Link
                  to="/"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200"
                >
                  Go to Home
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              )}
            </div>
          </div>

          {/* Right Image */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                <img
                  src={currentSlideData.image}
                  alt={currentSlideData.title}
                  className="w-full h-full max-h-[40rem] object-cover transition-opacity duration-500"
                />
              </div>

              {/* Small floating indicator */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-gray-700">
                    Available Now
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="flex justify-center pb-8 mt-8">
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-gray-900 w-8"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
