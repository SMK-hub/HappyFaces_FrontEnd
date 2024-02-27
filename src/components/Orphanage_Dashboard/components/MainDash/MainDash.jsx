import React from "react";
import Cards from "../Cards/Cards";
import Table from "../Table/Table";
import "./MainDashboard.css";
const MainDash = () => {
  return (
    
    <div className="MainDashboard">
      <h1 style={{ fontFamily: 'Anton, sans-serif', fontSize: '2em' }}>Dashboard</h1>
      <Cards />
      <Table />
    </div>
  );
};

export default MainDash;
