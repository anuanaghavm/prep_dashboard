import React, { useState, useEffect } from 'react';
import { Table, Card, Container, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newUser, setNewUser] = useState({
    full_name: '',
    email: '',
    password: '',
    phone_number: '',
    gender: '',
    location: '',
    program: '',
    exam_target: '',
    dob: '',
  });

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/form/', newUser);
      fetchUsers(); // Refresh the list
      handleClose();
      setNewUser({
        full_name: '',
        email: '',
        password: '',
        phone_number: '',
        gender: '',
        location: '',
        program: '',
        exam_target: '',
        dob: '',
      });
    } catch (err) {
      console.error('Error creating user:', err);
      alert('Error creating user. Please try again.');
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/form/');
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error details:', err);
      setError(err.message || 'Error fetching user data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

  return (
    <Container fluid className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <b><u>User Management</u></b>
        </h2>
        <Button variant="primary" onClick={handleShow} style={{backgroundColor: "#FF6B45", border: "none"}}>
          Add New User
        </Button>
      </div>

      <Card className="mt-4">
        <Card.Body>
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Gender</th>
                <th>Location</th>
                <th>Program</th>
                <th>Exam Target</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.uuid}>
                  <td>{user.full_name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone_number}</td>
                  <td>{user.gender}</td>
                  <td>{user.location || '-'}</td>
                  <td>{user.program || '-'}</td>
                  <td>{user.exam_target || '-'}</td>
                  <td>
                    <Button 
                      variant="danger" 
                      size="sm"
                      onClick={async () => {
                        if (window.confirm('Are you sure you want to delete this user?')) {
                          try {
                            await axios.delete(`http://127.0.0.1:8000/api/form/${user.uuid}/`);
                            fetchUsers();
                          } catch (err) {
                            console.error('Error deleting user:', err);
                            alert('Error deleting user');
                          }
                        }
                      }}
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
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="full_name"
                value={newUser.full_name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={newUser.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={newUser.password}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                name="phone_number"
                value={newUser.phone_number}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                name="gender"
                value={newUser.gender}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="dob"
                value={newUser.dob}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                name="location"
                value={newUser.location}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Program</Form.Label>
              <Form.Control
                type="text"
                name="program"
                value={newUser.program}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Exam Target</Form.Label>
              <Form.Control
                type="text"
                name="exam_target"
                value={newUser.exam_target}
                onChange={handleInputChange}
              />
            </Form.Group>
            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" style={{backgroundColor: "#FF6B45", border: "none"}}>
                Create User
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default UserList;