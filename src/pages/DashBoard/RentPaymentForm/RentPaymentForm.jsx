import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiDollarSign,
  FiMail,
  FiHome,
  FiMapPin,
  FiTag,
  FiCalendar,
} from "react-icons/fi";
import { MdOutlineApartment } from "react-icons/md";
import Swal from "sweetalert2";

import { useQuery, useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UseAuth from "../../../hooks/UseAuth";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router";

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

const RentPaymentForm = () => {
  const { user } = UseAuth();
  const userEmail = user.email;
  const axiosSecure = useAxiosSecure();
  const [selectedMonth, setSelectedMonth] = useState("");
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const {
    data: agreement,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userAgreement", userEmail],
    queryFn: async () => {
      const response = await axiosSecure.get(
        `/userApartmentAgreement?email=${userEmail}`
      );

      const activeAgreement = response.data;
      if (!activeAgreement) {
        throw new Error("No active apartment agreement found for this user.");
      }
      return activeAgreement;
    },
    enabled: !!userEmail,
    staleTime: Infinity,
    cacheTime: Infinity,
  });

  const payRentMutation = useMutation({
    mutationFn: async (paymentData) => {
      const response = await axiosSecure.post(
        "/recordRentPayment",
        paymentData
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data.insertedId);
      Swal.fire({
        icon: "success",
        title: "Proceeding to Payment!",
        text: "Your rent payment has been recorded.",
        confirmButtonColor: "#4F46E5",
        background: "#1F2937",
        color: "#D1D5DB",
      });
      navigate(`/dashBoard/stripePaymentForm/${data.insertedId}`);
      setSelectedMonth("");
    },
    onError: (error) => {
      console.error("Error recording payment:", error);
      Swal.fire({
        icon: "error",
        title: "Payment Failed!",
        text:
          error.response?.data?.message ||
          "There was an issue processing your payment. Please try again.",
        confirmButtonColor: "#EC4899",
        background: "#1F2937",
        color: "#D1D5DB",
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedMonth) {
      Swal.fire({
        icon: "warning",
        title: "Month Not Selected!",
        text: "Please select the month for which you want to pay rent.",
        confirmButtonColor: "#EC4899",
        background: "#1F2937",
        color: "#D1D5DB",
      });
      return;
    }

    if (!agreement) {
      Swal.fire({
        icon: "error",
        title: "No Agreement Found!",
        text: "Cannot process payment without an active apartment agreement.",
        confirmButtonColor: "#EC4899",
        background: "#1F2937",
        color: "#D1D5DB",
      });
      return;
    }

    const paymentData = {
      userEmail: userEmail,
      apartmentId: agreement._id,
      apartmentNo: agreement.ApartmentNo,
      floorNo: agreement.FloorNo,
      blockName: agreement.BlockName,
      rentAmount: agreement.Rent,
      month: selectedMonth,
      year: currentYear,
      paymentDate: new Date(),
      paymentStatus: "pending",
    };

    Swal.fire({
      title: `Confirm Payment for ${selectedMonth}, ${currentYear}?`,
      text: `You are about to pay $${agreement.Rent} for Apartment ${agreement.ApartmentNo}.`,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#4F46E5",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, Pay Now!",
      background: "#1F2937",
      color: "#D1D5DB",
    }).then((result) => {
      if (result.isConfirmed) {
        payRentMutation.mutate(paymentData);
      }
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-gray-100">
        <FaSpinner className="animate-spin text-indigo-400 text-5xl mr-3" />
        <p className="text-xl">Loading agreement details...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-red-400 text-xl p-5 text-center">
        <p>Error: {error.message}</p>
        <p className="text-gray-400 mt-2">
          Please ensure you have an active apartment agreement or contact
          support.
        </p>
      </div>
    );
  }

  if (!agreement) {
    return (
      <div className="min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 bg-[length:200%_200%] overflow-hidden relative text-center">
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="max-w-xl w-full relative z-10 p-8 rounded-2xl bg-gray-800 shadow-2xl border border-gray-700 backdrop-blur-sm bg-opacity-80"
        >
          <h2 className="text-3xl font-extrabold text-indigo-400 mb-6">
            <FiDollarSign className="inline-block mr-3 text-pink-400" /> Rent
            Payment
          </h2>
          <p className="text-gray-300 text-lg">
            No active apartment agreement found for your account. You cannot
            make a rent payment at this time.
          </p>
          <p className="text-gray-400 text-md mt-4">
            Please contact administration if you believe this is an error.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen flex items-center justify-center p-5
                 bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950
                 bg-[length:200%_200%] overflow-hidden relative"
    >
      {}
      <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
      <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-indigo-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-1/4 right-1/4 w-52 h-52 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>

      <motion.div
        variants={itemVariants}
        className="max-w-xl w-full relative z-10 p-8 rounded-2xl
                   bg-gray-800 shadow-2xl border border-gray-700 backdrop-blur-sm bg-opacity-80"
      >
        <h2
          className="text-4xl font-extrabold text-center mb-8
                       text-indigo-400 tracking-wide drop-shadow-lg"
        >
          <FiDollarSign className="inline-block mr-3 text-pink-400" /> Pay Rent
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {}
          <motion.div variants={itemVariants}>
            <label
              htmlFor="memberEmail"
              className="block text-gray-200 text-lg font-medium mb-2"
            >
              <FiMail className="inline-block mr-2 text-indigo-400" /> Member
              Email
            </label>
            <input
              type="email"
              id="memberEmail"
              value={userEmail || ""}
              className="w-full p-3 rounded-lg bg-gray-900 text-gray-300 border border-gray-700 cursor-not-allowed"
              readOnly
            />
          </motion.div>

          {}
          <motion.div variants={itemVariants}>
            <label
              htmlFor="floor"
              className="block text-gray-200 text-lg font-medium mb-2"
            >
              <FiHome className="inline-block mr-2 text-pink-400" /> Floor
            </label>
            <input
              type="text"
              id="floor"
              value={agreement.FloorNo || ""}
              className="w-full p-3 rounded-lg bg-gray-900 text-gray-300 border border-gray-700 cursor-not-allowed"
              readOnly
            />
          </motion.div>

          {}
          <motion.div variants={itemVariants}>
            <label
              htmlFor="blockName"
              className="block text-gray-200 text-lg font-medium mb-2"
            >
              <FiMapPin className="inline-block mr-2 text-indigo-400" /> Block
              Name
            </label>
            <input
              type="text"
              id="blockName"
              value={agreement.BlockName || ""}
              className="w-full p-3 rounded-lg bg-gray-900 text-gray-300 border border-gray-700 cursor-not-allowed"
              readOnly
            />
          </motion.div>

          {}
          <motion.div variants={itemVariants}>
            <label
              htmlFor="apartmentNo"
              className="block text-gray-200 text-lg font-medium mb-2"
            >
              <MdOutlineApartment className="inline-block mr-2 text-pink-400" />{" "}
              Apartment No / Room No
            </label>
            <input
              type="text"
              id="apartmentNo"
              value={agreement.ApartmentNo || ""}
              className="w-full p-3 rounded-lg bg-gray-900 text-gray-300 border border-gray-700 cursor-not-allowed"
              readOnly
            />
          </motion.div>

          {}
          <motion.div variants={itemVariants}>
            <label
              htmlFor="rent"
              className="block text-gray-200 text-lg font-medium mb-2"
            >
              <FiTag className="inline-block mr-2 text-indigo-400" /> Monthly
              Rent
            </label>
            <input
              type="text"
              id="rent"
              value={`$${agreement.Rent || "0"}`}
              className="w-full p-3 rounded-lg bg-gray-900 text-gray-300 border border-gray-700 cursor-not-allowed font-semibold"
              readOnly
            />
          </motion.div>

          {}
          <motion.div variants={itemVariants}>
            <label
              htmlFor="month"
              className="block text-gray-200 text-lg font-medium mb-2"
            >
              <FiCalendar className="inline-block mr-2 text-pink-400" /> Select
              Month
            </label>
            <select
              id="month"
              name="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-900 text-gray-100 border border-gray-700
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
              required
            >
              <option value="">-- Select a Month --</option>
              {months.map((month, index) => (
                <option key={index} value={month}>
                  {month} {currentYear}
                </option>
              ))}
            </select>
          </motion.div>

          {}
          <motion.div variants={itemVariants}>
            <button
              type="submit"
              className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md
                         transition duration-300 ease-in-out transform hover:scale-105
                         flex items-center justify-center gap-2"
              disabled={
                payRentMutation.isPending || isLoading || isError || !agreement
              }
            >
              {payRentMutation.isPending ? (
                <>
                  <FaSpinner className="animate-spin" /> Processing...
                </>
              ) : (
                <>
                  <FiDollarSign className="text-lg" /> Pay Rent
                </>
              )}
            </button>
          </motion.div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default RentPaymentForm;
