import React from "react";
import EmployeList from "../components/EmployeList";
import Sidebar from "../components/Sidebar";

const Home = () => {
  return (
    <div>
      <Sidebar />
      <EmployeList />
    </div>
  );
};

export default Home;
