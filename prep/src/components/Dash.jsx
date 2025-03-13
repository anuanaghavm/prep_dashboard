import React from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import "bootstrap/dist/css/bootstrap.min.css";

const dataPie = [
  { name: "On Delivery", value: 25 },
  { name: "Delivered", value: 68 },
  { name: "Cancelled", value: 7 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const dataBar = [
  { name: "Jan", revenue: 4000 },
  { name: "Feb", revenue: 3000 },
  { name: "Mar", revenue: 5000 },
  { name: "Apr", revenue: 7000 },
  { name: "May", revenue: 6000 },
];

const dataLine = [
  { name: "Jan", sales: 1000 },
  { name: "Feb", sales: 2000 },
  { name: "Mar", sales: 1500 },
  { name: "Apr", sales: 3000 },
  { name: "May", sales: 4000 },
];

const Dash = () => {
  return (
    <div className="container mt-4">
      {/* Top Statistics Cards */}
      <div className="row text-center">
        <div className="col-md-3">
          <div className="card p-3 shadow-sm">
            <h5>Total Revenue</h5>
            <h3>5.0K</h3>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card p-3 shadow-sm">
            <h5>Total Sales</h5>
            <h3>955</h3>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card p-3 shadow-sm">
            <h5>New Orders</h5>
            <h3>250</h3>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card p-3 shadow-sm">
            <h5>Total Vendors</h5>
            <h3>32</h3>
          </div>
        </div>
      </div>

      {/* Overview and Pie Chart */}
      <div className="row mt-4">
        <div className="col-md-4">
          <div className="card p-3 shadow-sm">
            <h5>Overview</h5>
            <PieChart width={200} height={200}>
              <Pie data={dataPie} cx="50%" cy="50%" innerRadius={50} outerRadius={80} fill="#8884d8" dataKey="value">
                {dataPie.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card p-3 shadow-sm">
            <h5>Total Revenue</h5>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={dataLine}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="row mt-4">
        <div className="col-md-12">
          <div className="card p-3 shadow-sm">
            <h5>Sales Summary</h5>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={dataBar}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dash;
