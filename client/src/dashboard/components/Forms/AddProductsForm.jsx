import { useState } from "react";
import { Plus, X, Layers, DollarSign, CheckCircle, Star } from "lucide-react";
import InputField from "../InputField";
import SelectField from "../SelectField";
import Button from "../Button";
import ImageUpload from "../ImageUpload";

const CATEGORY_OPTIONS = [
  { value: "Electronics", label: "Electronics" },
  { value: "Footwear", label: "Footwear" },
  { value: "Clothing", label: "Clothing" },
];

const STATUS_OPTIONS = [
  { value: "Active", label: "Active" },
  { value: "Out of Stock", label: "Out of Stock" },
];

export default function AddProductsForm({
  onSubmit,
  onClose,
  isEdit = false,
  productData = {},
}) {
  const [form, setForm] = useState({
    id: productData?.id || null,
    name: productData?.name || "",
    category: productData?.category || "",
    price: productData?.price?.replace("$", "") || "",
    stock: productData?.stock || 0,
    status: productData?.status || "Active",
    image: productData?.image || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: ["stock"].includes(name) ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      price: `$${parseFloat(form.price).toFixed(2)}`,
    };
    onSubmit(payload);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex min-h-screen items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] md:max-h-[95vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">
              {isEdit ? "Edit Product" : "Add Product"}
            </h2>
            <p className="text-green-100 text-sm mt-1">
              {isEdit ? "Update product info" : "Fill out product details"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto">
          <InputField
            label="Product Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="MacBook Air"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SelectField
              label="Category"
              name="category"
              value={form.category}
              onChange={handleChange}
              options={CATEGORY_OPTIONS}
              required
              icon={Layers}
            />

            <SelectField
              label="Status"
              name="status"
              value={form.status}
              onChange={handleChange}
              options={STATUS_OPTIONS}
              required
              icon={CheckCircle}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            <InputField
              label="Price ($)"
              name="price"
              type="number"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              required
              icon={DollarSign}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField
              label="Stock"
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              required
            />
            <ImageUpload
              label="Product Image"
              value={form.image}
              name="image"
              onChange={handleChange}
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
            {isEdit ? "Update Product" : "Add Product"}
          </Button>
        </div>
      </div>
    </div>
  );
}
