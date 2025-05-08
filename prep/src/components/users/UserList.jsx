import React, { useState, useEffect } from 'react';
import { Table, Card, Container, Button, Modal, Form, Badge } from 'react-bootstrap';
import axios from 'axios';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userPayments, setUserPayments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [paymentData, setPaymentData] = useState({
    course: '',
    amount: '',
    phone_number: ''
  });
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
    firebase_user_id: '',
  });

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  const handleDetailsClose = () => {
    setShowDetailsModal(false);
    setSelectedUser(null);
    setUserPayments([]);
  };

  const handleDetailsShow = async (user) => {
    setSelectedUser(user);
    try {
      // Fetch user's payments
      const response = await axios.get(`http://127.0.0.1:8000/api/user-payments/${user.uuid}/`);
      setUserPayments(response.data);
    } catch (err) {
      console.error('Error fetching user payments:', err);
    }
    setShowDetailsModal(true);
  };

  const handlePaymentModalClose = () => {
    setShowPaymentModal(false);
    setPaymentData({
      course: '',
      amount: '',
      phone_number: ''
    });
  };

  const handlePaymentModalShow = (user) => {
    setSelectedUser(user);
    setPaymentData(prev => ({
      ...prev,
      phone_number: user.phone_number || ''
    }));
    setShowPaymentModal(true);
  };

  const handlePaymentInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));
  };

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
      fetchUsers();
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
        firebase_user_id: '',
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

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/userform/');
      setCourses(response.data);
    } catch (err) {
      console.error('Error fetching courses:', err);
    }
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create order
      const orderResponse = await axios.post('http://127.0.0.1:8000/api/create-order/', {
        user: selectedUser.uuid,
        userform: paymentData.course,
        amount: paymentData.amount,
        phone_number: paymentData.phone_number
      });

      const options = {
        key: 'YOUR_RAZORPAY_KEY_ID', // Replace with your Razorpay key
        amount: orderResponse.data.amount,
        currency: "INR",
        name: "Your Company Name",
        description: "Course Payment",
        order_id: orderResponse.data.razorpay_order_id,
        handler: async function (response) {
          try {
            // Verify payment
            await axios.post('http://127.0.0.1:8000/api/verify-payment/', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            });
            
            // Refresh payment history
            const updatedPayments = await axios.get(`http://127.0.0.1:8000/api/user-payments/${selectedUser.uuid}/`);
            setUserPayments(updatedPayments.data);
            
            handlePaymentModalClose();
            alert('Payment successful!');
          } catch (err) {
            console.error('Payment verification failed:', err);
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: selectedUser.full_name,
          email: selectedUser.email,
          contact: paymentData.phone_number
        },
        theme: {
          color: "#FF6B45"
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error('Error initiating payment:', err);
      alert('Error initiating payment. Please try again.');
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchCourses();
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
                  <td>{user.program || '-'}</td>
                  <td>{user.exam_target || '-'}</td>
                  <td>
                    <div className="d-flex gap-2">
                      <Button 
                        variant="info" 
                        size="sm"
                        onClick={() => handleDetailsShow(user)}
                      >
                        View Details
                      </Button>
                      <Button 
                        variant="success" 
                        size="sm"
                        onClick={() => handlePaymentModalShow(user)}
                      >
                        Make Payment
                      </Button>
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
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Add User Modal */}
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
            <Form.Group className="mb-3">
              <Form.Label>Firebase User ID</Form.Label>
              <Form.Control
                type="text"
                name="firebase_user_id"
                value={newUser.firebase_user_id}
                onChange={handleInputChange}
                required
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

      {/* User Details Modal */}
      <Modal show={showDetailsModal} onHide={handleDetailsClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>User Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUser && (
            <>
              <h5>Personal Information</h5>
              <Table bordered>
                <tbody>
                  <tr>
                    <td><strong>Full Name</strong></td>
                    <td>{selectedUser.full_name}</td>
                  </tr>
                  <tr>
                    <td><strong>Email</strong></td>
                    <td>{selectedUser.email}</td>
                  </tr>
                  <tr>
                    <td><strong>Phone</strong></td>
                    <td>{selectedUser.phone_number}</td>
                  </tr>
                  <tr>
                    <td><strong>Gender</strong></td>
                    <td>{selectedUser.gender}</td>
                  </tr>
                  <tr>
                    <td><strong>Location</strong></td>
                    <td>{selectedUser.location || '-'}</td>
                  </tr>
                  <tr>
                    <td><strong>Program</strong></td>
                    <td>{selectedUser.program || '-'}</td>
                  </tr>
                  <tr>
                    <td><strong>Exam Target</strong></td>
                    <td>{selectedUser.exam_target || '-'}</td>
                  </tr>
                </tbody>
              </Table>

              <h5 className="mt-4">Payment History</h5>
              {userPayments.length > 0 ? (
                <Table bordered>
                  <thead>
                    <tr>
                      <th>Course</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userPayments.map((payment) => (
                      <tr key={payment.razorpay_order_id}>
                        <td>{payment.userform.title}</td>
                        <td>₹{payment.amount}</td>
                        <td>
                          <Badge bg={
                            payment.payment_status === 'paid' ? 'success' :
                            payment.payment_status === 'pending' ? 'warning' : 'danger'
                          }>
                            {payment.payment_status}
                          </Badge>
                        </td>
                        <td>{new Date(payment.created_at).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p>No payment history found.</p>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDetailsClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Payment Modal */}
      <Modal show={showPaymentModal} onHide={handlePaymentModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Course Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handlePaymentSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Select Course</Form.Label>
              <Form.Select
                name="course"
                value={paymentData.course}
                onChange={handlePaymentInputChange}
                required
              >
                <option value="">Select a course</option>
                {courses.map((course) => (
                  <option key={course.uuid} value={course.uuid}>
                    {course.title} - ₹{course.amount}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                name="phone_number"
                value={paymentData.phone_number}
                onChange={handlePaymentInputChange}
                required
                placeholder="Enter phone number"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Amount (₹)</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={paymentData.amount}
                onChange={handlePaymentInputChange}
                required
                placeholder="Enter amount"
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={handlePaymentModalClose}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" style={{backgroundColor: "#FF6B45", border: "none"}}>
                Proceed to Payment
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default UserList;