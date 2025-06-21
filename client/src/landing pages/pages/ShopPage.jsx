import React, { useState, useMemo } from "react";
import { Filter, X } from "lucide-react";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";

const categories = [
  { id: "electronics", name: "Electronics", count: 15 },
  { id: "clothing", name: "Clothing", count: 10 },
  { id: "books", name: "Books", count: 8 },
];

const brands = ["All", "Apple", "Samsung", "Sony", "Nike"];

const allProducts = [
  {
    id: 1,
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    price: 1199,
    originalPrice: 1299,
    category: "smartphones",
    image: "https://m.media-amazon.com/images/I/81dT7CUY6GL.jpg",
    rating: 4.8,
    reviews: 234,
    inStock: true,
    features: [
      '6.7" Super Retina XDR',
      "A17 Pro chip",
      "256GB storage",
      "48MP camera system",
    ],
  },
  {
    id: 2,
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    price: 1099,
    category: "smartphones",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400",
    rating: 4.7,
    reviews: 189,
    inStock: true,
    features: [
      '6.8" Dynamic AMOLED',
      "Snapdragon 8 Gen 3",
      "512GB storage",
      "S Pen included",
    ],
  },
  {
    id: 3,
    name: "Premium Leather Case",
    brand: "Apple",
    price: 59,
    category: "cases",
    image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400",
    rating: 4.5,
    reviews: 67,
    inStock: true,
    features: [
      "Genuine leather",
      "Perfect fit",
      "Multiple colors",
      "Drop protection",
    ],
  },
  // ... add more products as needed
];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "priceLowHigh", label: "Price: Low to High" },
  { value: "priceHighLow", label: "Price: High to Low" },
];

const ShopPage = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [sortBy, setSortBy] = useState("featured");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);

  const handleBuy = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setSelectedProduct(null);
  };

  const filteredProducts = useMemo(() => {
    let products = allProducts.filter((product) => {
      const matchCategory = selectedCategory
        ? product.category === selectedCategory
        : true;
      const matchBrand =
        selectedBrand === "All" ? true : product.brand === selectedBrand;
      const matchPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchCategory && matchBrand && matchPrice;
    });

    switch (sortBy) {
      case "priceLowHigh":
        products.sort((a, b) => a.price - b.price);
        break;
      case "priceHighLow":
        products.sort((a, b) => b.price - a.price);
        break;
      default:
        // featured or default sorting logic if any
        break;
    }

    return products;
  }, [selectedCategory, selectedBrand, priceRange, sortBy]);

  const resetFilters = () => {
    setSelectedCategory(null);
    setSelectedBrand("All");
    setPriceRange([0, 2000]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-64">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button
                className="lg:hidden p-1 rounded-md hover:bg-gray-100"
                onClick={() => setShowFilters(!showFilters)}
                aria-label="Toggle filters"
              >
                {showFilters ? <X size={20} /> : <Filter size={20} />}
              </button>
            </div>

            <div
              className={`${
                showFilters ? "block" : "hidden lg:block"
              } space-y-6`}
            >
              {/* Categories */}
              <div>
                <h4 className="font-medium mb-3">Category</h4>
                <div className="space-y-2 max-h-40 overflow-auto">
                  {categories.map((category) => (
                    <label
                      key={category.id}
                      className="flex items-center cursor-pointer hover:text-blue-600"
                    >
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === category.id}
                        onChange={() => setSelectedCategory(category.id)}
                        className="text-blue-600"
                      />
                      <span className="ml-2 text-sm">{category.name}</span>
                      <span className="ml-auto text-xs text-gray-500">
                        ({category.count})
                      </span>
                    </label>
                  ))}
                  <label className="flex items-center cursor-pointer hover:text-blue-600">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === null}
                      onChange={() => setSelectedCategory(null)}
                      className="text-blue-600"
                    />
                    <span className="ml-2 text-sm">All</span>
                  </label>
                </div>
              </div>

              {/* Brand */}
              <div>
                <h4 className="font-medium mb-3">Brand</h4>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg hover:border-blue-500"
                >
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="font-medium mb-3">Price Range</h4>
                <div className="flex items-center space-x-2 mb-2">
                  <input
                    type="number"
                    min="0"
                    max={priceRange[1]}
                    value={priceRange[0]}
                    onChange={(e) => {
                      let val = Math.min(Number(e.target.value), priceRange[1]);
                      setPriceRange([val >= 0 ? val : 0, priceRange[1]]);
                    }}
                    className="w-20 p-1 border border-gray-300 rounded"
                  />
                  <span>-</span>
                  <input
                    type="number"
                    min={priceRange[0]}
                    max="2000"
                    value={priceRange[1]}
                    onChange={(e) => {
                      let val = Math.max(Number(e.target.value), priceRange[0]);
                      setPriceRange([priceRange[0], val <= 2000 ? val : 2000]);
                    }}
                    className="w-20 p-1 border border-gray-300 rounded"
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max="2000"
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="w-full"
                />
              </div>

              {/* Reset Filters */}
              <button
                onClick={resetFilters}
                className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
            <h2 className="text-2xl font-bold">Products</h2>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">
                {filteredProducts.length} products
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2"
                aria-label="Sort products"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <p className="text-center text-gray-500 mt-10">
              No products found.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  showAddToCart
                  onView={setSelectedProduct} // Open modal on product click
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onBuy={handleBuy}
      />
    </div>
  );
};

export default ShopPage;
