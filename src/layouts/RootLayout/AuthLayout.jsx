import React from "react";

import { Outlet } from "react-router";

import BuildiaLogo from "../../pages/shared/BuildiaLogo";

const AuthLayout = () => {
  return (
    <div>
      <nav> <BuildiaLogo></BuildiaLogo></nav>
     
      <Outlet></Outlet>
    </div>
  );
};

export default AuthLayout;
