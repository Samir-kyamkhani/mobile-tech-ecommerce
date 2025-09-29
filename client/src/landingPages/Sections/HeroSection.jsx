import React, { useState, useEffect } from "react";
import {
  ArrowRight,
  Smartphone,
  Watch,
  Headphones,
  ShoppingBag,
  Star,
  Zap,
  TrendingUp,
  Play,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      title: "iPhone 15 Pro Max",
      subtitle: "Experience the future with titanium design",
      description: "Starting from ₹99,499 with free shipping",
      image: "https://m.media-amazon.com/images/I/81SigpJN1KL._SX679_.jpg",
      icon: <Smartphone className="w-6 h-6" />,
      price: "₹99,499",
      originalPrice: "₹159,499",
      badge: "New Launch",
      category: "Smartphones",
      rating: 4.9,
      reviews: "2.3k",
      // colors: ["#1f2937", "#ef4444", "#3b82f6", "#f59e0b"],
      features: ["A17 Pro Chip", "48MP Camera", "Titanium Build"],
    },
    {
      id: 2,
      title: "Apple Watch Ultra 2",
      subtitle: "Built for adventure, designed to endure",
      description: "Up to 72 hours of battery life",
      image:
        "https://m.media-amazon.com/images/I/81h-tgpSt+L._SX679_.jpg",
      icon: <Watch className="w-6 h-6" />,
      price: "₹59,999",
      originalPrice: "₹69,999",
      badge: "Best Seller",
      category: "Smartwatches",
      rating: 4.8,
      reviews: "1.8k",
      // colors: ["#374151", "#dc2626", "#059669"],
      features: ["S9 Chip", "Double Tap", "Cellular"],
    },
    {
      id: 3,
      title: "AirPods Pro 2nd Gen",
      subtitle: "Immerse yourself in pure sound",
      description: "Active Noise Cancellation redefined",
      image:
        "https://m.media-amazon.com/images/I/61sRKTAfrhL._SX679_.jpg",
      icon: <Headphones className="w-6 h-6" />,
      price: "₹15,999.00",
      originalPrice: "₹18,999.00",
      badge: "Limited Offer",
      category: "Audio",
      rating: 4.7,
      reviews: "3.1k",
      // colors: ["#ffffff", "#1f2937"],
      features: ["H2 Chip", "Spatial Audio", "MagSafe Case"],
    },
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length, isAutoPlaying]);

  const currentSlideData = slides[currentSlide];

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const location = useLocation();

  const path = location.pathname;

  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden w-full" id="home">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 -right-40 w-80 h-80 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 -left-40 w-80 h-80 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="relative  px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-[60%_60%] gap-8 lg:gap-x-16 items-center min-h-[600px] lg:min-h-[700px] py-12 lg:py-20">
          {/* Left Content */}
          <div className="space-y-8 text-center lg:text-left order-2 lg:order-2">
            {/* Category Badge */}
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 shadow-md border">
                {currentSlideData.icon}
                <span className="text-sm font-medium text-gray-700">
                  {currentSlideData.category}
                </span>
              </div>
              <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                {currentSlideData.badge}
              </div>
            </div>

            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-lg sm:text-2xl lg:text-4xl font-bold text-gray-900 leading-tight">
                {currentSlideData.title}
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 font-medium">
                {currentSlideData.subtitle}
              </p>
              <p className="text-md text-gray-500">
                {currentSlideData.description}
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              {currentSlideData.features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-white rounded-lg px-3 py-2 shadow-sm border"
                >
                  <Zap className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-700">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* Rating and Reviews */}
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(currentSlideData.rating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-lg font-semibold text-gray-900">
                  {currentSlideData.rating}
                </span>
              </div>
              <div className="flex items-center gap-1 text-gray-500">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm">
                  ({currentSlideData.reviews} reviews)
                </span>
              </div>
            </div>

            {/* Price and Colors */}
            <div className="space-y-4">
              <div className="flex items-center justify-center lg:justify-start gap-3">
                <span className="text-3xl font-bold text-gray-900">
                  {currentSlideData.price}
                </span>
                <span className="text-xl text-gray-500 line-through">
                  {currentSlideData.originalPrice}
                </span>
                <span className="bg-green-100 text-green-800 text-sm font-medium px-2 py-1 rounded">
                  Save{" "}
                  {(
                    ((parseInt(
                      currentSlideData.originalPrice.replace("$", "")
                    ) -
                      parseInt(currentSlideData.price.replace("$", ""))) /
                      parseInt(
                        currentSlideData.originalPrice.replace("$", "")
                      )) *
                    100
                  ).toFixed(0)}
                  %
                </span>
              </div>

              {/* Color Options */}
              <div className="flex items-center justify-center lg:justify-start gap-3">
                {/* <span className="text-sm font-medium text-gray-700">
                  Colors:
                </span> */}
                <div className="flex gap-2">
                  {currentSlideData.colors?.map((color, index) => (
                    <button
                      key={index}
                      className="w-8 h-8 rounded-full border-2 border-gray-200 hover:border-gray-400 transition-colors"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {path === "/" ? (
                <HashLink
                  to="/shop#shop"
                  className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:from-blue-700 hover:to-purple-700 inline-block"
                >
                  <span className="flex items-center justify-center gap-2">
                    <ShoppingBag className="w-5 h-5" />
                    Shop Now
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </HashLink>
              ) : (
                <HashLink
                  to="/#home"
                  className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:from-blue-700 hover:to-purple-700 inline-block"
                >
                  <span className="flex items-center justify-center gap-2">
                    <ShoppingBag className="w-5 h-5" />
                    Go To Home
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </HashLink>
              )}

              {/* <button className="bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-300">
    <span className="flex items-center justify-center gap-2">
      <Play className="w-5 h-5" />
      Watch Demo
    </span>
  </button> */}
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Free shipping</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>2-year warranty</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>30-day returns</span>
              </div>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="relative w-full">
            <div className="relative">
              {/* Main Image Container */}
              <div className=" relative overflow-hidden rounded-3xl bg-gradient-to-br from-gray-100 to-gray-200 shadow-2xl">
                <div className="w-[60rem  ] h-[40rem] transition-all duration-700 hover:scale-105">
                  <img
                    src={currentSlideData.image}
                    alt={currentSlideData.title}
                    className="w-full h-full object-contain"
                  />
                </div>

                {/* Image Overlay Effects */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

                {/* Floating Elements */}
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md rounded-xl p-3 shadow-lg">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-gray-700">
                      In Stock
                    </span>
                  </div>
                </div>
              </div>

              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all duration-300 hover:scale-110"
              >
                <ArrowRight className="w-5 h-5 text-gray-700 rotate-180" />
              </button>
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-md rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-all duration-300 hover:scale-110"
              >
                <ArrowRight className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center mt-8 gap-3">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  onClick={() => handleSlideChange(index)}
                  className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
                    index === currentSlide
                      ? "w-16 h-16 ring-2 ring-blue-500 ring-offset-2"
                      : "w-12 h-12 opacity-70 hover:opacity-100"
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={`Slide ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {index === currentSlide && (
                    <div className="absolute inset-0 bg-blue-500/20"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 py-12 border-t border-gray-200">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">50K+</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">4.9★</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
            <div className="text-gray-600">Customer Support</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">Free</div>
            <div className="text-gray-600">Shipping & Returns</div>
          </div>
        </div>
      </div>
    </section>
  );
}
