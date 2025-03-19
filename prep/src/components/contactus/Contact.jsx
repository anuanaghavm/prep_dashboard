import React, { useState, useEffect } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import API_URL from "../../api/api_url"; // Import API endpoints
import "../../style/contact.css";
import allaxios from "../../api/axios";
import { Modal } from "react-bootstrap";

const Contact = () => {
  const [contacts, setContacts] = useState([]); // Store contact list
  const [showForm, setShowForm] = useState(false);
  const [full_name, setFullName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [editId, setEditId] = useState(null);

  // Fetch Contact Data
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await allaxios.get(API_URL.CONTACT.GET_CONTACT);
      console.log(response);

      setContacts(response.data);
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const handleNew = () => {
    setShowForm(true);
    setFullName("");
    setPhoneNumber("");
    setEmail("");
    setMessage("");
    setError("");
  };

  const handleEdit = (contact) => {
    setShowForm(true);
    setEditId(contact.id);
    setFullName(contact.full_name);
    setPhoneNumber(contact.phone_number);
    setEmail(contact.email);
    setMessage(contact.message);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      try {
        await allaxios.delete(API_URL.CONTACT.CONTACT_DELETE(id));
        fetchContacts();
      } catch (error) {
        console.error("Error deleting contact:", error);
      }
    }
  };  

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    const formData = { full_name, phone_number, email, message };

    try {
      if (editId) {
        await allaxios.patch(API_URL.CONTACT.CONTACT_PATCH(editId), formData);
      } else {
        await allaxios.post(API_URL.CONTACT.POST_CONTACT, formData);
      }
      fetchContacts();
      setShowForm(false);
    } catch (error) {
      setError("Failed to save contact. Please try again.");
      console.error("Error saving form:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between">
        <h4><u>Contact List</u></h4>
        <button className="btn btn-primary" onClick={handleNew}>
          Add New
        </button>
      </div>

      {/* Contact Table */}
      <table className="table mt-3">
        <thead>
          <tr>
            <th>slno</th>
            <th>Full Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Message</th>
            <th>Actions</th> {/* New column for buttons */}
          </tr>
        </thead>
        <tbody>
          {contacts.length > 0 ? (
            contacts.map((contact, index) => (
              <tr key={contact.id}>
                <td>{index + 1}</td>
                <td>{contact.full_name}</td>
                <td>{contact.phone_number}</td>
                <td>{contact.email}</td>
                <td>{contact.message}</td>
                <td>
                  {/* Edit Button */}
                  <button
                    className="btn btn-warning btn-sm mx-1"
                    onClick={() => handleEdit(contact)}
                  >
                    <AiFillEdit />
                  </button>

                  {/* Delete Button */}
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(contact.id)}
                  >
                    <AiFillDelete />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No contacts found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Contact Form Modal */}
      <Modal size="lg" centered className="" show={showForm} onHide={() => setShowForm(false)}>
          <div className="modal-content custom-modal p-3 w-100">
            <h5 className="modal-title">
              <strong><b>Add Contact</b></strong>
            </h5>
            {error && <p className="text-danger">{error}</p>}
            <form className="" onSubmit={handleSubmit}>
              <label className="form-label">Full Name</label>
              <input
                className="form-control mb-2"
                placeholder="Full Name"
                value={full_name}
                onChange={(e) => setFullName(e.target.value)}
                required
              />

              <label className="form-label">Phone Number</label>
              <input
                className="form-control mb-2"
                placeholder="Phone Number"
                value={phone_number}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />

              <label className="form-label">Email</label>
              <input
                className="form-control mb-2"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label className="form-label">Message</label>
              <textarea
                className="form-control mb-2"
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              ></textarea>

              <button
                type="submit"
                className="btn btn-success"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </button>
              <button
                type="button"
                className="btn btn-secondary ml-2"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </form>
          </div>
      </Modal>
    </div>
  );
};

export default Contact;
