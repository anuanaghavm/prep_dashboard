import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logoSrc from "/src/assets/Headerlogo.webp";
import { IoMdContact } from "react-icons/io";
import { FaDiscourse } from "react-icons/fa";


const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isBlogOpen, setIsBlogOpen] = useState(false);
  const [isPreferredProgramsOpen, setIsPreferredProgramsOpen] = useState(false);
  const [isSeoOpen, setIsSeoOpen] = useState(false);

  const handleClick = () => setIsBlogOpen(!isBlogOpen);
  const handlePreferredProgramsClick = () =>
    setIsPreferredProgramsOpen(!isPreferredProgramsOpen);

  return (
    <div
      className="d-flex flex-column p-3 shadow-sm"
      style={{
        width: "250px",
        backgroundColor: "#FF6B45",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
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

      <ul className="nav flex-column">
        <li className="nav-item">
          <a
            className="nav-link text-white d-flex align-items-center gap-2"
            style={{ fontSize: "16px", padding: "10px", cursor: "pointer" }}
            onClick={() => navigate("/dashboard")}
          >
            <i className="bi bi-house-door" style={{ fontSize: "18px" }}></i>
            <span>Dashboard</span>
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link text-white d-flex align-items-center gap-2"
            style={{ fontSize: "16px", padding: "10px", cursor: "pointer" }}
            onClick={() => navigate("/Home")}
          >
            <i className="bi bi-speedometer2" style={{ fontSize: "18px" }}></i>
            <span>Home</span>
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link text-white d-flex align-items-center gap-2"
            style={{ fontSize: "16px", padding: "10px", cursor: "pointer" }}
            onClick={() => navigate("/products")}
          >
            <i className="bi bi-box-seam" style={{ fontSize: "18px" }}></i>
            <span>About us</span>
          </a>
        </li>

        <li className="nav-item">
          <div
            className="d-flex align-items-center justify-content-between text-white"
            style={{ cursor: "pointer", padding: "10px" }}
            onClick={handleClick}
          >
            <div className="d-flex align-items-center gap-2">
              <i className="bi bi-newspaper" style={{ fontSize: "18px" }}></i>
              <span>Blogs</span>
            </div>
            <span>{isBlogOpen ? "▲" : "▼"}</span>
          </div>
          {isBlogOpen && (
            <ul className="list-unstyled ms-3">
              <li
                className="text-light d-flex align-items-center gap-2"
                style={{ cursor: "pointer", padding: "5px 10px" }}
                onClick={() => navigate("/blogcategories")}
              >
                <i className="bi bi-folder"></i>
                <span>Blog Categories</span>
              </li>
              <li
                className="text-light d-flex align-items-center gap-2"
                style={{ cursor: "pointer", padding: "5px 10px" }}
                onClick={() => navigate("/blogcards")}
              >
                <i className="bi bi-card-list"></i>
                <span>Blog Cards</span>
              </li>
            </ul>
          )}
        </li>

        <li className="nav-item">
          <div
            className="d-flex align-items-center justify-content-between text-white"
            style={{ cursor: "pointer", padding: "10px" }}
            onClick={handlePreferredProgramsClick}
          >

            <div className="d-flex align-items-center gap-2">
              <i className="bi bi-bookmark" style={{ fontSize: "18px" }}></i>
              <span> all Course</span>
            </div>
            <span>{isPreferredProgramsOpen ? "▲" : "▼"}</span>
          </div>
          {isPreferredProgramsOpen && (
            <ul className="list-unstyled ms-3">
              <li
                className="text-light d-flex align-items-center gap-2"
                style={{ cursor: "pointer", padding: "5px 10px" }}
                onClick={() => navigate("/preferred")}
              >
                <i className="bi bi-journal-bookmark"></i>
                <span>Preferred Programs</span>
              </li>
              <li
                className="text-light d-flex align-items-center gap-2"
                style={{ cursor: "pointer", padding: "5px 10px" }}
                onClick={() => navigate("/course")}
              >
                <i className="bi bi-plus-circle"></i>
                <span>All Courses</span>
              </li>
            </ul>
          )}
        </li>

        <li className="nav-item">
          <a
            className="nav-link text-white d-flex align-items-center gap-2"
            style={{ fontSize: "16px", padding: "10px", cursor: "pointer" }}
            onClick={() => navigate("/contactus")}
          >
            <div className="d-flex justify-content-center align-items-center">
              <IoMdContact className="me-2 fs-4" />
              <span>Contact</span>
            </div>
          </a>
        </li>

        <li className="nav-item">
          <div
            className="d-flex align-items-center justify-content-between text-white"
            style={{ cursor: "pointer", padding: "10px" }}
            onClick={() => setIsSeoOpen(!isSeoOpen)}
          >
            <div className="d-flex align-items-center gap-2">
              <i className="bi bi-bar-chart"></i>
              <span>SEO Pages</span>
            </div>
            <span>{isSeoOpen ? "▲" : "▼"}</span>
          </div>
          {isSeoOpen && (
            <ul className="list-unstyled ms-3">
              <li
                className="text-light d-flex align-items-center gap-2"
                style={{ cursor: "pointer", padding: "5px 10px" }}
                onClick={() => navigate("/home-seo")}
              >
                <i className="bi bi-house"></i>
                <span>Home SEO</span>
              </li>
              <li
                className="text-light d-flex align-items-center gap-2"
                style={{ cursor: "pointer", padding: "5px 10px" }}
                onClick={() => navigate("/aboutus-seo")}
              >
                <i className="bi bi-info-circle"></i>
                <span>AboutUs SEO</span>
              </li>
              <li
                className="text-light d-flex align-items-center gap-2"
                style={{ cursor: "pointer", padding: "5px 10px" }}
                onClick={() => navigate("/CoursesTagSeo")}
              >
                <i className="bi bi-journal-bookmark"></i>
                <span>Courses SEO</span>
              </li>
              <li
                className="text-light d-flex align-items-center gap-2"
                style={{ cursor: "pointer", padding: "5px 10px" }}
                onClick={() => navigate("/MetaTagsBlogForm")}
              >
                <i className="bi bi-newspaper"></i>
                <span>Blogs SEO</span>
              </li>
              {/* ✅ New ContactUs SEO page added here */}
              <li
                className="text-light d-flex align-items-center gap-2"
                style={{ cursor: "pointer", padding: "5px 10px" }}
                onClick={() => navigate("/contactusseo")}
              >
                <i className="bi bi-telephone-inbound"></i>
                <span>ContactUs SEO</span>
              </li>
            </ul>
          )}

          
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
