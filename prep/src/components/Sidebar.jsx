import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

// ✅ FIX: Corrected import path for the image
import logoSrc from "/src/assets/Headerlogo.webp"; 

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div
      className="d-flex flex-column p-3 shadow-sm"
      style={{
        width: "23.5%",
        backgroundColor: "#FF6B45", // Sidebar background color
        height: "100vh",
      }}
    >
      {/* Sidebar Header with Logo */}
      <div
        className="text-center mb-3"
        style={{
          backgroundColor: "white", // White background for the logo
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <img src={logoSrc} alt="Company Logo" className="img-fluid" style={{ height: "50px" }} />
      </div>

      {/* Sidebar Navigation */}
      <ul className="nav flex-column">
        <li className="nav-item">
          <a className="nav-link text-white d-flex align-items-center" onClick={() => navigate("/dashboard")}>
            <i className="bi bi-house-door me-2"></i> Dashboard
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white d-flex align-items-center" onClick={() => navigate("/home")}>
            <i className="bi bi-briefcase me-2"></i> Home
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white d-flex align-items-center" onClick={() => navigate("/products")}>
            <i className="bi bi-box-seam me-2"></i> About us
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white d-flex align-items-center" onClick={() => navigate("/develop")}>
            <i className="bi bi-code-slash me-2"></i> Blogs
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white d-flex align-items-center" onClick={() => navigate("/admin")}>
            <i className="bi bi-gear me-2"></i> Admin
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
