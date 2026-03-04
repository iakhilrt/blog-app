import { useState } from "react";
import Swal from "sweetalert2";
import "./AdminLogin.css";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await api.post("/api/auth/login", { email, password });

      if (data.role !== "ADMIN") {
        Swal.fire("Access Denied", "You are not an admin!", "error");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      localStorage.setItem("name", data.name);
      localStorage.setItem("isAdminLoggedIn", "true");

      Swal.fire({
        icon: "success",
        title: "Admin Login Successful",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => navigate("/admin-dashboard"));

    } catch (error) {
      Swal.fire("Error", "Invalid admin credentials", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">

        <div className="admin-login-icon">🛡️</div>
        <h2>Admin Login</h2>
        <p className="admin-login-subtitle">Restricted access only</p>

        <form onSubmit={handleAdminLogin}>
          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Admin Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

      </div>
    </div>
  );
}

export default AdminLogin;