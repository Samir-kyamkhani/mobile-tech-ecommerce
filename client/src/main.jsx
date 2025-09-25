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
import HomePage from "./landingPages/pages/HomePage.jsx";
import ShopPage from "./landingPages/pages/ShopPage.jsx";
import CheckoutPage from "./landingPages/pages/CheckoutPage.jsx";
import SupportPage from "./landingPages/pages/SupportPage.jsx";
import LoginPage from "./landingPages/pages/auth/LoginPage.jsx";
import UserProfilePage from "./landingPages/pages/UserProfilePage.jsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import ProtectedRoute from "./layouts/ProtectedRoute.jsx";
import ResponsiveToastContainer from "./layouts/ResponsiveToastContainer.jsx";
import ProductDetailsPage from "./landingPages/pages/ProductDetailsPage.jsx";
import NotFoundPage from "./landingPages/pages/NotFoundPage.jsx";
import LedgerPage from "./dashboard/pages/LedgerPage.jsx";
import SignupPage from "./landingPages/pages/auth/SignupPage.jsx";
import PolicyPages from "./landingPages/pages/PolicyPages.jsx";
import CancellationReturnsPage from "./landingPages/pages/CancellationReturnsPage.jsx";
import TermsOfUsePage from "./landingPages/pages/TermsOfUsePage.jsx";
import PrivacyPolicyPage from "./landingPages/pages/PrivacyPolicyPage.jsx";
import ShippingPolicyPage from "./landingPages/pages/ShippingPolicyPage.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public Routes */}
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/" element={<LandingPageLayout />}>
        <Route index element={<HomePage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="shop/:id" element={<ShopPage />} />
        <Route path="shop-product/:id" element={<ProductDetailsPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="support" element={<SupportPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        {/* <Route path="policy" element={<PolicyPages />} /> */}

        <Route
          path="refund-and-cancellation"
          element={<CancellationReturnsPage />}
        />
        <Route path="terms-of-use" element={<TermsOfUsePage />} />
        <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="shipping-policy" element={<ShippingPolicyPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="profile" element={<UserProfilePage />} />
        </Route>
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="ledger" element={<LedgerPage />} />
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
