import "../AddBlog/Login.css"
import { Link } from "react-router-dom"
import Swal from "sweetalert2"

function Login() {

  function handleLogin(e) {
    e.preventDefault();

    const form = e.target;
    const enteredEmail = form.email.value.trim();
    const enteredPassword = form.password.value;

    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");

    if (!enteredEmail || !enteredPassword) {
      Swal.fire("Oops!", "Please fill all fields!", "warning");
      return;
    }

    if (enteredEmail !== savedEmail) {
      Swal.fire("Error", "Email not found!", "error");
      return;
    }

    if (enteredPassword !== savedPassword) {
      Swal.fire("Error", "Incorrect password!", "error");
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Login Successful!",
      text: "Welcome back 🎉",
      timer: 2500,
      showConfirmButton: false,
    });
    localStorage.setItem("isLoggedIn", "true");
    window.dispatchEvent(new Event("login-status-changed"));

    form.reset();
  }
  return (
    <div className="login-page">

      <div className="login-card">

        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Login to continue</p>

        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input type="email" name="email" required />
            <label>Email</label>
          </div>

          <div className="input-group">
            <input type="password" name="password" required />
            <label>Password</label>
          </div>

          <button className="login-btn" type="submit">Login</button>

          <p className="login-bottom">
            Don’t have an account? <Link className="signup-link" to="/signup">Sign Up</Link>
          </p>
        </form>

      </div>

    </div>
  )
}

export default Login
