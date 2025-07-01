import {
  Home,
  Layers,
  Package,
  Settings,
  ShoppingCart,
  Users,
  X,
  LogOut,
  Notebook,
  ChartNoAxesCombined,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/slices/authSlice";

const Sidebar = ({ isOpen, closeSidebar }) => {
  const navigate = useNavigate();

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, path: "/dashboard" },
    { id: "ledger", label: "Ledger", icon: Notebook, path: "/ledger" },
    {
      id: "categories",
      label: "Categories",
      icon: Layers,
      path: "/categories",
    },
    { id: "products", label: "Products", icon: Package, path: "/products" },
    { id: "orders", label: "Orders", icon: ShoppingCart, path: "/orders" },
    { id: "customers", label: "Customers", icon: Users, path: "/customers" },
    { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
  ];

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      <aside
        className={`fixed top-0 left-0 z-50 w-64 h-screen transition-transform bg-white border-r border-gray-200 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-[17.2px] border-b border-gray-200 shadow-sm">
          <h1 className="text-lg font-bold text-gray-900 tracking-tight">
            Mobile<span className="text-blue-600"> Exommerce</span>
          </h1>
          <button
            onClick={closeSidebar}
            className="text-gray-500 hover:text-gray-700 focus:outline-none lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Sidebar content */}
        <div className="h-full flex flex-col bg-white">
          {/* Scrollable menu */}
          <div className="flex-1 overflow-y-auto px-2 pb-4 py-1">
            <ul className="space-y-2 font-medium mt-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `flex items-center w-full p-2 rounded-lg transition-colors group ${
                          isActive
                            ? "bg-gray-100 text-blue-600"
                            : "text-gray-900 hover:bg-gray-100"
                        }`
                      }
                      onClick={closeSidebar}
                    >
                      {({ isActive }) => (
                        <>
                          <Icon
                            className={`w-5 h-5 transition duration-75 ${
                              isActive
                                ? "text-blue-600"
                                : "text-gray-500 group-hover:text-gray-900"
                            }`}
                          />
                          <span className="ml-3 capitalize">{item.label}</span>
                        </>
                      )}
                    </NavLink>
                  </li>
                );
              })}
            </ul>

            {/* Fixed Logout Button */}
            <div className=" py-1 border-gray-200">
              <button
                onClick={handleLogout}
                className="flex items-center w-full p-2 text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <LogOut className="font-bold w-5 h-5 text-gray-500 group-hover:text-gray-900" />
                <span className="ml-3 font-semibold">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
