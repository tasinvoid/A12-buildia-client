import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Modal from "react-modal";
import {
  FaSpinner,
  FaToggleOn,
  FaToggleOff,
  FaTicketAlt,
  FaExclamationCircle,
  FaPlusCircle,
  FaTimesCircle,
} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

Modal.setAppElement("#root");

const CouponAvailabilityChanger = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCouponFormData, setNewCouponFormData] = useState({
    couponCode: "",
    discountValue: "",
    validUntil: "",
    description: "",
  });

  const {
    data: coupons = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["allCoupons"],
    queryFn: async () => {
      const res = await axiosSecure.get("/coupons");
      return res.data;
    },
    staleTime: 5 * 60 * 1000,
  });

  const updateCouponAvailabilityMutation = useMutation({
    mutationFn: async ({ couponId, newAvailability }) => {
      const res = await axiosSecure.patch(`/coupons/${couponId}/availability`, {
        isActive: newAvailability,
      });
      return res.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(["allCoupons"]);
      Swal.fire({
        icon: "success",
        title: "Availability Updated!",
        text: `Coupon "${data.couponCode}" is now ${
          data.isActive ? "Available" : "Unavailable"
        }.`,
        confirmButtonColor: "#4F46E5",
        background: "#1F2937",
        color: "#D1D5DB",
      });
    },
    onError: (err) => {
      console.error("Error updating coupon availability:", err);
      Swal.fire({
        icon: "error",
        title: "Update Failed!",
        text:
          err.response?.data?.message ||
          "There was an issue updating coupon availability. Please try again.",
        confirmButtonColor: "#EC4899",
        background: "#1F2937",
        color: "#D1D5DB",
      });
    },
  });

  const addCouponMutation = useMutation({
    mutationFn: async (newCoupon) => {
      const res = await axiosSecure.post("/newCoupons", newCoupon);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["allCoupons"]);
      Swal.fire({
        icon: "success",
        title: "Coupon Added!",
        text: "The new coupon has been successfully added.",
        confirmButtonColor: "#4F46E5",
        background: "#1F2937",
        color: "#D1D5DB",
      });
      setIsModalOpen(false);
      setNewCouponFormData({
        couponCode: "",
        discountValue: "",
        validUntil: "",
        description: "",
      });
    },
    onError: (err) => {
      console.error("Error adding coupon:", err);
      Swal.fire({
        icon: "error",
        title: "Failed to Add Coupon!",
        text:
          err.response?.data?.message ||
          "There was an issue adding the coupon. Please try again.",
        confirmButtonColor: "#EC4899",
        background: "#1F2937",
        color: "#D1D5DB",
      });
    },
  });

  const handleNewCouponInputChange = (e) => {
    const { name, value } = e.target;
    setNewCouponFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddCouponSubmit = async (e) => {
    e.preventDefault();

    const { couponCode, discountValue, validUntil, description } =
      newCouponFormData;

    if (!couponCode || !discountValue || !validUntil) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill in Coupon Code, Discount Percentage, and Expiry Date.",
        confirmButtonColor: "#EC4899",
        background: "#1F2937",
        color: "#D1D5DB",
      });
      return;
    }

    if (
      isNaN(discountValue) ||
      parseFloat(discountValue) <= 0 ||
      parseFloat(discountValue) > 100
    ) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Discount",
        text: "Discount percentage must be a number between 1 and 100.",
        confirmButtonColor: "#EC4899",
        background: "#1F2937",
        color: "#D1D5DB",
      });
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedExpiryDate = new Date(validUntil);
    selectedExpiryDate.setHours(0, 0, 0, 0);

    if (selectedExpiryDate < today) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Expiry Date",
        text: "The expiry date cannot be in the past.",
        confirmButtonColor: "#EC4899",
        background: "#1F2937",
        color: "#D1D5DB",
      });
      return;
    }

    addCouponMutation.mutate({
      couponCode: couponCode,
      discountValue: parseFloat(discountValue),
      validUntil: validUntil,
      description: description,
    });
  };

  const handleToggleAvailability = (coupon) => {
    const newAvailability = !coupon.isActive;
    Swal.fire({
      title: `Confirm Change?`,
      text: `Are you sure you want to make coupon "${coupon.couponCode}" ${
        newAvailability ? "Available" : "Unavailable"
      }?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: newAvailability ? "#4F46E5" : "#EC4899",
      cancelButtonColor: "#6B7280",
      confirmButtonText: newAvailability
        ? "Yes, Make Available!"
        : "Yes, Make Unavailable!",
      background: "#1F2937",
      color: "#D1D5DB",
    }).then((result) => {
      if (result.isConfirmed) {
        updateCouponAvailabilityMutation.mutate({
          couponId: coupon._id,
          newAvailability: newAvailability,
        });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-gray-100">
        <FaSpinner className="animate-spin text-indigo-400 text-5xl mr-3" />
        <p className="text-xl text-gray-200">Loading coupons...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-red-400 text-xl text-center">
        <FaExclamationCircle className="text-red-500 text-3xl mr-3" />
        <p>Error loading coupons: {error?.message || "Unknown error"}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-gray-100">
      <div className="max-w-4xl mx-auto bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-lg shadow-2xl p-4 sm:p-6 md:p-8 border border-gray-700">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-10 text-indigo-400 drop-shadow-lg flex items-center justify-center gap-2 sm:gap-3">
          <FaTicketAlt className="text-pink-400 text-2xl sm:text-3xl" /> Manage
          Coupon Availability
        </h2>

        <div className="flex justify-end mb-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-gray-100 font-bold py-2 px-4 rounded-lg flex items-center gap-2 transition duration-300 ease-in-out transform hover:scale-105"
          >
            <FaPlusCircle className="text-xl" /> Add New Coupon
          </button>
        </div>

        {coupons.length === 0 ? (
          <div className="text-center text-gray-400 p-8 sm:p-10 border border-gray-700 rounded-lg bg-gray-900 shadow-lg">
            <p className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-pink-400">
              No coupons found.
            </p>
            <p className="text-base sm:text-lg">
              Click "Add New Coupon" to get started!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {coupons.map((coupon) => (
              <div
                key={coupon._id}
                className="bg-gray-900 p-4 rounded-lg shadow border border-gray-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-100 break-all">
                    {coupon.couponCode}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    Discount: {coupon.discountValue}%
                  </p>
                  <p className="text-gray-400 text-sm">
                    Expires: {new Date(coupon.validUntil).toLocaleDateString()}
                  </p>
                  {coupon.description && (
                    <p className="text-gray-500 text-xs mt-0.5 italic">
                      {coupon.description}
                    </p>
                  )}
                  {coupon.minimumPurchase > 0 && (
                    <p className="text-gray-500 text-xs">
                      Min. Purchase: ${coupon.minimumPurchase}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-2 sm:mt-0">
                  <span
                    className={`font-semibold ${
                      coupon.isActive ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {coupon.isActive ? "Available" : "Unavailable"}
                  </span>
                  <button
                    onClick={() => handleToggleAvailability(coupon)}
                    className={`p-2 rounded-full transition duration-300 ease-in-out transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed
                                                    ${
                                                      coupon.isActive
                                                        ? "bg-indigo-600 hover:bg-indigo-700"
                                                        : "bg-gray-700 hover:bg-gray-600"
                                                    } text-white`}
                    disabled={updateCouponAvailabilityMutation.isPending}
                    aria-label={
                      coupon.isActive
                        ? `Make ${coupon.couponCode} unavailable`
                        : `Make ${coupon.couponCode} available`
                    }
                  >
                    {coupon.isActive ? (
                      <FaToggleOn className="text-3xl" />
                    ) : (
                      <FaToggleOff className="text-3xl" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Add New Coupon"
        className="fixed inset-0 flex items-center justify-center p-4"
        overlayClassName="fixed inset-0 bg-gray-950 bg-opacity-75 backdrop-blur-sm"
      >
        <div className="bg-gray-800 text-gray-100 rounded-lg shadow-2xl p-6 sm:p-8 w-full max-w-md border border-gray-700 relative">
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-100 transition duration-200"
            aria-label="Close modal"
          >
            <FaTimesCircle className="text-2xl" />
          </button>
          <h2 className="text-2xl sm:text-3xl font-bold text-indigo-400 mb-6 text-center">
            Add New Coupon
          </h2>
          <form onSubmit={handleAddCouponSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="couponCode"
                className="block text-gray-200 text-sm font-medium mb-1"
              >
                Coupon Code
              </label>
              <input
                type="text"
                id="couponCode"
                name="couponCode"
                value={newCouponFormData.couponCode}
                onChange={handleNewCouponInputChange}
                className="w-full p-2 bg-gray-900 border border-gray-700 rounded-md text-gray-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                placeholder="e.g., BLACKFRIDAY20"
                required
              />
            </div>
            <div>
              <label
                htmlFor="discountValue"
                className="block text-gray-200 text-sm font-medium mb-1"
              >
                Discount Percentage (%)
              </label>
              <input
                type="number"
                id="discountValue"
                name="discountValue"
                value={newCouponFormData.discountValue}
                onChange={handleNewCouponInputChange}
                className="w-full p-2 bg-gray-900 border border-gray-700 rounded-md text-gray-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                placeholder="e.g., 15"
                min="1"
                max="100"
                step="0.01"
                required
              />
            </div>
            <div>
              <label
                htmlFor="validUntil"
                className="block text-gray-200 text-sm font-medium mb-1"
              >
                Expiry Date
              </label>
              <input
                type="date"
                id="validUntil"
                name="validUntil"
                value={newCouponFormData.validUntil}
                onChange={handleNewCouponInputChange}
                className="w-full p-2 bg-gray-900 border border-gray-700 rounded-md text-gray-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-gray-200 text-sm font-medium mb-1"
              >
                Coupon Description (Optional)
              </label>
              <textarea
                id="description"
                name="description"
                value={newCouponFormData.description}
                onChange={handleNewCouponInputChange}
                rows="3"
                className="w-full p-2 bg-gray-900 border border-gray-700 rounded-md text-gray-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                placeholder="A brief description of the coupon..."
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-gray-100 font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={addCouponMutation.isPending}
            >
              {addCouponMutation.isPending ? (
                <>
                  <FaSpinner className="animate-spin" /> Adding...
                </>
              ) : (
                <>
                  <FaPlusCircle /> Submit Coupon
                </>
              )}
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default CouponAvailabilityChanger;
