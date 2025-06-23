import React, { useState } from "react";
import {
  User,
  Package,
  CreditCard,
  MapPin,
  LogOut,
  Edit,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";

export default function UserProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");

  const userInfo = {
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    profilePicture:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    memberSince: "January 2023",
  };

  const [orders, setOrders] = useState([
    {
      id: "ORD-001",
      status: "Delivered",
      date: "2024-06-15",
      total: "299.99",
      items: "iPhone 15 Case + Screen Protector",
    },
    {
      id: "ORD-002",
      status: "Processing",
      date: "2024-06-21",
      total: "199.99",
      items: "Wireless Mouse",
    },
    {
      id: "ORD-003",
      status: "Shipped",
      date: "2024-06-19",
      total: "99.00",
      items: "Bluetooth Keyboard",
    },
  ]);

  const addresses = [
    {
      id: 1,
      type: "Home",
      name: "Sarah Johnson",
      address: "123 Main St, Apt 4B",
      city: "New York, NY 10001",
      isDefault: true,
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case "Shipped":
        return <Truck className="w-5 h-5 text-sky-500" />;
      case "Processing":
        return <Clock className="w-5 h-5 text-amber-400" />;
      case "Cancelled":
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Package className="w-5 h-5 text-gray-400" />;
    }
  };

  const handleCancelOrder = (orderId) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: "Cancelled" } : order
      )
    );
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "orders", label: "My Orders", icon: Package },
    { id: "addresses", label: "Addresses", icon: MapPin },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-slate-200 to-white">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-800">My Account</h1>
            <button className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200">
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
              <div className="flex flex-col items-center justify-center">
                <User className="w-12 h-12 p-1 text-white bg-gray-700 rounded-full" />
                <h3 className="text-xl font-semibold text-gray-800 mt-2">
                  {userInfo.name}
                </h3>
                <p className="text-gray-500 text-sm">{userInfo.email}</p>
                <p className="text-gray-400 text-xs">
                  Member since {userInfo.memberSince}
                </p>
              </div>
            </div>

            <nav className="bg-white shadow-md rounded-lg p-4">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-colors duration-200 ${
                      activeTab === tab.id
                        ? "bg-slate-100 text-gray-800"
                        : "text-gray-600 hover:bg-slate-200 hover:text-black"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            <div className="bg-white shadow-md rounded-lg p-6">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Profile Information
                  </h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-500 text-sm mb-2">
                        Full Name
                      </label>
                      <div className="bg-gray-100 rounded-lg p-3 text-gray-800">
                        {userInfo.name}
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-500 text-sm mb-2">
                        Email Address
                      </label>
                      <div className="bg-gray-100 rounded-lg p-3 text-gray-800">
                        {userInfo.email}
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-500 text-sm mb-2">
                        Phone Number
                      </label>
                      <div className="bg-gray-100 rounded-lg p-3 text-gray-800">
                        +1 (555) 123-4567
                      </div>
                    </div>
                    <div>
                      <label className="block text-gray-500 text-sm mb-2">
                        Date of Birth
                      </label>
                      <div className="bg-gray-100 rounded-lg p-3 text-gray-800">
                        March 15, 1990
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Orders Tab */}
              {activeTab === "orders" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Order History
                  </h2>
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="bg-gray-100 rounded-lg p-4"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            {getStatusIcon(order.status)}
                            <div>
                              <h3 className="text-gray-800 font-semibold">
                                Order {order.id}
                              </h3>
                              <p className="text-gray-500 text-sm">
                                {order.date}
                              </p>
                            </div>
                          </div>
                          <div className="text-right mt-2 sm:mt-0">
                            <p className="text-gray-800 font-semibold">
                              ₹{order.total}
                            </p>
                            <span
                              className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                order.status === "Delivered"
                                  ? "bg-emerald-500 text-white"
                                  : order.status === "Shipped"
                                  ? "bg-sky-500 text-white"
                                  : order.status === "Processing"
                                  ? "bg-amber-400 text-white"
                                  : "bg-red-500 text-white"
                              }`}
                            >
                              {order.status}
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-500 text-sm mb-2">
                          {order.items}
                        </p>

                        {(order.status === "Processing" ||
                          order.status === "Shipped") && (
                          <button
                            onClick={() => handleCancelOrder(order.id)}
                            className="mt-2 text-sm text-white bg-red-500 px-3 py-2 rounded-lg hover:bg-red-600 font-bold"
                          >
                            Cancel Order
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === "addresses" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Saved Addresses
                  </h2>
                  <div className="space-y-4">
                    {addresses.map((address) => (
                      <div
                        key={address.id}
                        className="bg-gray-100 rounded-lg p-4"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <MapPin className="w-6 h-6 text-gray-700 mt-1" />
                            <div>
                              <div className="flex items-center space-x-2 mb-1">
                                <p className="text-gray-800 font-semibold">
                                  {address.type}
                                </p>
                                {address.isDefault && (
                                  <span className="bg-emerald-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                                    Default
                                  </span>
                                )}
                              </div>
                              <p className="text-gray-600">{address.name}</p>
                              <p className="text-gray-600">
                                {address.address}
                              </p>
                              <p className="text-gray-600">{address.city}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
