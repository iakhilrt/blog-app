import { useState } from "react";
import "./Signup.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../api/axios";

function Signup() {
  const navigate = useNavigate();

  if (localStorage.getItem("isLoggedIn") === "true") {
    return <Navigate to="/viewblog" replace />;
  }

  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      Swal.fire("Oops!", "Please fill all fields!", "warning");
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire("Oops!", "Passwords do not match!", "warning");
      return;
    }

    setLoading(true);
    try {
      await api.post("/api/auth/send-otp", { email });

      Swal.fire({
        icon: "success",
        title: "OTP Sent!",
        text: `Check ${email} for your code 📧`,
        timer: 2000,
        showConfirmButton: false,
      });

      setStep(2);
    } catch (error) {
      Swal.fire("Error", "Failed to send OTP! Try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!otp) {
      Swal.fire("Oops!", "Please enter the OTP!", "warning");
      return;
    }

    setLoading(true);
    try {
      await api.post("/api/auth/signup", { name, email, password, otp });

      Swal.fire({
        icon: "success",
        title: "Account Created!",
        text: "You can now sign in 🎉",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => navigate("/login"));

    } catch (error) {
      const message =
        error.response?.data?.message ||
        error.response?.data ||
        "Signup failed! Try again.";
      Swal.fire("Error", message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">

        <div className="signup-logo">
          <span className="signup-logo-star">✦</span>
          Inkwell
        </div>

        <h2 className="signup-title">
          {step === 1 ? "Create Account" : "Verify Email"}
        </h2>
        <p className="signup-subtitle">
          {step === 1 ? "Join the Inkwell community" : `OTP sent to ${email}`}
        </p>

        {/* Step dots */}
        <div className="step-indicator">
          <div className={`step-dot ${step === 1 ? "active" : ""}`}></div>
          <div className={`step-dot ${step === 2 ? "active" : ""}`}></div>
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <form className="signup-form" onSubmit={handleSendOtp}>
            <div className="input-group">
              <input type="text" value={name}
                onChange={(e) => setName(e.target.value)} required placeholder=" " />
              <label>Full Name</label>
            </div>
            <div className="input-group">
              <input type="email" value={email}
                onChange={(e) => setEmail(e.target.value)} required placeholder=" " />
              <label>Email Address</label>
            </div>
            <div className="input-group">
              <input type="password" value={password}
                onChange={(e) => setPassword(e.target.value)} required placeholder=" " />
              <label>Password</label>
            </div>
            <div className="input-group">
              <input type="password" value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} required placeholder=" " />
              <label>Confirm Password</label>
            </div>
            <button className="signup-btn" type="submit" disabled={loading}>
              {loading ? "Sending OTP..." : "Send OTP →"}
            </button>
            <p className="signup-bottom">
              Already have an account?{" "}
              <Link className="login-link" to="/login">Sign in</Link>
            </p>
          </form>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <form className="signup-form" onSubmit={handleSignup}>
            <div className="input-group">
              <input
                type="text"
                className="otp-input"
                value={otp}
                maxLength={6}
                onChange={(e) => setOtp(e.target.value)}
                required
                placeholder="······"
              />
            </div>
            <button className="signup-btn" type="submit" disabled={loading}>
              {loading ? "Verifying..." : "Verify & Create Account ✅"}
            </button>
            <p className="signup-bottom">
              Didn't get the code?{" "}
              <span className="login-link" onClick={() => setStep(1)}>
                Go back
              </span>
            </p>
          </form>
        )}

      </div>
    </div>
  );
}

export default Signup;