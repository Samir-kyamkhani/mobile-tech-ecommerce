import { Home, Layers, Package, Settings, ShoppingCart, Users, X } from "lucide-react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen, closeSidebar }) => {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, path: "/dashboard" },
    { id: "categories", label: "Categories", icon: Layers, path: "/categories" },
    { id: "products", label: "Products", icon: Package, path: "/products" },
    { id: "orders", label: "Orders", icon: ShoppingCart, path: "/orders" },
    { id: "customers", label: "Customers", icon: Users, path: "/customers" },
    { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 w-64 h-screen transition-transform bg-white border-r border-gray-200 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo Header (both views) */}
        <div className="flex items-center justify-between px-4 py-[17.2px] border-b border-gray-200 shadow-sm">
          <h1 className="text-lg font-bold text-gray-900 tracking-tight">
            Inventory<span className="text-blue-600">Manager</span>
          </h1>

          {/* Close button (mobile only) */}
          <button
            onClick={closeSidebar}
            className="text-gray-500 hover:text-gray-700 focus:outline-none lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Navigation */}
        <div className="h-full px-2 pb-4 py-1 overflow-y-auto bg-white">
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
                    onClick={closeSidebar} // Optional: auto-close on mobile
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
                        <span className="ml-3">{item.label}</span>
                      </>
                    )}
                  </NavLink>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
