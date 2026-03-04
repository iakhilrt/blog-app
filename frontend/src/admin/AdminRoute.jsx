import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
  const role = localStorage.getItem("role");

  if (isAdminLoggedIn && role === "ADMIN") {
    return children;
  }

  return <Navigate to="/admin-login" replace />;
}

export default AdminRoute;