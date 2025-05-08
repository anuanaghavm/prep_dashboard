import React, { useState, useEffect } from "react";
import allaxios from "../../api/axios";
import API_URL from "../../api/api_url";
import { Table, Button, Modal } from "react-bootstrap";

const RemoveCoursePayment = () => {
  const [coursePayments, setCoursePayments] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => {
    fetchCoursePayments();
  }, []);

  const fetchCoursePayments = async () => {
    try {
      const response = await allaxios.get(API_URL.PAYMENTS.GET_COURSE_PAYMENTS);
      console.log("Course Payments:", response.data);
      setCoursePayments(response.data);
    } catch (error) {
      console.error("Error fetching course payments:", error);
    }
  };

  const handleRemoveClick = (payment) => {
    setSelectedPayment(payment);
    setShowConfirmModal(true);
  };

  const handleConfirmRemove = async () => {
    try {
      await allaxios.delete(API_URL.PAYMENTS.DELETE_COURSE_PAYMENT(selectedPayment.id));
      alert("Course payment removed successfully");
      fetchCoursePayments(); // Refresh the list
      setShowConfirmModal(false);
    } catch (error) {
      console.error("Error removing course payment:", error);
      alert("Failed to remove course payment");
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Remove Course Payment</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Student Name</th>
            <th>Payment Date</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {coursePayments.length > 0 ? (
            coursePayments.map((payment) => (
              <tr key={payment.id}>
                <td>{payment.course_name}</td>
                <td>{payment.student_name}</td>
                <td>{new Date(payment.payment_date).toLocaleDateString()}</td>
                <td>₹{payment.amount}</td>
                <td>
                  <Button 
                    variant="danger" 
                    size="sm"
                    onClick={() => handleRemoveClick(payment)}
                  >
                    Remove
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No course payments found</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Confirmation Modal */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Removal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove the payment for course "
          {selectedPayment?.course_name}" by {selectedPayment?.student_name}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmRemove}>
            Remove Payment
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RemoveCoursePayment; 