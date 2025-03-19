import React, { useState, useEffect } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import allaxios from "../../api/axios"; // Import Axios instance
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
    });
    const [editId, setEditId] = useState(null);

    // Fetch form submissions
    const fetchForms = async () => {
        try {
            const response = await allaxios.get(API_URL.FORM.GET_ALL);
            setFormSubmissions(response.data);
        } catch (error) {
            console.error("Error fetching forms:", error);
        }
    };

    // Fetch preferred programs
    const fetchPreferredPrograms = async () => {
        try {
            const response = await allaxios.get(API_URL.PREFERRED_PROGRAM.GET_ALL);
            setPreferredPrograms(response.data);
        } catch (error) {
            console.error("Error fetching programs:", error);
        }
    };

    useEffect(() => {
        fetchForms();
        fetchPreferredPrograms();
    }, []);

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission (create/update)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editId) {
                await allaxios.patch(API_URL.FORM.UPDATE(editId), formData);
            } else {
                await allaxios.post(API_URL.FORM.CREATE, formData);
            }
            fetchForms();
            setShowModal(false);
            setEditId(null);
            setFormData({ full_name: "", mobile_number: "", email: "", preferred_program: "" });
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    // Handle edit
    const handleEdit = (form) => {
        setFormData(form);
        setEditId(form.id);
        setShowModal(true);
    };

    // Handle delete
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
            <Button variant="primary" onClick={() => setShowModal(true)}>Add New</Button>

            {/* Table to Display Form Submissions */}
            <Table striped bordered hover className="mt-3">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Full Name</th>
                        <th>Mobile Number</th>
                        <th>Email</th>
                        <th>Preferred Program</th>
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
                            <td>{form.preferred_program.name}</td>
                            <td>{new Date(form.submitted_at).toLocaleString()}</td>
                            <td>
                                <AiFillEdit className="text-primary me-2" onClick={() => handleEdit(form)} />
                                <AiFillDelete className="text-danger" onClick={() => handleDelete(form.id)} />
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
                        <Button variant="primary" type="submit">
                            {editId ? "Update" : "Submit"}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default FormSubmission