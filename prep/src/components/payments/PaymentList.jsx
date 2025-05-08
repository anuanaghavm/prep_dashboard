import React, { useState, useEffect } from "react";
import allaxios from "../../api/axios";
import API_URL from "../../api/api_url";
import { Table, Badge, Card, Form, InputGroup } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import "../../style/PaymentList.css";

const PaymentList = () => {
  const [payments, setPayments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [allPayments, setAllPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await allaxios.get(API_URL.PAYMENTS.GET_PAYMENTS);
        console.log("Initial payments data:", response.data);
        setAllPayments(response.data);
        setPayments(response.data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    fetchPayments();
  }, []);

  // Handle search input change
  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    console.log("Search query:", query);
    console.log("All payments:", allPayments);

    if (query.trim() === "") {
      setPayments(allPayments);
    } else {
      const filtered = allPayments.filter(payment => {
        const userName = payment.user_name || "";  // Handle potential undefined
        console.log("Checking payment:", payment);
        console.log("User name:", userName);
        return userName.toLowerCase().includes(query.toLowerCase());
      });
      console.log("Filtered payments:", filtered);
      setPayments(filtered);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  return (
    <div className="container-fluid mt-4 pb-4">
      <Card className="shadow-sm">
        <Card.Header className="bg-white py-3">
          <div className="d-flex justify-content-between align-items-center">
            <h2 className="mb-0"><u>Payments List</u></h2>
            <div className="d-flex align-items-center" style={{ width: '300px' }}>
              <InputGroup>
                <InputGroup.Text className="bg-white">
                  <FaSearch className="text-muted" />
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search by student name..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="border-start-0"
                />
              </InputGroup>
            </div>
          </div>
        </Card.Header>
        <Card.Body className="p-0">
          <div className="table-responsive">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th style={{ width: '5%' }}>ID</th>
                  <th style={{ width: '15%' }}>Student Name</th>
                  <th style={{ width: '15%' }}>Course Name</th>
                  <th style={{ width: '25%' }}>Order ID</th>
                  <th style={{ width: '12%' }}>Amount</th>
                  <th style={{ width: '12%' }}>Status</th>
                  <th style={{ width: '16%' }}>Created At</th>
                </tr>
              </thead>
              <tbody>
                {payments.length > 0 ? (
                  payments.map((payment) => (
                    <tr key={payment.id}>
                      <td>{payment.id}</td>
                      <td>{payment.user_name}</td>
                      <td>{payment.userform_title}</td>
                      <td>
                        <div className="d-flex flex-column">
                          <span title={payment.razorpay_order_id} className="text-truncate">
                            {payment.razorpay_order_id}
                          </span>
                          {payment.razorpay_payment_id && (
                            <small className="text-muted text-truncate" title={payment.razorpay_payment_id}>
                              Payment ID: {payment.razorpay_payment_id}
                            </small>
                          )}
                        </div>
                      </td>
                      <td>{formatAmount(payment.amount)}</td>
                      <td>
                        <Badge bg={
                          payment.payment_status === 'pending' ? 'warning' :
                          payment.payment_status === 'failed' ? 'danger' : 'success'
                        }>
                          {payment.payment_status}
                        </Badge>
                      </td>
                      <td>{formatDate(payment.created_at)}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      {searchQuery ? 'No payments found for this student' : 'No payments found'}
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PaymentList; 