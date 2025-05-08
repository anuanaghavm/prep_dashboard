import React from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import "../style/Header.css";

const Staticlayout = ({ children }) => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1" style={{ marginLeft: "250px" }}>
        <Header />
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Staticlayout;
