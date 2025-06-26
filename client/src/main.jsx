import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import Dashboard from "./dashboard/pages/Dashboard.jsx";
import CustomersPage from "./dashboard/pages/CustomersPage.jsx";
import SettingsPage from "./dashboard/pages/SettingsPage.jsx";
import ProductsPage from "./dashboard/pages/ProductsPage.jsx";
import OrdersPage from "./dashboard/pages/OrdersPage.jsx";
import CategoriesPage from "./dashboard/pages/CategoriesPage.jsx";
import LandingPageLayout from "./layouts/LandingPageLayout.jsx";
import HomePage from "./landing pages/pages/HomePage.jsx";
import ShopPage from "./landing pages/pages/ShopPage.jsx";
import CheckoutPage from "./landing pages/pages/CheckoutPage.jsx";
import SupportPage from "./landing pages/pages/sUPPORTpAGE.JSX";
import LoginPage from "./landing pages/pages/auth/LoginPage.jsx";
import UserProfilePage from "./landing pages/pages/UserProfilePage.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import ProtectedRoute from "./layouts/ProtectedRoute.jsx";
import ResponsiveToastContainer from "./layouts/ResponsiveToastContainer.jsx";
import ProductDetailsPage from "./landing pages/pages/ProductDetailsPage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public Routes */}
      <Route path="/" element={<LandingPageLayout />}>
        <Route index element={<HomePage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="shop/:id" element={<ShopPage />} />
        <Route path="shop-product/:id" element={<ProductDetailsPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="support" element={<SupportPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="profile" element={<UserProfilePage />} />
        </Route>
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="orders" element={<OrdersPage />} />
        </Route>
      </Route>
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ResponsiveToastContainer />
    <RouterProvider router={router} />
  </Provider>
);
