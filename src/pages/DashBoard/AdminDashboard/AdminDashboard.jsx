import React from 'react';
import { useQuery } from '@tanstack/react-query';

import { FaUserShield, FaEnvelope, FaBuilding, FaChartPie, FaUsers, FaUserFriends, FaSpinner, FaInfoCircle } from 'react-icons/fa';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import UseAuth from '../../../hooks/UseAuth';

const AdminDashboard = () => {
  const { user, loading: authLoading } = UseAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: dashboardStats = {},
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['adminDashboardStats'],
    queryFn: async () => {
      const res = await axiosSecure.get('/admin/dashboard-stats');
      return res.data;
    },
    enabled: !!user && !authLoading,
    staleTime: 5 * 60 * 1000,
  });

  const totalRooms = dashboardStats.totalRooms || 0;
  const availableRooms = dashboardStats.availableRooms || 0;
  const unavailableRooms = dashboardStats.unavailableRooms || 0;

  const percentageAvailable = totalRooms > 0 ? ((availableRooms / totalRooms) * 100).toFixed(2) : 0;
  const percentageUnavailable = totalRooms > 0 ? ((unavailableRooms / totalRooms) * 100).toFixed(2) : 0;


  if (authLoading || isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-gray-100">
        <FaSpinner className="animate-spin text-indigo-400 text-5xl mr-3" />
        <p className="text-xl text-gray-200">Loading admin dashboard...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-red-400 text-xl text-center">
        <p>Error loading dashboard data: {error?.message || "Unknown error"}</p>
        <p className="text-gray-400 mt-2">Please check your internet connection or try again later.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-gray-100">
      <div className="max-w-7xl mx-auto bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-lg shadow-2xl p-8 border border-gray-700">
        <h2 className="text-4xl font-bold text-center mb-10 text-indigo-400 drop-shadow-lg flex items-center justify-center gap-3">
          <FaUserShield className="text-pink-400" /> Admin Dashboard
        </h2>

        <div className="bg-gray-900 p-6 rounded-lg shadow-xl mb-10 flex flex-col md:flex-row items-center justify-center border border-gray-700">
          <div className="mr-6 mb-4 md:mb-0">
            <img
              src={user?.photoURL || 'https://i.ibb.co/VMyxS3j/user.png'}
              alt="Admin Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500 shadow-lg"
            />
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-3xl font-semibold text-gray-100 mb-2">{user?.displayName || 'Admin User'}</h3>
            <p className="text-indigo-400 text-lg flex items-center justify-center md:justify-start gap-2 mb-1">
              <FaEnvelope /> {user?.email || 'admin@example.com'}
            </p>
            <p className="text-gray-400 text-sm italic flex items-center justify-center md:justify-start gap-2">
              <FaInfoCircle /> Administrator Account
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-gray-900 p-6 rounded-lg shadow-xl border border-gray-700 text-center">
            <FaBuilding className="text-indigo-400 text-5xl mx-auto mb-4" />
            <h4 className="text-gray-300 text-xl font-semibold mb-2">Total Rooms</h4>
            <p className="text-gray-100 text-4xl font-bold">{dashboardStats.totalRooms || 0}</p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg shadow-xl border border-gray-700 text-center">
            <FaChartPie className="text-green-400 text-5xl mx-auto mb-4" />
            <h4 className="text-gray-300 text-xl font-semibold mb-2">Available Rooms</h4>
            <p className="text-gray-100 text-4xl font-bold">{percentageAvailable}%</p>
            <p className="text-gray-400 text-sm mt-1">({dashboardStats.availableRooms || 0} rooms)</p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg shadow-xl border border-gray-700 text-center">
            <FaChartPie className="text-pink-400 text-5xl mx-auto mb-4" />
            <h4 className="text-gray-300 text-xl font-semibold mb-2">Unavailable Rooms</h4>
            <p className="text-gray-100 text-4xl font-bold">{percentageUnavailable}%</p>
            <p className="text-gray-400 text-sm mt-1">({dashboardStats.unavailableRooms || 0} rooms)</p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg shadow-xl border border-gray-700 text-center">
            <FaUsers className="text-indigo-400 text-5xl mx-auto mb-4" />
            <h4 className="text-gray-300 text-xl font-semibold mb-2">Total Users</h4>
            <p className="text-gray-100 text-4xl font-bold">{dashboardStats.totalUsers || 0}</p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg shadow-xl border border-gray-700 text-center">
            <FaUserFriends className="text-green-400 text-5xl mx-auto mb-4" />
            <h4 className="text-gray-300 text-xl font-semibold mb-2">Total Members</h4>
            <p className="text-gray-100 text-4xl font-bold">{dashboardStats.totalMembers || 0}</p>
          </div>

          <div className="hidden lg:block bg-gray-900 p-6 rounded-lg shadow-xl border border-gray-700 text-center">
            <FaInfoCircle className="text-gray-500 text-5xl mx-auto mb-4" />
            <h4 className="text-gray-400 text-xl font-semibold mb-2">Quick Stats</h4>
            <p className="text-gray-500 text-sm">More details coming soon.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;