import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../api/axios";

function Login() {
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value.trim();
    const password = form.password.value;

    if (!email || !password) {
      Swal.fire("Oops!", "Please fill all fields!", "warning");
      return;
    }

    try {
      const { data } = await api.post("/api/auth/login", { email, password });

      localStorage.setItem("token", data.token);
      localStorage.setItem("name", data.name);
      localStorage.setItem("email", data.email);
      localStorage.setItem("role", data.role);
      localStorage.setItem("isLoggedIn", "true");

      window.dispatchEvent(new Event("login-status-changed"));

      Swal.fire({
        icon: "success",
        title: "Login Successful!",
        text: `Welcome back, ${data.name} 🎉`,
        timer: 2500,
        showConfirmButton: false,
      }).then(() => navigate("/viewblog"));

      form.reset();

    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data || "Login failed! Try again.",
        "error"
      );
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">

        <div className="login-logo">👋</div>
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Login to continue</p>

        <form onSubmit={handleLogin}>

          <div className="input-group">
            <input type="email" name="email" required />
            <label>Email Address</label>
          </div>

          <div className="input-group">
            <input type="password" name="password" required />
            <label>Password</label>
          </div>

          <button className="login-btn" type="submit">Login</button>

          <p className="login-bottom">
            Don't have an account?{" "}
            <Link className="signup-link" to="/signup">Sign Up</Link>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Login;