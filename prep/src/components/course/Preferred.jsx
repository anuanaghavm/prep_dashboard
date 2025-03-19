import React, { useState, useEffect } from "react";
import allaxios from "../../api/axios"; // Import Axios instance
import API_URL from "../../api/api_url";
import { Table, Button, Modal, Form } from "react-bootstrap";

const PreferredProgram = () => {
    const [preferredPrograms, setPreferredPrograms] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newProgramName, setNewProgramName] = useState("");

    // Fetch preferred programs dynamically
    const fetchPreferredPrograms = async () => {
        try {
            const response = await allaxios.get(API_URL.PREFERRED_PROGRAM.GET_ALL);
            setPreferredPrograms(response.data);
        } catch (error) {
            console.error("Error fetching programs:", error);
        }
    };

    useEffect(() => {
        fetchPreferredPrograms();
    }, []);

    // Open modal
    const handleShowModal = () => setShowModal(true);

    // Close modal
    const handleCloseModal = () => {
        setShowModal(false);
        setNewProgramName(""); // Reset input
    };

    // Handle adding a new program
    const handleAddNewProgram = async () => {
        if (!newProgramName.trim()) {
            alert("Please enter a program name.");
            return;
        }

        try {
            const response = await allaxios.post(API_URL.PREFERRED_PROGRAM.CREATE, {
                name: newProgramName,
            });

            // Update table with new program
            setPreferredPrograms([...preferredPrograms, response.data]);

            handleCloseModal();
        } catch (error) {
            console.error("Error adding program:", error);
        }
    };

    return (
        <div className="container mt-4">
            <h3>Preferred Programs</h3>

            {/* Add New Button */}
            <Button variant="primary" className="mb-3" onClick={handleShowModal}>
                Add New
            </Button>

            {/* Table to display programs */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {preferredPrograms.map((program) => (
                        <tr key={program.id}>
                            <td>{program.id}</td>
                            <td>{program.name}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal for Adding New Program */}
            <Modal show={showModal} onHide={handleCloseModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Program</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Program Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter program name"
                                value={newProgramName}
                                onChange={(e) => setNewProgramName(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleAddNewProgram}>
                        Add Program
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default PreferredProgram;
