import React from "react";
import Navbar from "../../pages/shared/navbar/Navbar";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div
      style={{
        minHeight: "100vh", 
        background: "linear-gradient(to bottom right, #030712, #111827, #110530)", 
        color: "#D1D5DB", 
      }}
    >
      <Navbar></Navbar>
      <Outlet></Outlet>
    </div>
  );
};

export default RootLayout;