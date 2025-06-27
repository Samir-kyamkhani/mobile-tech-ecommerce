import React, { useEffect, useState } from "react";
import { ShoppingCart, Clock, CheckCircle, XCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, updateOrder } from "../../redux/slices/orderSlice";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.order);
  const orders = orderState?.orders || [];

  const [localOrders, setLocalOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  useEffect(() => {
    const formatted = orders.map((order) => {
      const product = order.items?.[0]?.product || {};
      const customer = order.customer || {};
      const itemCount = order.items?.length || 0;
      const images = product.images || [];

      return {
        id: order.id,
        productImg: images[0]?.url || null,
        productName: product.name || "N/A",
        customer: customer.name || "N/A",
        email: customer.email || "N/A",
        contact: customer.phone || "N/A",
        total: order.total || "0",
        status: order.status || "Pending",
        payment: order.payment || "Pending",
        date: order.date ? new Date(order.date).toISOString() : null,
        dueDate: order.duedate
          ? new Date(order.duedate).toLocaleDateString()
          : "N/A",
        items: itemCount,
      };
    });

    setLocalOrders(formatted);
  }, [orders]);

  const handleStatusChange = (id, newStatus) => {
    setLocalOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      )
    );

    dispatch(updateOrder({ id, updatedData: { status: newStatus } })).then(() =>
      dispatch(getAllOrders())
    );
  };

  const handlePaymentChange = (id, newPayment) => {
    setLocalOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, payment: newPayment } : order
      )
    );

    dispatch(updateOrder({ id, updatedData: { payment: newPayment } })).then(
      () => dispatch(getAllOrders())
    );
  };

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
      case "Refunded":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Filter logic fixed
  const filteredOrders = localOrders.filter((order) => {
    const query = searchQuery.toLowerCase();

    const matchesSearch =
      (order.customer?.toLowerCase().includes(query) ?? false) ||
      (order.email?.toLowerCase().includes(query) ?? false) ||
      (order.productName?.toLowerCase().includes(query) ?? false) ||
      order.id.toString().includes(query);

    const matchesStatus =
      selectedStatus === "All Status" || order.status === selectedStatus;

    let matchesDate = true;
    if (selectedDate && order.date) {
      const orderDate = new Date(order.date);
      const selected = new Date(selectedDate);
      orderDate.setHours(0, 0, 0, 0);
      selected.setHours(0, 0, 0, 0);
      matchesDate = orderDate.getTime() === selected.getTime();
    }

    return matchesSearch && matchesStatus && matchesDate;
  });

  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and track all customer orders.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          icon={<ShoppingCart className="w-6 h-6 text-blue-600" />}
          label="Total Orders"
          value={filteredOrders.length}
        />
        <StatCard
          icon={<Clock className="w-6 h-6 text-yellow-600" />}
          label="Pending"
          value={filteredOrders.filter((o) => o.status === "Pending").length}
        />
        <StatCard
          icon={<CheckCircle className="w-6 h-6 text-green-600" />}
          label="Delivered"
          value={filteredOrders.filter((o) => o.status === "Delivered").length}
        />
        <StatCard
          icon={<XCircle className="w-6 h-6 text-red-600" />}
          label="Cancelled"
          value={filteredOrders.filter((o) => o.status === "Cancelled").length}
        />
      </div>

      <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <input
            type="search"
            aria-label="Search orders"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-shrink-0 w-2/3 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
          <select
            aria-label="Filter by status"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            {[
              "All Status",
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
          <input
            type="date"
            aria-label="Filter by date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          />
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedStatus("All Status");
              setSelectedDate("");
            }}
            className="px-4 py-2 border border-gray-300 rounded-md bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Orders Table Component */}
      <OrdersTable
        orders={filteredOrders}
        onStatusChange={handleStatusChange}
        onPaymentChange={handlePaymentChange}
        getStatusColor={getStatusColor}
        getPaymentColor={getPaymentColor}
      />
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

