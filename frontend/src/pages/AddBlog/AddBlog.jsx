import { useState } from "react";
import "./AddBlog.css";
import Swal from "sweetalert2";
import api from "../../api/axios";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddBlog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

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
      setPreview(null);
      setImage("");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      Swal.fire("Oops!", "Please wait for image to finish uploading!", "warning");
      return;
    }

    setLoading(true);
    try {
      await api.post("/api/blogs/add", { title, description, image });

      Swal.fire({
        icon: "success",
        title: "Blog Published!",
        text: "Your blog is now live 🎉",
        timer: 1800,
        showConfirmButton: false,
      }).then(() => navigate("/viewblog"));

      setTitle("");
      setDescription("");
      setImage("");
      setPreview(null);
      e.target.reset();

    } catch (error) {
      Swal.fire("Error", error.response?.data || "Failed to add blog!", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addblog-page">
      <div className="addblog-orb"></div>
      <div className="addblog-card">

        <div className="addblog-header">
          <span className="addblog-eyebrow">✦ Share Your Thoughts</span>
          <h1>Write a New Blog</h1>
          <p>Tell your story — the world is listening</p>
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
                    <p>Click to upload cover image</p>
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

          <button
            type="submit"
            className="addblog-btn"
            disabled={loading || uploading}
          >
            {uploading
              ? "Uploading Image..."
              : loading
              ? "Publishing..."
              : "Publish Blog →"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddBlog;