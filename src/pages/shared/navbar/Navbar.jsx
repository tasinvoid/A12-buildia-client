import React from "react";
import { NavLink } from "react-router";

import BuildiaLogo from "../BuildiaLogo";
import UseAuth from "../../../hooks/UseAuth";

const Navbar = () => {
  const { logOut, user } = UseAuth();
  console.log(user);

  const navItems = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `py-2 px-3 rounded-lg transition duration-300 ease-in-out ${
              isActive
                ? "text-indigo-400 font-semibold transform scale-105"
                : "text-gray-200 hover:text-indigo-400 hover:scale-105 transform"
            }`
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/allApartments"
          className={({ isActive }) =>
            `py-2 px-3 rounded-lg transition duration-300 ease-in-out ${
              isActive
                ? "text-indigo-400 font-semibold transform scale-105"
                : "text-gray-200 hover:text-indigo-400 hover:scale-105 transform"
            }`
          }
        >
          All Apartments
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/interactiveFloorPlan"
          className={({ isActive }) =>
            `py-2 px-3 rounded-lg transition duration-300 ease-in-out ${
              isActive
                ? "text-indigo-400 font-semibold transform scale-105"
                : "text-gray-200 hover:text-indigo-400 hover:scale-105 transform"
            }`
          }
        >
          Floor Details
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/about"
          className={({ isActive }) =>
            `py-2 px-3 rounded-lg transition duration-300 ease-in-out ${
              isActive
                ? "text-indigo-400 font-semibold transform scale-105"
                : "text-gray-200 hover:text-indigo-400 hover:scale-105 transform"
            }`
          }
        >
          About
        </NavLink>
      </li>

      {user && (
        <>
          <li>
            <NavLink
              to="/dashBoard"
              className={({ isActive }) =>
                `py-2 px-3 rounded-lg transition duration-300 ease-in-out ${
                  isActive
                    ? "text-indigo-400 font-semibold transform scale-105"
                    : "text-gray-200 hover:text-indigo-400 hover:scale-105 transform"
                }`
              }
            >
              DashBoard
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  const handleLogOut = () => {
    logOut()
      .then(() => console.log("log out successful"))
      .catch((err) => console.log(err));
  };

  return (
    <div
      className="navbar shadow-lg rounded-2xl mb-5 sticky top-0 z-50"
      style={{
        backgroundColor: "rgba(31, 41, 55, 0.8)", // bg-gray-800 with opacity
        backdropFilter: "blur(4px)", // backdrop-blur-sm equivalent
        color: "#F3F4F6", // text-gray-100 for overall navbar
        borderBottom: "1px solid #374151", // border-gray-700
      }}
    >
      <div className="navbar-start">
        <div className="dropdown">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden transition duration-300 ease-in-out hover:scale-110"
            style={{
              backgroundColor: "transparent",
              color: "#D1D5DB",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow-xl"
            style={{
              backgroundColor: "rgba(31, 41, 55, 0.8)", // bg-gray-800 with opacity
              backdropFilter: "blur(4px)", // backdrop-blur-sm equivalent
              border: "1px solid #374151", // border-gray-700
              color: "#D1D5DB", // text-gray-300 for dropdown items
            }}
          >
            {navItems}
          </ul>
        </div>
        <div className="pl-4 sm:pl-10">
          <BuildiaLogo />
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">{navItems}</ul>
      </div>
      <div className="navbar-end gap-2 pr-4 sm:pr-8">
        {!user && (
          <>
            <NavLink
              className="btn btn-outline transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
              to="/auth"
              style={{
                borderColor: "#6366F1", 
                color: "#818CF8", 
                backgroundColor: "transparent",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#4F46E5", 
                  color: "#F3F4F6", 
                  borderColor: "#4F46E5", 
                  boxShadow: "none",
                },
              }}
            >
              Login
            </NavLink>

            <NavLink
              className="btn btn-outline transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
              to="/auth/register"
              style={{
                borderColor: "#6366F1", // border-indigo-500
                color: "#818CF8", // text-indigo-400
                backgroundColor: "transparent",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#4F46E5", // bg-indigo-600
                  color: "#F3F4F6", // text-gray-100
                  borderColor: "#4F46E5", // border-indigo-600
                  boxShadow: "none",
                },
              }}
            >
              Register
            </NavLink>
          </>
        )}
        {user && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar transition duration-300 ease-in-out hover:scale-110"
              style={{ backgroundColor: "transparent" }}
            >
              <div className="w-10 rounded-full overflow-hidden">
                <img
                  alt="User Avatar"
                  src={
                    user?.photoURL ||
                    "https://www.gravatar.com/avatar?d=mp"
                  }
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content rounded-box z-[1] mt-3 w-52 p-2 shadow-xl"
              style={{
                backgroundColor: "rgba(31, 41, 55, 0.8)", // bg-gray-800 with opacity
                backdropFilter: "blur(4px)", // backdrop-blur-sm equivalent
                border: "1px solid #374151", // border-gray-700
                color: "#D1D5DB", // text-gray-300 for dropdown items
              }}
            >
              <li>
                <NavLink
                  to={"/dashBoard/myProfile"}
                  className="justify-between transition duration-300 ease-in-out transform hover:scale-[1.02]"
                  style={{
                    color: "#D1D5DB",
                    backgroundColor: "transparent",
                    "&:hover": {
                      backgroundColor: "#374151",
                      color: "#F3F4F6",
                    },
                  }}
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <a
                  className="transition duration-300 ease-in-out transform hover:scale-[1.02]"
                  style={{
                    color: "#D1D5DB",
                    backgroundColor: "transparent",
                    "&:hover": {
                      backgroundColor: "#374151",
                      color: "#F3F4F6",
                    },
                  }}
                >
                  Settings
                </a>
              </li>
              <li>
                <button
                  className="btn transition duration-300 ease-in-out transform hover:scale-105"
                  onClick={handleLogOut}
                  style={{
                    backgroundColor: "#EC4899", // bg-pink-500
                    color: "#F3F4F6",
                    borderColor: "transparent",
                    boxShadow: "none",
                    "&:hover": {
                      backgroundColor: "#F472B6", // pink-400 on hover
                      color: "#F3F4F6",
                      borderColor: "transparent",
                      boxShadow: "none",
                    },
                  }}
                >
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;