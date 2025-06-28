import { Menu, Search, ShoppingCart, X, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { getAllProducts } from "../../redux/slices/productSlice";
import { getAllCategories } from "../../redux/slices/categorySlice"; // Import this if you use it

export default function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products || []);
  const { user } = useSelector((state) => state?.auth);
  const [count, setCount] = useState(0);

  // Use categories from Redux slice
  const categories = useSelector((state) => state.category?.categories || []);
  const categoryChanged = useSelector((state) => state.category?.changed);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch, categoryChanged]);

  useEffect(() => {
    const updateCount = () => {
      const storedItems = JSON.parse(localStorage.getItem("cart")) || [];
      setCount(storedItems.length);
    };
    updateCount();
    window.addEventListener("cartUpdated", updateCount);
    return () => window.removeEventListener("cartUpdated", updateCount);
  }, []);

  // Live search filter
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts([]);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered.slice(0, 5)); // limit to 5
    }
  }, [searchTerm, products]);

  const handleSelectProduct = (id) => {
    setSearchTerm("");
    setFilteredProducts([]);
    navigate(`/shop-product/${id}`);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 relative">
          <div className="flex items-center">
            <button
              className="md:hidden p-2"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
            <NavLink
              to="/"
              className="text-2xl font-bold text-blue-600 cursor-pointer ml-2 md:ml-0"
              onClick={() => setShowMobileMenu(false)}
            >
              MobileTech
            </NavLink>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-8 relative">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `${
                  isActive ? "text-blue-600" : "text-gray-700"
                } hover:text-blue-600`
              }
            >
              Home
            </NavLink>

            {/* Shop with hover dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setShowCategoryDropdown(true)}
              onMouseLeave={() => setShowCategoryDropdown(false)}
            >
              <NavLink
                to="/shop"
                className={({ isActive }) =>
                  `${
                    isActive ? "text-blue-600 " : "text-gray-700"
                  } hover:text-blue-600 cursor-pointer p-4`
                }
              >
                Shop
              </NavLink>

              {showCategoryDropdown && categories.length > 0 && (
                <div
                  className="absolute left-1/2 right-1/2 top-full mt-2 border border-gray-200 min-w-[50rem] max-w-[50rem] bg-white shadow-lg rounded-lg p-4 grid grid-cols-2 gap-4 z-50
               -translate-x-1/2"
                >
                  {categories.map((category) => (
                    <Link
                      to={`/shop/${category.id}`}
                      key={category.id}
                      className="cursor-pointer hover:bg-gray-100 p-2 rounded flex items-center space-x-2"
                    >
                      <img
                        src={`${import.meta.env.VITE_API_BASE_URL_For_Image}${
                          category.image
                        }`}
                        alt={category.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <span className="text-gray-700 font-medium">
                        {category.name}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <NavLink
              to="/support"
              className={({ isActive }) =>
                `${
                  isActive ? "text-blue-600" : "text-gray-700"
                } hover:text-blue-600`
              }
            >
              Support
            </NavLink>
          </nav>

          {/* Search + Cart + Login */}
          <div className="flex items-center space-x-4">
            {/* Desktop Search */}
            <div className="hidden md:block relative">
              <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
                <Search size={20} className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent border-none outline-none w-64"
                />
              </div>

              {/* Live Search Dropdown */}
              {filteredProducts.length > 0 && (
                <div className="absolute border overflow-hidden border-gray-300 bg-white shadow-lg mt-1 rounded-lg w-full z-50">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProduct(product.id)}
                      className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <img
                        src={`${import.meta.env.VITE_API_BASE_URL_For_Image}${
                          product.images[0].url
                        }`}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded mr-2"
                      />
                      <span>{product.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart */}
            <button
              className="p-2 text-gray-700 hover:text-blue-600"
              onClick={() => navigate("/checkout")}
            >
              <div className="relative">
                <ShoppingCart size={24} />
                {count > 0 && (
                  <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center ring-2 ring-white">
                    {count}
                  </div>
                )}
              </div>
            </button>

            {/* Login/Profile */}
            {user ? (
              <NavLink
                to={user.role === "Admin" ? "/dashboard" : "/profile"}
                className="p-2 text-gray-700 hover:text-blue-600"
              >
                <User className="w-8 h-8 p-1 text-white bg-gray-700 rounded-full" />
              </NavLink>
            ) : (
              <NavLink
                to="/login"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700"
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-2 space-y-2 relative">
            {/* Mobile Search */}
            <div className="relative">
              <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
                <Search size={20} className="text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-transparent border-none outline-none w-full"
                />
              </div>

              {/* Mobile Live Search Dropdown */}
              {filteredProducts.length > 0 && (
                <div className="absolute  border overflow-hidden border-gray-300 bg-white shadow-lg mt-1 rounded-lg w-full z-50">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProduct(product.id)}
                      className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      <img
                        src={`${import.meta.env.VITE_API_BASE_URL_For_Image}${
                          product.images[0].url
                        }`}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded mr-2"
                      />
                      <span>{product.name}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile nav links */}
            <NavLink
              to="/"
              end
              onClick={() => setShowMobileMenu(false)}
              className={({ isActive }) =>
                (isActive ? "text-blue-600" : "text-gray-700") +
                " block w-full text-left py-2 hover:text-blue-600"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/shop"
              onClick={() => setShowMobileMenu(false)}
              className={({ isActive }) =>
                (isActive ? "text-blue-600" : "text-gray-700") +
                " block w-full text-left py-2 hover:text-blue-600"
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/support"
              onClick={() => setShowMobileMenu(false)}
              className={({ isActive }) =>
                (isActive ? "text-blue-600" : "text-gray-700") +
                " block w-full text-left py-2 hover:text-blue-600"
              }
            >
              Support
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}
