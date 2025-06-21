import React, { useState } from "react";
import {
  Smartphone,
  Phone,
  BatteryCharging,
  Headphones,
  Usb,
} from "lucide-react";

const categories = [
  { id: "all", name: "All Products", count: 24, icon: Phone },
  { id: "smartphones", name: "Smartphones", count: 12, icon: Smartphone },
  { id: "cases", name: "Phone Cases", count: 8, icon: Phone },
  { id: "chargers", name: "Chargers", count: 6, icon: BatteryCharging },
  { id: "headphones", name: "Headphones", count: 4, icon: Headphones },
  { id: "accessories", name: "Accessories", count: 8, icon: Usb },
];

export default function FeaturedCategories() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="text-3xl font-bold text-center mb-12">Shop by Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories
            .filter((cat) => cat.id !== "all") // exclude "all"
            .map((category) => {
              const Icon = category.icon;
              return (
                <div
                  key={category.id}
                  className={`bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer group ${
                    selectedCategory === category.id ? "ring-2 ring-blue-600" : ""
                  }`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{category.name}</h4>
                  <p className="text-gray-600 text-sm">{category.count} products</p>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
