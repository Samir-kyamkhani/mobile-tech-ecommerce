import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrders } from "../../redux/slices/orderSlice";
import { Clock, CheckCircle, XCircle, FileText } from "lucide-react";

const LedgerPage = () => {
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.order);
  const orders = orderState?.orders || [];

  const [ledgerEntries, setLedgerEntries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  useEffect(() => {
    const formatted = orders.map((order) => {
      const customer = order.customer || {};
      return {
        id: order.id,
        date: order.date
          ? new Date(order.date).toISOString().slice(0, 10)
          : "N/A",
        total: order.total || 0,
        payment: order.payment || "Pending",
        customer: {
          name: customer.name || "N/A",
          email: customer.email || "N/A",
          contact: customer.phone || "N/A",
        },
      };
    });
    setLedgerEntries(formatted);
  }, [orders]);

  const getColor = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800";
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Refunded":
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredEntries = ledgerEntries.filter((entry) => {
    const query = searchQuery.toLowerCase();
    const matchSearch =
      entry.customer.name.toLowerCase().includes(query) ||
      entry.customer.email.toLowerCase().includes(query) ||
      entry.id.toLowerCase().includes(query);

    const matchStatus =
      selectedStatus === "All Status" || entry.payment === selectedStatus;

    const matchDate = !selectedDate || entry.date === selectedDate;

    return matchSearch && matchStatus && matchDate;
  });

  return (
    <div className="p-4 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Ledger</h1>
        <p className="text-sm text-gray-500">
          Track customer payments and transactions.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard
          icon={<FileText className="w-6 h-6 text-blue-600" />}
          label="Total Entries"
          value={filteredEntries.length}
        />
        <StatCard
          icon={<Clock className="w-6 h-6 text-yellow-600" />}
          label="Pending"
          value={filteredEntries.filter((e) => e.payment === "Pending").length}
        />
        <StatCard
          icon={<CheckCircle className="w-6 h-6 text-green-600" />}
          label="Paid"
          value={filteredEntries.filter((e) => e.payment === "Paid").length}
        />
        <StatCard
          icon={<XCircle className="w-6 h-6 text-red-600" />}
          label="Refunded"
          value={
            filteredEntries.filter(
              (e) => e.payment === "Refunded" || e.payment === "Cancelled"
            ).length
          }
        />
      </div>

      {/* Filter bar */}
      <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <input
            type="search"
            placeholder="Search ledger..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-1/3 px-3 py-2 border border-gray-300 rounded-md"
          />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full sm:w-1/4 px-3 py-2 border border-gray-300 rounded-md"
          >
            <option>All Status</option>
            <option>Paid</option>
            <option>Pending</option>
            <option>Refunded</option>
            <option>Cancelled</option>
          </select>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full sm:w-1/4 px-3 py-2 border border-gray-300 rounded-md"
          />
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedDate("");
              setSelectedStatus("All Status");
            }}
            className="px-4 py-2 border border-gray-300 rounded-md bg-gray-50 hover:bg-gray-100"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Ledger Table */}
      <div className="bg-white shadow rounded-lg border border-gray-200 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["Date", "Order ID", "Customer", "Amount", "Payment Status"].map(
                (h) => (
                  <th
                    key={h}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredEntries.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                  No records found.
                </td>
              </tr>
            ) : (
              filteredEntries.map((entry) => (
                <tr key={entry.id}>
                  <td className="px-6 py-4 text-sm">{entry.date}</td>
                  <td className="px-6 py-4 text-sm">{entry.id}</td>
                  <td className="px-6 py-4 text-sm">
                    <div className="font-medium">{entry.customer.name}</div>
                    <div className="text-gray-500 text-xs">
                      {entry.customer.email}
                    </div>
                    <div className="text-gray-500 text-xs">
                      {entry.customer.contact}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">₹{entry.total}</td>
                  <td className="px-6 py-4 text-sm">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-medium ${getColor(
                        entry.payment
                      )}`}
                    >
                      {entry.payment}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
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

export default LedgerPage;
