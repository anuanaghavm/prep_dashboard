import React, { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Toast, ToastContainer } from "react-bootstrap";

const Home = () => {
  const [headerImage, setHeaderImage] = useState(null);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [showToast, setShowToast] = useState(false);
  const fileInputRef = useRef(null); // ✅ File input reference

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

    console.log("Form Data Submitted:", {
      headerImage,
      title,
      subTitle,
      description,
      url,
    });

    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleNew = () => {
    setHeaderImage(null);
    setTitle("");
    setSubTitle("");
    setDescription("");
    setUrl("");

    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // ✅ Reset file input
    }


    
    console.log("Form Reset!");
  };

  return (
    <div className="container d-flex justify-content-center  align-items-center vh-100 bg-warning-subtle" >
      <div className="w-50">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="text-center">HEADER</h4>
          <div>
            <button className="btn btn-primary me-2">Search</button>
            <button className="btn btn-warning me-2">Edit</button>
            <button className="btn btn-success" onClick={handleNew}>New</button>
          </div>
        </div>

        <form onSubmit={handleSubmit} key={title + subTitle + description + url}>
          <div className="mb-3">
            <label className="form-label fw-bold">Upload Header Image</label>
            <input
              type="file"
              className="form-control bg-warning-subtle"
              onChange={handleFileChange}
              ref={fileInputRef} // ✅ Ref added
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Title</label>
            <input
              type="text"
              className="form-control bg-warning-subtle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Sub Title</label>
            <input
              type="text"
              className="form-control bg-warning-subtle"
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Description</label>
            <textarea
              className="form-control bg-warning-subtle"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">URL</label>
            <input
              type="text"
              className="form-control bg-warning-subtle"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">URL</label>
            <input
              type="text"
              className="form-control bg-warning-subtle"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>



          <button type="submit" className="btn w-100 text-white" style={{ backgroundColor: "#15938F" }}>
            Save
          </button>
        </form>
      </div>

      <ToastContainer position="top-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide bg="success">
          <Toast.Body className="text-white">
            ✅ <strong>Saved Successfully</strong>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default Home;
