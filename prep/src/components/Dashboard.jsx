import React from "react";
import { Container, Row, Col, Card, Table, Dropdown } from "react-bootstrap";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { FaYoutube, FaInstagram, FaFacebook } from "react-icons/fa";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const lineData = {
    labels: ["JAN-MAR", "APR-JUN", "JUL-SEP", "OCT-DEC"],
    datasets: [
      {
        label: "Engagement Rate",
        data: [92, 94, 95, 93],
        borderColor: "#ff4c4c",
        backgroundColor: "transparent",
        tension: 0.4,
      },
    ],
  };

  return (
    <Container
      fluid
      className="p-4"
      style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}
    >
      <h2
        className="text-center mb-4"
        style={{ fontWeight: "bold", color: "#333" }}
      ><b><u>
        Dashboard</u></b>
      </h2>

      <Row className="mb-4 text-white">
        <Col md={4}>
          <Card className="p-4" style={{backgroundColor :"#FF6B45"}}>
            <h6>Total Followers</h6>
            <h2>42,500,241</h2>
          </Card>
          <Card className="mt-3" style={{backgroundColor :"#b5adab"}}>
            <div className="p-4  d-flex align-items-center justify-content-between mx-4">
              <div className="d-flex flex-column align-items-center">
                <FaYoutube size={30} color="red" className="me-2" />
                <h6>YouTube</h6>
              </div>
              <div>
                <h3>4.2M</h3>
                <p>Subscribers</p>
              </div>
            </div>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-4" style={{backgroundColor :"#FF6B45"}}>
            <h6>Engagement Ratio</h6>
            <h2>94%</h2>
          </Card>

          <Card className="mt-3" style={{backgroundColor :"#b5adab"}}>
            <div className="p-4  d-flex align-items-center justify-content-between mx-4">
              <div className="d-flex flex-column align-items-center">
                <FaInstagram size={30} color="#E4405F" className="me-2" />
                <h6>Instagram</h6>
              </div>
              <div>
                <h3>2.2M</h3>
                <p>Followers</p>
              </div>
            </div>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-4" style={{backgroundColor :"#FF6B45"}}>
            <h6>Total Watch Hours</h6>
            <h2>142B</h2>
          </Card>
          <Card className="mt-3" style={{backgroundColor :"#b5adab"}}>
            <div className="p-4  d-flex align-items-center justify-content-between mx-4" >
              <div className="d-flex flex-column align-items-center">
                <FaFacebook size={30} color="#1877F2" className="me-2" />
                <h6>Facebook</h6>
              </div>
              <div>
                <h3>1.2M</h3>
                <p>Followers</p>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={8}>
          <Card className="p-4 mt-3">
            <h4><b><u>Engagement Overview</u></b></h4>
            <Line data={lineData} />
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
