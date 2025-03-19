import React, { useState, useEffect } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import allaxios from "../../api/axios";
import API_URL from "../../api/api_url";
import { Modal, Button, Form, Table } from "react-bootstrap";

const FormSubmission = () => {
  const [formSubmissions, setFormSubmissions] = useState([]);
  const [preferredPrograms, setPreferredPrograms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    mobile_number: "",
    email: "",
    preferred_program: "",
    college_studied: "", // New field
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchForms();
    fetchPreferredPrograms();
  }, []);

  const fetchForms = async () => {
    try {
      const response = await allaxios.get(API_URL.FORM.GET_ALL);
      console.log(response.data);

      setFormSubmissions(response.data);
    } catch (error) {
      console.error("Error fetching forms:", error);
    }
  };

  const fetchPreferredPrograms = async () => {
    try {
      const response = await allaxios.get(API_URL.PREFERRED_PROGRAM.GET_ALL);
      console.log(response.data);
      
      setPreferredPrograms(response.data);
    } catch (error) {
      console.error("Error fetching programs:", error);
    }
  };

  // const matchedPrograms = ;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        const response = await allaxios.patch(
          API_URL.FORM.UPDATE(editId),
          formData
        );
        console.log(response);
      } else {
        await allaxios.post(API_URL.FORM.CREATE, formData);
      }
      fetchForms();
      setShowModal(false);
      setEditId(null);
      setFormData({
        full_name: "",
        mobile_number: "",
        email: "",
        preferred_program: "",
        college_studied: "", // Reset new field
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleEdit = (form) => {
    setFormData(form);
    setEditId(form.id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      try {
        await allaxios.delete(API_URL.FORM.DELETE(id));
        fetchForms();
      } catch (error) {
        console.error("Error deleting form:", error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Form Submissions</h2>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add New
      </Button>

      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Mobile Number</th>
            <th>Email</th>
            <th>Preferred Program</th>
            <th>College Studied</th> {/* New Column */}
            <th>Submitted At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {formSubmissions.map((form) => (
            <tr key={form.id}>
              <td>{form.id}</td>
              <td>{form.full_name}</td>
              <td>{form.mobile_number}</td>
              <td>{form.email}</td>
              <td>
                {preferredPrograms.find((program)=>program.id===form.preferred_program)?.name || "N/A"}
              </td>
              <td>{form.college_studied || "N/A"}</td>{" "}
              {/* Handle missing data */}
              <td>
                {form.submitted_at
                  ? new Date(form.submitted_at).toLocaleString()
                  : "N/A"}
              </td>
              <td>
                <AiFillEdit
                  className="text-primary me-2"
                  onClick={() => handleEdit(form)}
                />
                <AiFillDelete
                  className="text-danger"
                  onClick={() => handleDelete(form.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Add/Edit Form Submission */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editId ? "Edit Form" : "Add Form"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                type="text"
                name="mobile_number"
                value={formData.mobile_number}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Preferred Program</Form.Label>
              <Form.Select
                name="preferred_program"
                value={formData.preferred_program}
                onChange={handleChange}
                required
              >
                <option value="">Select a program</option>
                {preferredPrograms.map((program) => (
                  <option key={program.id} value={program.id}>
                    {program.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>College Studied</Form.Label> {/* New Input Field */}
              <Form.Control
                type="text"
                name="college_studied"
                value={formData.college_studied}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {editId ? "Update" : "Submit"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default FormSubmission;
