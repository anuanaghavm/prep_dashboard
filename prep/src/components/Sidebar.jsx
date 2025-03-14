import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logoSrc from "/src/assets/Headerlogo.webp";

const Sidebar = () => {
  const [isBlog, setIsBlog] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Sidebar width logic
  const sidebarWidth = location.pathname === "/home" ? "15%" : "23.5%";

  const handleClick = () => {
    setIsBlog(!isBlog);
  };
  console.log(isBlog);

  return (
    <div
      className="d-flex flex-column p-3 shadow-sm"
      style={{
        width: "100%", // 🔹 Reduce width (Adjust as needed)
        backgroundColor: "#FF6B45", // Sidebar background color
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
        <img
          src={logoSrc}
          alt="Company Logo"
          className="img-fluid"
          style={{ height: "50px" }}
        />
      </div>

      {/* Sidebar Navigation */}
      <ul className="nav flex-column">
        <li className="nav-item">
          <a
            className="nav-link text-white d-flex align-items-center"
            onClick={() => navigate("/dashboard")}
          >
            <i className="bi bi-house-door me-2"></i> Dashboard
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
            onClick={() => navigate("/products")}
          >
            <i className="bi bi-box-seam me-2"></i> About us
          </a>
        </li>
        <li className="nav-item">
          <li
            className="d-flex justify-content-between"
            onClick={handleClick}
            style={{ cursor: "pointer" }}
          >
            <span
              className="text-light "
              style={{
                position: "relative",
                left: "25px",
                marginRight: "10px",
              }}
            >
              Blogs{!isBlog ? <span> ▲</span> : <span> ▼</span>}
            </span>
          </li>
          {isBlog && (
            <>
              <li
                className="text-light "
                onClick={() => navigate("/blogcategories")}
                style={{
                  cursor: "pointer",
                  position: "relative",
                  left: "40px",
                }}
              >
                <i className="bi bi-box-seam me-2"></i>Blog Categories
              </li>
              <li
                className="text-light "
                onClick={() => navigate("/blog-contents")}
                style={{
                  cursor: "pointer",
                  position: "relative",
                  left: "40px",
                }}
              >
                <i className="bi bi-box-seam me-2"></i>Blog Cards
              </li>
            </>
          )}
        </li>
        <li className="nav-item">
          <a
            className="nav-link text-white d-flex align-items-center"
            onClick={() => navigate("/admin")}
          >
            <i className="bi bi-gear me-2"></i> Admin
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
