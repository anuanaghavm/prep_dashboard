import React from 'react';
import { Navbar, Form, InputGroup, Dropdown } from 'react-bootstrap';
import { FaSearch, FaBell, FaChevronDown } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const userName = "Prep Academy"; // Replace with actual user name from context or props

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  const handleLogout = () => {
    // Add your logout logic here
    navigate('/');
  };

  return (
    <Navbar className="border-bottom px-4 py-2 bg-white">
      <div className="d-flex align-items-center gap-3 ms-auto">
        {/* Search Icon */}
        <div 
          className="nav-icon"
          style={{
            color: '#6c757d'
          }}
        >
          <FaSearch style={{ fontSize: '1.2rem' }} />
        </div>

        {/* Notification Bell */}
        <div 
          className="nav-icon position-relative"
          style={{
            color: '#6c757d'
          }}
        >
          <FaBell style={{ fontSize: '1.2rem' }} />
          <span className="position-absolute top-0 start-100 translate-middle p-1 bg-danger border border-light rounded-circle">
            <span className="visually-hidden">New notifications</span>
          </span>
        </div>

        {/* User Profile */}
        <Dropdown align="end">
          <Dropdown.Toggle 
            as="div" 
            className="d-flex align-items-center gap-2" 
            style={{ cursor: 'pointer' }}
          >
            <div className="d-flex align-items-center gap-2">
              <div 
                className="rounded-circle d-flex align-items-center justify-content-center"
                style={{ 
                  width: '35px', 
                  height: '35px', 
                  backgroundColor: '#FF6B45',
                  color: 'white',
                  fontSize: '0.9rem',
                  fontWeight: '500'
                }}
              >
                {getInitials(userName)}
              </div>
              <div className="d-flex flex-column">
                <span 
                  className="fw-medium" 
                  style={{ 
                    fontSize: '0.9rem',
                    color: '#212529'
                  }}
                >
                  {userName}
                </span>
                <small 
                  className="text-muted"
                  style={{ 
                    fontSize: '0.8rem',
                    color: '#6c757d'
                  }}
                >
                  Admin
                </small>
              </div>
              <FaChevronDown 
                className="ms-1" 
                style={{ 
                  fontSize: '0.8rem',
                  color: '#6c757d'
                }} 
              />
            </div>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item>Profile</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        {/* Logout Button */}
        <button 
          onClick={handleLogout}
          className="btn ms-3"
          style={{ 
            fontSize: '0.9rem',
            padding: '0.375rem 1rem',
            borderRadius: '4px',
            backgroundColor: '#FFF1ED',
            color: '#FF6B45',
            border: '1px solid #FF6B45',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = '#FF6B45';
            e.currentTarget.style.color = 'white';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = '#FFF1ED';
            e.currentTarget.style.color = '#FF6B45';
          }}
        >
          Logout
        </button>
      </div>
    </Navbar>
  );
};

export default Header; 