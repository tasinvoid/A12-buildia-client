import React from "react";
import { useQuery } from "@tanstack/react-query";

import {
  FaSpinner,
  FaHistory,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaCreditCard,
} from "react-icons/fa";
import { format } from "date-fns";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UseAuth from "../../../hooks/UseAuth";

const PaymentHistory = () => {
  const { user, loading: authLoading } = UseAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: payments = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      if (!user?.email) {
        return [];
      }

      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email && !authLoading,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  if (authLoading || isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-gray-100">
        <FaSpinner className="animate-spin text-indigo-400 text-5xl mr-3" />
        <p className="text-xl text-gray-200">Loading payment details...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-red-400 text-xl text-center">
        <p>
          Error loading payment details: {error?.message || "Unknown error"}
        </p>
        <p className="text-gray-400 mt-2">
          Please try again later or contact support.
        </p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-gray-100 text-xl text-center">
        <p className="text-pink-400 mb-4">
          Please log in to view your payment details.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-gray-100">
      <div className="max-w-7xl mx-auto bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-lg shadow-2xl p-8 border border-gray-700">
        <h2 className="text-4xl font-bold text-center mb-10 text-indigo-400 drop-shadow-lg flex items-center justify-center gap-3">
          <FaHistory className="text-pink-400" /> Your Payment History
        </h2>

        {payments.length === 0 ? (
          <div className="text-center text-gray-400 p-10 border border-gray-700 rounded-lg bg-gray-900 shadow-lg">
            <p className="text-2xl font-semibold mb-4 text-pink-400">
              No payment records found.
            </p>
            <p className="text-lg">
              Once you make payments, they will be listed here.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-900 rounded-lg overflow-hidden border border-gray-700">
              <thead className="bg-gray-700 border-b border-gray-600">
                <tr>
                  <th className="py-3 px-6 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    <FaCalendarAlt className="inline mr-2 text-indigo-400" />{" "}
                    Date
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    <FaMoneyBillWave className="inline mr-2 text-pink-400" />{" "}
                    Amount
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    <FaCreditCard className="inline mr-2 text-green-400" />{" "}
                    Transaction ID
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Payment Status
                  </th>
                  <th className="py-3 px-6 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider">
                    Description
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {payments.map((payment) => (
                  <tr
                    key={payment._id}
                    className="hover:bg-gray-800 transition duration-200"
                  >
                    <td className="py-4 px-6 text-gray-200 text-sm">
                      {format(new Date(payment.paymentDate), "MMM dd, yyyy ")}
                    </td>
                    <td className="py-4 px-6 text-indigo-400 font-semibold text-sm">
                      ${payment.paidAmount}
                    </td>
                    <td className="py-4 px-6 text-gray-300 text-xs">
                      {payment.transactionId || "N/A"}
                    </td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold
                        ${
                          payment.paymentStatus === "paid"
                            ? "bg-green-600 text-white"
                            : payment.paymentStatus === "pending"
                            ? "bg-yellow-600 text-white"
                            : "bg-gray-600 text-white"
                        }`}
                      >
                        {payment.paymentStatus || "N/A"}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-400 text-sm">
                      {payment.description || "Rent Payment"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
