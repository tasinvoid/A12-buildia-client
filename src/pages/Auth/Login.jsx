import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { NavLink, useLocation, useNavigate } from "react-router"; 
import UseAuth from "../../hooks/UseAuth";
import Lottie from "lottie-react";
import buildingAnimation from "../../assets/City Building Construction.json";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Login = () => {
  const { signIn, googleSignIn } = UseAuth();
  const [firebaseError, setFirebaseError] = useState();
  const axiosPublic = useAxiosPublic();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  console.log(location);
  const onSubmit = (data) => {
    console.log(data);
    signIn(data.email, data.password)
      .then((res) => {
        console.log(res);
        if (location.state) {
          navigate(`${location.state.from.pathname}`);
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err.message);
        setFirebaseError(err.message);
      });
  };
  const handleGoogleBtn = () => {
    googleSignIn()
      .then(async (res) => {
        const userInfo = {
          name: res.user.displayName,
          email: res.user.email,
          role: "user",
          createdAt: new Date().toISOString(),
          lastLoggedIn: new Date().toISOString(),
        };
        const userRes = await axiosPublic.post("/users", userInfo);
        console.log(userRes.data);
        if (location.state) {
          navigate(`${location.state.from.pathname}`);
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err.message);
        setFirebaseError(err.message);
      });
  };

  return (
    <div
      className="min-h-screen flex flex-col lg:flex-row items-center justify-center p-4 sm:p-8"
      style={{
        background: "linear-gradient(to bottom right, #030712, #111827, #110530)",
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-1 flex items-center justify-center w-full lg:w-1/2"
      >
        <div className="relative w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl mx-auto">
          <div
            className="absolute inset-0 shadow-lg transform -skew-y-3 sm:-skew-y-0 sm:-rotate-3 rounded-3xl"
            style={{
              background: "linear-gradient(to right, #818CF8, #4F46E5)",
              boxShadow: "0 10px 15px rgba(0, 0, 0, 0.5)",
            }}
          ></div>
          <div
            className="relative px-4 py-10 shadow-lg rounded-3xl sm:p-16 md:p-20"
            style={{
              backgroundColor: "rgba(31, 41, 55, 0.8)",
              backdropFilter: "blur(4px)",
              border: "1px solid #374151",
              color: "#D1D5DB",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <div className="max-w-md mx-auto">
              <div>
                <h1
                  className="text-2xl sm:text-3xl font-bold mb-6 text-center"
                  style={{ color: "#818CF8" }}
                >
                  Login Form
                </h1>
              </div>
              <div className="divide-y divide-gray-700">
                <div className="py-8 text-base leading-6 space-y-4 text-gray-300 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="email"
                      name="email"
                      type="email"
                      className="peer placeholder-transparent h-10 w-full border-b-2 bg-transparent focus:outline-none focus:ring-0"
                      style={{
                        borderColor: "#374151",
                        color: "#F3F4F6",
                        "&:focus": {
                          borderColor: "#6366F1",
                        },
                      }}
                      placeholder="Email address"
                      {...register("email", { required: true })}
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-sm"
                      style={{
                        color: "#9CA3AF",
                        "&.peer-placeholder-shown": {
                          color: "#6B7280",
                        },
                      }}
                    >
                      Email Address
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="password"
                      name="password"
                      type="password"
                      className="peer placeholder-transparent h-10 w-full border-b-2 bg-transparent focus:outline-none focus:ring-0"
                      style={{
                        borderColor: "#374151",
                        color: "#F3F4F6",
                        "&:focus": {
                          borderColor: "#6366F1",
                        },
                      }}
                      placeholder="Password"
                      {...register("password", {
                        required: true,
                        pattern:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/i,
                      })}
                    />
                    <label
                      htmlFor="password"
                      className="absolute left-0 -top-3.5 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-sm"
                      style={{
                        color: "#9CA3AF",
                        "&.peer-placeholder-shown": {
                          color: "#6B7280",
                        },
                      }}
                    >
                      Password
                    </label>
                  </div>
                  <div className="relative pt-4">
                    <button
                      className="w-full rounded-full px-4 py-2 font-bold transition duration-300 ease-in-out transform hover:scale-105"
                      type="submit"
                      style={{
                        backgroundColor: "#4F46E5",
                        color: "#F3F4F6",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                        "&:hover": {
                          backgroundColor: "#3B34AC",
                        },
                      }}
                    >
                      Submit
                    </button>
                  </div>
                  <button
                    className="w-full rounded-full shadow px-4 py-2 font-bold flex items-center justify-center gap-2 transition duration-300 ease-in-out transform hover:scale-105"
                    onClick={handleGoogleBtn}
                    type="button"
                    style={{
                      backgroundColor: "#111827",
                      color: "#F3F4F6",
                      border: "1px solid #374151",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                      "&:hover": {
                        backgroundColor: "#1F2937",
                      },
                    }}
                  >
                    <svg
                      aria-label="Google logo"
                      width="16"
                      height="16"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <g>
                        <path d="m0 0H512V512H0" fill="#fff"></path>
                        <path
                          fill="#34a853"
                          d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                        ></path>
                        <path
                          fill="#4285f4"
                          d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                        ></path>
                        <path
                          fill="#fbbc02"
                          d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                        ></path>
                        <path
                          fill="#ea4335"
                          d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                        ></path>
                      </g>
                    </svg>
                    Login with Google
                  </button>
                  <div className="flex justify-between items-center text-sm mt-4">
                    <a
                      href="#"
                      className="text-gray-400 hover:text-indigo-400 transition-colors duration-300"
                    >
                      Forget Password?
                    </a>
                    <NavLink
                      to={"/auth/register"}
                      className="font-semibold transition-colors duration-300"
                      style={{ color: "#818CF8" }}
                    >
                      Register
                    </NavLink>
                  </div>
                  {errors.email?.type === "required" && (
                    <span className="text-pink-400 text-sm block">Email address is required.</span>
                  )}
                  {errors.password?.type === "required" && (
                    <span className="text-pink-400 text-sm block">Password is required.</span>
                  )}
                  {errors.password?.type === "pattern" && (
                    <span className="text-pink-400 text-sm block">
                      Password must be at least 6 characters long, contain at
                      least one uppercase letter, one lowercase letter, and one
                      number.
                    </span>
                  )}
                  {firebaseError && (
                    <p className="text-pink-400 text-sm block">{firebaseError}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="hidden lg:flex flex-1 items-center justify-center p-4">
        <Lottie
          animationData={buildingAnimation}
          loop={true}
          className="max-w-md lg:max-w-lg xl:max-w-xl mx-auto h-auto"
        />
      </div>
    </div>
  );
};

export default Login;