import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ViewBlogDetails.css";

function ViewBlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    const selectedBlog = storedBlogs.find(
      (item) => item.id === Number(id)
    );
    setBlog(selectedBlog);
  }, [id]);

  if (!blog) {
    return (
      <div className="details-page">
        <h2 className="not-found">Blog not found</h2>
        <button className="back-btn" onClick={() => navigate("/viewblog")}>
          Back to View Blog
        </button>
      </div>
    );
  }

  return (
    <div className="details-page">
      <div className="details-card">

        <h1 className="details-title">{blog.title}</h1>

        <img
          src={blog.image}
          alt={blog.title}
          className="details-image"
        />

        <p className="details-desc">{blog.description}</p>

        <span className="details-date">
          Published on {blog.date}
        </span>

        {/* ✅ BACK BUTTON */}
        <div className="details-actions">
          <button
            className="back-btn"
            onClick={() => navigate("/viewblog")}
          >
            ← Back
          </button>
        </div>

      </div>
    </div>
  );
}

export default ViewBlogDetails;