import React, { useState } from "react";
import { ShoppingCart, Clock, CheckCircle, XCircle } from "lucide-react";
import { orders as initialOrders } from "../../";

// Replace this with actual data source or keep as fallback dummy

const OrdersPage = () => {
  const [orders, setOrders] = useState(initialOrders);

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Processing":
        return "bg-yellow-100 text-yellow-800";
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Pending":
        return "bg-gray-100 text-gray-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentColor = (payment) => {
    switch (payment) {
      case "Paid":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      case "Refunded":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );
  };

  const handlePaymentChange = (id, newPayment) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, payment: newPayment } : order
      )
    );
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and track all customer orders.
          </p>
        </div>
      </div>

      {/* Order Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          icon={<ShoppingCart className="w-6 h-6 text-blue-600" />}
          label="Total Orders"
          value={orders.length}
        />
        <StatCard
          icon={<Clock className="w-6 h-6 text-yellow-600" />}
          label="Pending"
          value={orders.filter((o) => o.status === "Pending").length}
        />
        <StatCard
          icon={<CheckCircle className="w-6 h-6 text-green-600" />}
          label="Delivered"
          value={orders.filter((o) => o.status === "Delivered").length}
        />
        <StatCard
          icon={<XCircle className="w-6 h-6 text-red-600" />}
          label="Cancelled"
          value={orders.filter((o) => o.status === "Cancelled").length}
        />
      </div>

      {/* Filters */}
      <div className="bg-white p-4  rounded-lg shadow border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <input
            type="text"
            placeholder="Search orders..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option>All Status</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Shipped</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>
          <input
            type="date"
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="hidden md:block bg-white shadow rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Orders</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "Product Image",
                  "Product Name",
                  "Order",
                  "Customer",
                  "Total",
                  "Status",
                  "Payment",
                  "Date",
                  "Due Date",
                  "Items",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.length === 0 ? (
                <tr>
                  <td
                    colSpan={10}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id}>
                    {/* Product Image */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {order.productImg && (
                          <img
                            src={order.productImg}
                            alt={`${order.name} image`}
                            className="w-10 h-10 rounded-full object-cover mr-3"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.style.display = "none";
                              if (e.currentTarget.nextSibling) {
                                e.currentTarget.nextSibling.style.display =
                                  "flex";
                              }
                            }}
                          />
                        )}
                        <div
                          className="w-10 h-10 rounded-full bg-gray-200 mr-3 items-center justify-center text-sm text-gray-500"
                          style={{
                            display: order.productImg ? "none" : "flex",
                          }}
                        >
                          N/A
                        </div>
                      </div>
                    </td>

                    {/* Product Name */}
                    <td className="px-6 py-4 text-sm">{order.productName}</td>

                    {/* Order ID */}
                    <td className="px-6 py-4 text-sm">{order.id}</td>

                    {/* Customer Info */}
                    <td className="px-6 py-4 text-sm">
                      <div className="font-medium text-gray-900">
                        {order.customer}
                      </div>
                      <div className="text-gray-500">
                        <span className="font-medium">Email:</span>{" "}
                        {order.email}
                      </div>
                      <div className="text-gray-500">
                        <span className="font-medium">Contact Number:</span>{" "}
                        {order.contact}
                      </div>
                    </td>

                    {/* Total */}
                    <td className="px-6 py-4 text-sm">₹{order.total}</td>

                    {/* Status */}
                    <td className="px-6 py-4">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value)
                        }
                        className={`text-xs font-semibold rounded-full px-2 py-1 ${getStatusColor(
                          order.status
                        )} focus:outline-none`}
                      >
                        {[
                          "Pending",
                          "Processing",
                          "Shipped",
                          "Delivered",
                          "Cancelled",
                        ].map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* Payment */}
                    <td className="px-6 py-4">
                      <select
                        value={order.payment}
                        onChange={(e) =>
                          handlePaymentChange(order.id, e.target.value)
                        }
                        className={`text-xs font-semibold rounded-full px-2 py-1 ${getPaymentColor(
                          order.payment
                        )} focus:outline-none`}
                      >
                        {["Paid", "Pending", "Cancelled", "Refunded"].map(
                          (p) => (
                            <option key={p} value={p}>
                              {p}
                            </option>
                          )
                        )}
                      </select>
                    </td>

                    {/* Date */}
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {order.date}
                    </td>

                    {/* Due Date */}
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {order.dueDate}
                    </td>

                    {/* Items */}
                    <td className="px-6 py-4 text-sm">{order.items}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile View */}
      <div className="block md:hidden space-y-4">
        {orders.length === 0 ? (
          <div>
            <p colSpan={10} className="px-6 py-4 text-center text-gray-500">
              No orders found.
            </p>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="bg-white mb-4 rounded-lg shadow p-4 border border-gray-200"
            >
              {/* Product Image */}
              <div className=" py-4 whitespace-nowrap">
                <div className="flex items-center">
                  {order.productImg && (
                    <img
                      src={order.productImg}
                      alt={`${order.name} image`}
                      className="w-14 h-14 rounded-full object-cover mr-3"
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.style.display = "none";
                        if (e.currentTarget.nextSibling) {
                          e.currentTarget.nextSibling.style.display = "flex";
                        }
                      }}
                    />
                  )}
                  <div
                    className="w-14 h-14 rounded-full bg-gray-200 mr-3 items-center justify-center text-sm text-gray-500"
                    style={{ display: order.productImg ? "none" : "flex" }}
                  >
                    N/A
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-semibold text-gray-900">
                  {order.customer}
                </h4>
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  className={`text-xs font-semibold rounded-full px-2 py-1 ${getStatusColor(
                    order.status
                  )} focus:outline-none`}
                >
                  {[
                    "Pending",
                    "Processing",
                    "Shipped",
                    "Delivered",
                    "Cancelled",
                  ].map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <p className="text-sm text-gray-500 mb-1">
                <strong>Order ID:</strong> {order.id}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                <strong>Email:</strong> {order.email}
                <br />
                <strong>Contact Number:</strong> {order.contact}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                <strong>Total:</strong> ₹{order.total}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                <strong>Payment:</strong>{" "}
                <select
                  value={order.payment}
                  onChange={(e) =>
                    handlePaymentChange(order.id, e.target.value)
                  }
                  className={`text-xs font-semibold rounded-full px-2 py-1 ${getPaymentColor(
                    order.payment
                  )} focus:outline-none`}
                >
                  {["Paid", "Pending", "Cancelled", "Refunded"].map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </p>
              <p className="text-sm text-gray-500 mb-1">
                <strong>Date:</strong> {order.date}
              </p>
              <p className="text-sm text-gray-500 mb-1">
                <strong>Due Date:</strong> {order.dueDate}
              </p>
              <p className="text-sm text-gray-500">
                <strong>Items:</strong> {order.items}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value }) => (
  <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
    <div className="flex items-center">{icon}</div>
    <div className="mt-4">
      <h3 className="text-sm font-medium text-gray-500">{label}</h3>
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
    </div>
  </div>
);

export default OrdersPage;
