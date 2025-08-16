import React from "react";
import logo from "../../assets/logo.png";
import { NavLink } from "react-router";

const BuildiaLogo = () => {
  return (
    <NavLink to={"/"}>
      <div className="flex items-center logo-font">
        <img src={logo} className="w-10 h-10" alt="" />
        <span>Buildia</span>
      </div>
    </NavLink>
  );
};

export default BuildiaLogo;
