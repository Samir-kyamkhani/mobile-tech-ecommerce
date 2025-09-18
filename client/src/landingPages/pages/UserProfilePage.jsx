import React, { useEffect, useState } from "react";
import {
  User,
  Package,
  MapPin,
  LogOut,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  Fingerprint,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, resetPassword } from "../../redux/slices/authSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllOrders, updateOrder } from "../../redux/slices/orderSlice";

export default function UserProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");
  const { user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  const location = useLocation();

  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.key]);

  const userInfo = {
    name: user.name,
    email: user.email,
    phone: user.phone || "Not provided",
    location: user.location || "No address available",
    memberSince: new Date(user.joinDate).toLocaleDateString(),
  };

  const [passwordFormData, setPasswordFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordFormData((prev) => ({ ...prev, [name]: value }));
  };

  const updatePassword = (e) => {
    e.preventDefault();
    const { newPassword, confirmNewPassword } = passwordFormData;
    if (newPassword !== confirmNewPassword) {
      alert("New passwords do not match!");
      return;
    }
    dispatch(resetPassword(passwordFormData));
  };

  const orderState = useSelector((state) => state.order);
  const orders = orderState?.orders || [];

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch, orderState.changed]);

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

  const handleCancelOrder = (order) => {
    const updatedData = { status: "Cancelled" };

    dispatch(updateOrder({ id: order.id, updatedData })).then(() => {
      dispatch(getAllOrders());
    });
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Fingerprint },
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
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
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
                        {userInfo.phone}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "security" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Password
                  </h2>
                  <form
                    onSubmit={updatePassword}
                    className="grid md:grid-cols-2 gap-6"
                  >
                    <div className="md:col-span-2">
                      <label className="block text-gray-500 text-sm mb-2">
                        Current Password
                      </label>
                      <input
                        name="currentPassword"
                        value={passwordFormData["currentPassword"]}
                        onChange={handlePasswordInputChange}
                        type="password"
                        className="w-full bg-gray-100 rounded-lg p-3 text-gray-800"
                        placeholder="Enter current password"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-500 text-sm mb-2">
                        New Password
                      </label>
                      <input
                        name="newPassword"
                        value={passwordFormData["newPassword"]}
                        onChange={handlePasswordInputChange}
                        type="password"
                        className="w-full bg-gray-100 rounded-lg p-3 text-gray-800"
                        placeholder="Enter new password"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-500 text-sm mb-2">
                        Confirm Password
                      </label>
                      <input
                        name="confirmNewPassword"
                        value={passwordFormData["confirmNewPassword"]}
                        onChange={handlePasswordInputChange}
                        type="password"
                        className="w-full bg-gray-100 rounded-lg p-3 text-gray-800"
                        placeholder="Confirm new password"
                      />
                    </div>

                    <div className="md:col-span-2 text-right">
                      <button
                        type="submit"
                        className="mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg"
                      >
                        Update Password
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {activeTab === "orders" && (
                <div id="orders">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Order History
                  </h2>

                  <div className="space-y-6">
                    {orders?.map((order) => (
                      <div
                        key={order.id}
                        className="bg-white rounded-xl p-6 shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300"
                      >
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                          <div className="flex items-start space-x-4">
                            {/* Status Icon */}
                            <div className="text-2xl mt-1 text-indigo-600">
                              {getStatusIcon(order.status)}
                            </div>

                            {/* Order Info */}
                            <div>
                              <h3 className="text-xl font-semibold text-gray-900">
                                Order{" "}
                                <span className="text-indigo-600">
                                  ORD-{order.id.slice(0, 3).toUpperCase()}
                                </span>
                              </h3>
                              <p className="text-gray-600 text-sm mt-1">
                                <span className="font-medium">Order Date:</span>{" "}
                                {new Date(order.date).toLocaleDateString()}
                              </p>
                              <p className="text-gray-600 text-sm">
                                <span className="font-medium">Due Date:</span>{" "}
                                {new Date(order.duedate).toLocaleDateString()}
                              </p>
                            </div>
                          </div>

                          {/* Price and Status */}
                          <div className="text-right mt-5 sm:mt-0 min-w-[120px]">
                            <p className="text-xl font-semibold text-gray-900">
                              ₹{order.total}
                            </p>
                            <span
                              className={`inline-block mt-1 px-4 py-1 rounded-full text-xs font-semibold select-none ${
                                order.status === "Delivered"
                                  ? "bg-emerald-500 text-white"
                                  : order.status === "Shipped"
                                  ? "bg-sky-500 text-white"
                                  : order.status === "Processing"
                                  ? "bg-amber-400 text-white"
                                  : order.status === "Pending"
                                  ? "bg-gray-400 text-white"
                                  : "bg-red-500 text-white"
                              }`}
                            >
                              {order.status}
                            </span>
                          </div>
                        </div>

                        {/* Items List with Images */}
                        <div className="text-gray-700 text-sm space-y-2 mb-4">
                          {order?.items?.map((item, idx) => (
                            <div
                              key={idx}
                              className="flex items-center space-x-3 truncate"
                            >
                              {item.product?.image && (
                                <img
                                  src={`${
                                    import.meta.env.VITE_API_BASE_URL_For_Image
                                  }${item.product.image}`}
                                  alt={item.product.name}
                                  className="w-10 h-10 rounded-md object-cover flex-shrink-0"
                                />
                              )}
                              <div className="truncate">
                                <span className="font-medium">
                                  {item.product?.name || item.name}
                                </span>{" "}
                                — {item.quantity} × ₹{item.price}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Cancel Button */}
                        {["Processing", "Shipped", "Pending"].includes(
                          order.status
                        ) && (
                          <button
                            onClick={() => handleCancelOrder(order)}
                            className="mt-3 inline-block bg-red-600 text-white font-semibold px-5 py-2 rounded-md hover:bg-red-700 transition-colors duration-200 text-sm"
                            aria-label={`Cancel Order ${order.id}`}
                          >
                            Cancel Order
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "orders" && orders.length === 0 && (
                <div className="text-gray-600 mt-6">No orders found.</div>
              )}

              {activeTab === "addresses" && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">
                    Saved Addresses
                  </h2>
                  <div className="space-y-4">
                    <div className="bg-gray-100 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <MapPin className="w-6 h-6 text-gray-700 mt-1" />
                          <div>
                            <p className="text-gray-600">{userInfo.location}</p>
                          </div>
                        </div>
                      </div>
                    </div>
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
