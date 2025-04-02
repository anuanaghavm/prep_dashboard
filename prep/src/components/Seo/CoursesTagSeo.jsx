import React, { useState, useEffect } from "react";
import allaxios from "../../api/axios";
import API_URL from "../../api/api_url";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

const CoursesTagSeo = () => {
  const [metaTags, setMetaTags] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [editData, setEditData] = useState(null);

  const fetchMetaTags = async () => {
    try {
      const response = await allaxios.get(API_URL.META_TAG_COURSES.GET_ALL);
      setMetaTags(response.data);
    } catch (error) {
      console.error("Error fetching meta tags:", error);
    }
  };

  useEffect(() => {
    fetchMetaTags();
  }, []);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({});
    setEditData(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await allaxios.delete(API_URL.META_TAG_COURSES.DELETE(id));
      fetchMetaTags();
      alert("Meta tag deleted successfully");
    } catch (error) {
      console.error("Delete error:", error.response?.data || error.message);
      alert("Failed to delete. Please check console for more info.");
    }
  };

  const handleEdit = (data) => {
    setEditData(data);
    setFormData(data);
    setShowModal(true);
  };

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

  const handleSubmit = async () => {
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        payload.append(key, value);
      }
    });

    try {
      if (editData?.id) {
        await allaxios.patch(API_URL.META_TAG_COURSES.UPDATE(editData.id), payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await allaxios.post(API_URL.META_TAG_COURSES.CREATE, payload, {
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
        <h2 style={{ fontWeight: "bold" }}>Courses Tag SEO</h2>
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

      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{editData ? "Edit" : "Add"} Courses Tag SEO</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Meta Tags */}
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

            {/* URL Optimization */}
            <Form.Group className="mb-2">
              <Form.Label>Slug</Form.Label>
              <Form.Control name="slug" value={formData.slug || ""} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Canonical URL</Form.Label>
              <Form.Control name="canonical_url" value={formData.canonical_url || ""} onChange={handleChange} />
            </Form.Group>

            {/* Header Tags */}
            <Form.Group className="mb-2">
              <Form.Label>H1 Tag</Form.Label>
              <Form.Control name="h1_tag" value={formData.h1_tag || ""} onChange={handleChange} />
            </Form.Group>

            {/* Content Section */}
            <Form.Group className="mb-2">
              <Form.Label>Content</Form.Label>
              <Form.Control as="textarea" name="content" value={formData.content || ""} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Word Count</Form.Label>
              <Form.Control type="number" name="word_count" value={formData.word_count || ""} onChange={handleChange} />
            </Form.Group>

            {/* Image Optimization */}
            <Form.Group className="mb-2">
              <Form.Label>Image Alt Text</Form.Label>
              <Form.Control name="image_alt_text" value={formData.image_alt_text || ""} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Image File</Form.Label>
              <Form.Control type="file" name="image_filename" onChange={handleChange} />
            </Form.Group>

            {/* Internal & External Links */}
            <Form.Group className="mb-2">
              <Form.Label>Internal Links</Form.Label>
              <Form.Control as="textarea" name="internal_links" value={formData.internal_links || ""} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>External Links</Form.Label>
              <Form.Control as="textarea" name="external_links" value={formData.external_links || ""} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Anchor Text</Form.Label>
              <Form.Control name="anchor_text" value={formData.anchor_text || ""} onChange={handleChange} />
            </Form.Group>

            {/* Structured Data & Schema Markup */}
            <Form.Group className="mb-2">
              <Form.Label>Schema Type</Form.Label>
              <Form.Control name="schema_type" value={formData.schema_type || ""} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>JSON-LD Schema</Form.Label>
              <Form.Control as="textarea" name="json_ld_schema" value={formData.json_ld_schema || ""} onChange={handleChange} />
            </Form.Group>

            {/* Open Graph */}
            <Form.Group className="mb-2">
              <Form.Label>OG Title</Form.Label>
              <Form.Control name="og_title" value={formData.og_title || ""} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>OG Description</Form.Label>
              <Form.Control as="textarea" name="og_description" value={formData.og_description || ""} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>OG Image</Form.Label>
              <Form.Control type="file" name="og_image" onChange={handleChange} />
            </Form.Group>

            {/* Twitter Card */}
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
              <Form.Control as="textarea" name="twitter_description" value={formData.twitter_description || ""} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Twitter Image</Form.Label>
              <Form.Control type="file" name="twitter_image" onChange={handleChange} />
            </Form.Group>

            {/* Indexing & Performance Options */}
            <Form.Group className="mb-2">
              <Form.Check type="checkbox" label="Noindex" name="noindex" checked={formData.noindex || false} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Check type="checkbox" label="Nofollow" name="nofollow" checked={formData.nofollow || false} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Check type="checkbox" label="AMP Enabled" name="amp_enabled" checked={formData.amp_enabled || false} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Check type="checkbox" label="Lazy Load Images" name="lazy_load_images" checked={formData.lazy_load_images || false} onChange={handleChange} />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmit}>
            {editData ? "Update" : "Create"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CoursesTagSeo;
