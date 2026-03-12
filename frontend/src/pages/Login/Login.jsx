import "./Login.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../api/axios";

function Login() {
  const navigate = useNavigate();

  if (localStorage.getItem("isLoggedIn") === "true") {
    return <Navigate to="/viewblog" replace />;
  }

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
        title: "Welcome back!",
        text: `Good to see you, ${data.name} 🎉`,
        timer: 2000,
        showConfirmButton: false,
      }).then(() => {
        if (data.role === "ADMIN") {
          navigate("/admin-dashboard");
        } else {
          navigate("/viewblog");
        }
      });

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

        <div className="login-logo">
          <span className="login-logo-star">✦</span>
          Inkwell
        </div>
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Sign in to continue writing</p>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input type="email" name="email" required placeholder=" " />
            <label>Email Address</label>
          </div>

          <div className="input-group">
            <input type="password" name="password" required placeholder=" " />
            <label>Password</label>
          </div>

          <button className="login-btn" type="submit">
            Sign In →
          </button>

          <p className="login-bottom">
            Don't have an account?{" "}
            <Link className="signup-link" to="/signup">Create one</Link>
          </p>
        </form>

      </div>
    </div>
  );
}

export default Login;