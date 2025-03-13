import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simulating successful registration
    setSuccessMessage("Registered successfully!");

    // Logging form data (Replace with API call)
    console.log("Signup form submitted", formData);

    // Reset form fields after submission
    setFormData({ username: "", email: "", password: "" });

    // Optionally, hide message after few seconds
    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  return (
    <div className="d-flex vh-100 align-items-center justify-content-center">
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-md-8">
            <div className="card shadow-lg overflow-hidden">
              <div className="row g-0">
                {/* Left Section */}
                <div className="col-md-6 d-flex flex-column justify-content-center align-items-center text-white bg-danger p-4">
                  <h1 className="fw-bold">Join Destiny</h1>
                  <p className="mt-3 fs-5">Create an account in seconds!</p>
                </div>

                {/* Right Section - Signup Form */}
                <div className="col-md-6 align-items-center justify-content-center d-flex flex-column p-4">
                  <h2 className="text-center fw-semibold">Sign Up</h2>

                  {/* Success Message */}
                  {successMessage && (
                    <div className="alert alert-success text-center">{successMessage}</div>
                  )}

                  <form className="mt-3" onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label className="form-label">Username</label>
                      <input
                        type="text"
                        name="username"
                        className="form-control"
                        placeholder="Enter your username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Password</label>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <button type="submit" className="btn btn-danger w-100">
                      Sign Up
                    </button>
                  </form>
                  <p className="mt-3 text-center">
                    Already have an account?{" "}
                    <a href="/login" className="text-danger text-decoration-none">
                      Login
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
