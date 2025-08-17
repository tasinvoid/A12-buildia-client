import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaSpinner, FaCreditCard } from "react-icons/fa";
import { motion } from "framer-motion";

import CouponInput from "./CouponInput";

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

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const { paymentId } = useParams();

  const {
    isPending,
    isError,
    data: currentPaymentInfo,
    error,
  } = useQuery({
    queryKey: ["paymentDetails", paymentId],
    queryFn: async () => {
      const result = await axiosSecure.get(
        `/paymentDetails?paymentId=${paymentId}`
      );
      return result.data;
    },
    enabled: !!paymentId,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  const originalAmount = currentPaymentInfo?.rentAmount || 0;
  const amountToPay = appliedCoupon
    ? originalAmount - appliedCoupon.discountAmount
    : originalAmount;
  const amountInCents = amountToPay * 100;

  useEffect(() => {
    if (amountToPay > 0 && originalAmount > 0) {
      setProcessing(true);
      setCardError(null);
      axiosSecure
        .post("/create-payment-intent", { amount: amountInCents })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
          setProcessing(false);
        })
        .catch((err) => {
          console.error("Error fetching client secret:", err);
          setCardError("Failed to initialize payment. Please try again.");
          Swal.fire({
            icon: "error",
            title: "Payment Error!",
            text: "Could not prepare payment. Please try again later.",
            confirmButtonColor: "#EC4899",
            background: "#1F2937",
            color: "#D1D5DB",
          });
          setProcessing(false);
        });
    } else if (originalAmount === 0) {
      setClientSecret("");
      setProcessing(false);
    }
  }, [amountToPay, originalAmount, axiosSecure]);

  const handleCouponApply = (couponInfo) => {
    setAppliedCoupon(couponInfo);
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-gray-100">
        <FaSpinner className="animate-spin text-indigo-400 text-5xl mr-3" />
        <p className="text-xl">Loading payment details...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-red-400 text-xl p-5 text-center">
        <p>Error: {error?.message || "Unknown error"}</p>
        <p className="text-gray-400 mt-2">
          Please ensure you have an active payment method or contact support.
        </p>
      </div>
    );
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (amountToPay <= 0) {
      Swal.fire({
        icon: "success",
        title: "Payment Not Required!",
        text: "Your rent is fully covered by the coupon. No payment is needed.",
        confirmButtonColor: "#4F46E5",
        background: "#1F2937",
        color: "#D1D5DB",
      });

      const freePaymentData = {
        transactionId: "COUPON_FULL_DISCOUNT_" + Date.now(),
        paymentDate: new Date(),
        paymentStatus: "paid_by_coupon",
        apartmentId: currentPaymentInfo.apartmentId,
        userEmail: currentPaymentInfo.userEmail,
        rentAmount: 0,
        originalRentAmount: originalAmount,
        couponCode: appliedCoupon?.code,
        month: currentPaymentInfo.month,
        year: currentPaymentInfo.year,
      };
      try {
        await axiosSecure.patch(
          `/updatePaymentRecord?paymentId=${currentPaymentInfo._id}`,
          freePaymentData
        );
      } catch (err) {
        console.error("Error recording free payment:", err);
        Swal.fire({
          icon: "error",
          title: "Error Recording Free Payment!",
          text:
            "Please contact support regarding your fully discounted rent. Transaction ID: " +
            freePaymentData.transactionId,
          confirmButtonColor: "#EC4899",
          background: "#1F2937",
          color: "#D1D5DB",
        });
      }
      return;
    }

    if (!stripe || !elements || !clientSecret) {
      setCardError("Payment system not ready. Please wait a moment.");
      return;
    }

    setProcessing(true);
    setCardError(null);

    const card = elements.getElement(CardElement);

    if (card == null) {
      setCardError("Card details are not entered correctly.");
      setProcessing(false);
      return;
    }

    const { error: confirmPaymentError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: currentPaymentInfo.userEmail,
          },
        },
      });

    if (confirmPaymentError) {
      console.error("[Stripe error]", confirmPaymentError);
      setCardError(confirmPaymentError.message);
      Swal.fire({
        icon: "error",
        title: "Payment Failed!",
        text: confirmPaymentError.message,
        confirmButtonColor: "#EC4899",
        background: "#1F2937",
        color: "#D1D5DB",
      });
      setProcessing(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      console.log("[PaymentIntent]", paymentIntent);

      const paymentData = {
        transactionId: paymentIntent.id,
        paymentDate: new Date(),
        paymentStatus: "paid",
        paidAmount: amountToPay,
        originalRentAmount: originalAmount,
        couponCode: appliedCoupon ? appliedCoupon.code : null,
        discountAmount: appliedCoupon ? appliedCoupon.discountAmount : 0,
      };
      try {
        const updateRes = await axiosSecure.patch(
          `/updatePaymentRecord?paymentId=${currentPaymentInfo._id}`,
          paymentData
        );
        console.log(updateRes);
        if (updateRes.data.modifiedCount) {
          Swal.fire({
            icon: "success",
            title: "Payment Successful!",
            text: `Rent for ${currentPaymentInfo.month} has been paid. Transaction ID: ${paymentIntent.id}`,
            confirmButtonColor: "#4F46E5",
            background: "#1F2937",
            color: "#D1D5DB",
          });
        } else {
          Swal.fire({
            icon: "warning",
            title: "Payment Recorded Partially!",
            text:
              "Payment was successful, but there was an issue recording it on our end. Please contact support with your Transaction ID: " +
              paymentIntent.id,
            confirmButtonColor: "#EC4899",
            background: "#1F2937",
            color: "#D1D5DB",
          });
        }
      } catch (backendError) {
        console.error("Error recording payment in backend:", backendError);
        Swal.fire({
          icon: "error",
          title: "Database Record Failed!",
          text:
            "Payment succeeded, but could not record in our database. Please contact support with Transaction ID: " +
            paymentIntent.id,
          confirmButtonColor: "#EC4899",
          background: "#1F2937",
          color: "#D1D5DB",
        });
      } finally {
        setProcessing(false);
      }
    }
  };

  const cardStyle = {
    base: {
      color: "#F3F4F6",
      fontFamily: "Arial, sans-serif",
      fontSmoothing: "antialiased",
      fontSize: "16px",
      "::placeholder": {
        color: "#9CA3AF",
      },
    },
    invalid: {
      color: "#F472B6",
      iconColor: "#F472B6",
    },
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-5
                    bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950"
    >
      <motion.div
        variants={itemVariants}
        initial="hidden"
        animate="visible"
        className="max-w-md w-full bg-gray-800 p-8 rounded-2xl shadow-2xl
                   border border-gray-700 backdrop-blur-sm bg-opacity-80"
      >
        <h2
          className="text-3xl font-bold text-center mb-8
                       text-indigo-400 drop-shadow-lg flex items-center justify-center gap-2"
        >
          <FaCreditCard className="text-pink-400" /> Complete Your Payment
        </h2>

        <div className="text-center mb-6">
          <p className="text-gray-200 text-lg">
            Paying for:{" "}
            <span className="font-semibold text-indigo-300">
              {currentPaymentInfo.month}, {currentPaymentInfo.year} Rent
            </span>
          </p>
          <p className="text-gray-100 text-3xl font-extrabold mt-2">
            Original Amount:{" "}
            <span className="text-pink-400">${originalAmount.toFixed(2)}</span>
          </p>
          {appliedCoupon && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-gray-300 text-xl font-bold mt-2"
            >
              Discount:{" "}
              <span className="text-green-400">
                -${appliedCoupon.discountAmount.toFixed(2)}
              </span>
            </motion.p>
          )}
          <p className="text-gray-100 text-4xl font-extrabold mt-2">
            Total Payable:{" "}
            <span className="text-indigo-400">${amountToPay.toFixed(2)}</span>
          </p>
        </div>

        {}
        <CouponInput
          onCouponApply={handleCouponApply}
          initialAmount={originalAmount}
          appliedCoupon={appliedCoupon}
        />

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          {" "}
          {}
          {amountToPay > 0 && (
            <div className="p-4 rounded-lg bg-gray-900 border border-gray-700 shadow-inner">
              <CardElement options={{ style: cardStyle }} />
            </div>
          )}
          {cardError && (
            <p className="text-pink-400 text-sm text-center font-medium bg-gray-800 p-2 rounded-md border border-pink-500">
              {cardError}
            </p>
          )}
          <button
            type="submit"
            className="w-full py-3 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md
                       transition duration-300 ease-in-out transform hover:scale-105
                       flex items-center justify-center gap-2"
            disabled={
              processing ||
              (amountToPay > 0 && (!stripe || !elements || !clientSecret))
            }
          >
            {processing ? (
              <>
                <FaSpinner className="animate-spin" /> Processing Payment...
              </>
            ) : amountToPay > 0 ? (
              <>
                <FaCreditCard className="text-lg" /> Pay $
                {amountToPay.toFixed(2)}
              </>
            ) : (
              <>
                {" "}
                <FaCheckCircle className="text-lg" /> Confirm Free Payment{" "}
              </>
            )}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default CheckoutForm;
