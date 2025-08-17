import React from "react";
import { motion } from "framer-motion";
import {
  FiUser,
  FiMail,
  FiCalendar,
  FiHome,
  FiMapPin,
  FiTag,
} from "react-icons/fi";
import { MdOutlineApartment } from "react-icons/md";
import { TbExternalLink } from "react-icons/tb";
import UseAuth from "../../../hooks/UseAuth";
import { NavLink } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaCheckCircle, FaSpinner } from "react-icons/fa";

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  },
};

const backgroundMotionVariants = {
  animate: {
    backgroundPosition: ["0% 0%", "100% 100%"],
    transition: {
      backgroundPosition: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 30,
        ease: "linear",
      },
    },
  },
};

const UserProfileAndAgreement = () => {
  const axiosSecure = useAxiosSecure();
  const { user, role } = UseAuth();
  const currentUserEmail = user?.email;

  const {
    isLoading,
    isError,
    data: activeAgreement,
    error,
  } = useQuery({
    queryKey: ["userActiveAgreement", currentUserEmail],
    queryFn: async () => {
      try {
        const result = await axiosSecure.get(
          `/userAgreement?email=${currentUserEmail}`
        );

        return result.data && Object.keys(result.data).length > 0
          ? result.data
          : null;
      } catch (err) {
        if (err.response && err.response.status === 404) {
          return null;
        }
        throw err;
      }
    },

    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const defaultUser = {
    displayName: "Guest User",
    email: "guest@example.com",
    photoURL: "https://via.placeholder.com/150/818CF8/FFFFFF?text=User",
  };

  const currentUser = user || defaultUser;

  const formatAgreementDate = (date) => {
    if (!date) return "N/A";
    try {
      const d = date instanceof Date ? date : new Date(date);
      if (isNaN(d.getTime())) {
        return "Invalid Date";
      }
      return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (e) {
      console.error("Error formatting date:", date, e);
      return "Invalid Date";
    }
  };

  const hasActiveAgreement = !!activeAgreement;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-gray-100">
        <FaSpinner className="animate-spin text-indigo-400 text-5xl mr-3" />
        <p className="text-xl">Loading profile and agreement details...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-red-400 text-xl p-5 text-center">
        <p>Error loading data: {error?.message || "Unknown error"}</p>
        <p className="text-gray-400 mt-2">
          Please check your internet connection or try again later.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={backgroundMotionVariants}
      animate="animate"
      className="min-h-screen flex items-center justify-center p-5
                 bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950
                 bg-[length:200%_200%] overflow-hidden relative"
    >
      {}
      <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-indigo-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 right-1/4 w-52 h-52 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl w-full relative"
      >
        <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700 backdrop-blur-sm bg-opacity-80">
          <motion.div variants={itemVariants}>
            <h1
              className="text-4xl font-extrabold text-center mb-8
                           text-indigo-400 tracking-wide drop-shadow-lg
                           md:text-5xl"
            >
              My Stellar Profile
            </h1>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {}
            <div className="text-center md:col-span-1">
              <motion.div variants={itemVariants}>
                <img
                  src={currentUser.photoURL || defaultUser.photoURL}
                  alt={currentUser.displayName}
                  className="w-36 h-36 rounded-full mx-auto mb-4 object-cover
                             border-4 border-indigo-500 shadow-lg shadow-indigo-500/50"
                />
                <p className="text-xl font-bold text-gray-100 mb-1 flex items-center justify-center gap-2">
                  <FiUser className="text-indigo-400" />{" "}
                  {currentUser.displayName}
                </p>
                <p className="text-gray-400 flex items-center justify-center gap-2">
                  <FiMail className="text-pink-400" /> {currentUser.email}
                </p>
                {user && role && (
                  <p className="text-gray-300 mt-2 text-sm">
                    Role:{" "}
                    <span className="font-bold text-pink-400 uppercase">
                      {role}
                    </span>
                  </p>
                )}
              </motion.div>
            </div>

            <div className="md:col-span-2">
              <div className="md:hidden border-t border-gray-700 my-8"></div> {}
              <motion.div variants={itemVariants}>
                <h2 className="text-3xl font-bold mb-5 text-pink-400 flex items-center gap-2 drop-shadow">
                  <FiCalendar className="text-pink-400" /> Agreement Details
                </h2>
              </motion.div>
              <div className="md:ml-4">
                <motion.div variants={itemVariants}>
                  {hasActiveAgreement ? (
                    <>
                      <div className="text-sm text-gray-200 mb-3 flex items-center gap-2">
                        <FaCheckCircle className="text-indigo-400" />{" "}
                        <strong className="text-md">Acceptance:</strong>{" "}
                        {activeAgreement?.status === "pending" && (
                          <p>
                            Application successful.{" "}
                            <span className="text-red-500">
                              Please wait for admin approval
                            </span>
                          </p>
                        )}
                        {activeAgreement?.status === "accepted" && (
                          <p>
                            <span className="text-green-500">
                              Approved By Admin
                            </span>
                          </p>
                        )}
                        {activeAgreement?.status === "rejected" && (
                          <p>
                            <span className="text-red-500">
                              Rejected By admin
                            </span>
                          </p>
                        )}
                      </div>
                      <div className="text-sm text-gray-200 mb-3 flex items-center gap-2">
                        <FaCheckCircle className="text-indigo-400" />{" "}
                        <strong className="text-md">Payment Status:</strong> {}
                        {!activeAgreement?.latestPayment ||
                        activeAgreement.latestPayment.length === 0 ? (
                          <p className="text-gray-300 text-sm">
                            <span className="text-red-600 font-semibold">
                              Not Paid.{" "}
                              <NavLink
                                to={"/dashBoard/rentPaymentForm"}
                                className="inline-flex items-center gap-1 text-indigo-400 hover:text-indigo-300
             transition-colors duration-300 ease-in-out font-medium
             underline hover:no-underline focus:outline-none focus:ring-2
             focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                              >
                                <TbExternalLink className="text-base text-sm" />{" "}
                                Pay Now
                              </NavLink>
                            </span>{" "}
                          </p>
                        ) : (
                          <p className="text-green-400">Paid</p>
                        )}
                      </div>
                      <p className="text-xl text-gray-200 mb-3 flex items-center gap-2">
                        <FiCalendar className="text-indigo-400" />{" "}
                        <strong>Applied On:</strong>{" "}
                        {formatAgreementDate(activeAgreement?.lastAgreedOn)}
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-300">
                        <p className="flex items-center gap-2">
                          <FiHome className="text-gray-500" />{" "}
                          <strong>Floor:</strong> {activeAgreement?.FloorNo}
                        </p>
                        <p className="flex items-center gap-2">
                          <FiMapPin className="text-gray-500" />{" "}
                          <strong>Block:</strong> {activeAgreement?.BlockName}
                        </p>
                        <p className="flex items-center gap-2">
                          <MdOutlineApartment className="text-gray-500" />{" "}
                          <strong>Room No:</strong>{" "}
                          {activeAgreement?.ApartmentNo}
                        </p>
                        <p className="flex items-center gap-2">
                          <FiTag className="text-gray-500" />{" "}
                          <strong>Monthly Rent:</strong> $
                          {activeAgreement?.Rent}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-lg text-gray-400 italic mb-4">
                        You currently do not have an active apartment agreement.
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-300 mt-5">
                        <p className="flex items-center gap-2">
                          <FiHome className="text-gray-500" />{" "}
                          <strong>Floor:</strong>{" "}
                          <span className="text-gray-400">N/A</span>
                        </p>
                        <p className="flex items-center gap-2">
                          <FiMapPin className="text-gray-500" />{" "}
                          <strong>Block:</strong>{" "}
                          <span className="text-gray-400">N/A</span>
                        </p>
                        <p className="flex items-center gap-2">
                          <MdOutlineApartment className="text-gray-500" />{" "}
                          <strong>Room No:</strong>{" "}
                          <span className="text-gray-400">N/A</span>
                        </p>
                        <p className="flex items-center gap-2">
                          <FiTag className="text-gray-500" />{" "}
                          <strong>Monthly Rent:</strong>{" "}
                          <span className="text-gray-400">N/A</span>
                        </p>
                      </div>
                      <NavLink to={"/allApartments"}>
                        <button
                          className="mt-6 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md
                                       transition duration-300 ease-in-out transform hover:scale-105"
                        >
                          Browse Available Apartments
                        </button>
                      </NavLink>
                    </>
                  )}
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default UserProfileAndAgreement;
