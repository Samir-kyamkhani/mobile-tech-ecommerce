import { Edit2, Package, Plus, Trash2 } from "lucide-react";
import AddProductsForm from "../components/Forms/AddProductsForm";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../../redux/slices/productSlice";

const ProductsPage = () => {
  const dispatch = useDispatch();
  const productState = useSelector((state) => state.product);
  const products = productState?.products || [];

  const [showForm, setShowForm] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch, productState.changed]);

  const handleAddOrUpdate = (product) => {
    if (editProduct) {
      dispatch(updateProduct({ id: editProduct.id, updatedData: product })).then(() =>
        dispatch(getAllProducts())
      );
    } else {
      dispatch(createProduct(product)).then(() => dispatch(getAllProducts()));
    }
    setShowForm(false);
    setEditProduct(null);
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    dispatch(deleteProduct(id)).then(() => dispatch(getAllProducts()));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800";
      case "Out of Stock":
        return "bg-red-100 text-red-800";
      case "Draft":
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col px-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your product inventory and catalog.</p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Product
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select className="px-3 py-2 border border-gray-300 rounded-md">
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Clothing</option>
            <option>Footwear</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-md">
            <option>All Status</option>
            <option>Active</option>
            <option>Out of Stock</option>
            <option>Draft</option>
          </select>
        </div>
      </div>

      {/* Products - Desktop Table */}
      <div className="hidden md:block bg-white shadow rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Products</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-gray-500">No Products found.</td>
                </tr>
              ) : (
                products.map((product) => {
                  if (!product) return null;
                  return (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {product?.image && (
                            <img
                              src={`${import.meta.env.VITE_API_BASE_URL_For_Image}${product.image}`}
                              alt={product?.name || "Product"}
                              className="w-14 h-14 rounded-lg object-cover mr-3"
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.style.display = "none";
                                e.currentTarget.nextSibling.style.display = "flex";
                              }}
                            />
                          )}
                          <Package
                            className="w-10 h-10 p-1 text-white bg-gray-400 rounded-full mr-3 flex-shrink-0"
                            style={{ display: product?.image ? "none" : "flex" }}
                          />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{product?.name || "Unnamed"}</div>
                            <div className="text-sm text-gray-500">ID: {product?.id || "-"}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {product?.category?.name || "Uncategorized"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">₹{product?.price ?? "0"}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{product?.stock ?? "0"}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(product?.status)}`}>
                          {product?.status || "Draft"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">
                        <div className="flex space-x-2">
                          <button onClick={() => handleEdit(product)} className="text-blue-600 hover:text-blue-900">
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-900">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Products - Mobile Card View */}
      <div className="block md:hidden space-y-4 bg-white shadow rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Products</h3>
        </div>
        {products.length === 0 ? (
          <p className="px-6 py-4 text-center text-gray-500">No Products found.</p>
        ) : (
          products.map((product) => {
            if (!product) return null;
            return (
              <div key={product.id} className="bg-white mx-4 mb-4 rounded-lg shadow p-4 border border-gray-200">
                <div className="flex items-center mb-2">
                  <div className="relative w-12 h-12 mr-3 flex-shrink-0">
                    {product?.image && (
                      <img
                        src={`${import.meta.env.VITE_API_BASE_URL_For_Image}${product.image}`}
                        alt={product?.name || "Product"}
                        className="w-12 h-12 rounded-lg object-cover absolute top-0 left-0"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.style.display = "none";
                          const fallback = e.currentTarget.parentNode.querySelector(".fallback-icon");
                          if (fallback) fallback.style.display = "flex";
                        }}
                      />
                    )}
                    <Package
                      className="fallback-icon w-12 h-12 p-1 text-white bg-gray-400 rounded-full absolute top-0 left-0"
                      style={{ display: product?.image ? "none" : "flex" }}
                    />
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900">{product?.name || "Unnamed"}</h4>
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(product?.status)}`}>
                  {product?.status || "Draft"}
                </span>
                <div className="text-sm text-gray-500 mb-1">
                  <strong>Category:</strong> {product?.category?.name || "Uncategorized"}
                </div>
                <div className="text-sm text-gray-500 mb-1">
                  <strong>Price:</strong> ₹{product?.price ?? "0"}
                </div>
                <div className="text-sm text-gray-500 mb-1">
                  <strong>Stock:</strong> {product?.stock ?? "0"}
                </div>
                <div className="flex flex-row-reverse gap-5 space-x-3 mt-2">
                  <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:text-red-900 text-sm font-medium">Delete</button>
                  <button onClick={() => handleEdit(product)} className="text-blue-600 hover:text-blue-900 text-sm font-medium">Edit</button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal Form */}
      {showForm && (
        <AddProductsForm
          isEdit={!!editProduct}
          productData={editProduct}
          onSubmit={handleAddOrUpdate}
          onClose={() => {
            setShowForm(false);
            setEditProduct(null);
          }}
        />
      )}
    </div>
  );
};

export default ProductsPage;
