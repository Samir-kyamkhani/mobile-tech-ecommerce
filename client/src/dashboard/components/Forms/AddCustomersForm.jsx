import { useState } from "react";
import {
  Plus,
  X,
  Mail,
  User,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  CheckCircle,
} from "lucide-react";
import InputField from "../InputField";
import SelectField from "../SelectField";
import Button from "../Button";

const STATUS_OPTIONS = [
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
  { value: "VIP", label: "VIP" },
];

export default function AddCustomersForm({
  onSubmit,
  onClose,
  isEdit = false,
  customerData = {},
}) {
  const [form, setForm] = useState({
    id: customerData?.id || Date.now(),
    name: customerData?.name || "",
    email: customerData?.email || "",
    phone: customerData?.phone || "",
    location: customerData?.location || "",
    orders: customerData?.orders || 0,
    totalSpent: customerData?.totalSpent?.replace("$", "") || "",
    status: customerData?.status || "Active",
    joinDate: customerData?.joinDate || new Date().toISOString().slice(0, 10),
    avatar: customerData?.avatar || "👤",
    password: customerData?.password || "", // <-- Added this line
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: ["orders"].includes(name) ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      totalSpent: `$${parseFloat(form.totalSpent).toFixed(2)}`,
    };
    onSubmit(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">
              {isEdit ? "Edit Customer" : "Add Customer"}
            </h2>
            <p className="text-purple-100 text-sm mt-1">
              {isEdit ? "Update customer info" : "Fill out customer details"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto">
          <InputField
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="John Doe"
            icon={User}
          />

          <InputField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="john@example.com"
            icon={Mail}
          />
          <InputField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required={!isEdit} // only required on create
            placeholder="Enter a secure password"
          />

          <InputField
            label="Phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            required
            placeholder="+91 8696258578"
            icon={Phone}
          />

          <InputField
            label="Location"
            name="location"
            value={form.location}
            onChange={handleChange}
            required
            placeholder="India"
            icon={MapPin}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectField
              label="Status"
              name="status"
              value={form.status}
              onChange={handleChange}
              options={STATUS_OPTIONS}
              required
              icon={CheckCircle}
            />

            <InputField
              label="Join Date"
              name="joinDate"
              type="date"
              value={form.joinDate}
              onChange={handleChange}
              required
              icon={Calendar}
            />
          </div>
        </form>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row gap-3 sm:justify-between">
          <Button
            variant="close"
            onClick={onClose}
            className="px-4 py-2 rounded-full"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={handleSubmit}
            leftIcon={<Plus className="h-4 w-4" />}
            className="order-1 sm:order-2 flex-1 sm:flex-none"
          >
            {isEdit ? "Update Customer" : "Add Customer"}
          </Button>
        </div>
      </div>
    </div>
  );
}
