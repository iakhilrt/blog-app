import { useState } from "react";
import Swal from "sweetalert2";
import "./AdminLogin.css";
import { useNavigate } from "react-router-dom";

function AdminLogin() {
const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAdminLogin = (e) => {
    e.preventDefault();

    if (email === "admin@yourblog.com" && password === "admin123") {
      localStorage.setItem("isAdminLoggedIn", "true");

      Swal.fire({
        icon: "success",
        title: "Admin Login Successful",
        timer: 1500,
        showConfirmButton: false,
      })
      .then(() => {
        navigate("/admin-dashboard");
      });

    } else {
      Swal.fire("Error", "Invalid admin credentials", "error");
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-card">
        <h2>Admin Login</h2>

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

          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
