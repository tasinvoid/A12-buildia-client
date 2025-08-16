import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaTag, FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";

import Swal from "sweetalert2";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

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

const CouponInput = ({ onCouponApply, initialAmount, appliedCoupon }) => {
  const axiosSecure = useAxiosSecure()
  const [couponCode, setCouponCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("");

  const handleApplyCoupon = async () => {
    if (!couponCode) {
      setMessage("Please enter a coupon code.");
      setMessageType("error");
      return;
    }
    if (initialAmount <= 0) {
      setMessage("Cannot apply coupon on zero or negative amount.");
      setMessageType("error");

      onCouponApply(null);
      return;
    }

    setLoading(true);
    setMessage(null);
    setMessageType("");

    try {
      const res = await axiosSecure.post("/validate-coupon", {
        code: couponCode,
        amount: initialAmount,
      });

      if (res.data.success) {
        onCouponApply({
          code: res.data.coupon.code,
          discountPercentage: res.data.coupon.discountPercentage,
          discountAmount: res.data.coupon.discountAmount,
          isValid: true,
        });
        setMessage(res.data.message);
        setMessageType("success");

        Swal.fire({
          icon: "success",
          title: "Coupon Applied Successfully",
          text: res.data.message,
          confirmButtonColor: "#4F46E5",
          background: "#1F2937",
          color: "#D1D5DB",
        });
      } else {
        onCouponApply(null);
        setMessage(res.data.message);
        setMessageType("error");
        Swal.fire({
          icon: "error",
          title: "Coupon Error",
          text: res.data.message,
          confirmButtonColor: "#EC4899",
          background: "#1F2937",
          color: "#D1D5DB",
        });
      }
    } catch (error) {
      console.error(
        "Error applying coupon:",
        error.response ? error.response.data : error.message
      );
      const errorMessage =
        error.response?.data?.message ||
        "Coupon Error";
      onCouponApply(null);
      setMessage(errorMessage);
      setMessageType("error");
      Swal.fire({
        icon: "error",
        title: "Coupon Failed",
        text: errorMessage,
        confirmButtonColor: "#EC4899",
        background: "#1F2937",
        color: "#D1D5DB",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveCoupon = () => {
    onCouponApply(null);
    setCouponCode("");
    setMessage("Coupon Removed");
    setMessageType("info");

    Swal.fire({
      icon: "info",
      title: "Coupon removed",
      text: "Coupon removed Successfully",
      confirmButtonColor: "#4F46E5",
      background: "#1F2937",
      color: "#D1D5DB",
    });
  };

  return (
    <motion.div
      variants={itemVariants}
      className="bg-gray-900 p-5 rounded-lg border border-gray-700 shadow-inner"
    >
      <h3 className="text-xl font-semibold text-gray-100 mb-4 flex items-center gap-2">
        <FaTag className="text-pink-400" /> Apply Coupon
      </h3>

      {/* Conditional rendering based on whether a coupon is applied */}
      {!appliedCoupon ? (
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="enter coupon code"
            className="flex-grow p-3 rounded-md bg-gray-800 text-gray-200 border border-gray-700
                       focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                       placeholder-gray-400"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            disabled={loading}
          />
          <button
            onClick={handleApplyCoupon}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg
                       transition duration-300 ease-in-out transform hover:scale-105
                       flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading || !couponCode || initialAmount <= 0}
          >
            {loading ? (
              <>
                {" "}
                <FaSpinner className="animate-spin" /> applying...{" "}
              </>
            ) : (
              <>
                {" "}
                <FaCheckCircle /> apply{" "}
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between p-3 rounded-md bg-gray-800 border border-indigo-500">
          <span className="text-gray-200 flex items-center gap-2">
            <FaCheckCircle className="text-green-400" />
            Coupon{" "}
            <span className="font-bold text-indigo-400">
              "{appliedCoupon.code}"
            </span>{" "}
           
          </span>
          <button
            onClick={handleRemoveCoupon}
            className="px-1 py-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-lg
                       transition duration-300 ease-in-out transform hover:scale-105
                       flex items-center justify-center gap-2 text-sm"
          >
            <FaTimesCircle /> Remove
          </button>
        </div>
      )}

      {/* Display messages (success, error, info) */}
      {message && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className={`mt-3 text-sm font-medium p-2 rounded-md border text-center
                     ${
                       messageType === "success"
                         ? "bg-green-900/30 text-green-400 border-green-500"
                         : messageType === "error"
                         ? "bg-red-900/30 text-pink-400 border-pink-500"
                         : "bg-gray-700/30 text-gray-300 border-gray-600"
                     }`}
        >
          {message}
        </motion.p>
      )}

      {/* Display applied coupon's discount details if available */}
      {appliedCoupon && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 text-gray-300 text-center text-lg font-semibold"
        >
          Discount:{" "}
          <span className="text-green-400">
            ${appliedCoupon.discountAmount.toFixed(2)}
          </span>{" "}
          ({appliedCoupon.discountPercentage}%)
        </motion.p>
      )}
    </motion.div>
  );
};

export default CouponInput;
