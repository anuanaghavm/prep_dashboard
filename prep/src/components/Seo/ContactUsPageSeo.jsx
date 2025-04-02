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

  // Fetch All Meta Tags
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

  // Open and Close Modal
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({});
    setEditData(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
  
    try {
      const url = API_URL.META_TAG_CONTACT.DELETE(id);
      const response = await allaxios.delete(url);
      
      if (response.status === 204) {
        fetchMetaTags(); // Refresh list
        alert("Meta tag deleted successfully");
      } else {
        alert("Failed to delete meta tag");
      }
    } catch (error) {
      console.error("Delete error:", error.response?.data || error.message);
      alert("Failed to delete. Please check console for more info.");
    }
  };
  
  // Handle Edit
  const handleEdit = (data) => {
    setEditData(data);
    setFormData(data);
    setShowModal(true);
  };

  // Handle Form Input Changes
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

  // Submit Form
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
        <h2 style={{ fontWeight: "bold" }}>Meta Tags-Contacts</h2>
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
                <AiFillEdit className="text-primary me-2" onClick={() => handleEdit(item)} />
                <AiFillDelete className="text-danger" onClick={() => handleDelete(item.id)} />
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
            <Form.Group className="mb-2">
              <Form.Label>Title</Form.Label>
              <Form.Control name="title" value={formData.title || ""} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Meta Description</Form.Label>
              <Form.Control as="textarea" rows={3} name="meta_description" value={formData.meta_description || ""} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Meta Keywords</Form.Label>
              <Form.Control as="textarea" rows={2} name="meta_keywords" value={formData.meta_keywords || ""} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Canonical URL</Form.Label>
              <Form.Control name="canonical_url" value={formData.canonical_url || ""} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>H1 Tag</Form.Label>
              <Form.Control name="h1_tag" value={formData.h1_tag || ""} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Content</Form.Label>
              <Form.Control as="textarea" rows={4} name="content" value={formData.content || ""} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Word Count</Form.Label>
              <Form.Control type="number" name="word_count" value={formData.word_count || ""} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Image Alt Text</Form.Label>
              <Form.Control name="image_alt_text" value={formData.image_alt_text || ""} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" name="image_filename" onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Slug</Form.Label>
              <Form.Control name="slug" value={formData.slug || ""} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Open Graph Title</Form.Label>
              <Form.Control name="og_title" value={formData.og_title || ""} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Open Graph Description</Form.Label>
              <Form.Control as="textarea" rows={3} name="og_description" value={formData.og_description || ""} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Open Graph Image</Form.Label>
              <Form.Control type="file" name="og_image" onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Twitter Card</Form.Label>
              <Form.Control name="twitter_card" value={formData.twitter_card || ""} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Twitter Title</Form.Label>
              <Form.Control name="twitter_title" value={formData.twitter_title || ""} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Twitter Description</Form.Label>
              <Form.Control as="textarea" rows={3} name="twitter_description" value={formData.twitter_description || ""} onChange={handleChange} />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Twitter Image</Form.Label>
              <Form.Control type="file" name="twitter_image" onChange={handleChange} />
            </Form.Group>

            <Form.Check type="checkbox" label="No Index" name="noindex" checked={formData.noindex || false} onChange={handleChange} className="mb-2" />
            <Form.Check type="checkbox" label="No Follow" name="nofollow" checked={formData.nofollow || false} onChange={handleChange} className="mb-2" />
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
