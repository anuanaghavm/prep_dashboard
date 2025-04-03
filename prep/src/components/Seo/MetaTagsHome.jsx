import React, { useState, useEffect } from "react";
import allaxios from "../../api/axios";
import API_URL from "../../api/api_url";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { AiFillDelete, AiFillEdit, AiFillEye } from "react-icons/ai";

const MetaTagsHome = () => {
  const [metaTags, setMetaTags] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [viewData, setViewData] = useState(null);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetchMetaTags();
  }, []);

  const fetchMetaTags = async () => {
    try {
      const response = await allaxios.get(API_URL.META_TAG_HOME.GET_ALL);
      setMetaTags(response.data);
    } catch (error) {
      console.error("Error fetching meta tags:", error);
    }
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({});
    setEditData(null);
  };

  const handleView = (data) => {
    setViewData(data);
    setViewModal(true);
  };

  const handleCloseViewModal = () => {
    setViewModal(false);
    setViewData(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await allaxios.delete(API_URL.META_TAG_HOME.DELETE(id));
      fetchMetaTags();
    } catch (error) {
      console.error("Delete error:", error);
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
        await allaxios.patch(
          API_URL.META_TAG_HOME.UPDATE(editData.id),
          payload,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
      } else {
        await allaxios.post(API_URL.META_TAG_HOME.CREATE, payload, {
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
    <div className="container mt-5">
      <div className="d-flex justify-content-between">
        <h2><u>Meta Tags-Home</u>
        </h2>
        <Button className="btn btn-primary" onClick={handleShowModal}>
          Add New
        </Button>
      </div>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Title</th>
            <th>Slug</th>
            <th>Canonical URL</th>
            <th>Meta Description</th>
            <th>H1 Tag</th>
            <th>Word Count</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {metaTags.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.slug}</td>
              <td>{item.canonical_url}</td>
              <td>{item.meta_description}</td>
              <td>{item.h1_tag}</td>
              <td>{item.word_count}</td>
              <td>
                <AiFillEye
                  className="text-info me-2"
                  onClick={() => handleView(item)}
                />
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

      {/* View Modal */}
      <Modal show={viewModal} onHide={handleCloseViewModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>View Meta Tag</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ height: "70vh", overflowY: "auto" }}>
          {viewData ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(viewData).map(([key, value]) => (
                  <tr key={key}>
                    <td>
                      <strong>{key.replace("_", " ")}</strong>
                    </td>
                    <td>{value?.toString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No data available</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseViewModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add/Edit Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>{editData ? "Edit" : "Add"} Meta Tag</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {["title", "slug", "canonical_url", "h1_tag", "word_count"].map(
              (field) => (
                <Form.Group className="mb-2" key={field}>
                  <Form.Label>{field.replace("_", " ")}</Form.Label>
                  <Form.Control
                    name={field}
                    value={formData[field] || ""}
                    onChange={handleChange}
                  />
                </Form.Group>
              )
            )}

            {[
              "meta_description",
              "meta_keywords",
              "content",
              "og_description",
              "twitter_description",
            ].map((field) => (
              <Form.Group className="mb-2" key={field}>
                <Form.Label>{field.replace("_", " ")}</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleChange}
                />
              </Form.Group>
            ))}

            {/* Additional Text Fields */}
            {[
              "anchor_text",
              "internal_links",
              "external_links",
              "schema_type",
              "json_ld_schema",
              "image_alt_text",
              "og_title",
              "twitter_card",
              "twitter_title",
            ].map((field) => (
              <Form.Group className="mb-2" key={field}>
                <Form.Label>{field.replace("_", " ")}</Form.Label>
                <Form.Control
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleChange}
                />
              </Form.Group>
            ))}

            {["image_filename", "og_image", "twitter_image"].map((field) => (
              <Form.Group className="mb-2" key={field}>
                <Form.Label>{field.replace("_", " ")}</Form.Label>
                <Form.Control
                  type="file"
                  name={field}
                  onChange={handleChange}
                />
              </Form.Group>
            ))}

            {["noindex", "nofollow", "amp_enabled", "lazy_load_images"].map(
              (field) => (
                <Form.Check
                  type="checkbox"
                  label={field.replace("_", " ")}
                  name={field}
                  checked={formData[field] || false}
                  onChange={handleChange}
                  className="mb-2"
                  key={field}
                />
              )
            )}
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

export default MetaTagsHome;
