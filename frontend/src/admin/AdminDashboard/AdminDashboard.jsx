import { useEffect, useState } from "react";
import "./AdminDashboard.css";
import api from "../../api/axios";
import Swal from "sweetalert2";

function AdminDashboard() {
  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get("/api/admin/blogs"),
      api.get("/api/admin/users"),
    ]).then(([blogsRes, usersRes]) => {
      setBlogs(blogsRes.data);
      setUsers(usersRes.data);
    }).finally(() => setLoading(false));
  }, []);

  const handleDeleteBlog = (id) => {
    Swal.fire({
      title: "Delete Blog?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/api/admin/blogs/${id}`);
          setBlogs(blogs.filter((b) => b.id !== id));
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Blog has been deleted.",
            timer: 1800,
            showConfirmButton: false,
          });
        } catch {
          Swal.fire("Error", "Failed to delete blog.", "error");
        }
      }
    });
  };

  // ✅ Delete user + all their blogs
  const handleDeleteUser = (id, name) => {
    Swal.fire({
      title: `Delete ${name}?`,
      text: "This will delete the user and ALL their blogs permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#e11d48",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, delete!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await api.delete(`/api/admin/users/${id}`);
          setUsers(users.filter((u) => u.id !== id));
          // Also remove their blogs from blogs list
          setBlogs(blogs.filter((b) => b.authorName !== name));
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "User and all their blogs removed.",
            timer: 1800,
            showConfirmButton: false,
          });
        } catch {
          Swal.fire("Error", "Failed to delete user.", "error");
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">

      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage blogs and users from here</p>
      </div>

      {/* STATS */}
      <div className="admin-stats">
        <div className="stat-card">
          <div className="stat-icon">📝</div>
          <h2>{blogs.length}</h2>
          <p>Total Blogs</p>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <h2>{users.length}</h2>
          <p>Total Users</p>
        </div>
      </div>

      {/* BLOGS TABLE */}
      <div className="admin-section">
        <h2>All Blogs</h2>
        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Author</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {blogs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty-row">No blogs found</td>
                </tr>
              ) : (
                blogs.map((blog, index) => (
                  <tr key={blog.id}>
                    <td>{index + 1}</td>
                    <td>{blog.title}</td>
                    <td>{blog.authorName}</td>
                    <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteBlog(blog.id)}
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* USERS TABLE */}
      <div className="admin-section">
        <h2>All Users</h2>
        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty-row">No users found</td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <tr key={user.id}>
                    <td>{index + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <span className={`role-badge ${user.role.toLowerCase()}`}>
                        {user.role}
                      </span>
                    </td>
                    <td>
                      {/*Don't show delete for ADMIN */}
                      {user.role !== "ADMIN" ? (
                        <button
                          className="delete-btn"
                          onClick={() => handleDeleteUser(user.id, user.name)}
                        >
                          🗑️ Delete
                        </button>
                      ) : (
                        <span className="protected-badge">🔒 Protected</span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}

export default AdminDashboard;