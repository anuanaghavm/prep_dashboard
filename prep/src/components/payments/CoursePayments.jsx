import React, { useState, useEffect } from 'react';
import { Table, Card, Container, Button, Modal, Form, Badge } from 'react-bootstrap';
import axios from 'axios';

const CoursePayments = () => {
  const [courses, setCourses] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [paymentData, setPaymentData] = useState({
    user: '',
    course: '',
    amount: '',
    phone_number: ''
  });

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/userform/');
      setCourses(response.data);
    } catch (err) {
      console.error('Error fetching courses:', err);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/form/');
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError('Error fetching users');
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShowModal(false);
    setPaymentData({
      user: '',
      course: '',
      amount: '',
      phone_number: ''
    });
  };

  const handleShow = () => setShowModal(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentData(prev => ({
      ...prev,
      [name]: value
    }));

    // Auto-fill amount when course is selected
    if (name === 'course') {
      const selectedCourse = courses.find(course => course.uuid === value);
      if (selectedCourse) {
        setPaymentData(prev => ({
          ...prev,
          amount: selectedCourse.amount
        }));
      }
    }

    // Auto-fill phone number when user is selected
    if (name === 'user') {
      const selectedUser = users.find(user => user.uuid === value);
      if (selectedUser) {
        setPaymentData(prev => ({
          ...prev,
          phone_number: selectedUser.phone_number || ''
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create order
      const orderResponse = await axios.post('http://127.0.0.1:8000/api/create-order/', {
        user: paymentData.user,
        userform: paymentData.course,
        amount: paymentData.amount,
        phone_number: paymentData.phone_number
      });

      const selectedUser = users.find(user => user.uuid === paymentData.user);

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
            
            handleClose();
            alert('Payment successful!');
          } catch (err) {
            console.error('Payment verification failed:', err);
            alert('Payment verification failed. Please contact support.');
          }
        },
        prefill: {
          name: selectedUser?.full_name || '',
          email: selectedUser?.email || '',
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
    fetchCourses();
    fetchUsers();
  }, []);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center mt-5 text-danger">{error}</div>;

  return (
    <Container fluid className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>
          <b><u>Course Payments</u></b>
        </h2>
        <Button variant="primary" onClick={handleShow} style={{backgroundColor: "#FF6B45", border: "none"}}>
          New Payment
        </Button>
      </div>

      <Card>
        <Card.Body>
          <Table responsive striped hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Duration</th>
                <th>Amount</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.uuid}>
                  <td>{course.title}</td>
                  <td>{course.description}</td>
                  <td>{course.duration}</td>
                  <td>₹{course.amount}</td>
                  <td>
                    <Button 
                      variant="primary" 
                      size="sm"
                      onClick={() => {
                        setPaymentData(prev => ({
                          ...prev,
                          course: course.uuid,
                          amount: course.amount
                        }));
                        handleShow();
                      }}
                      style={{backgroundColor: "#FF6B45", border: "none"}}
                    >
                      Make Payment
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>

      {/* Payment Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Select User</Form.Label>
              <Form.Select
                name="user"
                value={paymentData.user}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a user</option>
                {users.map((user) => (
                  <option key={user.uuid} value={user.uuid}>
                    {user.full_name} ({user.email})
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Select Course</Form.Label>
              <Form.Select
                name="course"
                value={paymentData.course}
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                required
                placeholder="Enter amount"
                readOnly
              />
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={handleClose}>
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

export default CoursePayments; 