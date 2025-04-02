import React, { useState, useEffect } from "react";
import allaxios from "../../api/axios";
import API_URL from "../../api/api_url";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

const MetaTagsBlogForm = () => {
  const [metaTags, setMetaTags] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    fetchMetaTags();
  }, []);

  const fetchMetaTags = async () => {
    try {
      const response = await allaxios.get(API_URL.META_TAG_CONTACT.GET_ALL);
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

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await allaxios.delete(API_URL.META_TAG_CONTACT.DELETE(id));
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
    <div className="container mt-5">
      <div className="d-flex justify-content-between">
        <h2><u>Meta Tags - Blogs</u></h2>
        <Button variant="primary" onClick={handleShowModal}>Add New</Button>
      </div>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>title</th>
            <th>slug</th>
            <th>canonical_url</th>
            <th>meta description</th>
            <th>h1_tag</th>
            <th>word_count</th>
            <th>actions</th>
            <th>image_alt_text</th>
            <th>internal_links</th>
            <th>external_links</th>
            <th>anchor_text</th>
            <th>schema_type</th>
            <th>json_ld_schema</th>
            <th>og_title</th>
            <th>twitter_card</th>
            <th>twitter_title</th>
            <th>meta_description</th>
            <th>content</th>
            <th>og_description</th>
            <th>twitter_description</th>
          </tr>
        </thead>
        <tbody>
          {metaTags.map((item) => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.slug}</td>
              <td>{item.meta_description}</td>
              <td>{item.canonical_url}</td>
              <td>{item.h1_tag}</td>
              <td>{item.word_count}</td>
              <td>{item.image_alt_text}</td>
              <td>{item.internal_links}</td>
              <td>{item.external_links}</td>
              <td>{item.anchor_text}</td>
              <td>{item.schema.type}</td>
              <td>{item.json_ld_schema}</td>
              <td>{item.og_title}</td>
              <td>{item.twitter_card}</td>
              <td>{item.twitter_title}</td>
              <td>{item.meta_description}</td>
              <td>{item.content}</td>
              <td>{item.og_description}</td>
              <td>{item.twitter_description}</td>
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
          <Modal.Title>{editData ? "Edit" : "Add"} meta tag</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {["title", "slug", "canonical_url", "h1_tag", "word_count", "image_alt_text", "internal_links", "external_links", "anchor_text", "schema_type", "json_ld_schema", "og_title", "twitter_card", "twitter_title"].map((field) => (
              <Form.Group className="mb-2" key={field}>
                <Form.Label>{field.replace("_", " ")}</Form.Label>
                <Form.Control
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleChange}
                />
              </Form.Group>
            ))}

            {["meta_description", "content", "og_description", "twitter_description"].map((field) => (
              <Form.Group className="mb-2" key={field}>
                <Form.Label>{field.replace("_", " ")}</Form.Label>
                <Form.Control as="textarea" rows={3} name={field} value={formData[field] || ""} onChange={handleChange} />
              </Form.Group>
            ))}

            {["image_filename", "og_image", "twitter_image"].map((field) => (
              <Form.Group className="mb-2" key={field}>
                <Form.Label>{field.replace("_", " ")}</Form.Label>
                <Form.Control type="file" name={field} onChange={handleChange} />
              </Form.Group>
            ))}

            {["noindex", "nofollow", "amp_enabled", "lazy_load_images"].map((field) => (
              <Form.Check
                type="checkbox"
                label={field.replace("_", " ")}
                name={field}
                checked={formData[field] || false}
                onChange={handleChange}
                className="mb-2"
                key={field}
              />
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cancel</Button>
          <Button variant="primary" onClick={handleSubmit}>{editData ? "Update" : "Create"}</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MetaTagsBlogForm;
