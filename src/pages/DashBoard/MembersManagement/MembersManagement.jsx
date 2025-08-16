import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { FaSpinner, FaUsers, FaUserTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import UseAuth from "../../../hooks/UseAuth";

const MembersManagement = () => {
  const { user, loading: authLoading } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const {
    data: members = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["members"],
    queryFn: async () => {
      const res = await axiosSecure.get("/usersFilter");
      return res.data.filter((u) => u.role === "member");
    },
    enabled: !!user && !authLoading,
    staleTime: 5 * 60 * 1000,
  });

  const updateRoleMutation = useMutation({
    mutationFn: async ({ email, newRole }) => {
      const res = await axiosSecure.patch(`/users/update-role/${email}`, {
        role: newRole,
      });
      return res.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(["members"]);
      Swal.fire({
        icon: "success",
        title: "Role Updated!",
        text: `${variables.email}'s role has been changed to ${variables.newRole}.`,
        confirmButtonColor: "#4F46E5",
        background: "#1F2937",
        color: "#D1D5DB",
      });
    },
    onError: (err) => {
      console.error("Error updating user role:", err);
      Swal.fire({
        icon: "error",
        title: "Failed to Update Role!",
        text:
          err.response?.data?.message ||
          "An error occurred while changing the user role.",
        confirmButtonColor: "#EC4899",
        background: "#1F2937",
        color: "#D1D5DB",
      });
    },
  });

  const handleRemoveMember = (memberEmail) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to remove this user from the member role. They will lose access to member features.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EC4899",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Yes, remove them!",
      background: "#1F2937",
      color: "#D1D5DB",
    }).then((result) => {
      if (result.isConfirmed) {
        updateRoleMutation.mutate({ email: memberEmail, newRole: "user" });
      }
    });
  };

  if (authLoading || isPending || updateRoleMutation.isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-gray-100">
        <FaSpinner className="animate-spin text-indigo-400 text-5xl mr-3" />
        <p className="text-xl text-gray-200">Loading members data...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-red-400 text-xl text-center">
        <p>Error loading members: {error?.message || "Unknown error"}</p>
        <p className="text-gray-400 mt-2">
          Please try again later or contact support.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-gray-100">
      <div className="max-w-xs sm:max-w-xl md:max-w-4xl mx-auto bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-lg shadow-2xl p-4 sm:p-6 md:p-8 border border-gray-700">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6 sm:mb-10 text-indigo-400 drop-shadow-lg flex items-center justify-center gap-2 sm:gap-3">
          <FaUsers className="text-pink-400 text-2xl sm:text-3xl" /> Manage Members
        </h2>

        {members.length === 0 ? (
          <div className="text-center text-gray-400 p-8 sm:p-10 border border-gray-700 rounded-lg bg-gray-900 shadow-lg">
            <p className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-pink-400">
              No members found.
            </p>
            <p className="text-base sm:text-lg">
              There are currently no users with the 'member' role.
            </p>
          </div>
        ) : (
          <>
            {/* Desktop/Tablet Table View (NO horizontal scroll) */}
            <div className="hidden md:block"> {/* Removed overflow-x-auto here */}
              <table className="min-w-full bg-gray-900 rounded-lg overflow-hidden border border-gray-700 table-fixed"> {/* Added table-fixed */}
                <thead className="bg-gray-700 border-b border-gray-600">
                  <tr>
                    <th className="py-3 px-4 sm:px-6 text-left text-xs sm:text-sm font-semibold text-gray-300 uppercase tracking-wider w-1/3"> {/* Added w-1/3 for distribution */}
                      User Name
                    </th>
                    <th className="py-3 px-4 sm:px-6 text-left text-xs sm:text-sm font-semibold text-gray-300 uppercase tracking-wider w-1/3"> {/* Added w-1/3 */}
                      User Email
                    </th>
                    <th className="py-3 px-4 sm:px-6 text-center text-xs sm:text-sm font-semibold text-gray-300 uppercase tracking-wider w-1/3"> {/* Added w-1/3 */}
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {members.map((member) => (
                    <tr
                      key={member._id}
                      className="hover:bg-gray-800 transition duration-200"
                    >
                      <td className="py-3 px-4 sm:px-6 text-gray-200 text-sm break-words"> {/* Added break-words */}
                        {member.name || "N/A"}
                      </td>
                      <td className="py-3 px-4 sm:px-6 text-indigo-400 font-semibold text-sm break-words"> {/* Added break-words */}
                        {member.email}
                      </td>
                      <td className="py-3 px-4 sm:px-6 text-center">
                        <button
                          onClick={() => handleRemoveMember(member.email)}
                          className="px-3 py-1 sm:px-4 sm:py-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-lg
                                     transition duration-300 ease-in-out transform hover:scale-105
                                     flex items-center justify-center gap-1 mx-auto text-sm
                                     disabled:opacity-50 disabled:cursor-not-allowed"
                          disabled={
                            updateRoleMutation.isPending ||
                            member.email === user?.email
                          }
                        >
                          <FaUserTimes /> Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View (NO horizontal scroll) */}
            <div className="md:hidden space-y-4">
              {members.map((member) => (
                <div
                  key={member._id}
                  className="bg-gray-900 p-4 rounded-lg shadow border border-gray-700"
                >
                  <p className="text-gray-200 text-lg font-semibold mb-1 break-words">
                    <span className="text-indigo-400">Name:</span> {member.name || "N/A"}
                  </p>
                  <p className="text-gray-300 text-sm mb-3 break-words">
                    <span className="text-pink-400">Email:</span> {member.email}
                  </p>
                  <div className="mt-2 border-t border-gray-700 pt-3 flex justify-center">
                    <button
                      onClick={() => handleRemoveMember(member.email)}
                      className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-lg
                                 transition duration-300 ease-in-out transform hover:scale-105
                                 flex items-center justify-center gap-2 text-sm
                                 disabled:opacity-50 disabled:cursor-not-allowed w-full"
                      disabled={
                        updateRoleMutation.isPending ||
                        member.email === user?.email
                      }
                    >
                      <FaUserTimes /> Remove Member
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

export default MembersManagement;