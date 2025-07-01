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
  Trash2,
  User,
  Users,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddCustomersForm from "../components/Forms/AddCustomersForm";

import {
  createCustomer,
  getAllCustomers,
  updateCustomer,
  deleteCustomer,
} from "../../redux/slices/customerSlice";

const CustomersPage = () => {
  const dispatch = useDispatch();
  const customerState = useSelector((state) => state.customer);
  const customers = customerState?.customer || [];

  const [showForm, setShowForm] = useState(false);
  const [editCustomer, setEditCustomer] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [locationFilter, setLocationFilter] = useState("All Locations");

  const uniqueLocations = [
    "All Locations",
    ...Array.from(new Set(customers.map((c) => c.location))).filter(Boolean),
  ];

  const handleAddOrUpdate = (customerData) => {
    if (editCustomer) {
      dispatch(
        updateCustomer({ id: editCustomer.id, updatedData: customerData })
      ).then(() => {
        dispatch(getAllCustomers());
      });
    } else {
      dispatch(createCustomer(customerData)).then(() => {
        dispatch(getAllCustomers());
      });
    }
    setShowForm(false);
    setEditCustomer(null);
  };

  const handleEdit = (customer) => {
    setEditCustomer(customer);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteCustomer(id)).then(() => {
      dispatch(getAllCustomers());
    });
  };

  useEffect(() => {
    dispatch(getAllCustomers());
  }, [dispatch, customerState.changed]);

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

  const filteredCustomers = customers.filter((customer) => {
    const name = customer.name || "";
    const email = customer.email || "";
    const phone = customer.phone || "";
    const location = customer.location || "";
    const status = customer.status || "";

    const matchesSearch =
      name.toLowerCase().includes(searchText.toLowerCase()) ||
      email.toLowerCase().includes(searchText.toLowerCase()) ||
      phone.toLowerCase().includes(searchText.toLowerCase()) ||
      location.toLowerCase().includes(searchText.toLowerCase());

    const matchesStatus =
      statusFilter === "All Status" || status === statusFilter;

    const matchesLocation =
      locationFilter === "All Locations" || location === locationFilter;

    return matchesSearch && matchesStatus && matchesLocation;
  });

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
        {/* Total Customers */}
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
            <p className="text-2xl font-semibold text-gray-900">
              {customers.length}
            </p>
          </div>
        </div>

        {/* Active */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-green-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Active</h3>
            <p className="text-2xl font-semibold text-gray-900">
              {customers.filter((c) => c.status === "Active").length}
            </p>
          </div>
        </div>

        {/* Inactive */}
        <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
          <div className="flex items-center">
            <div className="p-2 bg-gray-50 rounded-lg">
              <AlertCircle className="w-6 h-6 text-gray-600" />
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-500">Inactive</h3>
            <p className="text-2xl font-semibold text-gray-900">
              {customers.filter((c) => c.status === "Inactive").length}
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <input
            type="text"
            placeholder="Search customers..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {uniqueLocations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={() => {
              setSearchText("");
              setStatusFilter("All Status");
              setLocationFilter("All Locations");
            }}
            className="px-4 py-2 border border-gray-300 rounded-md bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Desktop Table */}
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
              {filteredCustomers.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No customers found.
                  </td>
                </tr>
              ) : (
                filteredCustomers.map((customer) => (
                  <tr key={customer.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap flex items-center">
                      {customer.avatar ? (
                        <img
                          src={customer.avatar}
                          alt=""
                          className="w-10 h-10 rounded-full object-cover mr-3"
                        />
                      ) : (
                        <User className="w-10 h-10 p-1 text-white bg-gray-400 rounded-full mr-3" />
                      )}
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {customer.name}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {customer.location}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 flex items-center">
                        <Mail className="w-3 h-3 mr-1" /> {customer.email}
                      </div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <Phone className="w-3 h-3 mr-1" /> {customer.phone}
                      </div>
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />{" "}
                      {new Date(customer.joinDate).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(customer)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(customer.id)}
                          className="text-red-600 hover:text-red-900"
                        >
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

      {/* Mobile List */}
      <div className="block md:hidden space-y-4 bg-white shadow rounded-lg border border-gray-200">
        <div className="block md:hidden my-4">
          {filteredCustomers.length === 0 ? (
            <p className="px-6 py-4 text-center text-gray-500">
              No customers found.
            </p>
          ) : (
            filteredCustomers.map((customer) => (
              <div
                key={customer.id}
                className="bg-white mx-4 mb-4 rounded-lg shadow p-4 border border-gray-200"
              >
                <div className="flex items-center mb-2">
                  {customer.avatar ? (
                    <img
                      src={customer.avatar}
                      alt=""
                      className="w-10 h-10 rounded-full object-cover mr-3"
                    />
                  ) : (
                    <User className="w-10 h-10 p-1 text-white bg-gray-400 rounded-full mr-3" />
                  )}
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
                  <Mail className="w-3 h-3 mr-1" /> {customer.email}
                </div>
                <div className="text-sm text-gray-500 mb-1 flex items-center">
                  <Phone className="w-3 h-3 mr-1" /> {customer.phone}
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
                  <Calendar className="w-3 h-3 mr-1" />{" "}
                  {new Date(customer.joinDate).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
                <div className="flex flex-row-reverse gap-4">
                  <button
                    onClick={() => handleEdit(customer)}
                    className="text-green-600 hover:text-green-900"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(customer.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Form Modal */}
      {showForm && (
        <AddCustomersForm
          onClose={() => {
            setShowForm(false);
            setEditCustomer(null);
          }}
          onSubmit={handleAddOrUpdate}
          initialData={editCustomer}
        />
      )}
    </div>
  );
};

export default CustomersPage;
