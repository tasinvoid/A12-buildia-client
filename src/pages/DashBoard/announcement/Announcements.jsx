import React from "react";
import { useQuery } from "@tanstack/react-query";

import {
  FaSpinner,
  FaBullhorn,
  FaCalendarAlt,
  FaUserCircle,
} from "react-icons/fa";
import UseAuth from "../../../hooks/UseAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Announcements = () => {
  const { user, loading: authLoading } = UseAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: announcements = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["announcements"],
    queryFn: async () => {
      const res = await axiosSecure.get("/announcements");
      return res.data;
    },
    enabled: !!user && !authLoading,
    staleTime: 1 * 60 * 1000,
    refetchOnWindowFocus: true,
  });

  if (authLoading || isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-gray-100">
        <FaSpinner className="animate-spin text-indigo-400 text-5xl mr-3" />
        <p className="text-xl text-gray-200">Loading announcements...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-red-400 text-xl text-center">
        <p>Error loading announcements: {error?.message || "Unknown error"}</p>
        <p className="text-gray-400 mt-2">
          Please check your internet connection or try again later.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-gray-100">
      <div className="max-w-3xl mx-auto bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-lg shadow-2xl p-8 border border-gray-700">
        <h2 className="text-4xl font-bold text-center mb-10 text-indigo-400 drop-shadow-lg flex items-center justify-center gap-3">
          <FaBullhorn className="text-pink-400" /> Latest Announcements
        </h2>

        {announcements.length === 0 ? (
          <div className="text-center text-gray-400 p-10 border border-gray-700 rounded-lg bg-gray-900 shadow-lg">
            <p className="text-2xl font-semibold mb-4 text-gray-300">
              No announcements yet.
            </p>
            <p className="text-lg">Stay tuned for important updates!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {[...announcements]
              .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
              .map((announcement) => (
                <div
                  key={announcement._id}
                  className="bg-gray-900 p-6 rounded-lg shadow-xl border border-gray-700"
                >
                  <h3 className="text-2xl font-semibold text-gray-100 mb-2">
                    {announcement.title}
                  </h3>
                  <p className="text-gray-300 mb-4 text-justify">
                    {announcement.description}
                  </p>
                  <div className="flex items-center justify-between text-gray-500 text-sm italic">
                    <span className="flex items-center gap-1">
                      <FaUserCircle className="text-gray-500" />{" "}
                      {announcement.senderName || "Admin"}
                    </span>
                    <span className="flex items-center gap-1">
                      <FaCalendarAlt className="text-gray-500" />{" "}
                      {new Date(announcement.timestamp).toLocaleDateString()} at{" "}
                      {new Date(announcement.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcements;
