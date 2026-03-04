import { useState } from "react";
import "../AddBlog/AddBlog.css";

function AddBlog() {
  // 1. Create state variables for the form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  // 2. Handle Image selection and convert to Base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result); // This is the Base64 string of the image
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // 3. Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a blog object
    const newBlog = {
      id: Date.now(), // Unique ID
      title,
      description,
      image,
      date: new Date().toLocaleDateString(),
    };

    // Get existing blogs from localStorage or start with an empty array
    const existingBlogs = JSON.parse(localStorage.getItem("blogs")) || [];

    // Add the new blog to the list
    const updatedBlogs = [...existingBlogs, newBlog];

    // Save back to localStorage
    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));

    // Clear form and alert user
    alert("Blog saved successfully!");
    setTitle("");
    setDescription("");
    setImage("");
    e.target.reset(); // Resets the file input field
  };

  return (
    <div className="addblog-page">
      <div className="addblog-card">
        <h1>Add New Blog</h1>

        <form onSubmit={handleSubmit}>
          <label>Title :</label>
          <input
            type="text"
            placeholder="Enter blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label>Image :</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleImageChange} 
            required
          />

          <label>Description :</label>
          <textarea
            placeholder="Write your blog description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default AddBlog;