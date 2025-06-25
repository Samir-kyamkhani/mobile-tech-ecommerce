import { useEffect, useState } from "react";
import { Plus, X, Layers, CheckCircle, IndianRupee } from "lucide-react";
import InputField from "../InputField";
import SelectField from "../SelectField";
import Button from "../Button";
import ImageUpload from "../ImageUpload";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategories } from "../../../redux/slices/categorySlice";

const STATUS_OPTIONS = [
  { value: "Active", label: "Active" },
  { value: "Out_of_Stock", label: "Out of Stock" },
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
    categoryId: productData?.category || "",
    price: productData?.price?.replace("$", "") || "",
    stock: productData?.stock || 0,
    status: productData?.status || "Active",
    image: productData?.image || "",
  });

  const categoryState = useSelector((state) => state.category);
  const categories = categoryState?.categories || [];

  const formattedCategories = categories.map((cat) => ({
    value: cat.id,
    // value: cat.name,
    label: cat.name,
  }));

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files && files[0]) {
      setForm((prev) => ({
        ...prev,
        image: files[0],
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: name === "stock" ? parseFloat(value) || 0 : value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      price: parseFloat(form.price).toFixed(2),
    };

    const formData = new FormData();
    formData.append("name", payload.name);
    formData.append("categoryid", payload.categoryId);
    formData.append("price", payload.price);
    formData.append("stock", payload.stock);
    formData.append("status", payload.status);
    if (payload.image && typeof payload.image !== "string") {
      formData.append("image", payload.image);
    }

    onSubmit(formData);
    onClose();
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

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
        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-6 overflow-y-auto flex-grow flex flex-col justify-between"
        >
          <div className="space-y-6">
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
                name="categoryId"
                value={form.categoryId}
                onChange={handleChange}
                options={formattedCategories}
                required
                icon={Layers}
              />

              <SelectField
                label="Status"
                name="status"
                value={form.status }
                onChange={handleChange}
                options={STATUS_OPTIONS}
                required
                icon={CheckCircle}
              />
            </div>

            <InputField
              label="Price (₹)"
              name="price"
              type="number"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              required
              icon={IndianRupee}
            />

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
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row gap-3 sm:justify-between">
            <Button
              variant="close"
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full"
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              type="submit"
              leftIcon={<Plus className="h-4 w-4" />}
              className="order-1 sm:order-2 flex-1 sm:flex-none"
            >
              {isEdit ? "Update Product" : "Add Product"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
