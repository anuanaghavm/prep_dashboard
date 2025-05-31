import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import logoSrc from "/src/assets/Headerlogo.webp";
import { 
  MdDashboard,
  MdQuestionAnswer,
  MdFolder,
  MdArticle,
  MdSchool,
  MdPeople,
  MdPayments,
  MdFolderOpen,
  MdDescription,
  MdList,
  MdBookmark,
  MdPerson,
  MdSettings,
  MdSearch
} from "react-icons/md";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [openMenus, setOpenMenus] = useState({
    forms: false,
    blogs: false,
    courses: false,
    allCourses: false,
    payments: false
  });

  const toggleMenu = (menu) => {
    setOpenMenus(prev => ({
      ...prev,
      [menu]: !prev[menu]
    }));
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: <MdDashboard className="fs-4" />,
      path: "/dashboard",
      single: true
    },
    {
      title: "Forms",
      icon: <MdDescription className="fs-4" />,
      key: "forms",
      subItems: [
        { title: "Questions", icon: <MdQuestionAnswer />, path: "/question" },
        { title: "Responses", icon: <MdArticle />, path: "/response" }
      ]
    },
    {
      title: "Blogs",
      icon: <MdArticle className="fs-4" />,
      key: "blogs",
      subItems: [
        { title: "Blog Categories", icon: <MdFolder />, path: "/blogcategories" },
        { title: "Blog Posts", icon: <MdDescription />, path: "/blogcards" }
      ]
    },
    {
      title: "Course",
      icon: <MdSchool className="fs-4" />,
      key: "courses",
      subItems: [
        { title: "Course Categories", icon: <MdFolderOpen />, path: "/courses" },
        { title: "Subject Categories", icon: <MdList />, path: "/subjects" },
        { title: "Section Categories", icon: <MdBookmark />, path: "/sections" },
        { title: "User Forms", icon: <MdPerson />, path: "/user-forms" }
      ]
    },
    {
      title: "All Courses",
      icon: <MdSchool className="fs-4" />,
      key: "allCourses",
      subItems: [
        { title: "Preferred Programs", icon: <MdBookmark />, path: "/preferred" },
        { title: "Course List", icon: <MdList />, path: "/course" }
      ]
    },
    {
      title: "Users",
      icon: <MdPeople className="fs-4" />,
      path: "/users",
      single: true
    },
    {
      title: "Payments",
      icon: <MdPayments className="fs-4" />,
      key: "payments",
      subItems: [
        { title: "Payment List", icon: <MdList />, path: "/payments" },
        { title: "Remove Course Payment", icon: <MdPayments />, path: "/remove-course-payment" },
        { title: "Payment Settings", icon: <MdSettings />, path: "/payment-settings" }
      ]
    },
    {
      title: "SEO",
      icon: <MdSearch className="fs-4" />,
      key: "seo",
      subItems: [
        { title: "Home SEO", icon: <MdSearch />, path: "/homeseo" },
        { title: "Blog SEO", icon: <MdSearch />, path: "/MetaTagsBlogForm" },
        { title: "Courses SEO", icon: <MdSearch />, path: "/CoursesTagSeo" },
        { title: "About Us SEO", icon: <MdSearch />, path: "/aboutusseo" },
        { title: "Contact Us SEO", icon: <MdSearch />, path: "/contactusseo" }
      ]
    }
  ];

  return (
    <div
      className="d-flex flex-column shadow-sm"
      style={{
        width: "250px",
        backgroundColor: "white",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        overflowY: "auto",
        overflowX: "hidden",
        zIndex: 1000,
        transition: "width 0.3s ease"
      }}
    >
      <div
        className="text-center mb-4 mt-3 mx-2"
        style={{
          backgroundColor: "white",
          padding: "12px",
          borderRadius: "10px",
        }}
      >
        <img
          src={logoSrc}
          alt="Company Logo"
          className="img-fluid"
          style={{ height: "50px" }}
        />
      </div>

      <ul className="nav flex-column px-3">
        {menuItems.map((item, index) => (
          <li key={index} className="nav-item mb-2">
            {item.single ? (
              <a
                className={`nav-link text-dark d-flex align-items-center gap-3 rounded ${
                  location.pathname === item.path ? "bg-light bg-opacity-10" : ""
                }`}
                style={{ 
                  fontSize: "15px", 
                  padding: "12px 15px",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
                onClick={() => navigate(item.path)}
              >
                {item.icon}
                <span>{item.title}</span>
              </a>
            ) : (
              <>
                <div
                  className={`d-flex align-items-center justify-content-between text-dark rounded ${
                    openMenus[item.key] ? "bg-light bg-opacity-10" : ""
                  }`}
                  style={{ 
                    cursor: "pointer", 
                    padding: "12px 15px",
                    transition: "all 0.3s ease"
                  }}
                  onClick={() => toggleMenu(item.key)}
                >
                  <div className="d-flex align-items-center gap-3">
                    {item.icon}
                    <span>{item.title}</span>
                  </div>
                  <span style={{ 
                    transition: "transform 0.3s ease",
                    transform: openMenus[item.key] ? "rotate(180deg)" : "rotate(0deg)"
                  }}>
                    ▼
                  </span>
                </div>
                {openMenus[item.key] && (
                  <ul className="list-unstyled ms-4 mt-2">
                    {item.subItems.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <a
                          className={`text-dark d-flex align-items-center gap-3 rounded ${
                            location.pathname === subItem.path ? "bg-light bg-opacity-10" : ""
                          }`}
                          style={{ 
                            cursor: "pointer", 
                            padding: "10px 15px",
                            fontSize: "14px",
                            textDecoration: "none",
                            transition: "all 0.3s ease"
                          }}
                          onClick={() => navigate(subItem.path)}
                        >
                          {subItem.icon}
                          <span>{subItem.title}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
