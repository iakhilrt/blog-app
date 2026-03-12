import { useState, useEffect } from "react";
import "../AddBlog/AddBlog.css";
import "./EditBlog.css";
import Swal from "sweetalert2";
import api from "../../api/axios";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

function EditBlog() {

  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState(null);

  const [uploading, setUploading] = useState(false);

  const loggedInEmail = localStorage.getItem("email");

  const fetchBlog = async () => {
    const { data } = await api.get(`/api/blogs/${id}`);
    return data;
  };

  const { data: blog, isLoading } = useQuery({
    queryKey: ["blog", id],
    queryFn: fetchBlog
  });

  useEffect(() => {

    if (!blog) return;

    if (blog.authorEmail !== loggedInEmail) {
      Swal.fire("Unauthorized!", "You can only edit your own blogs!", "error")
        .then(() => navigate("/viewblog"));
      return;
    }

    setTitle(blog.title);
    setDescription(blog.description);
    setImage(blog.image);
    setPreview(blog.image);

  }, [blog]);

  const updateBlogMutation = useMutation({

    mutationFn: (updatedBlog) =>
      api.put(`/api/blogs/${id}`, updatedBlog),

    onSuccess: () => {

      Swal.fire({
        icon: "success",
        title: "Blog Updated!",
        text: "Your changes are saved 🎉",
        timer: 1800,
        showConfirmButton: false,
      }).then(() => {

        queryClient.invalidateQueries(["blogs"]);
        navigate("/viewblog");

      });

    },

    onError: (error) => {
      Swal.fire(
        "Error",
        error.response?.data || "Failed to update blog!",
        "error"
      );
    }

  });

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

  const handleSubmit = (e) => {

    e.preventDefault();

    updateBlogMutation.mutate({
      title,
      description,
      image
    });

  };

  if (isLoading) {
    return <div className="loading">Loading...</div>;
  }

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
              disabled={uploading || updateBlogMutation.isPending}
            >
              {uploading
                ? "Uploading..."
                : updateBlogMutation.isPending
                ? "Saving..."
                : "Save Changes →"}
            </button>

          </div>

        </form>

      </div>

    </div>

  );

}

export default EditBlog;