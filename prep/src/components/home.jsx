import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const [headerImage, setHeaderImage] = useState(null);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");

  const handleFileChange = (event) => {
    setHeaderImage(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("headerImage", headerImage);
    formData.append("title", title);
    formData.append("subTitle", subTitle);
    formData.append("description", description);
    formData.append("url", url);

    console.log("Form Data Submitted", formData);
    // Here you can send formData to the backend
  };

  return (
    <div className="container">
      <h4>HEADER</h4>
      {/* <p>Header Image: Image Size - 1646px x 1080px</p> */}

      <form onSubmit={handleSubmit}>
        {/* File Upload */}
        <div className="mb-3">
          <label className="form-label">Upload Header Image</label>
          <input type="file" className="form-control" onChange={handleFileChange} />
        </div>

        {/* Title */}
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        {/* Sub Title */}
        <div className="mb-3">
          <label className="form-label">Sub Title</label>
          <input type="text" className="form-control" value={subTitle} onChange={(e) => setSubTitle(e.target.value)} />
        </div>

        {/* Description */}
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>

        {/* URL */}
        <div className="mb-3">
          <label className="form-label">URL</label>
          <input type="text" className="form-control" value={url} onChange={(e) => setUrl(e.target.value)} />
        </div>

        <button type="submit" className="btn btn-primary">Save</button>
      </form>
    </div>
  );
};

export default Home;
