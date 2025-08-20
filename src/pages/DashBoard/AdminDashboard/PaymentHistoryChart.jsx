import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { FaChartLine, FaSpinner } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import UseAuth from '../../../hooks/UseAuth';

const PaymentHistoryChart = () => {
  const { user, loading: authLoading } = UseAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: payments = [],
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['payments', user?.email],
    queryFn: async () => {
      if (!user?.email) {
        return [];
      }
      const res = await axiosSecure.get(`/payments?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email && !authLoading,
    staleTime: 5 * 60 * 1000,
  });

  // Data transformation to group payments by month
  const monthlyPayments = payments.reduce((acc, payment) => {
    if (!payment.paymentDate || typeof payment.paidAmount === 'undefined') {
      return acc;
    }
    const date = new Date(payment.paymentDate);
    const monthYear = format(date, 'MMM yyyy');
    const paidAmount = parseFloat(payment.paidAmount);

    if (acc[monthYear]) {
      acc[monthYear] += paidAmount;
    } else {
      acc[monthYear] = paidAmount;
    }
    return acc;
  }, {});

  const chartData = Object.keys(monthlyPayments)
    .sort((a, b) => new Date(a) - new Date(b))
    .map((monthYear) => ({
      month: monthYear,
      totalPaid: monthlyPayments[monthYear],
    }));

  if (authLoading || isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-gray-100">
        <FaSpinner className="animate-spin text-indigo-400 text-5xl mr-3" />
        <p className="text-xl text-gray-200">Loading chart data...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-red-400 text-xl text-center">
        <p>Error loading data for chart: {error?.message || 'Unknown error'}</p>
      </div>
    );
  }

  if (chartData.length === 0) {
    return (
      <div className="text-center text-gray-400 p-10 border border-gray-700 rounded-lg bg-gray-900 shadow-lg">
        <p className="text-2xl font-semibold mb-4 text-pink-400">
          No payment data available for chart.
        </p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-lg shadow-2xl border border-gray-700">
      <h3 className="text-2xl font-bold mb-4 text-indigo-400 text-center flex items-center justify-center gap-2">
        <FaChartLine className="text-pink-400" />
        Monthly Payment Trend
      </h3>
      <div style={{ width: '100%', height: 350 }}>
        <ResponsiveContainer>
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
            <XAxis dataKey="month" tick={{ fill: '#9CA3AF' }} />
            <YAxis tick={{ fill: '#9CA3AF' }} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #4B5563',
                color: '#F3F4F6',
              }}
              labelStyle={{ color: '#818CF8' }}
              formatter={(value) => `$${value.toFixed(2)}`}
            />
            <Line
              type="monotone"
              dataKey="totalPaid"
              stroke="#818CF8"
              strokeWidth={3}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PaymentHistoryChart;