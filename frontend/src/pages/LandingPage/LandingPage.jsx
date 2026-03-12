import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="landing-page">

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-bg-grid"></div>
        <div className="hero-orb hero-orb-1"></div>
        <div className="hero-orb hero-orb-2"></div>
        <div className="hero-orb hero-orb-3"></div>

        <div className="hero-content">
          <div className="hero-badge">✦ A New Way to Write</div>
          <h1>
            Where Great<br />
            <span className="hero-highlight">Stories Live</span>
          </h1>
          <p>
            Inkwell is a modern blogging platform for thinkers and writers.
            Create, share, and discover stories that matter.
          </p>
          <div className="hero-buttons">
            <Link to="/add-blog" className="hero-btn-primary">
              Start Writing <span className="btn-arrow">→</span>
            </Link>
            <Link to="/viewblog" className="hero-btn-secondary">
              Explore Blogs
            </Link>
          </div>
        </div>

        <div className="hero-cards">
          <div className="floating-card card-1">
            <span className="card-icon">✍️</span>
            <span>New story published</span>
          </div>
          <div className="floating-card card-2">
            <span className="card-icon">🔥</span>
            <span>Trending today</span>
          </div>
          <div className="floating-card card-3">
            <span className="card-icon">💡</span>
            <span>Share your ideas</span>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features-section">
        <div className="features-inner">
          <div className="section-header">
            <span className="section-tag">Why Inkwell</span>
            <h2>Built for writers,<br />loved by readers</h2>
          </div>
          <div className="features-grid">
            <div className="feature-card feature-large">
              <div className="feature-icon-wrap">✍️</div>
              <h3>Effortless Blogging</h3>
              <p>Create beautiful blogs with a title, image, and rich description in seconds. No complexity — just write.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrap">🔒</div>
              <h3>Secure by Default</h3>
              <p>JWT authentication with Spring Boot Security keeps your account protected at all times.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrap">⚡</div>
              <h3>Fast & Reliable</h3>
              <p>Spring Boot backend with MySQL ensures your blogs load instantly, every time.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon-wrap">📱</div>
              <h3>Looks Great Everywhere</h3>
              <p>Fully responsive — perfect on mobile, tablet, and desktop.</p>
            </div>
            <div className="feature-card feature-large">
              <div className="feature-icon-wrap">🛡️</div>
              <h3>Powerful Admin Panel</h3>
              <p>Full admin dashboard to manage all blogs and users with complete control over the platform.</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="steps-section">
        <div className="steps-inner">
          <div className="section-header light">
            <span className="section-tag gold">How It Works</span>
            <h2>Up and writing<br />in 3 steps</h2>
          </div>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-num">01</div>
              <div className="step-line"></div>
              <h3>Create Account</h3>
              <p>Sign up with OTP email verification — secure and instant.</p>
            </div>
            <div className="step-card">
              <div className="step-num">02</div>
              <div className="step-line"></div>
              <h3>Write Your Blog</h3>
              <p>Add a title, upload an image, and pour your thoughts in.</p>
            </div>
            <div className="step-card">
              <div className="step-num">03</div>
              <div className="step-line"></div>
              <h3>Go Live Instantly</h3>
              <p>Your blog publishes immediately — share it with the world.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-section">
        <div className="cta-orb"></div>
        <div className="cta-content">
          <span className="section-tag gold">Ready?</span>
          <h2>Your story deserves<br />to be told</h2>
          <p>Join Inkwell and start writing today. It's completely free.</p>
          <Link to="/signup" className="hero-btn-primary large">
            Create Free Account <span className="btn-arrow">→</span>
          </Link>
        </div>
      </section>

    </div>
  );
}

export default LandingPage;