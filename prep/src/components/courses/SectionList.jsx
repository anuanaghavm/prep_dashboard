import React, { useState, useEffect } from 'react';
import { Table, Card, Container, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const SectionList = () => {
  const [sections, setSections] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);
  const [formData, setFormData] = useState({
    section_name: '',
    subject: ''
  });

  const handleClose = () => {
    setShowModal(false);
    setEditMode(false);
    setSelectedSection(null);
    setFormData({
      section_name: '',
      subject: ''
    });
  };

  const handleShow = () => setShowModal(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const fetchSubjects = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/subjects/');
      console.log('Subjects response:', response.data);
      setSubjects(response.data);
    } catch (err) {
      console.error('Error fetching subjects:', err.response?.data || err.message);
    }
  };

  const fetchSections = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/sections/');
      console.log('Sections response:', response.data);
      setSections(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error details:', err.response?.data || err.message);
      setError(err.message || 'Error fetching section data');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        section_name: formData.section_name,
        subject: parseInt(formData.subject)
      };
      console.log('Submitting data:', payload);

      if (editMode && selectedSection) {
        await axios.put(`http://127.0.0.1:8000/api/sections/${selectedSection.id}/`, payload);
      } else {
        await axios.post('http://127.0.0.1:8000/api/sections/', payload);
      }
      fetchSections();
      handleClose();
    } catch (err) {
      console.error('Error saving section:', err.response?.data || err.message);
      alert('Error saving section. Please try again.');
    }
  };

  const handleEdit = (section) => {
    console.log('Editing section:', section);
    setSelectedSection(section);
    setFormData({
      section_name: section.section_name,
      subject: section.subject?.id || section.subject
    });
    setEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this section?')) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/sections/${id}/`);
        fetchSections();
      } catch (err) {
        console.error('Error deleting section:', err.response?.data || err.message);
        alert('Error deleting section');
      }
    }
  };

  useEffect(() => {
    fetchSubjects();
    fetchSections();
  }, []);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

  return (
    <Container fluid className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <b><u>Section Categories</u></b>
        </h2>
        <Button variant="primary" onClick={handleShow} style={{backgroundColor: "#FF6B45", border: "none"}}>
          Add New Section
        </Button>
      </div>

      <Card className="mt-4">
        <Card.Body>
          <Table responsive striped hover>
            <thead>
              <tr>
                <th style={{ width: '10%' }}>ID</th>
                <th style={{ width: '35%' }}>Section Name</th>
                <th style={{ width: '35%' }}>Subject Name</th>
                <th style={{ width: '20%', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sections.map((section) => (
                <tr key={section.id}>
                  <td>{section.id}</td>
                  <td>{section.section_name}</td>
                  <td>
                    {section.subject?.subject_name || 
                     subjects.find(s => s.id === section.subject)?.subject_name || 
                     'N/A'}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <Button 
                      variant="warning" 
                      size="sm"
                      onClick={() => handleEdit(section)}
                      className="me-2"
                      style={{ display: 'inline-block' }}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="danger" 
                      size="sm"
                      onClick={() => handleDelete(section.id)}
                      style={{ display: 'inline-block' }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Edit Section' : 'Add New Section'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Section Name</Form.Label>
              <Form.Control
                type="text"
                name="section_name"
                value={formData.section_name}
                onChange={handleInputChange}
                required
                placeholder="Enter section name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Subject Category</Form.Label>
              <Form.Select
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Subject Category</option>
                {subjects.map(subject => (
                  <option key={subject.id} value={subject.id}>
                    {subject.subject_name} ({subject.course?.category || 'N/A'})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" style={{backgroundColor: "#FF6B45", border: "none"}}>
                {editMode ? 'Update Section' : 'Create Section'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default SectionList; 