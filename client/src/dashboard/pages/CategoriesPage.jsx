import { Edit2, Image as ImageIcon, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { categories as dummyCategories } from "../.."; // Replace with your categories data source
import AddCategoryForm from "../components/Forms/AddCategoryForm";

const CategoriesPage = () => {
  const [categories, setCategories] = useState(dummyCategories || []);
  const [showForm, setShowForm] = useState(false);
  const [editCategory, setEditCategory] = useState(null);

  const handleAddOrUpdate = (category) => {
    if (category.id) {
      setCategories((prev) =>
        prev.map((c) => (c.id === category.id ? category : c))
      );
    } else {
      const newCategory = {
        ...category,
        id: Date.now(),
      };
      setCategories((prev) => [...prev, newCategory]);
    }
    setShowForm(false);
    setEditCategory(null);
  };

  const handleEdit = (category) => {
    setEditCategory(category);
    setShowForm(true);
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col px-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage your product categories.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 flex space-x-3">
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </button>
        </div>
      </div>

      {/* Categories - Desktop Table */}
      <div className="hidden md:block bg-white shadow rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Categories</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  SKU
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {categories.length === 0 ? (
                <tr>
                  <td
                    colSpan={10}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    No Category found.
                  </td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {category.image ? (
                        <img
                          src={category.image}
                          alt={category.name}
                          className="h-12 w-12 object-cover rounded"
                        />
                      ) : (
                        <div className="h-12 w-12 flex items-center justify-center border rounded bg-gray-100 text-gray-400">
                          <ImageIcon className="h-6 w-6" />
                        </div>
                      )}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {category.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {category.sku || "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {category.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(category)}
                          className="text-blue-600 hover:text-blue-900"
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

      {/* Categories - Mobile Card View */}
      <div className="block md:hidden space-y-4 bg-white shadow rounded-lg border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Categories</h3>
        </div>

        {categories.length === 0 ? (
          <div>
            <p colSpan={10} className="px-6 py-4 text-center text-gray-500">
              No Category found.
            </p>
          </div>
        ) : (
          categories.map((category) => (
            <div
              key={category.id}
              className="bg-white mx-4 mb-4 rounded-lg shadow p-4 border border-gray-200"
            >
              {category.image ? (
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-32 w-full object-cover rounded-md mb-3"
                />
              ) : (
                <div className="h-32 w-full object-cover rounded-md mb-3 flex items-center justify-center border  bg-gray-100 text-gray-400">
                  <ImageIcon className="h-6 w-6" />
                </div>
              )}

              <div className="flex justify-between items-center mb-2">
                <h4 className="text-sm font-semibold text-gray-900">
                  {category.name}
                </h4>
              </div>
              <div className="text-sm text-gray-500 mb-1">
                <strong>SKU:</strong> {category.sku || "-"}
              </div>
              <div className="text-sm text-gray-500 mb-1">
                <strong>Description:</strong> {category.description}
              </div>
              <div className="flex flex-row-reverse gap-5 space-x-3 mt-2">
                <button className="text-red-600 hover:text-red-900 text-sm font-medium">
                  Delete
                </button>
                <button
                  onClick={() => handleEdit(category)}
                  className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                >
                  Edit
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal Form */}
      {showForm && (
        <AddCategoryForm
          isEdit={!!editCategory}
          categoryData={editCategory}
          onSubmit={handleAddOrUpdate}
          onClose={() => {
            setShowForm(false);
            setEditCategory(null);
          }}
        />
      )}
    </div>
  );
};

export default CategoriesPage;
