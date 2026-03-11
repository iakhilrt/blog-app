import { useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../api/axios";

function Signup() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1); // step 1 = form, step 2 = otp
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  // Send OTP
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
        text: `Check your email ${email} for the OTP 📧`,
        timer: 2000,
        showConfirmButton: false,
      });

      setStep(2); // move to OTP step

    } catch (error) {
      Swal.fire("Error", "Failed to send OTP! Try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP and Signup
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
        text: "You can now login 🎉",
        timer: 2000,
        showConfirmButton: false,
      }).then(() => navigate("/login"));

    } catch (error) {
      const message = error.response?.data?.message
        || error.response?.data
        || "Signup failed! Try again.";
      Swal.fire("Error", message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">

        <div className="signup-logo">✍️</div>
        <h2 className="signup-title">Create Account</h2>
        <p className="signup-subtitle">
          {step === 1 ? "Join our community today" : "Enter the OTP sent to your email"}
        </p>

        {/* Step 1 — Signup Form */}
        {step === 1 && (
          <form onSubmit={handleSendOtp}>
            <div className="input-group">
              <input type="text" value={name}
                onChange={(e) => setName(e.target.value)} required />
              <label>Full Name</label>
            </div>
            <div className="input-group">
              <input type="email" value={email}
                onChange={(e) => setEmail(e.target.value)} required />
              <label>Email Address</label>
            </div>
            <div className="input-group">
              <input type="password" value={password}
                onChange={(e) => setPassword(e.target.value)} required />
              <label>Password</label>
            </div>
            <div className="input-group">
              <input type="password" value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)} required />
              <label>Confirm Password</label>
            </div>
            <button className="signup-btn" type="submit" disabled={loading}>
              {loading ? "Sending OTP..." : "Send OTP 📧"}
            </button>
            <p className="signup-bottom">
              Already have an account?{" "}
              <Link className="login-link" to="/login">Login</Link>
            </p>
          </form>
        )}

        {/* Step 2 — OTP Verification */}
        {step === 2 && (
          <form onSubmit={handleSignup}>
            <div className="input-group">
              <input type="text" value={otp} maxLength={6}
                onChange={(e) => setOtp(e.target.value)} required />
              <label>Enter OTP</label>
            </div>
            <button className="signup-btn" type="submit" disabled={loading}>
              {loading ? "Verifying..." : "Verify & Create Account ✅"}
            </button>
            <p className="signup-bottom">
              Didn't receive OTP?{" "}
              <span className="login-link" style={{ cursor: "pointer" }}
                onClick={() => setStep(1)}>
                Go Back
              </span>
            </p>
          </form>
        )}

      </div>
    </div>
  );
}

export default Signup;