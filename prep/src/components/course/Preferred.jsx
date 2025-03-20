import React, { useState, useEffect } from "react";
import allaxios from "../../api/axios"; // Import Axios instance
import API_URL from "../../api/api_url";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

const PreferredProgram = () => {
  const [preferredPrograms, setPreferredPrograms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newProgramName, setNewProgramName] = useState("");
  const [editData, setEditData] = useState(null);

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
  const handleDelete = async (id) => {
    try {
      await allaxios.delete(API_URL.PREFERRED_PROGRAM.DELETE(id));
      fetchPreferredPrograms();
    } catch (error) {
      console.error("Error deleting program:", error);
    }
  };
  const handleEdit = (data) => {
    setShowModal(true);
    setEditData(data);
  };

  // Handle adding a new program
  const handleAddNewProgram = async () => {
    if (!newProgramName.trim()) {
      alert("Please enter a program name.");
      return;
    }
    
    console.log(editData);
    

    if(editData?.id){
        try{
            const response = await allaxios.patch(API_URL.PREFERRED_PROGRAM.UPDATE(editData.id), {
                name: newProgramName,
            });

            // Update table with new program
            fetchPreferredPrograms();
            handleCloseModal();
        }catch(error){
            console.error("Error updating program:",
            error); 
        }
    }else{
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
    }
  };

  useEffect(()=>{
        if(editData){
            setNewProgramName(editData.name);
        }
  },[editData])

  return (
    <div className="container mt-4">
      <div className=" d-flex justify-content-between">
      <h2 style={{ fontWeight: "bold" }}>Preferred Programs</h2>
      <Button className="" variant="primary" onClick={() => setShowModal(true)}>
            Add New
          </Button>
      </div>
      {/* Table to display programs */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {preferredPrograms.map((program) => (
            <tr key={program.id}>
              <td>{program.id}</td>
              <td>{program.name}</td>
              <td>
                <AiFillEdit
                  className="text-primary me-2"
                  onClick={() => handleEdit(program)}
                />
                <AiFillDelete
                  className="text-danger"
                  onClick={() => handleDelete(program.id)}
                />
              </td>
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
