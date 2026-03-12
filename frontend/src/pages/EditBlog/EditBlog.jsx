import { useState, useEffect } from "react";
import "../AddBlog/AddBlog.css";
import "./EditBlog.css";
import Swal from "sweetalert2";
import api from "../../api/axios";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await api.get(`/api/blogs/${id}`);

        const loggedInEmail = localStorage.getItem("email");
        if (data.authorEmail !== loggedInEmail) {
          Swal.fire("Unauthorized!", "You can only edit your own blogs!", "error")
            .then(() => navigate("/viewblog"));
          return;
        }

        setTitle(data.title);
        setDescription(data.description);
        setImage(data.image);
        setPreview(data.image);

      } catch (error) {
        Swal.fire("Error", "Blog not found!", "error")
          .then(() => navigate("/viewblog"));
      } finally {
        setFetching(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );

      setImage(res.data.secure_url);

      Swal.fire({
        icon: "success",
        title: "Image Uploaded ✅",
        timer: 1200,
        showConfirmButton: false,
      });

    } catch (error) {
      Swal.fire("Error", "Image upload failed!", "error");
      setPreview(image);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await api.put(`/api/blogs/${id}`, { title, description, image });

      Swal.fire({
        icon: "success",
        title: "Blog Updated!",
        text: "Your changes are saved 🎉",
        timer: 1800,
        showConfirmButton: false,
      }).then(() => navigate("/viewblog"));

    } catch (error) {
      Swal.fire("Error", error.response?.data || "Failed to update blog!", "error");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="loading">Loading...</div>;

  return (
    <div className="addblog-page">
      <div className="addblog-orb"></div>
      <div className="addblog-card">

        <div className="addblog-header">
          <span className="addblog-eyebrow">✦ Edit Your Story</span>
          <h1>Update Blog</h1>
          <p>Make your changes and publish</p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="addblog-field">
            <label>Blog Title</label>
            <input
              type="text"
              placeholder="Enter an interesting title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="addblog-field">
            <label>Cover Image</label>
            <div className="image-upload-area">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                id="imageInput"
              />
              <label htmlFor="imageInput" className="image-upload-label">
                {uploading ? (
                  <div className="image-placeholder">
                    <span>⏳</span>
                    <p>Uploading...</p>
                  </div>
                ) : preview ? (
                  <img src={preview} alt="Preview" className="image-preview" />
                ) : (
                  <div className="image-placeholder">
                    <span>📷</span>
                    <p>Click to change image</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          <div className="addblog-field">
            <label>Content</label>
            <textarea
              placeholder="Write your blog content here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <div className="editblog-buttons">
            <button
              type="button"
              className="cancel-btn"
              onClick={() => navigate("/viewblog")}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="addblog-btn"
              disabled={loading || uploading}
            >
              {uploading ? "Uploading..." : loading ? "Saving..." : "Save Changes →"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default EditBlog;