import { Outlet } from "react-router-dom";

import Sidebar from "../dashboard/components/Sidebar";
import Navbar from "../dashboard/components/Navbar";
import { useState } from "react";

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
      <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />

      {/* Main Content */}
      <div className="pt-16 lg:pl-64">
        <main className="min-h-screen">
         <Outlet />
        </main>
      </div>
    </div>
  );
}
