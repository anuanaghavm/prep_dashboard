import React, { useState } from "react";
import "../../style/contact.css";

const Contact = () => {
  const [showForm, setShowForm] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [full_name, setFullName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleNew = () => {
    setShowForm(true);
    setFullName("");
    setPhoneNumber("");
    setEmail("");
    setMessage("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmittedData({ full_name, phone_number, email, message });
    setShowForm(false);
  };

  return (
    <div className="d-flex justify-content-center align-items-center blog-card mt-5">
      <div className="w-50" style={{ marginTop: "80px" }}>
        <div className="blog-card-header d-flex justify-content-between">
          <h4>Contact Us</h4>
          <div>
            <button className="btn search-btn" onClick={handleNew}>
              Add New
            </button>
            <button className="btn search-btn" onClick={handleNew}>
              Delete
            </button>
          </div>
        </div>

        {showForm ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Full name</label>
              <input
                className="form-control"
                placeholder="Enter your full name"
                type="text"
                value={full_name}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Phone number</label>
              <input
                className="form-control"
                placeholder="Phone number"
                type="text"
                value={phone_number}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                className="form-control"
                placeholder="Email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                className="form-control"
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>

            <button type="submit" className="btn save-btn">
              Save
            </button>
          </form>
        ) : submittedData ? (
          <div className="submitted-data">
            <h5>Submitted Contact Information</h5>
            <p><strong>Full Name:</strong> {submittedData.full_name}</p>
            <p><strong>Phone Number:</strong> {submittedData.phone_number}</p>
            <p><strong>Email:</strong> {submittedData.email}</p>
            <p><strong>Message:</strong> {submittedData.message}</p>
          </div>
        ) : (
          <p>No contact information submitted yet.</p>
        )}
      </div>
    </div>
  );
};

export default Contact;
