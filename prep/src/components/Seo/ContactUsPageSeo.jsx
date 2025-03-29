import React, { useState, useEffect } from "react";
import allaxios from "../../api/axios";
import API_URL from "../../api/api_url";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

const MetaTagsContacts = () => {
  const [metaTags, setMetaTags] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [editData, setEditData] = useState(null);

  // Fetch All
  const fetchMetaTags = async () => {
    try {
      const response = await allaxios.get(API_URL.META_TAG_CONTACT.GET_ALL);
      setMetaTags(response.data);
    } catch (error) {
      console.error("Error fetching meta tags:", error);
    }
  };

  useEffect(() => {
    fetchMetaTags();
  }, []);

  // Open modal
  const handleShowModal = () => setShowModal(true);

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({});
    setEditData(null);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
  
    try {
      const url = API_URL.META_TAG_CONTACT.DELETE(id); // ✅ FIXED: define `url`
      console.log("Trying to delete ID:", id);
      console.log("Delete URL:", url);
  
      await allaxios.delete(url);
      fetchMetaTags(); // Refresh list
    } catch (error) {
      console.error("Delete error:", error.response?.data || error.message);
      alert("Failed to delete. Please check console for more info.");
    }
  };
    
  // Handle edit
  const handleEdit = (data) => {
    setEditData(data);
    setFormData(data);
    setShowModal(true);
  };

  // Form input change
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Submit form
  const handleSubmit = async () => {
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        payload.append(key, value);
      }
    });

    try {
      if (editData?.id) {
        await allaxios.patch(API_URL.META_TAG_CONTACT.UPDATE(editData.id), payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await allaxios.post(API_URL.META_TAG_CONTACT.CREATE, payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      fetchMetaTags();
      handleCloseModal();
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h2 style={{ fontWeight: "bold" }}>Meta Tags - Contacts</h2>
        <Button variant="primary" onClick={handleShowModal}>
          Add New
        </Button>
      </div>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Title</th>
            <th>Slug</th>
            <th>Meta Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {metaTags.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.slug}</td>
              <td>{item.meta_description}</td>
              <td>
                <AiFillEdit
                  className="text-primary me-2"
                  onClick={() => handleEdit(item)}
                />
                <AiFillDelete
                  className="text-danger"
                  onClick={() => handleDelete(item.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{editData ? "Edit" : "Add"} Meta Tag</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Example fields (add more as needed) */}
            <Form.Group className="mb-2">
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                value={formData.title || ""}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Meta Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="meta_description"
                value={formData.meta_description || ""}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Slug</Form.Label>
              <Form.Control
                name="slug"
                value={formData.slug || ""}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Image Alt Text</Form.Label>
              <Form.Control
                name="image_alt_text"
                value={formData.image_alt_text || ""}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="image_filename"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Check
              type="checkbox"
              label="No Index"
              name="noindex"
              checked={formData.noindex || false}
              onChange={handleChange}
              className="mb-2"
            />
            <Form.Check
              type="checkbox"
              label="No Follow"
              name="nofollow"
              checked={formData.nofollow || false}
              onChange={handleChange}
              className="mb-2"
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {editData ? "Update" : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MetaTagsContacts;
