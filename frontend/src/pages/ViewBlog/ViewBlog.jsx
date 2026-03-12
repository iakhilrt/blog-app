import { useEffect, useState } from "react";
import "./ViewBlog.css";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";

const PAGE_SIZE = 6;

function ViewBlog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const navigate = useNavigate();

  const loggedInEmail = localStorage.getItem("email");

  useEffect(() => {
    setLoading(true);
    api.get(`/api/blogs?page=${currentPage}&size=${PAGE_SIZE}`)
      .then(({ data }) => {
        setBlogs(data.content);
        setTotalPages(data.totalPages);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [currentPage]);

  const filtered = blogs.filter((blog) =>
    blog.title.toLowerCase().includes(search.toLowerCase())
  );

  const handlePageChange = (page) => {
    if (page < 0 || page >= totalPages) return;
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
        <div className="viewblog-hero-orb"></div>
        <div className="viewblog-hero-inner">
          <span className="viewblog-eyebrow">✦ Inkwell</span>
          <h1>Explore Stories</h1>
          <p>Discover ideas, insights, and stories from our community</p>
          <div className="search-bar">
            <span>🔍</span>
            <input
              type="text"
              placeholder="Search blogs..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(0);
              }}
            />
          </div>
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
                    {new Date(blog.createdAt).toLocaleDateString("en-US", {
                      year: "numeric", month: "short", day: "numeric"
                    })}
                  </small>
                  <div className="blog-card-actions">
                    <Link to={`/blog/${blog.id}`} className="blog-read-btn">
                      Read →
                    </Link>
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

        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="page-btn"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
            >
              ← Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`page-btn ${currentPage === i ? "active" : ""}`}
                onClick={() => handlePageChange(i)}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="page-btn"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
            >
              Next →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewBlog;