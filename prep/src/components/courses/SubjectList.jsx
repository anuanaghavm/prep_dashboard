import React, { useState, useEffect } from 'react';
import { Table, Card, Container, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const SubjectList = () => {
  const [subjects, setSubjects] = useState([]);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [formData, setFormData] = useState({
    subject_name: '',
    course: ''
  });

  const handleClose = () => {
    setShowModal(false);
    setEditMode(false);
    setSelectedSubject(null);
    setFormData({
      subject_name: '',
      course: ''
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

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/courses/');
      console.log('Courses response:', response.data); // Debug log
      setCourses(response.data);
    } catch (err) {
      console.error('Error fetching courses:', err.response?.data || err.message);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/subjects/');
      console.log('Subjects response:', response.data); // Debug log
      setSubjects(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error details:', err.response?.data || err.message);
      setError(err.message || 'Error fetching subject data');
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        subject_name: formData.subject_name,
        course: parseInt(formData.course) // Ensure course ID is sent as integer
      };
      console.log('Submitting data:', payload); // Debug log

      if (editMode && selectedSubject) {
        await axios.put(`http://127.0.0.1:8000/api/subjects/${selectedSubject.id}/`, payload);
      } else {
        await axios.post('http://127.0.0.1:8000/api/subjects/', payload);
      }
      fetchSubjects();
      handleClose();
    } catch (err) {
      console.error('Error saving subject:', err.response?.data || err.message);
      alert('Error saving subject. Please try again.');
    }
  };

  const handleEdit = (subject) => {
    console.log('Editing subject:', subject); // Debug log
    setSelectedSubject(subject);
    setFormData({
      subject_name: subject.subject_name,
      course: subject.course?.id || subject.course // Handle both nested and direct course ID
    });
    setEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this subject?')) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/subjects/${id}/`);
        fetchSubjects();
      } catch (err) {
        console.error('Error deleting subject:', err.response?.data || err.message);
        alert('Error deleting subject');
      }
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchSubjects();
  }, []);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

  return (
    <Container fluid className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <b><u>Subject Categories</u></b>
        </h2>
        <Button variant="primary" onClick={handleShow} style={{backgroundColor: "#FF6B45", border: "none"}}>
          Add New Subject
        </Button>
      </div>

      <Card className="mt-4">
        <Card.Body>
          <Table responsive striped hover>
            <thead>
              <tr>
                <th style={{ width: '10%' }}>ID</th>
                <th style={{ width: '35%' }}>Subject Name</th>
                <th style={{ width: '35%' }}>Course Category</th>
                <th style={{ width: '20%', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject) => (
                <tr key={subject.id}>
                  <td>{subject.id}</td>
                  <td>{subject.subject_name}</td>
                  <td>
                    {subject.course?.category || 
                     courses.find(c => c.id === subject.course)?.category || 
                     'N/A'}
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <Button 
                      variant="warning" 
                      size="sm"
                      onClick={() => handleEdit(subject)}
                      className="me-2"
                      style={{ display: 'inline-block' }}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="danger" 
                      size="sm"
                      onClick={() => handleDelete(subject.id)}
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
          <Modal.Title>{editMode ? 'Edit Subject' : 'Add New Subject'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Subject Name</Form.Label>
              <Form.Control
                type="text"
                name="subject_name"
                value={formData.subject_name}
                onChange={handleInputChange}
                required
                placeholder="Enter subject name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Course Category</Form.Label>
              <Form.Select
                name="course"
                value={formData.course}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Course Category</option>
                {courses.map(course => (
                  <option key={course.id} value={course.id}>
                    {course.category}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" style={{backgroundColor: "#FF6B45", border: "none"}}>
                {editMode ? 'Update Subject' : 'Create Subject'}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default SubjectList; 