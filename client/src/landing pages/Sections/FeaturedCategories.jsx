import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllCategories } from "../../redux/slices/categorySlice";
import { Link } from "react-router-dom";

export default function FeaturedCategories() {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = useSelector((state) => state.category?.categories || []);
  const categoryChanged = useSelector((state) => state.category?.changed);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch, categoryChanged]);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-100 to-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <h3 className="text-4xl font-extrabold text-center mb-16 text-gray-900 tracking-tight">
          Shop by Category
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {categories
            .filter((cat) => cat.id !== "all")
            .map((category) => {
              const isSelected = selectedCategory === category.id;
              return (
                <Link to={`/shop/${category.id}`} key={category.id}>
                  <div
                    onClick={() => setSelectedCategory(category.id)}
                    className={`bg-white rounded-2xl p-8 shadow-lg cursor-pointer transform transition-transform duration-300
                      hover:shadow-xl hover:-translate-y-1
                      flex flex-col items-center text-center
                      ${
                        isSelected
                          ? "ring-4 ring-blue-500 bg-gradient-to-br from-blue-50 to-white"
                          : ""
                      }`}
                  >
                    <div
                      className={`w-24 h-24 rounded-full overflow-hidden mb-6 flex items-center justify-center 
                        transition-transform duration-300
                        ${isSelected ? "scale-110" : "group-hover:scale-105"}`}
                    >
                      <img
                        src={`${import.meta.env.VITE_API_BASE_URL_For_Image}${
                          category.image
                        }`}
                        alt={category.name || "Category"}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">
                      {category.name}
                    </h4>
                    <span className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full">
                      {category.count} products
                    </span>
                  </div>
                </Link>
              );
            })}
        </div>
      </div>
    </section>
  );
}
