import "../AddBlog/About.css"

function About() {
  return (
    <div className="about-section">
  <div className="container">
    
    <div className="row align-items-center">

      {/* Left Side Image */}
      <div className="col-md-6">
        <img
          src="https://images.unsplash.com/photo-1532619187608-e5375cab36aa"
          alt="About"
          className="about-img"
        />
      </div>

      {/* Right Side Content */}
      <div className="col-md-6">
        <h2 className="about-title">About Us</h2>
        <p className="about-text">
          Welcome to <strong>YourBlog.com</strong>, a creative space where ideas come alive.  
          We are passionate about storytelling, knowledge sharing, and building a friendly
          community where everyone feels inspired to express themselves.
        </p>

        <p className="about-text">
          From tech tutorials to travel diaries, personal experiences to inspiring stories —
          we publish content that matters.  
          Join us on this journey of learning, creativity, and expression.
        </p>

        <a href="#" className="btn btn-primary about-btn">Learn More</a>
      </div>

    </div>

  </div>
</div>
  )
}

export default About
