import { Settings, Shield } from "lucide-react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { resetPassword, updateAdmin } from "../../redux/slices/authSlice";

const SettingsPage = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("general");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  });

  const [passwordFormData, setPasswordFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        location: user.location || "",
      });
    }
  }, [user]);

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUserDetailsSubmit = (e) => {
    e.preventDefault();
    dispatch(updateAdmin(formData));
  };

  const handleResetPasswordSubmit = (e) => {
    e.preventDefault();

    dispatch(resetPassword(passwordFormData)).then(() => {
      setPasswordFormData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    });
  };

  const handleCancel = () => {
    if (activeTab === "general") {
      setFormData({
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        location: user?.location || "",
      });
    } else if (activeTab === "security") {
      setPasswordFormData({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    }
  };

  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "security", label: "Security", icon: Shield },
  ];

  return (
    <div className="p-4 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your account and application preferences.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="lg:w-64">
          <div className="bg-white rounded-lg shadow border border-gray-200">
            <nav className="space-y-1 p-2">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                    activeTab === id
                      ? "bg-blue-50 text-blue-700 border-blue-200"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Panel */}
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow border border-gray-200">
            {activeTab === "general" && (
              <form onSubmit={handleUserDetailsSubmit} className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">
                  General Settings
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {["name", "email", "phone", "location"].map((field) => (
                    <div key={field}>
                      <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                        {field}
                      </label>
                      <input
                        name={field}
                        type={field === "email" ? "email" : "text"}
                        value={formData[field]}
                        onChange={handleFormInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  ))}

                  {/* Read-Only Fields */}
                  {[
                    { label: "Role", value: user?.role },
                    { label: "Status", value: user?.status },
                    {
                      label: "Join Date",
                      value: user?.joinDate
                        ? new Date(user.joinDate).toLocaleString()
                        : "",
                    },
                    {
                      label: "Last Login",
                      value: user?.lastLogin
                        ? new Date(user.lastLogin).toLocaleString()
                        : "",
                    },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {label}
                      </label>
                      <input
                        type="text"
                        value={value || ""}
                        disabled
                        className="w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-gray-600"
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}

            {activeTab === "security" && (
              <form onSubmit={handleResetPasswordSubmit} className="p-6">
                <h2 className="text-lg font-medium text-gray-900 mb-6">
                  Security Settings
                </h2>

                <div className="space-y-6">
                  {[
                    { name: "currentPassword", label: "Current Password" },
                    { name: "newPassword", label: "New Password" },
                    {
                      name: "confirmNewPassword",
                      label: "Confirm New Password",
                    },
                  ].map(({ name, label }) => (
                    <div key={name}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {label}
                      </label>
                      <input
                        name={name}
                        value={passwordFormData[name]}
                        onChange={handlePasswordInputChange}
                        type="password"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
