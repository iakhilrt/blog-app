import { useEffect, useState } from "react";
import "../AddBlog/ViewBlog.css";
import { Link } from "react-router-dom";

function ViewBlog() {

  // 1. State to store blogs
  const [blogs, setBlogs] = useState([]);

  // 2. Load blogs from localStorage when page loads
  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    setBlogs(storedBlogs);
  }, []);

  return (
    <div className="viewblog-wrapper">
      <div className="container py-4">

        <h1 className="text-center mb-4">View Blog</h1>

        <div className="row g-4">

          {/* If no blogs */}
          {blogs.length === 0 && (
            <p className="text-center">No blogs available</p>
          )}

          {/* Show blogs */}
          {blogs.map((blog) => (
            <div className="col-md-4" key={blog.id}>
              <div className="blog-card">

                <img
                  className="card-img-top"
                  src={blog.image}
                  alt={blog.title}
                />

                <div className="card-body">
                  <h4 className="card-title">{blog.title}</h4>
                  <p className="card-text">{blog.description}</p>
                  <small className="text-muted">{blog.date}</small>
                  <br />
                  <Link to={`/blog/${blog.id}`} className="btn btn-primary mt-2">
                    View
                  </Link>
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
