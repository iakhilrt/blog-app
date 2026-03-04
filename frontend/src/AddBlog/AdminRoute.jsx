import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";

  // If admin logged in → allow access
  if (isAdminLoggedIn) {
    return children;
  }

  // Else → redirect to admin login
  return <Navigate to="/admin-login" replace />;
}

export default AdminRoute;
