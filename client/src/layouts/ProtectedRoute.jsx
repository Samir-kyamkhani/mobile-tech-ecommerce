import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthenticated, getUserRole } from "../setting.js";

export default function ProtectedRoute() {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  const role = getUserRole();
  const currentPath = location.pathname;

  const restrictedRoutes = {
    Customer: ["/dashboard"],
    Admin: ["/profile"],
  };

  const redirectPaths = {
    Customer: "/",
    Admin: "/dashboard",
  };

  const isRestricted = restrictedRoutes[role]?.includes(currentPath);

  if (isRestricted) {
    return <Navigate to={redirectPaths[role]} replace />;
  }

  return <Outlet />;
}
