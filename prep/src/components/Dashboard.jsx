import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "../components/Sidebar"; // ✅ Fixed import

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content */}
      <div className="container-fluid p-0" style={{ marginLeft: "250px" }}>
        {/* Header Section */}
        <div
          className="d-flex align-items-center p-3 text-white"
          style={{
            position: "fixed",
            top: 0,
            left: "250px",
            right: 0,
            height: "60px",
            zIndex: 1000,
            borderBottom: "2px solid #f1f1f1",
          }}
        >
          <h2 className="mb-0">Dashboard</h2>
          <div className="w-100 d-flex justify-content-end">
            <button style={{ backgroundColor: "#FF6B45" }} className="btn shadow btn-light" onClick={() => navigate("/")}>
              Logout
            </button>
          </div>
        </div>

        {/* Main Content Body */}
        <div className="p-4" style={{ marginTop: "70px" }}>
          <p>Welcome to My Project. Have a look at any recent changes to your projects.</p>

          {/* Stats Row */}
          <div className="row">
            <div className="col-md-6">
              <div className="card p-3 bg-warning text-dark shadow-sm">
                <p>Quickly sketch out systems to get a quick estimate for budget to your customer.</p>
                <button className="btn btn-dark">Start new project</button>
              </div>
            </div>
          </div>

          {/* Active Users Section */}
          <div className="mt-4 p-3 bg-white shadow-sm">
            <h5>Active Users for the last 1 month</h5>
            <h2>12,345 users</h2>
            <p>Avg this week</p>
            <div className="p-3 bg-light">
              <p>Chart Placeholder</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
