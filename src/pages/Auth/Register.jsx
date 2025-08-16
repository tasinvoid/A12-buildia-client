import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { NavLink, useLocation, useNavigate } from "react-router";
import UseAuth from "../../hooks/UseAuth";
import Lottie from "lottie-react";
import buildingAnimation from "../../assets/City Building Construction.json";
import axios from "axios";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { FaUserCircle } from "react-icons/fa";

const Register = () => {
  const { registerUser, googleSignIn, updateUserProfile } = UseAuth();
  const [firebaseError, setFirebaseError] = useState();
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const [imageUrl, setImageUrl] = useState();
  const axiosPublic = useAxiosPublic()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    console.log(data);
    const updatedInfo = { displayName: data.name, photoURL: imageUrl };
    registerUser(data.email, data.password)
      .then(async (res) => {
        const userInfo = {
          name: data.name,
          email: data.email,
          role: "user",
          createdAt: new Date().toISOString(),
          lastLoggedIn: new Date().toISOString(),
          image: imageUrl,
        };
        const userRes = await axiosPublic.post("/users", userInfo);
        console.log(userRes.data);
        updateUserProfile(updatedInfo).then(() =>
          toast.success("Registered Successfully!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          })
        );
        console.log(res);
        if (location.state) {
          navigate(`${location.state.from.pathname}`);
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err.message);

        console.log("name image update error", err);
        toast.error("Registration Unsuccessfully!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      });
  };
  const handleGoogleBtn = () => {
    googleSignIn()
      .then(async (res) => {
        const userInfo = {
          name:res.user.displayName,
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
  const handleImageUpload = async (e) => {
    const image = e.target.files[0];
    setImagePreviewUrl(URL.createObjectURL(image));
    const formData = new FormData();
    formData.append("image", image);
    console.log(formData);
    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=f5eaa5c044d79f0f4a4b310fd88276d3`,
      formData
    );
    console.log("image uploaded to imageBb", res.data);
    setImageUrl(res.data.data.url);
  };

  return (
    <div
      className="flex min-h-screen"
      style={{
        background: "linear-gradient(to bottom right, #030712, #111827, #110530)",
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="py-6 flex justify-center sm:py-12 flex-1 sm:flex items-center"
      >
        <ToastContainer></ToastContainer>
        <div className="relative py-0 sm:max-w-xl sm:mx-auto w-100 ">
          <div
            className="absolute inset-0 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"
            style={{
              background: "linear-gradient(to right, #818CF8, #4F46E5)",
            }}
          ></div>
          <div
            className="relative px-4 py-2 shadow-lg sm:rounded-3xl sm:p-20"
            style={{
              backgroundColor: "rgba(31, 41, 55, 0.8)",
              backdropFilter: "blur(4px)",
              border: "1px solid #374151",
            }}
          >
            <div className="max-w-md mx-auto">
              <div>
                <h1 className="text-2xl font-semibold" style={{ color: "#818CF8" }}>
                  Register Form
                </h1>
              </div>
              <div className="flex items-center justify-center">
                {imagePreviewUrl ? (
                  <img
                    src={imagePreviewUrl}
                    alt="Profile Preview"
                    className="w-40 h-40 rounded-full object-cover border"
                    style={{ borderColor: "#6366F1" }}
                  />
                ) : (
                  <FaUserCircle className="w-32 h-32" style={{ color: "#6B7280" }} />
                )}
              </div>
              <div className="border-b" style={{ borderColor: "#374151" }}>
                <label
                  htmlFor="photo"
                  className="block w-full h-full p-4  cursor-pointer text-left pl-0 text-md "
                  style={{ color: "#9CA3AF" }}
                  placeholder="photo"
                >
                  Drop your image here
                </label>
                <input
                  id="photo"
                  name="photo"
                  type="file"
                  className="hidden"
                  placeholder="photo"
                  onChange={handleImageUpload}
                />
              </div>

              <div className="divide-y" style={{ borderColor: "#374151" }}>
                <div className="py-8 text-base leading-6 space-y-4 text-gray-300 sm:text-lg sm:leading-7">
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="name"
                      name="name"
                      type="text"
                      className="peer placeholder-transparent h-10 w-full border-b-2 bg-transparent focus:outline-none focus:borer-rose-600"
                      style={{
                        borderColor: "#374151",
                        color: "#F3F4F6",
                        "&:focus": { borderColor: "#6366F1" },
                      }}
                      placeholder="Email address"
                      {...register("name", { required: true })}
                    />
                    <label
                      htmlFor="name"
                      className="absolute left-0 -top-3.5 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-sm"
                      style={{
                        color: "#9CA3AF",
                        "&.peer-placeholder-shown": { color: "#6B7280" },
                        "&.peer-focus": { color: "#9CA3AF" }
                      }}
                    >
                      Name
                    </label>
                  </div>
                  <div className="relative">
                    <input
                      autoComplete="off"
                      id="email"
                      name="email"
                      type="email"
                      className="peer placeholder-transparent h-10 w-full border-b-2 bg-transparent focus:outline-none focus:borer-rose-600"
                      style={{
                        borderColor: "#374151",
                        color: "#F3F4F6",
                        "&:focus": { borderColor: "#6366F1" },
                      }}
                      placeholder="Email address"
                      {...register("email", { required: true })}
                    />
                    <label
                      htmlFor="email"
                      className="absolute left-0 -top-3.5 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-sm"
                      style={{
                        color: "#9CA3AF",
                        "&.peer-placeholder-shown": { color: "#6B7280" },
                        "&.peer-focus": { color: "#9CA3AF" }
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
                      className="peer placeholder-transparent h-10 w-full border-b-2 bg-transparent focus:outline-none focus:borer-rose-600"
                      style={{
                        borderColor: "#374151",
                        color: "#F3F4F6",
                        "&:focus": { borderColor: "#6366F1" },
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
                        "&.peer-placeholder-shown": { color: "#6B7280" },
                        "&.peer-focus": { color: "#9CA3AF" }
                      }}
                    >
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <button
                      className="rounded-full px-2 py-1 w-full"
                      type="submit"
                      style={{
                        backgroundColor: "#4F46E5",
                        color: "#F3F4F6",
                        "&:hover": { backgroundColor: "#3B34AC" }
                      }}
                    >
                      Submit
                    </button>
                  </div>
                  <button
                    className="btn w-full rounded-full shadow"
                    onClick={handleGoogleBtn}
                    type="button"
                    style={{
                      backgroundColor: "#111827",
                      color: "#F3F4F6",
                      border: "1px solid #374151",
                      "&:hover": { backgroundColor: "#1F2937" }
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
                  <div className="links">
                    <a href="#" style={{ color: "#9CA3AF" }}>Forget Password</a>
                    <NavLink
                      to={"/auth"}
                      className="text-md  btn-link"
                      style={{ color: "#818CF8" }}
                    >
                      {" "}
                      login
                    </NavLink>
                  </div>
                  {errors.email?.type === "required" && (
                    <span style={{ color: "#F472B6" }}>Email required</span>
                  )}
                  {errors.password?.type === "required" && (
                    <span style={{ color: "#F472B6" }}>Password required</span>
                  )}
                  {errors.password?.type === "pattern" && (
                    <span className="text-sm line-clamp-1" style={{ color: "#F472B6" }}>
                      Password should be 6 characters long and contain at least
                      one small one capital and one number
                    </span>
                  )}
                  {firebaseError && (
                    <p className="text-sm" style={{ color: "#F472B6" }}>{firebaseError}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
      <Lottie animationData={buildingAnimation} className="flex-1"></Lottie>
    </div>
  );
};

export default Register;