import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logoSrc from "/src/assets/Headerlogo.webp";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Sidebar width logic
  const sidebarWidth = location.pathname === "/home" ? "15%" : "23.5%";

  return (
    <div
      className="d-flex flex-column p-3 shadow-sm"
      style={{
        width: "100%",
        backgroundColor: "#FF6B45",
        height: "100vh",
        transition: "width 0.3s ease-in-out",
      }}
    >
      {/* Sidebar Header with Logo */}
      <div
        className="text-center mb-3"
        style={{
          backgroundColor: "white",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        <img src={logoSrc} alt="Company Logo" className="img-fluid" style={{ height: "50px" }} />
      </div>

      {/* Sidebar Navigation */}
      <ul className="nav flex-column">
        <li className="nav-item">
          <a
            className="nav-link text-white d-flex align-items-center"
            style={{ fontSize: "16px", padding: "10px" }}
            onClick={() => navigate("/dashboard")}
          >
            <i className="bi bi-house-door me-3" style={{ fontSize: "18px", width: "20px" }}></i> Dashboard
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link text-white d-flex align-items-center"
            style={{ fontSize: "16px", padding: "10px" }}
            onClick={() => navigate("/home")}
          >
            <i className="bi bi-briefcase me-3" style={{ fontSize: "18px", width: "20px" }}></i> Home
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link text-white d-flex align-items-center"
            style={{ fontSize: "16px", padding: "10px" }}
            onClick={() => navigate("/products")}
          >
            <i className="bi bi-box-seam me-3" style={{ fontSize: "18px", width: "20px" }}></i> About us
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link text-white d-flex align-items-center"
            style={{ fontSize: "16px", padding: "10px" }}
            onClick={() => navigate("/develop")}
          >
            <i className="bi bi-code-slash me-3" style={{ fontSize: "18px", width: "20px" }}></i> Blogs
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link text-white d-flex align-items-center"
            style={{ fontSize: "16px", padding: "10px" }}
            onClick={() => navigate("/admin")}
          >
            <i className="bi bi-gear me-3" style={{ fontSize: "18px", width: "20px" }}></i> Admin
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
