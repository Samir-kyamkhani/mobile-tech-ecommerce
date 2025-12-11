import { Eye } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders, updateOrder } from "../../redux/slices/orderSlice";
import StatsGridCard from "../../landingPages/Sections/StatsGridCard";
import Analytics from "../components/Analytics";

const Dashboard = () => {
  const dispatch = useDispatch();

  const orderState = useSelector((state) => state.order);
  const orders = orderState?.orders || [];

  const [localOrders, setLocalOrders] = useState([]);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  useEffect(() => {
    const formatted = orders.map((order) => {
      const product = order.items?.[0]?.product || {};
      const customer = order.customer || {};
      const itemCount = order.items?.length || 0;
      const shipping = order.shipping || {};

      return {
        id: order.id,
        productImg: product.images?.[0]?.url || null,
        productName: product.name || "N/A",
        customer: customer.name || "N/A",
        email: customer.email || "N/A",
        contact: customer.phone || "N/A",
        total: order.total || "0",
        status: order.status || "Pending",
        payment: order.payment || "Pending",
        bankReferenceId: order.bankReferenceId || "N/A",

        merchantOrderId: order.merchantOrderId || "N/A",
        paymentMode: order.paymentMode || "COD",

        transactionId: order.transactionId || "N/A",
        shippingAddress: {
          firstName: shipping.firstName || "N/A",
          lastName: shipping.lastName || "N/A",
          email: shipping.email || "N/A",
          address: shipping.address || "N/A",
          city: shipping.city || "N/A",
          zip: shipping.zip || "N/A",
        },
        date: order.date ? new Date(order.date).toLocaleDateString() : "N/A",
        dueDate: order.duedate
          ? new Date(order.duedate).toLocaleDateString()
          : "N/A",
        items: itemCount, // just the number of items
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

    const updatedData = { status: newStatus };

    dispatch(updateOrder({ id, updatedData })).then(() => {
      dispatch(getAllOrders());
    });
  };

  const handlePaymentChange = (id, newPayment) => {
    setLocalOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, payment: newPayment } : order
      )
    );

    const updatedData = { payment: newPayment };
    dispatch(updateOrder({ id, updatedData })).then(() => {
      dispatch(getAllOrders());
    });
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

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back! Here's what's happening with your store.
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      {/* Stats Grid */}
      <StatsGridCard
        orders={orders}
        previousOrdersCount={100}
        previousProductsCount={50}
        previousUsersCount={200}
        previousRevenue={50000}
      />

      <Analytics orders={orders} />

      {/* Recent Orders - Desktop Table */}
      <div className="hidden md:block bg-white shadow rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
          <Link to={"/orders"}>
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Eye className="w-4 h-4 mr-2" />
              View All
            </button>
          </Link>
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
                  "Shipping Address",
                  "Transaction ID",
                  "Bank Reference ID",
                  "Merchant Order ID",
                  "Payment Method",
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
              {localOrders.length === 0 ? (
                <tr>
                  <td
                    colSpan={10}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No recent orders found.
                  </td>
                </tr>
              ) : (
                localOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {order.productImg ? (
                          <img
                            src={`${
                              import.meta.env.VITE_API_BASE_URL_For_Image
                            }${order.productImg}`}
                            alt={order.productName}
                            className="w-10 h-10 rounded-full object-cover mr-3"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm text-gray-500">
                            N/A
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">{order.productName}</td>
                    <td className="px-6 py-4 text-sm">{order.id}</td>
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
                    <td className="px-6 py-4 text-sm">₹{order.total}</td>
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
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {order.date}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {order.dueDate}
                    </td>
                    <td className="px-6 py-4 text-sm">{order.items}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="text-xs bg-gray-50 p-2 rounded">
                        <div className="font-medium text-gray-900">
                          {order.shippingAddress.firstName}{" "}
                          {order.shippingAddress.lastName}
                        </div>
                        <div className="text-gray-600">
                          {order.shippingAddress.address}
                        </div>
                        <div className="text-gray-600">
                          {order.shippingAddress.city},{" "}
                          {order.shippingAddress.zip}
                        </div>
                        <div className="text-gray-600">
                          {order.shippingAddress.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="text-xs bg-blue-50 p-1 rounded text-blue-700 font-mono">
                        {order.transactionId === null ? (
                          <span className="text-gray-500">N/A</span>
                        ) : (
                          order.transactionId
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="text-xs bg-blue-50 p-1 rounded text-blue-700 font-mono">
                        {order.bankReferenceId === "N/A" ? (
                          <span className="text-gray-500">N/A</span>
                        ) : (
                          order.bankReferenceId
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="text-xs bg-blue-50 p-1 rounded text-blue-700 font-mono">
                        {order.merchantOrderId === "N/A" ? (
                          <span className="text-gray-500">N/A</span>
                        ) : (
                          order.merchantOrderId
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">{order.paymentMode}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Orders - Mobile Card View */}
      <div className="block md:hidden space-y-4 bg-white shadow rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Recent Orders</h3>
          <div className="flex space-x-3">
            <Link to={"/orders"}>
              <button className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <Eye className="w-4 h-4 mr-2" />
                View All
              </button>
            </Link>
          </div>
        </div>

        <div className="block md:hidden space-y-4 px-3">
          {localOrders.length === 0 ? (
            <p className="px-6 py-4 text-center text-gray-500">
              No recent orders found.
            </p>
          ) : (
            localOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white mb-4 rounded-lg shadow p-4 border border-gray-200"
              >
                {/* Product Image */}
                <div className="py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {order.productImg ? (
                      <img
                        src={`${import.meta.env.VITE_API_BASE_URL_For_Image}${
                          order.productImg
                        }`}
                        alt={order.productName}
                        className="w-10 h-10 rounded-full object-cover mr-3"
                        onError={(e) => {
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-sm text-gray-500">
                        N/A
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-semibold text-gray-900">
                    {order.customer}
                  </h4>
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
                  <strong>Items:</strong> {order.items}{" "}
                  {order.items === 1 ? "item" : "items"}
                </p>

                <div className="text-sm text-gray-500 mb-2 bg-gray-50 p-2 rounded">
                  <strong className="block">Shipping Address:</strong>
                  <div className="text-xs mt-1">
                    {order.shippingAddress.firstName}{" "}
                    {order.shippingAddress.lastName}
                    <br />
                    {order.shippingAddress.address}
                    <br />
                    {order.shippingAddress.city}, {order.shippingAddress.zip}
                    <br />
                    {order.shippingAddress.email}
                  </div>
                </div>
                <p className="text-sm text-gray-500 mb-1">
                  <strong>Transaction ID:</strong>
                  <br />
                  <span className="text-xs bg-blue-50 p-1 rounded text-blue-700 font-mono">
                    {order.transactionId === null ? (
                      <span className="text-gray-500">N/A</span>
                    ) : (
                      order.transactionId
                    )}
                  </span>
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  <strong>Bank Reference ID:</strong>
                  <br />
                  <span className="text-xs bg-blue-50 p-1 rounded text-blue-700 font-mono">
                    {order.bankReferenceId === "N/A" ? (
                      <span className="text-gray-500">N/A</span>
                    ) : (
                      order.bankReferenceId
                    )}
                  </span>
                </p>
                <p className="text-sm text-gray-500 mb-1">
                  <strong>Merchant Order ID:</strong>
                  <br />
                  <span className="text-xs bg-blue-50 p-1 rounded text-blue-700 font-mono">
                    {order.merchantOrderId === "N/A" ? (
                      <span className="text-gray-500">N/A</span>
                    ) : (
                      order.merchantOrderId
                    )}
                  </span>
                </p>
                <h3 className=" text-md text-blue-900  mb-3">
                  Payment Method:
                  <span className="text-gray-700 ml-2 ">
                    {order.paymentMode === "COD" ? (
                      <span className="text-gray-500">COD</span>
                    ) : (
                      order.paymentMode
                    )}
                  </span>
                </h3>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
