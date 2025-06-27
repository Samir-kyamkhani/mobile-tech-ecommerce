import { Menu, Search, ShoppingCart, X, User } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { getAllProducts } from "../../redux/slices/productSlice";

export default function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products || []);
  const { user } = useSelector((state) => state?.auth);
  const [count, setCount] = useState(0);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    const updateCount = () => {
      const storedItems = JSON.parse(localStorage.getItem("cart")) || [];
      setCount(storedItems.length);
    };
    updateCount();
    window.addEventListener("cartUpdated", updateCount);
    return () => window.removeEventListener("cartUpdated", updateCount);
  }, []);

  // Live filter logic
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredProducts([]);
    } else {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered.slice(0, 5)); // Limit to 5 suggestions
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
          <nav className="hidden md:flex space-x-8">
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
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                `${
                  isActive ? "text-blue-600" : "text-gray-700"
                } hover:text-blue-600`
              }
            >
              Shop
            </NavLink>
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
                <div className="absolute bg-white shadow-lg mt-1 rounded-lg w-full z-50">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSelectProduct(product.id)}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {product.name}
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
            {/* ✅ Mobile Search Bar */}
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

              {/* ✅ Mobile Live Search Dropdown */}
              {filteredProducts.length > 0 && (
                <div className="absolute bg-white shadow-lg mt-1 rounded-lg w-full z-50 max-h-60 overflow-y-auto">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => {
                        handleSelectProduct(product.id);
                        setShowMobileMenu(false); // Close menu after selecting
                      }}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {product.name}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation Links */}
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

            {/* Profile or Login */}
            {user ? (
              <NavLink
                to="/profile"
                onClick={() => setShowMobileMenu(false)}
                className="w-full flex items-center space-x-2 py-3 px-4 text-gray-700 hover:text-blue-600"
              >
                <User className="w-8 h-8 p-1 text-white bg-gray-700 rounded-full" />
                <span>Profile</span>
              </NavLink>
            ) : (
              <NavLink
                to="/login"
                onClick={() => setShowMobileMenu(false)}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 flex items-center justify-center"
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
