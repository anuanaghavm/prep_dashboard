import React, { useState, useEffect } from "react";
import allaxios from "../../api/axios";
import API_URL from "../../api/api_url";
import { Table, Badge } from "react-bootstrap";
import "../style/PaymentList.css";

const PaymentList = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await allaxios.get(API_URL.PAYMENTS.GET_PAYMENTS);
        console.log("Payments data:", response.data);
        setPayments(response.data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    fetchPayments();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="container-fluid mt-4">
      <h2 className="mb-4 ps-3"><u>Payments List</u></h2>
      <div className="table-responsive">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ width: '5%' }}>ID</th>
              <th style={{ width: '15%' }}>Course Name</th>
              <th style={{ width: '25%' }}>Order ID</th>
              <th style={{ width: '10%' }}>Amount</th>
              <th style={{ width: '10%' }}>Status</th>
              <th style={{ width: '15%' }}>Created At</th>
              <th style={{ width: '10%' }}>User ID</th>
              <th style={{ width: '10%' }}>User Form</th>
            </tr>
          </thead>
          <tbody>
            {payments.length > 0 ? (
              payments.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.id}</td>
                  <td>{payment.course_name}</td>
                  <td title={payment.razorpay_order_id}>{payment.razorpay_order_id}</td>
                  <td>₹{payment.amount}</td>
                  <td>
                    <Badge bg={payment.payment_status === 'pending' ? 'warning' : 'success'}>
                      {payment.payment_status}
                    </Badge>
                  </td>
                  <td>{formatDate(payment.created_at)}</td>
                  <td>{payment.user}</td>
                  <td>{payment.userform}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">No payments found</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default PaymentList; 