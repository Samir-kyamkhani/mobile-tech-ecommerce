import { Menu, Search, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                (isActive ? "text-blue-600" : "text-gray-700") +
                " hover:text-blue-600"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/shop"
              className={({ isActive }) =>
                (isActive ? "text-blue-600" : "text-gray-700") +
                " hover:text-blue-600"
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/support"
              className={({ isActive }) =>
                (isActive ? "text-blue-600" : "text-gray-700") +
                " hover:text-blue-600"
              }
            >
              Support
            </NavLink>
          </nav>

          {/* Right-side buttons */}
          <div className="flex items-center space-x-4">
            {/* Desktop Search */}
            <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2">
              <Search size={20} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search products..."
                className="bg-transparent border-none outline-none w-64"
              />
            </div>
            <button
              className="p-2 text-gray-700 hover:text-blue-600"
              onClick={() => navigate("/checkout")}
            >
              <ShoppingCart size={24} />
            </button>
            {/* Desktop Gradient Login Button */}
            <NavLink
              to="/login"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 focus:ring-4  transition-all duration-200 flex items-center justify-center group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Login
            </NavLink>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-2 space-y-2">
            {/* Mobile Search */}
            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 mb-4">
              <Search size={20} className="text-gray-400 mr-2" />
              <input
                type="text"
                placeholder="Search products..."
                className="bg-transparent border-none outline-none w-full"
              />
            </div>
            {/* Mobile Navigation Links */}
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
            {/* Mobile Gradient Login Button */}
            <NavLink
              to="/login"
              onClick={() => setShowMobileMenu(false)}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 focus:ring-4 transition-all duration-200 flex items-center justify-center group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              Login
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}
