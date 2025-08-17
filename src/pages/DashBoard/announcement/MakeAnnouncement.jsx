import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { FaBullhorn, FaPaperPlane, FaSpinner } from "react-icons/fa";
import Swal from "sweetalert2";
import UseAuth from "../../../hooks/UseAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const MakeAnnouncement = () => {
  const { user, loading: authLoading } = UseAuth();
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [announcementData, setAnnouncementData] = useState({
    title: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnnouncementData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const addAnnouncementMutation = useMutation({
    mutationFn: async (newAnnouncement) => {
      const res = await axiosSecure.post("/announcements", newAnnouncement);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["announcements"]);
      Swal.fire({
        icon: "success",
        title: "Announcement Posted!",
        text: "Your announcement has been successfully published.",
        confirmButtonColor: "#4F46E5",
        background: "#1F2937",
        color: "#D1D5DB",
      });
      setAnnouncementData({ title: "", description: "" });
    },
    onError: (err) => {
      console.error("Error posting announcement:", err);
      Swal.fire({
        icon: "error",
        title: "Failed to Post Announcement!",
        text:
          err.response?.data?.message ||
          "An error occurred while posting the announcement.",
        confirmButtonColor: "#EC4899",
        background: "#1F2937",
        color: "#D1D5DB",
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!announcementData.title || !announcementData.description) {
      Swal.fire({
        icon: "warning",
        title: "Missing Information",
        text: "Please provide both a title and description for the announcement.",
        confirmButtonColor: "#EC4899",
        background: "#1F2937",
        color: "#D1D5DB",
      });
      return;
    }

    addAnnouncementMutation.mutate({
      ...announcementData,
      senderEmail: user?.email,
      senderName: user?.displayName || "Admin",
      timestamp: new Date().toISOString(),
    });
  };

  if (authLoading || addAnnouncementMutation.isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-gray-100">
        <FaSpinner className="animate-spin text-indigo-400 text-5xl mr-3" />
        <p className="text-xl text-gray-200">Loading announcement form...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-gray-100">
      <div className="max-w-xl mx-auto bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-lg shadow-2xl p-8 border border-gray-700">
        <h2 className="text-4xl font-bold text-center mb-10 text-indigo-400 drop-shadow-lg flex items-center justify-center gap-3">
          <FaBullhorn className="text-pink-400" /> Make Announcement
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="title"
              className="block text-gray-300 text-lg font-bold mb-2"
            >
              Announcement Title:
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={announcementData.title}
              onChange={handleInputChange}
              className="shadow appearance-none border border-gray-700 rounded w-full py-3 px-4 bg-gray-900 text-gray-200 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="e.g., Important Maintenance Update"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-gray-300 text-lg font-bold mb-2"
            >
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              value={announcementData.description}
              onChange={handleInputChange}
              rows="6"
              className="shadow appearance-none border border-gray-700 rounded w-full py-3 px-4 bg-gray-900 text-gray-200 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Provide detailed information about the announcement here..."
              required
            ></textarea>
          </div>
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg
                         transition duration-300 ease-in-out transform hover:scale-105
                         flex items-center gap-3 text-xl
                         disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={addAnnouncementMutation.isPending}
            >
              <FaPaperPlane />{" "}
              {addAnnouncementMutation.isPending
                ? "Publishing..."
                : "Publish Announcement"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MakeAnnouncement;
