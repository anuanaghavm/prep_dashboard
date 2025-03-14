import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logoSrc from "/src/assets/Headerlogo.webp";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isBlogOpen, setIsBlogOpen] = useState(false);

  // Toggle Blogs submenu
  const handleClick = () => {
    setIsBlogOpen(!isBlogOpen);
  };

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
          <a className="nav-link text-white d-flex align-items-center gap-2" style={{ fontSize: "16px", padding: "10px", cursor: "pointer" }} onClick={() => navigate("/dashboard")}>
            <i className="bi bi-house-door" style={{ fontSize: "18px" }}></i> 
            <span>Dashboard</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white d-flex align-items-center gap-2" style={{ fontSize: "16px", padding: "10px", cursor: "pointer" }} onClick={() => navigate("/Home")}>
            <i className="bi bi-speedometer2" style={{ fontSize: "18px" }}></i> 
            <span>Home</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link text-white d-flex align-items-center gap-2" style={{ fontSize: "16px", padding: "10px", cursor: "pointer" }} onClick={() => navigate("/products")}>
            <i className="bi bi-box-seam" style={{ fontSize: "18px" }}></i> 
            <span>About us</span>
          </a>
        </li>

        {/* Blogs Dropdown */}
        <li className="nav-item">
          <div className="d-flex align-items-center justify-content-between text-white" style={{ cursor: "pointer", padding: "10px" }} onClick={handleClick}>
            <div className="d-flex align-items-center gap-2">
              <i className="bi bi-newspaper" style={{ fontSize: "18px" }}></i> 
              <span>Blogs</span>
            </div>
            <span>{isBlogOpen ? "▲" : "▼"}</span>
          </div>
          {isBlogOpen && (
            <ul className="list-unstyled ms-3">
              <li className="text-light d-flex align-items-center gap-2" style={{ cursor: "pointer", padding: "5px 10px" }} onClick={() => navigate("/blogcategories")}>
                <i className="bi bi-folder"></i> 
                <span>Blog Categories</span>
              </li>
              <li className="text-light d-flex align-items-center gap-2" style={{ cursor: "pointer", padding: "5px 10px" }} onClick={() => navigate("/blog-contents")}>
                <i className="bi bi-card-list"></i> 
                <span>Blog Cards</span>
              </li>
            </ul>
          )}
        </li>

        <li className="nav-item">
          <a className="nav-link text-white d-flex align-items-center gap-2" style={{ fontSize: "16px", padding: "10px", cursor: "pointer" }} onClick={() => navigate("/all-courses")}>
            <i className="bi bi-journal-text" style={{ fontSize: "18px" }}></i> 
            <span>All Courses</span>
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link text-white d-flex align-items-center gap-2" style={{ fontSize: "16px", padding: "10px", cursor: "pointer" }} onClick={() => navigate("/contact")}>
            <i className="bi bi-telephone" style={{ fontSize: "18px" }}></i> 
            <span>Contact</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
