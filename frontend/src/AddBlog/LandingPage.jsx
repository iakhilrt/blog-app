import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="landing-page">

      {/* HERO SECTION */}
      <section className="hero-section">
        <h1>Share Your Stories With The World</h1>
        <p>
          A simple and modern blog platform built with React.
          Create, manage, and explore blogs easily.
        </p>

        <div className="hero-buttons">
          <Link to="/signup" className="btn-primary">Get Started</Link>
          <Link to="/viewblog" className="btn-secondary">View Blogs</Link>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features-section">
        <h2>Why Choose Our Blog Platform?</h2>

        <div className="features-grid">
          <div className="feature-card">
            <h3>✍️ Easy Blogging</h3>
            <p>Create blogs with title, image, and description in seconds.</p>
          </div>

          <div className="feature-card">
            <h3>🔒 Secure Login</h3>
            <p>Signup & login system using LocalStorage authentication.</p>
          </div>

          <div className="feature-card">
            <h3>🎨 Modern UI</h3>
            <p>Glassmorphism design with smooth animations and clean layout.</p>
          </div>

          <div className="feature-card">
            <h3>📱 Responsive</h3>
            <p>Fully responsive design for mobile, tablet, and desktop.</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="steps-section">
        <h2>How It Works</h2>

        <div className="steps">
          <div className="step">1️⃣ Sign Up / Login</div>
          <div className="step">2️⃣ Add Your Blog</div>
          <div className="step">3️⃣ View & Share</div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta-section">
        <h2>Start Blogging Today</h2>
        <p>Join our platform and express your ideas freely.</p>
        <Link to="/signup" className="btn-primary">Create Account</Link>
      </section>

    </div>
  );
}

export default LandingPage;
