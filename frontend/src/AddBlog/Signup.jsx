import "./Signup.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2"

function Signup() {

    function handleSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const savedNameUp = form.name.value.trim();
        const savedEmailUp = form.email.value.trim();
        const savedPasswordUp = form.password.value;
        const savedConfirmUp = form.confirm.value;

        if (!savedNameUp || !savedEmailUp || !savedPasswordUp) {
            Swal.fire("Oops!", "Please fill all fields!", "warning");
            return;
        }

        if (savedPasswordUp !== savedConfirmUp) {
            Swal.fire("Error", "Passwords do not match!", "error");
            return;
        }

        // Save user
        localStorage.setItem("username", savedNameUp);
        localStorage.setItem("email", savedEmailUp);
        localStorage.setItem("password", savedPasswordUp);

        // Stylish success popup
        Swal.fire({
            title: "Account Created!",
            text: "Your signup was successful 🎉",
            icon: "success",
            timer: 2500,
            timerProgressBar: true,
            showConfirmButton: false,
            background: "#fefefe",
        });

        form.reset();
    }

    return (
        <div className="signup-page">

            <div className="signup-card">

                <h2 className="signup-title">Create Account</h2>
                <p className="signup-subtitle">Join us — it only takes a minute</p>

                <form className="signup-form" onSubmit={handleSubmit}>

                    <div className="input-group">
                        <input type="text" id="name" name="name" required />
                        <label htmlFor="name">Full name</label>
                    </div>

                    <div className="input-group">
                        <input type="email" id="email" name="email" required />
                        <label htmlFor="email">Email</label>
                    </div>

                    <div className="input-group">
                        <input type="password" id="password" name="password" minLength="6" required />
                        <label htmlFor="password">Password</label>
                    </div>

                    <div className="input-group">
                        <input type="password" id="confirm" name="confirm" minLength="6" required />
                        <label htmlFor="confirm">Confirm Password</label>
                    </div>

                    <button className="signup-btn" type="submit">Sign Up</button>

                    <p className="signup-bottom">
                        Already have an account? <Link className="login-link" to="/login">Login</Link>
                    </p>
                </form>

            </div>

        </div>
    );
}

export default Signup;
