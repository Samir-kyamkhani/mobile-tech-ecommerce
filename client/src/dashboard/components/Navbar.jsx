import { Bell, Menu, Search, User, X } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <nav className="bg-white border-b border-gray-200 fixed w-full z-30 top-0">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start">
            <button
              onClick={toggleSidebar}
              className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            >
              {isSidebarOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
            <Link to="/dashboard" className="flex ml-2 md:mr-24">
              <span className="self-center capitalize text-xl font-semibold sm:text-2xl whitespace-nowrap text-gray-900">
                Admin Panel
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {/* Search */}
            {/* <div className="relative hidden md:block">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-4 h-4 text-gray-500" />
              </div>
              <input
                type="text"
                className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Search..."
              />
            </div> */}

            {/* Notifications */}
            {/* <button className="relative p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 inline-block w-3 h-3 bg-red-600 border-2 border-white rounded-full"></span>
            </button> */}

            {/* settings */}
            <Link to="/settings">
              <button className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300">
                <User className="w-8 h-8 p-1 text-white" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
