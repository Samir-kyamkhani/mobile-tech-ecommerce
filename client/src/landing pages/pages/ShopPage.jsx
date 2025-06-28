import { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Filter, X } from "lucide-react";
import ProductCard from "../components/ProductCard";
import { getAllProducts } from "../../redux/slices/productSlice";
import { getAllCategories } from "../../redux/slices/categorySlice";
import { useParams } from "react-router-dom";
import HeroSection from "../Sections/HeroSection";

const brands = ["All", "Apple", "Samsung", "Sony", "Nike"];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "priceLowHigh", label: "Price: Low to High" },
  { value: "priceHighLow", label: "Price: High to Low" },
];

const ShopPage = () => {
  const { id } = useParams();

  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [sortBy, setSortBy] = useState("featured");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = useSelector((state) => state.category?.categories || []);
  const products = useSelector((state) => state.product?.products || []);
  const categoryChanged = useSelector((state) => state.category?.changed);

  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      const parsedId = isNaN(Number(id)) ? id : Number(id);
      setSelectedCategory(parsedId);
    } else {
      setSelectedCategory(null);
    }
  }, [id]);

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCategories());
  }, [dispatch, categoryChanged]);

  const maxPrice = useMemo(() => {
    if (products.length === 0) return 200000;
    return Math.max(...products.map((p) => Number(p.price)));
  }, [products]);

  useEffect(() => {
    setPriceRange(([min, max]) => [min, max > maxPrice ? maxPrice : max]);
  }, [maxPrice]);

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
    setSelectedProduct(null);
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        const matchCategory = selectedCategory
          ? product.category?.id === selectedCategory ||
            product.categoryid === selectedCategory
          : true;

        const matchBrand =
          selectedBrand === "All" ? true : product.brand === selectedBrand;

        const price =
          typeof product.price === "string"
            ? Number(product.price)
            : product.price;

        const matchPrice = price >= priceRange[0] && price <= priceRange[1];

        return matchCategory && matchBrand && matchPrice;
      })
      .sort((a, b) => {
        const priceA = typeof a.price === "string" ? Number(a.price) : a.price;
        const priceB = typeof b.price === "string" ? Number(b.price) : b.price;

        switch (sortBy) {
          case "priceLowHigh":
            return priceA - priceB;
          case "priceHighLow":
            return priceB - priceA;
          default:
            return 0;
        }
      });
  }, [products, selectedCategory, selectedBrand, priceRange, sortBy]);

  const resetFilters = () => {
    setSelectedCategory(null);
    setSelectedBrand("All");
    setPriceRange([0, maxPrice]);
  };

  return (
    <div className="px-4 sm:px-6">
      <HeroSection />
      <div className="max-w-[90rem] mx-auto lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full lg:w-64 mb-4 lg:mb-0">
          <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 sticky top-20">
            {/* Header with toggle button */}
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                Filters
              </h3>
              <button
                className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition"
                onClick={() => setShowFilters(!showFilters)}
                aria-label="Toggle filters"
              >
                {showFilters ? <X size={20} /> : <Filter size={20} />}
              </button>
            </div>

            {/* Filter Content */}
            <div
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                showFilters
                  ? "max-h-screen opacity-100"
                  : "max-h-0 opacity-0 lg:max-h-full lg:opacity-100"
              } lg:block space-y-6`}
            >
              {/* Category Filter */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Category
                </h4>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {categories.map((cat) => (
                    <label
                      key={cat.id}
                      className="flex items-center text-sm cursor-pointer hover:text-blue-600"
                    >
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === cat.id}
                        onChange={() => setSelectedCategory(cat.id)}
                        className="text-blue-600"
                      />
                      <span className="ml-2">{cat.name}</span>
                      <span className="ml-auto text-xs text-gray-500">
                        (
                        {
                          products.filter(
                            (p) =>
                              p.category?.id === cat.id ||
                              p.categoryid === cat.id
                          ).length
                        }
                        )
                      </span>
                    </label>
                  ))}
                  <label className="flex items-center text-sm cursor-pointer hover:text-blue-600">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === null}
                      onChange={() => setSelectedCategory(null)}
                      className="text-blue-600"
                    />
                    <span className="ml-2">All</span>
                  </label>
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </h4>
                <div className="flex items-center space-x-2 mb-3">
                  <input
                    type="number"
                    min="0"
                    max={priceRange[1]}
                    value={priceRange[0]}
                    onChange={(e) => {
                      const val = Math.min(
                        Number(e.target.value),
                        priceRange[1]
                      );
                      setPriceRange([val >= 0 ? val : 0, priceRange[1]]);
                    }}
                    className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                  <span className="text-sm">-</span>
                  <input
                    type="number"
                    min={priceRange[0]}
                    max={maxPrice}
                    value={priceRange[1]}
                    onChange={(e) => {
                      const val = Math.max(
                        Number(e.target.value),
                        priceRange[0]
                      );
                      setPriceRange([
                        priceRange[0],
                        val <= maxPrice ? val : maxPrice,
                      ]);
                    }}
                    className="w-20 px-2 py-1 border border-gray-300 rounded text-sm"
                  />
                </div>
                <input
                  type="range"
                  min="0"
                  max={maxPrice}
                  value={priceRange[1]}
                  onChange={(e) =>
                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                  }
                  className="w-full"
                />
              </div>

              {/* Reset Button */}
              <button
                onClick={resetFilters}
                className="w-full mt-2 bg-red-500 hover:bg-red-600 text-white py-2 rounded transition"
              >
                Reset Filters
              </button>
            </div>
          </div>
        </aside>

        {/* Products Section */}
        <main className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <h2 className="text-2xl font-bold text-gray-800">Products</h2>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 text-sm">
                {filteredProducts.length} products
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
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
                  addToCart={addToCart}
                  onView={setSelectedProduct}
                  cart={cart}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ShopPage;
