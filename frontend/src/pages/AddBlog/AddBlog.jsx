import { useState } from "react";
import "./AddBlog.css";
import Swal from "sweetalert2";
import api from "../../api/axios";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cropper from "react-easy-crop";

function AddBlog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [image, setImage] = useState("");
  const [preview, setPreview] = useState(null);

  const [uploading, setUploading] = useState(false);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [showCrop, setShowCrop] = useState(false);

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const addBlogMutation = useMutation({
    mutationFn: (blogData) => api.post("/api/blogs/add", blogData),

    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Blog Published!",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        queryClient.invalidateQueries(["blogs"]);
        navigate("/viewblog");
      });
    },

    onError: (error) => {
      Swal.fire(
        "Error",
        error.response?.data || "Failed to add blog!",
        "error"
      );
    }
  });

  // ✅ FIXED (FileReader instead of createObjectURL)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result); // base64
      setShowCrop(true);
    };

    reader.readAsDataURL(file);
  };

  const onCropComplete = (_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  };

  const getCroppedImg = async (imageSrc, crop) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.src = imageSrc;

    await new Promise((resolve) => {
      image.onload = resolve;
    });

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = crop.width;
    canvas.height = crop.height;

    ctx.drawImage(
      image,
      crop.x,
      crop.y,
      crop.width,
      crop.height,
      0,
      0,
      crop.width,
      crop.height
    );


    return canvas.toDataURL("image/jpeg", 0.9);
  };

  const handleCropUpload = async () => {
    if (!croppedAreaPixels) {
      Swal.fire("Wait", "Adjust crop first!", "info");
      return;
    }

    setUploading(true);

    try {
      const croppedBase64 = await getCroppedImg(preview, croppedAreaPixels);

      console.log("BASE64 IMAGE:", croppedBase64.slice(0, 50)); // debug

      const formData = new FormData();
      formData.append("file", croppedBase64); // 🔥 IMPORTANT
      formData.append(
        "upload_preset",
        import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
      );

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );

      console.log("UPLOAD SUCCESS:", res.data);

      setImage(res.data.secure_url);
      setPreview(res.data.secure_url);
      setShowCrop(false);

      Swal.fire({
        icon: "success",
        title: "Image Ready ✅",
        timer: 1200,
        showConfirmButton: false,
      });

    } catch (err) {
      console.error("UPLOAD ERROR:", err);
      Swal.fire("Error", "Upload failed!", "error");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!image) {
      Swal.fire("Oops!", "Please crop & upload image first!", "warning");
      return;
    }

    addBlogMutation.mutate({ title, description, image });
  };

  return (
    <div className="addblog-page">
      <div className="addblog-orb"></div>

      <div className="addblog-card">
        <div className="addblog-header">
          <span className="addblog-eyebrow">✦ Share Your Thoughts</span>
          <h1>Write a New Blog</h1>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="addblog-field">
            <label>Blog Title</label>
            <input
              type="text"
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
                  <div className="image-placeholder">Processing...</div>
                ) : preview ? (
                  <img src={preview} className="image-preview" />
                ) : (
                  <div className="image-placeholder">Click to upload</div>
                )}
              </label>
            </div>
          </div>

          {/* MODAL */}
          {showCrop && (
            <div className="crop-modal">
              <div className="crop-modal-content">

                <h3>Crop Image</h3>

                <div className="crop-container">
                  <Cropper
                    image={preview}
                    crop={crop}
                    zoom={zoom}
                    aspect={16 / 9}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                  />
                </div>

                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(e) => setZoom(e.target.value)}
                  className="zoom-slider"
                />

                <div className="crop-footer">
                  <button type="button" onClick={handleCropUpload} className="crop-btn">
                    Crop & Upload
                  </button>

                  <button type="button" onClick={() => setShowCrop(false)} className="crop-cancel">
                    Cancel
                  </button>
                </div>

              </div>
            </div>
          )}

          <div className="addblog-field">
            <label>Content</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="addblog-btn"
            disabled={uploading}
          >
            {uploading ? "Processing..." : "Publish Blog →"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddBlog;