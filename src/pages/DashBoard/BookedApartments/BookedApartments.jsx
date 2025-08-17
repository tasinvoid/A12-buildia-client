import React from "react";
import { FaCheckCircle, FaTimesCircle, FaSpinner } from "react-icons/fa";
import Swal from "sweetalert2";

import {
  useQuery,
  useMutation,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const queryClient = new QueryClient();

const BookedApartments = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: agreements,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["pendingAgreements"],
    queryFn: async () => {
      const response = await axiosSecure.get("/pendingBookings");

      return response.data;
    },
  });

  const updateAgreementMutation = useMutation({
    mutationFn: async ({ email, payload }) => {
      const response = await axiosSecure.patch(
        `/updateAgreementStatus?email=${email}`,
        payload
      );
      return response.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["pendingAgreements", data] });

      Swal.fire({
        icon: "success",
        title: `${
          variables.payload.status === "accepted" ? "Accepted!" : "Rejected!"
        }`,
        text: `Agreement for Apartment No: ${variables.payload.apartmentNo} has been successfully ${variables.payload.status}.`,
        confirmButtonColor:
          variables.payload.status === "accepted" ? "#4F46E5" : "#EC4899",
        background: "#1F2937",
        color: "#D1D5DB",
      });
      refetch();
    },
    onError: (error, variables) => {
      console.error(`Error ${variables.payload.status}ing agreement:`, error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text:
          error.response?.data?.message ||
          `There was an issue ${variables.payload.status}ing the agreement. Please try again.`,
        confirmButtonColor: "#EC4899",
        background: "#1F2937",
        color: "#D1D5DB",
      });
    },
  });

  const handleAction = (
    agreementId,
    actionType,
    apartmentNo,
    userName,
    userEmail
  ) => {
    Swal.fire({
      title: `Are you sure to ${actionType}?`,
      text: `You are about to ${actionType} the agreement for Apartment No: ${apartmentNo} by ${userName}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: actionType === "accept" ? "#4F46E5" : "#EC4899",
      cancelButtonColor: "#6B7280",
      confirmButtonText: `Yes, ${actionType} it!`,
      background: "#1F2937",
      color: "#D1D5DB",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const payload = {
          status: actionType === "accept" ? "accepted" : "rejected",
          acceptedDate: actionType === "accept" ? new Date() : null,
        };
        updateAgreementMutation.mutate({ email: userEmail, payload });
      }
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-gray-100">
        <FaSpinner className="animate-spin text-indigo-400 text-5xl mr-3" />
        <p className="text-xl">Loading pending agreements...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-red-400 text-xl p-5">
        <p>Error: {error.message || "Failed to load apartment agreements."}</p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center p-4 sm:p-6 lg:p-8
                 bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 relative overflow-hidden"
    >
      {}
      <div className="absolute top-1/4 left-1/4 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>
      <div className="absolute top-1/2 left-1/2 w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 bg-indigo-600 rounded-full mix-blend-multiply filter blur-xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-1/4 right-1/4 w-32 h-32 sm:w-40 sm:h-40 md:w-52 md:h-52 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-30"></div>

      <div
        className="max-w-xs sm:max-w-xl md:max-w-4xl lg:max-w-7xl w-full relative z-10 p-5 sm:p-8 rounded-2xl
                   bg-gray-800 shadow-2xl border border-gray-700 backdrop-blur-sm bg-opacity-80 mt-8 sm:mt-10 mb-10 sm:mb-20"
      >
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-6 sm:mb-10
                       text-indigo-400 tracking-wide drop-shadow-lg"
        >
          <FaCheckCircle className="inline-block mr-2 sm:mr-4 text-pink-400 text-2xl sm:text-3xl md:text-4xl align-middle" />{" "}
          Manage Apartment Agreements
        </h2>

        {agreements.length === 0 ? (
          <p className="text-gray-300 text-center text-lg sm:text-xl mt-6 sm:mt-8 px-4">
            No pending apartment agreements found.
          </p>
        ) : (
          <>
            {}
            <div className="overflow-x-auto rounded-lg border border-gray-700 hidden md:block">
              <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-900">
                  <tr>
                    <th
                      scope="col"
                      className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider"
                    >
                      User Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider"
                    >
                      User Email
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider"
                    >
                      Floor
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider"
                    >
                      Block
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider"
                    >
                      Apt. No.
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-2 sm:px-6 sm:py-3 text-left text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider"
                    >
                      Rent ($)
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-2 sm:px-6 sm:py-3 text-center text-xs sm:text-sm font-medium text-gray-400 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 divide-y divide-gray-700">
                  {agreements.map((agreement) => (
                    <tr
                      key={agreement._id}
                      className="hover:bg-gray-700 transition-colors duration-200"
                    >
                      <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-gray-200 text-sm sm:text-base">
                        {agreement.currentTenantName}
                      </td>
                      <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-gray-300 text-sm sm:text-base">
                        {agreement.currentTenantEmail}
                      </td>
                      <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-gray-300 text-sm sm:text-base">
                        {agreement.FloorNo}
                      </td>
                      <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-gray-300 text-sm sm:text-base">
                        {agreement.BlockName}
                      </td>
                      <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-gray-300 text-sm sm:text-base">
                        {agreement.ApartmentNo}
                      </td>
                      <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-gray-300 text-sm sm:text-base">
                        ${agreement.Rent}
                      </td>
                      <td className="px-3 py-2 sm:px-6 sm:py-4 whitespace-nowrap text-center">
                        <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2">
                          <button
                            onClick={() =>
                              handleAction(
                                agreement._id,
                                "accept",
                                agreement.ApartmentNo,
                                agreement.currentTenantName,
                                agreement.currentTenantEmail
                              )
                            }
                            className="px-3 py-1 sm:px-4 sm:py-2 bg-indigo-600 text-white rounded-lg shadow-md
                                       hover:bg-indigo-700 transition duration-200 flex items-center gap-1 text-xs sm:text-base"
                            disabled={updateAgreementMutation.isPending}
                          >
                            <FaCheckCircle />{" "}
                            <span className="sm:hidden">Accept</span>
                          </button>
                          <button
                            onClick={() =>
                              handleAction(
                                agreement._id,
                                "reject",
                                agreement.ApartmentNo,
                                agreement.currentTenantName,
                                agreement.currentTenantEmail
                              )
                            }
                            className="px-3 py-1 sm:px-4 sm:py-2 bg-pink-500 text-white rounded-lg shadow-md
                                       hover:bg-pink-600 transition duration-200 flex items-center gap-1 text-xs sm:text-base"
                            disabled={updateAgreementMutation.isPending}
                          >
                            <FaTimesCircle />{" "}
                            <span className="sm:hidden">Reject</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {}
            <div className="md:hidden space-y-4 px-2">
              {" "}
              {}
              {agreements.map((agreement) => (
                <div
                  key={agreement._id}
                  className="bg-gray-800 p-4 rounded-lg shadow border border-gray-700"
                >
                  <p className="text-gray-200 mb-1">
                    <strong className="text-indigo-400">User:</strong>{" "}
                    {agreement.currentTenantName}
                  </p>
                  <p className="text-gray-300 mb-1 text-sm">
                    <strong className="text-pink-400">Email:</strong>{" "}
                    {agreement.currentTenantEmail}
                  </p>
                  <p className="text-gray-300 mb-1 text-sm">
                    <strong className="text-gray-400">Apartment:</strong>{" "}
                    {agreement.ApartmentNo} (Floor: {agreement.FloorNo}, Block:{" "}
                    {agreement.BlockName})
                  </p>
                  <p className="text-gray-300 mb-4 text-sm">
                    <strong className="text-gray-400">Rent:</strong> $
                    {agreement.Rent}
                  </p>
                  <div className="flex flex-col space-y-2 mt-4 border-t border-gray-700 pt-4">
                    <button
                      onClick={() =>
                        handleAction(
                          agreement._id,
                          "accept",
                          agreement.ApartmentNo,
                          agreement.currentTenantName,
                          agreement.currentTenantEmail
                        )
                      }
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg shadow-md
                                 hover:bg-indigo-700 transition duration-200 flex items-center justify-center gap-2 text-sm w-full"
                      disabled={updateAgreementMutation.isPending}
                    >
                      <FaCheckCircle /> Accept Agreement
                    </button>
                    <button
                      onClick={() =>
                        handleAction(
                          agreement._id,
                          "reject",
                          agreement.ApartmentNo,
                          agreement.currentTenantName,
                          agreement.currentTenantEmail
                        )
                      }
                      className="px-4 py-2 bg-pink-500 text-white rounded-lg shadow-md
                                 hover:bg-pink-600 transition duration-200 flex items-center justify-center gap-2 text-sm w-full"
                      disabled={updateAgreementMutation.isPending}
                    >
                      <FaTimesCircle /> Reject Agreement
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BookedApartments;
