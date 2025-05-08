import React, { useState, useEffect } from "react";
import allaxios from "../../api/axios";
import API_URL from "../../api/api_url";
import { Table } from "react-bootstrap";

const PaymentHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const response = await allaxios.get(API_URL.PAYMENTS.GET_PAYMENT_HISTORY);
        console.log("Payment History:", response.data);
        setHistory(response.data);
      } catch (error) {
        console.error("Error fetching payment history:", error);
      }
    };

    fetchPaymentHistory();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Payment History</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Date</th>
            <th>Transaction ID</th>
            <th>Course</th>
            <th>Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {history.length > 0 ? (
            history.map((item) => (
              <tr key={item.id}>
                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td>{item.transaction_id}</td>
                <td>{item.course_name}</td>
                <td>₹{item.amount}</td>
                <td>
                  <span className={`badge ${item.status === 'completed' ? 'bg-success' : 'bg-warning'}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No payment history found</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default PaymentHistory; 