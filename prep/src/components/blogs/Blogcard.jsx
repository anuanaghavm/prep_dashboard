import React, { useState } from "react";
import "../../style/BlogCard.css";

const BlogCard = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleFileChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Blog Data Submitted:", { image, title, description, category });
  };

  const handleNew = () => {
    setImage(null);
    setTitle("");
    setDescription("");
    setCategory("");
  };

  return (
    <div className="d-flex justify-content-center align-items-center blog-card mt-5">
      <div className="w-50" style={{marginTop:"80px"}}>
          <div className="blog-card-header d-flex justify-content-between">
            <h4 >Blog Form</h4>
            <div>
              <button className="btn search-btn">Add new</button>
              <button className="btn edit-btn">Edit</button>
              <button className="btn new-btn" onClick={handleNew}>Search</button>
            </div>
          </div>
    
          <form className="" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Upload Image</label>
              <input type="file" onChange={handleFileChange} />
            </div>
    
            <div className="form-group">
              <label>Title</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
    
            <div className="form-group">
              <label>Description</label>
              <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
    
            <div className="form-group">
              <label>Category</label>
              <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
            </div>
    
            <button type="submit" className="btn save-btn">Save</button>
          </form>
      </div>
    </div>
  );
};

export default BlogCard;
