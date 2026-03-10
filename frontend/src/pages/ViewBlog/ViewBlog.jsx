import { useEffect, useState } from "react";
import "./ViewBlog.css";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";

function ViewBlog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // ✅ Get logged in user's email
  const loggedInEmail = localStorage.getItem("email");

  useEffect(() => {
    api.get("/api/blogs")
      .then(({ data }) => setBlogs(data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const filtered = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="viewblog-loading">
        <div className="spinner"></div>
        <p>Loading blogs...</p>
      </div>
    );
  }

  return (
    <div className="viewblog-wrapper">
      <div className="viewblog-hero">
        <h1>Explore Blogs</h1>
        <p>Discover stories, ideas, and insights from our community</p>
        <div className="search-bar">
          <span>🔍</span>
          <input
            type="text"
            placeholder="Search blogs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="container py-4">
        {filtered.length === 0 && (
          <div className="no-blogs">
            <p>😔 No blogs found</p>
          </div>
        )}

        <div className="blog-grid">
          {filtered.map((blog) => (
            <div className="blog-card" key={blog.id}>
              <div className="blog-card-img-wrapper">
                <img
                  className="blog-card-img"
                  src={blog.image}
                  alt={blog.title}
                />
              </div>
              <div className="blog-card-body">
                <span className="blog-author">✍️ {blog.authorName}</span>
                <h4 className="blog-card-title">{blog.title}</h4>
                <p className="blog-card-text">
                  {blog.description.length > 100
                    ? blog.description.substring(0, 100) + "..."
                    : blog.description}
                </p>
                <div className="blog-card-footer">
                  <small className="blog-date">
                    🗓️ {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      year: "numeric", month: "short", day: "numeric"
                    })}
                  </small>
                  <div className="blog-card-actions">
                    <Link to={`/blog/${blog.id}`} className="blog-read-btn">
                      Read More →
                    </Link>
                    {/* ✅ Show Edit only to the author */}
                    {blog.authorEmail === loggedInEmail && (
                      <button
                        className="blog-edit-btn"
                        onClick={() => navigate(`/edit-blog/${blog.id}`)}
                      >
                        ✏️ Edit
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewBlog;