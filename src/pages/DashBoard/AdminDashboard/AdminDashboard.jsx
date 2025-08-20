import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  FaUserShield,
  FaEnvelope,
  FaBuilding,
  FaChartPie,
  FaUsers,
  FaUserFriends,
  FaSpinner,
  FaInfoCircle,
} from 'react-icons/fa';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from 'recharts';

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
  const totalUsers = dashboardStats.totalUsers || 0;
  const totalMembers = dashboardStats.totalMembers || 0;

  // Data for the Pie Chart
  const roomData = [
    { name: 'Available', value: availableRooms, color: '#818CF8' }, // Tailwind text-indigo-400
    { name: 'Unavailable', value: unavailableRooms, color: '#F472B6' }, // Tailwind text-pink-400
  ];

  // Data for the Bar Chart
  const totalData = [
    { name: 'Rooms', count: totalRooms, color: '#818CF8' },
    { name: 'Users', count: totalUsers, color: '#F472B6' },
    { name: 'Members', count: totalMembers, color: '#EC4899' },
  ];

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
        <p>Error loading dashboard data: {error?.message || 'Unknown error'}</p>
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
          {/* Recharts Pie Chart for Room Availability */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-xl border border-gray-700 text-center col-span-1 md:col-span-2 lg:col-span-1">
            <h4 className="text-gray-300 text-xl font-semibold mb-4">Room Availability</h4>
            <div style={{ width: '100%', height: 250 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={roomData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {roomData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(31, 41, 55, 0.9)',
                      border: '1px solid #6B7280',
                      borderRadius: '8px',
                      color: '#F3F4F6',
                    }}
                    itemStyle={{ color: '#F3F4F6' }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="text-gray-400 text-sm mt-4">Total Rooms: {totalRooms}</p>
          </div>

          {/* Recharts Bar Chart for Total Counts */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-xl border border-gray-700 text-center col-span-1 lg:col-span-2">
            <h4 className="text-gray-300 text-xl font-semibold mb-4">Total Counts</h4>
            <div style={{ width: '100%', height: 250 }}>
              <ResponsiveContainer>
                <BarChart data={totalData}>
                  <XAxis dataKey="name" tick={{ fill: '#D1D5DB' }} />
                  <YAxis tick={{ fill: '#D1D5DB' }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: 'rgba(31, 41, 55, 0.9)',
                      border: '1px solid #6B7280',
                      borderRadius: '8px',
                      color: '#F3F4F6',
                    }}
                    itemStyle={{ color: '#F3F4F6' }}
                  />
                  <Bar dataKey="count">
                    {totalData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;