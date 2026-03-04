import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../api/axios";

function Signup() {
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const confirm = form.confirm.value;

    if (!name || !email || !password) {
      Swal.fire("Oops!", "Please fill all fields!", "warning");
      return;
    }

    if (password !== confirm) {
      Swal.fire("Error", "Passwords do not match!", "error");
      return;
    }

    if (password.length < 6) {
      Swal.fire("Error", "Password must be at least 6 characters!", "error");
      return;
    }

    try {
      await api.post("/api/auth/signup", { name, email, password });

      Swal.fire({
        title: "Account Created!",
        text: "Your signup was successful 🎉",
        icon: "success",
        timer: 2500,
        timerProgressBar: true,
        showConfirmButton: false,
        background: "#fefefe",
      }).then(() => navigate("/login"));

      form.reset();

    } catch (error) {
      Swal.fire(
        "Error",
        error.response?.data || "Signup failed! Try again.",
        "error"
      );
    }
  }

  return (
    <div className="signup-page">
      <div className="signup-card">

        <div className="signup-logo">✍️</div>
        <h2 className="signup-title">Create Account</h2>
        <p className="signup-subtitle">Join us — it only takes a minute</p>

        <form className="signup-form" onSubmit={handleSubmit}>

          <div className="input-group">
            <input type="text" id="name" name="name" required />
            <label htmlFor="name">Full Name</label>
          </div>

          <div className="input-group">
            <input type="email" id="email" name="email" required />
            <label htmlFor="email">Email Address</label>
          </div>

          <div className="input-group">
            <input type="password" id="password" name="password" minLength="6" required />
            <label htmlFor="password">Password</label>
          </div>

          <div className="input-group">
            <input type="password" id="confirm" name="confirm" minLength="6" required />
            <label htmlFor="confirm">Confirm Password</label>
          </div>

          <button className="signup-btn" type="submit">
            Create Account
          </button>

          <p className="signup-bottom">
            Already have an account?{" "}
            <Link className="login-link" to="/login">Login</Link>
          </p>

        </form>
      </div>
    </div>
  );
}

export default Signup;