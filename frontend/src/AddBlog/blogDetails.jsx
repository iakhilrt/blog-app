import "./BlogDetails.css";

function BlogDetails() {
    return (
        <div className="main">
            <h1>Blog Details</h1>
            <div className="details-container">
                <img
                    src="/sample.jpg"   /* change this image */
                    alt="Blog"
                    className="details-image"
                />

                <h1 className="details-title">Blog Title</h1>

                <p className="details-desc">
                    This is a sample detailed description for the blog.
                    You can write a long paragraph here explaining everything about the post.
                </p>

                <div className="details-buttons">
                    <button className="btn btn-primary">Edit</button>
                    <button className="btn btn-danger">Delete</button>
                </div>
            </div>
        </div>
    );
}

export default BlogDetails;