import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap"; 
import "../../style/BlogCategories.css"; 

const BlogCategories = () => {
  const [categories, setCategories] = useState([" "]);
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const handleAddNew = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setNewCategory("");
  };

  const handleSave = () => {
    if (newCategory.trim()) {
      setCategories([...categories, newCategory]);
      setNewCategory("");
      setShowModal(false);
    }
  };

  return (
    <div className="blog-categories-container">
      {/* Title and Buttons in the same row */}
      <div className="title-buttons-container">
        <h3 className="title">Blog Categories</h3>
        <div className="top-buttons">
          <Button variant="success" className="me-2" onClick={handleAddNew}>
            Add New
          </Button>
          <Button variant="warning" className="me-2">Update</Button>
          <Button variant="danger">Delete</Button>
        </div>
      </div>

      {/* List of Categories */}
      <ul className="list-unstyled">
        {categories.map((category, index) => (
          <li key={index} className="category-item">
            <input type="text" className="form-control" value={category} readOnly />
          </li>
        ))}
      </ul>

      {/* Modal for Adding New Category */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control"
            placeholder="Enter category name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Category
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BlogCategories;
