import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";

import ApartmentCard from "./ApartmentCard";
import { useLoaderData } from "react-router";
import { LuSettings2 } from "react-icons/lu";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const AllApartments = () => {
  const axiosPublic = useAxiosPublic();

  const [currentMinValue, setCurrentMinValue] = useState(1200);
  const [currentMaxValue, setCurrentMaxValue] = useState(8000);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const { count: initialCount } = useLoaderData();

  const {
    isLoading,
    isError,
    data: queryResult,
    error,
  } = useQuery({
    queryKey: ["allApartments", currentPage, currentMinValue, currentMaxValue],
    queryFn: async () => {
      const params = new URLSearchParams();
      params.append("page", currentPage);
      if (currentMinValue !== undefined) {
        params.append("min", currentMinValue);
      }
      if (currentMaxValue !== undefined) {
        params.append("max", currentMaxValue);
      }

      const res = await axiosPublic.get(`/allApartments?${params.toString()}`);

      console.log("Fetching URL:", `/allApartments?${params.toString()}`);
      return res.data;
    },
    enabled: true,
    keepPreviousData: true,
  });

  const apartments = queryResult?.apartments || [];
  const totalItems =
    queryResult?.count !== undefined ? queryResult.count : initialCount;

  const numberOfPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const pages = Array.from({ length: numberOfPages }, (_, i) => i + 1); // 1-based page numbers

  console.log("Pages array:", pages);

  useEffect(() => {
    if (currentMinValue !== undefined || currentMaxValue !== undefined) {
      setCurrentPage(1);
    }
  }, [currentMinValue, currentMaxValue]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-xl text-blue-500"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <p>Error Loading Apartments: {error?.message || "Unknown error"}</p>
      </div>
    );
  }

  const handlePaginationBtn = (page) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < numberOfPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleMinValue = (e) => {
    setCurrentMinValue(
      e.target.value === "" ? undefined : parseInt(e.target.value)
    );
  };

  const handleMaxValue = (e) => {
    setCurrentMaxValue(
      e.target.value === "" ? undefined : parseInt(e.target.value)
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-4xl font-extrabold text-center text-gray-300 mb-10">
        Our Available Apartments
      </h2>
      <div className="flex items-center mb-6">
        <div className="flex items-center gap-2 mx-5 text-lg font-semibold text-gray-700">
          <LuSettings2 className="w-5 h-5 text-blue-500" />
          <p>Filter by Rent:</p>
        </div>
        <div className="flex items-center gap-2 mx-3">
          <label className="font-medium text-gray-600">Min:</label>
          <select
            className="select select-bordered w-full max-w-xs px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-7"
            onChange={handleMinValue}
            value={currentMinValue === undefined ? "" : currentMinValue}
          >
            <option value={1200} style={{ paddingRight: '1rem' }}>Min</option>
            <option value={1200}>1200</option>
            <option value={2000}>2000</option>
            <option value={3000}>3000</option>
            <option value={4000}>4000</option>
            <option value={5000}>5000</option>
            <option value={6000}>6000</option>
            <option value={7000}>7000</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="font-medium text-gray-600">Max:</label>
          <select
            className="select select-bordered w-full max-w-xs px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-7"
            onChange={handleMaxValue}
            value={currentMaxValue === undefined ? "" : currentMaxValue}
          >
            <option value={8000}>Max</option>
            <option value={2000}>2000</option>
            <option value={3000}>3000</option>
            <option value={4000}>4000</option>
            <option value={5000}>5000</option>
            <option value={6000}>6000</option>
            <option value={7000}>7000</option>
            <option value={8000}>8000</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {apartments.map((apartment) => (
          <ApartmentCard key={apartment._id} apartment={apartment} />
        ))}
      </div>
      <nav
        className="flex justify-center items-center gap-x-1 mt-10"
        aria-label="Pagination"
      >
        <button
          type="button"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="min-h-9.5 min-w-9.5 py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
          aria-label="Previous"
        >
          <svg
            className="shrink-0 size-3.5"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6"></path>
          </svg>
          <span className="sr-only">Previous</span>
        </button>
        <div className="flex items-center gap-x-1">
          {pages.map((page) => (
            <button
              onClick={() => handlePaginationBtn(page)}
              key={page}
              type="button"
              className={`min-h-9.5 min-w-9.5 flex justify-center items-center py-2 px-3 text-sm rounded-lg focus:outline-hidden focus:bg-gray-300 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:focus:bg-neutral-500 ${
                page === currentPage
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 dark:bg-neutral-600 dark:text-white"
              }`}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={handleNextPage}
          disabled={currentPage === numberOfPages}
          className="min-h-9.5 min-w-9.5 py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-white/10 dark:focus:bg-white/10"
          aria-label="Next"
        >
          <span className="sr-only">Next</span>
          <svg
            className="shrink-0 size-3.5"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </button>
      </nav>
    </div>
  );
};

export default AllApartments;
