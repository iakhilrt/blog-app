import "./Contact.css";
import Swal from "sweetalert2";

function Contact() {

  function handleSubmit(e) {
    e.preventDefault();
    Swal.fire({
      icon: "success",
      title: "Message Sent!",
      text: "We'll get back to you within 24 hours 📬",
      timer: 2500,
      showConfirmButton: false,
    });
    e.target.reset();
  }

  return (
    <div className="contact-page">
      <div className="contact-card">

        <div className="contact-icon">📬</div>
        <h2 className="contact-title">Contact Us</h2>
        <p className="contact-subtitle">
          We'd love to hear from you. Send us a message!
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>

          <div className="input-group">
            <input type="text" required />
            <label>Your Name</label>
          </div>

          <div className="input-group">
            <input type="email" required />
            <label>Your Email</label>
          </div>

          <div className="input-group">
            <textarea required></textarea>
            <label>Your Message</label>
          </div>

          <button className="contact-btn" type="submit">
            Send Message 🚀
          </button>

        </form>

        <p className="contact-bottom">
          We usually reply within 24 hours.
        </p>

      </div>
    </div>
  );
}

export default Contact;