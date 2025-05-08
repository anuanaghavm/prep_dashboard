import React, { useState, useEffect } from 'react';
import { Table, Card, Container, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newCourse, setNewCourse] = useState({
    category: ''
  });

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/courses/', newCourse);
      fetchCourses();
      handleClose();
      setNewCourse({
        category: ''
      });
    } catch (err) {
      console.error('Error creating course:', err);
      alert('Error creating course. Please try again.');
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/courses/');
      setCourses(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error details:', err);
      setError(err.message || 'Error fetching course data');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/courses/${id}/`);
        fetchCourses();
      } catch (err) {
        console.error('Error deleting course:', err);
        alert('Error deleting course');
      }
    }
  };

  const handleEdit = async (course) => {
    const newCategory = prompt('Enter new category name:', course.category);
    if (newCategory && newCategory !== course.category) {
      try {
        await axios.put(`http://127.0.0.1:8000/api/courses/${course.id}/`, {
          category: newCategory
        });
        fetchCourses();
      } catch (err) {
        console.error('Error updating course:', err);
        alert('Error updating course');
      }
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

  return (
    <Container fluid className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <b><u>Course Categories</u></b>
        </h2>
        <Button variant="primary" onClick={handleShow} style={{backgroundColor: "#FF6B45", border: "none"}}>
          Add New Category
        </Button>
      </div>

      <Card className="mt-4">
        <Card.Body>
          <Table responsive striped hover>
            <thead>
              <tr>
                <th style={{ width: '10%' }}>ID</th>
                <th style={{ width: '70%' }}>Category</th>
                <th style={{ width: '20%', textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id}>
                  <td>{course.id}</td>
                  <td>{course.category}</td>
                  <td style={{ textAlign: 'center' }}>
                    <Button 
                      variant="warning" 
                      size="sm"
                      onClick={() => handleEdit(course)}
                      className="me-2"
                      style={{ display: 'inline-block' }}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="danger" 
                      size="sm"
                      onClick={() => handleDelete(course.id)}
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
          <Modal.Title>Add New Course Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                name="category"
                value={newCourse.category}
                onChange={handleInputChange}
                required
                placeholder="Enter category name"
              />
            </Form.Group>
            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" style={{backgroundColor: "#FF6B45", border: "none"}}>
                Create Category
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default CourseList; 