import { useState } from "react";
import { X, Plus, FileText, Tag } from "lucide-react";
import InputField from "../InputField";
import Button from "../Button";
import ImageUpload from "../ImageUpload";

export default function AddCategoryForm({
  onSubmit,
  onClose,
  isEdit = false,
  categoryData = {},
}) {
  const [form, setForm] = useState({
    id: categoryData?.id || null,
    name: categoryData?.name || "",
    sku: categoryData?.sku || "",
    description: categoryData?.description || "",
    image: categoryData?.image || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // If the user is typing the category name, auto-generate SKU
    if (name === "name") {
      const generatedSku = value
        .trim()
        .toLowerCase()
        .replace(/\s+/g, "-") // Replace spaces with underscores
        .slice(0, 15); // Limit SKU length

      setForm((prev) => ({
        ...prev,
        [name]: value,
        sku: generatedSku,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex min-h-screen items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">
              {isEdit ? "Edit Category" : "Add Category"}
            </h2>
            <p className="text-purple-100 text-sm mt-1">
              {isEdit ? "Update category info" : "Fill out category details"}
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
            label="Category Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="e.g., Electronics"
          />

          <InputField
            label="SKU"
            name="sku"
            value={form.sku}
            onChange={handleChange}
            placeholder="e.g., ELEC001"
            icon={Tag}
          />

          <InputField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
            placeholder="e.g., Devices, gadgets, etc."
            icon={FileText}
          />

          <ImageUpload
            label="Category Image"
            name="image"
            value={form.image}
            onChange={handleChange}
          />
        </form>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row gap-3 sm:justify-between">
          <Button variant="close" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            type="submit"
            onClick={handleSubmit}
            leftIcon={<Plus className="h-4 w-4" />}
          >
            {isEdit ? "Update Category" : "Add Category"}
          </Button>
        </div>
      </div>
    </div>
  );
}
