import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./ViewBlogDetails.css";
import api from "../../api/axios";

function ViewBlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/api/blogs/${id}`)
      .then(({ data }) => setBlog(data))
      .catch(() => setBlog(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="details-loading">
        <div className="spinner"></div>
        <p>Loading story...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="details-not-found">
        <div className="not-found-icon">😔</div>
        <h2>Blog not found</h2>
        <p>The story you're looking for doesn't exist.</p>
        <button className="back-btn" onClick={() => navigate("/viewblog")}>
          ← Back to Blogs
        </button>
      </div>
    );
  }

  return (
    <div className="details-page">
      <div className="details-card">

        <button className="details-back-link" onClick={() => navigate("/viewblog")}>
          ← Back to all stories
        </button>

        <h1 className="details-title">{blog.title}</h1>

        <div className="details-meta">
          <span>✍️ {blog.authorName}</span>
          <span>
            {new Date(blog.createdAt).toLocaleDateString("en-US", {
              year: "numeric", month: "long", day: "numeric"
            })}
          </span>
        </div>

        <img
          src={blog.image}
          alt={blog.title}
          className="details-image"
        />

        <p className="details-desc">{blog.description}</p>

        <div className="details-actions">
          <button className="back-btn" onClick={() => navigate("/viewblog")}>
            ← Back to Blogs
          </button>
        </div>

      </div>
    </div>
  );
}

export default ViewBlogDetails;