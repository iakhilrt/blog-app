import { useEffect, useState } from "react";
import "./AdminDashboard.css";

function AdminDashboard() {

  const [blogs, setBlogs] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];
    const storedUsers = localStorage.getItem("email") ? 1 : 0;

    setBlogs(storedBlogs);
    setUsers(storedUsers);
  }, []);

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>

      {/* STATS */}
      <div className="admin-stats">
        <div className="stat-card">
          <h2>{blogs.length}</h2>
          <p>Total Blogs</p>
        </div>

        <div className="stat-card">
          <h2>{users}</h2>
          <p>Total Users</p>
        </div>
      </div>

      {/* BLOG LIST */}
      <h2 className="mt">Blogs</h2>

      <table className="admin-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
          </tr>
        </thead>

        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>{blog.title}</td>
              <td>{blog.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default AdminDashboard;
