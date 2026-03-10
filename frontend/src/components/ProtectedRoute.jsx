import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const token = localStorage.getItem("token");

  // If not logged in → redirect to login
  if (!isLoggedIn || !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;