// OrdersTable component definition
const OrdersTable = ({
  orders,
  onStatusChange,
  onPaymentChange,
  getStatusColor,
  getPaymentColor,
}) => {
  const imageBaseUrl = import.meta.env.VITE_API_BASE_URL_For_Image;

  return (
    <>
      <div className="hidden md:block bg-white shadow rounded-lg border border-gray-200 overflow-x-auto">
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
                  <td className="px-6 py-4">
                    {order.productImg ? (
                      <img
                        src={`${imageBaseUrl}${order.productImg}`}
                        alt={order.productName}
                        className="w-10 h-10 rounded-full object-cover"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm text-gray-500">
                        N/A
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm">{order.productName}</td>
                  <td className="px-6 py-4 text-sm">{order.id}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="font-medium text-gray-900">
                      {order.customer}
                    </div>
                    <div className="text-gray-500 text-xs">{order.email}</div>
                    <div className="text-gray-500 text-xs">{order.contact}</div>
                  </td>
                  <td className="px-6 py-4 text-sm">₹{order.total}</td>
                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      onChange={(e) => onStatusChange(order.id, e.target.value)}
                      className={`px-2 py-1 rounded text-sm font-semibold ${getStatusColor(
                        order.status
                      )}`}
                    >
                      <option>Pending</option>
                      <option>Processing</option>
                      <option>Shipped</option>
                      <option>Delivered</option>
                      <option>Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={order.payment}
                      onChange={(e) =>
                        onPaymentChange(order.id, e.target.value)
                      }
                      className={`px-2 py-1 rounded text-sm font-semibold ${getPaymentColor(
                        order.payment
                      )}`}
                    >
                      <option>Pending</option>
                      <option>Paid</option>
                      <option>Cancelled</option>
                      <option>Refunded</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    {order.date
                      ? new Date(order.date).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm">{order.dueDate}</td>
                  <td className="px-6 py-4 text-sm">{order.items}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="block md:hidden mt-6 space-y-4">
        {orders.length === 0 ? (
          <p className="px-6 py-4 text-center text-gray-500">
            No recent orders found.
          </p>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow p-4 border border-gray-200"
            >
              <div className="flex items-center space-x-4">
                {order.productImg ? (
                  <img
                    src={`${imageBaseUrl}${order.productImg}`}
                    alt={order.productName}
                    className="w-12 h-12 rounded-full object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-sm text-gray-500">
                    N/A
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-900 text-lg">
                    {order.productName}
                  </p>
                  <p className="text-gray-500 text-sm">Order ID: {order.id}</p>
                </div>
              </div>
              <div className="mt-4 space-y-1 text-sm text-gray-700">
                <p>
                  <span className="font-semibold">Customer: </span>
                  {order.customer}
                </p>
                <p>
                  <span className="font-semibold">Email: </span>
                  {order.email}
                </p>
                <p>
                  <span className="font-semibold">Contact: </span>
                  {order.contact}
                </p>
                <p>
                  <span className="font-semibold">Total: </span>₹{order.total}
                </p>
                <p>
                  <span className="font-semibold">Status: </span>
                  <select
                    value={order.status}
                    onChange={(e) => onStatusChange(order.id, e.target.value)}
                    className={`px-2 py-1 rounded text-sm font-semibold ${getStatusColor(
                      order.status
                    )}`}
                  >
                    <option>Pending</option>
                    <option>Processing</option>
                    <option>Shipped</option>
                    <option>Delivered</option>
                    <option>Cancelled</option>
                  </select>
                </p>
                <p>
                  <span className="font-semibold">Payment: </span>
                  <select
                    value={order.payment}
                    onChange={(e) => onPaymentChange(order.id, e.target.value)}
                    className={`px-2 py-1 rounded text-sm font-semibold ${getPaymentColor(
                      order.payment
                    )}`}
                  >
                    <option>Pending</option>
                    <option>Paid</option>
                    <option>Cancelled</option>
                    <option>Refunded</option>
                  </select>
                </p>
                <p>
                  <span className="font-semibold">Date: </span>
                  {order.date
                    ? new Date(order.date).toLocaleDateString()
                    : "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Due Date: </span>
                  {order.dueDate}
                </p>
                <p>
                  <span className="font-semibold">Items: </span>
                  {order.items}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default OrdersPage;
