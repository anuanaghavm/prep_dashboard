import React from "react";
import { Container, Row, Col, Card, Table, Dropdown } from "react-bootstrap";
import { Line, Pie } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const lineData = {
    labels: ["JAN-MAR", "APR-JUN", "JUL-SEP", "OCT-DEC"],
    datasets: [
      {
        label: "TVL 2022",
        data: [30, 25, 28, 35],
        borderColor: "#1f77b4",
        backgroundColor: "transparent",
        tension: 0.4,
      },
      {
        label: "TVL 2021",
        data: [32, 22, 26, 31],
        borderColor: "#98df8a",
        backgroundColor: "transparent",
        tension: 0.4,
      },
    ],
  };

  const pieData = {
    labels: ["ETHEREUM", "BSC", "TRON"],
    datasets: [
      {
        data: [45, 30, 20],
        backgroundColor: ["#3366ff", "#33cc33", "#9966ff"],
      },
    ],
  };

  return (
    <Container fluid style={{ backgroundColor: "#FFDAB9", minHeight: "100vh", padding: "20px" }}>
      <h3 className="my-3">Welcome back, Esther!</h3>
      <p>Take a look at the updated DeFi overview</p>

      <Row>
        <Col md={8}>
          <Card className="p-3">
            <h5>TVL 2022</h5>
            <h2>$43.35B <span className="text-success">+13%</span></h2>
            <Line data={lineData} />
          </Card>
        </Col>
        <Col md={4}>
          <Card className="p-3 mb-3 text-white bg-success">
            <h6>Change (24h)</h6>
            <h3>-4.31%</h3>
            <p>-0.07% this month</p>
          </Card>
          <Card className="p-3">
            <h6>Maker Dominance</h6>
            <h3>15.62%</h3>
            <p>+1.31% this month</p>
          </Card>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col md={4}>
          <Card className="p-3">
            <h6>Top Protocols</h6>
            <Pie data={pieData} />
          </Card>
        </Col>
        <Col md={8}>
          <Card className="p-3">
            <div className="d-flex justify-content-between align-items-center">
              <h6>TVL Rankings</h6>
              <Dropdown>
                <Dropdown.Toggle variant="light">Ethereum</Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>Ethereum</Dropdown.Item>
                  <Dropdown.Item>BSC</Dropdown.Item>
                  <Dropdown.Item>TRON</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Chains</th>
                  <th>7D Change</th>
                  <th>TVL</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>MakerDAO</td>
                  <td>CDP</td>
                  <td>🔗</td>
                  <td className="text-success">+3.12%</td>
                  <td>$6,678</td>
                </tr>
                <tr>
                  <td>Convex</td>
                  <td>CDP</td>
                  <td>🔗</td>
                  <td className="text-danger">-0.07%</td>
                  <td>$2,278</td>
                </tr>
                <tr>
                  <td>Instadapp</td>
                  <td>CDP</td>
                  <td>🔗</td>
                  <td className="text-success">+0.62%</td>
                  <td>$1,678</td>
                </tr>
              </tbody>
            </Table>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
