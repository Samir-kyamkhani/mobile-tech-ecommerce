import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Edit2,
  Eye,
  Mail,
  MapPin,
  Phone,
  Plus,
  Star,
  Trash2,
  User,
  Users,
} from "lucide-react";
import { customers as dummyCustomers } from "../..";
import { useState } from "react";
import AddCustomersForm from "../components/Forms/AddCustomersForm";

const CustomersPage = () => {
  const [customers, setCustomers] = useState(dummyCustomers);
  const [showForm, setShowForm] = useState(false);
  const [editCustomer, setEditCustomer] = useState(null);

  const handleAddOrUpdate = (customer) => {
    if (editCustomer) {
      // Update existing
      setCustomers((prev) =>
        prev.map((c) => (c.id === customer.id ? customer : c))
      );
    } else {
      // Add new
      setCustomers((prev) => [...prev, customer]);
    }
    setShowForm(false);
    setEditCustomer(null);
  };

  const handleEdit = (product) => {
    setEditCustomer(product);
    setShowForm(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Inactive":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col px-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your customer relationships and data.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Customer
          </button>
        </div>
      </div>

      {/* Customer Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">
              Total Customers
            </h3>
            <p className="text-2xl font-semibold text-gray-900">1,247</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Active</h3>
            <p className="text-2xl font-semibold text-gray-900">1,089</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-gray-50 rounded-lg">
              <AlertCircle className="w-6 h-6 text-gray-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Inactive</h3>
            <p className="text-2xl font-semibold text-gray-900">69</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search customers..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option>All Locations</option>
            <option>New York</option>
            <option>Los Angeles</option>
            <option>Chicago</option>
          </select>
        </div>
      </div>

      {/* Customers - Desktop Table */}
      <div className="hidden md:block bg-white shadow rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Customers</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Spent
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {customers.length === 0 ? (
                <tr>
                  <td
                    colSpan={10}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No customers found.
                  </td>
                </tr>
              ) : (
                customers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {customer.avatar ? (
                          <img
                            src={customer.avatar}
                            alt={`${customer.name}'s avatar`}
                            className="w-10 h-10 rounded-full object-cover mr-3"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.style.display = "none";
                              e.currentTarget.nextSibling.style.display =
                                "flex";
                            }}
                          />
                        ) : null}
                        <User
                          className="w-10 h-10 p-1 text-white bg-gray-400 rounded-full mr-3 flex-shrink-0"
                          style={{ display: customer.avatar ? "none" : "flex" }}
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {customer.name}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {customer.location}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center">
                        <Mail className="w-3 h-3 mr-1" />
                        {customer.email}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Phone className="w-3 h-3 mr-1" />
                        {customer.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {customer.orders}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{customer.totalSpent}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                          customer.status
                        )}`}
                      >
                        {customer.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {customer.joinDate}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEdit(customer)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Customers - Mobile Card View */}
      <div className="block md:hidden space-y-4 bg-white shadow rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Customers</h3>
        </div>

        {customers.length === 0 ? (
          <div>
            <p colSpan={10} className="px-6 py-4 text-center text-gray-500">
              No customers found.
            </p>
          </div>
        ) : (
          customers.map((customer) => (
            <div
              key={customer.id}
              className="bg-white mx-4 mb-4 rounded-lg shadow p-4 border border-gray-200"
            >
              <div className="flex items-center mb-2">
                {customer.avatar ? (
                  <img
                    src={customer.avatar}
                    alt={`${customer.name}'s avatar`}
                    className="w-10 h-10 rounded-full object-cover mr-3"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextSibling.style.display = "flex";
                    }}
                  />
                ) : null}
                <User
                  className="w-10 h-10 p-1 text-white bg-gray-400 rounded-full mr-3"
                  style={{ display: customer.avatar ? "none" : "flex" }}
                />
                <div>
                  <div className="text-sm font-medium text-gray-900">
                    {customer.name}
                  </div>
                  <div className="text-sm text-gray-500 flex items-center">
                    <MapPin className="w-3 h-3 mr-1" />
                    {customer.location}
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-500 mb-1 flex items-center">
                <Mail className="w-3 h-3 mr-1" />
                {customer.email}
              </div>
              <div className="text-sm text-gray-500 mb-1 flex items-center">
                <Phone className="w-3 h-3 mr-1" />
                {customer.phone}
              </div>
              <div className="text-sm text-gray-500 mb-1">
                <strong>Orders:</strong> {customer.orders}
              </div>
              <div className="text-sm text-gray-500 mb-1">
                <strong>Total Spent:</strong> ₹{customer.totalSpent}
              </div>
              <div className="text-sm text-gray-500 mb-1">
                <strong>Status:</strong>{" "}
                <span
                  className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                    customer.status
                  )}`}
                >
                  {customer.status}
                </span>
              </div>
              <div className="text-sm text-gray-500 mb-3 flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                {customer.joinDate}
              </div>
              <div className="flex flex-row-reverse gap-4 space-x-4">
                <button className="text-red-600 font-medium capitalize hover:text-red-900">
                  delete
                </button>
                <button
                  onClick={() => handleEdit(customer)}
                  className="text-green-600 capitalize font-medium hover:text-green-900"
                >
                  Edit
                </button>
                <button className="text-blue-600 capitalize font-medium hover:text-blue-900">
                  View
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {showForm && (
        <AddCustomersForm
          isEdit={!!editCustomer}
          customerData={editCustomer}
          onSubmit={handleAddOrUpdate}
          onClose={() => {
            setShowForm(false);
            setEditCustomer(null);
          }}
        />
      )}
    </div>
  );
};

export default CustomersPage;
