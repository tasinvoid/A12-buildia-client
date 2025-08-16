import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Pagination, Navigation, Autoplay } from "swiper/modules";


import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";



import { format } from "date-fns";


import { useQuery } from "@tanstack/react-query";

import { FaSpinner } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { FiCalendar, FiCopy, FiTag } from "react-icons/fi";
import Swal from "sweetalert2";


const FloatingCoupons = () => {
  const axiosPublic = useAxiosPublic();

  
  const {
    isPending,
    isError,
    data: coupons = [], 
    error,
  } = useQuery({
    queryKey: ["coupons"], 
    queryFn: async () => {
      
      const res = await axiosPublic.get("/coupons"); 
      return res.data;
    },
    staleTime: 5 * 60 * 1000, 
    cacheTime: 10 * 60 * 1000, 
  });

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    Swal.fire({
      position: "top-mid",
      icon: "success",
      title: "Copied Coupon Code",
      showConfirmButton: false,
      timer: 1500,
    }); 
  };

  
  const activeCoupons = coupons.filter((coupon) => {
    const today = new Date();
    const validUntilDate = new Date(coupon.validUntil);
    
    return coupon.isActive && validUntilDate >= today;
  });

  
  if (isPending) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-5
                      bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-gray-100"
      >
        <FaSpinner className="animate-spin text-indigo-400 text-5xl mr-3" />
        <p className="text-xl">Loading awesome coupons...</p>
      </div>
    );
  }

  
  if (isError) {
    return (
      <div
        className="min-h-screen flex items-center justify-center p-5
                      bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-red-400 text-xl text-center"
      >
        <p>Error loading coupons: {error?.message || "Unknown error"}</p>
        <p className="text-gray-400 mt-2">
          Please try again later or contact support.
        </p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center p-5
                    bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950"
    >
      <div
        className="p-6 rounded-2xl shadow-2xl flex flex-col md:flex-row items-center
                      max-w-6xl w-full bg-gray-800 border border-gray-700 backdrop-blur-sm bg-opacity-80"
      >
        {/* Left Section - Text Content */}
        <div className="w-full md:w-2/3 md:pr-8 mb-8 md:mb-0 text-gray-300">
          <h3 className="font-bold text-4xl mb-4 text-center md:text-left text-indigo-400 drop-shadow-lg">
            Grab Your Exclusive Coupons!
          </h3>
          <p className="text-lg text-center md:text-left mb-6 text-gray-400">
            Unlock amazing discounts and special benefits for our members.
          </p>
          <p className="text-base leading-relaxed text-gray-300">
            Make your dream home even more affordable with our exclusive
            discounts and special coupons. Here, you'll find a range of savings,
            from exciting offers for new tenants to special benefits for
            existing members. Simply copy your preferred coupon code and unlock
            the best living experience in our modern residences!
          </p>
        </div>

        {/* Right Section - Swiper */}
        <div className="w-full md:w-1/3 flex justify-center items-center">
          {activeCoupons.length > 0 ? (
            <Swiper
              effect={"cards"}
              grabCursor={false}
              modules={[EffectCards, Pagination, Navigation]}
              className="mySwiper w-72 h-96"
              pagination={{ clickable: false }}
              navigation={false}
              loop={true}
            >
              {activeCoupons.map((coupon) => (
                <SwiperSlide
                  key={coupon.couponCode} 
                  className="card bg-gray-700 shadow-xl transform hover:scale-105
                             transition-transform duration-300 relative overflow-hidden
                             rounded-lg border border-gray-600 flex flex-col justify-between"
                >
                  {/* Color stripe on the left */}
                  <div
                    className={`absolute inset-y-0 left-0 w-2
                                  ${
                                    coupon.isActive &&
                                    new Date(coupon.validUntil) >= new Date()
                                      ? "bg-indigo-500"
                                      : "bg-pink-500"
                                  }
                                  transform -skew-x-12`}
                  ></div>

                  <div className="card-body p-6 flex-grow">
                    <h4 className="card-title text-xl font-semibold mb-2 text-gray-100 flex items-center">
                      <FiTag className="text-pink-400 mr-2" />
                      <span className="text-indigo-400">
                        {coupon.discountValue}% OFF
                      </span>
                    </h4>
                    <p className="text-sm text-gray-300 mb-3 leading-snug">
                      {coupon.description}
                    </p>
                    <div className="text-gray-400 text-xs flex items-center mb-4">
                      <FiCalendar className="mr-1 text-gray-500" />
                      Valid until:{" "}
                      <span className="font-medium text-gray-300 ml-1">
                        {format(new Date(coupon.validUntil), "MMM dd, yyyy")}
                      </span>
                    </div>

                    <div className="border-t border-dashed border-gray-500 py-3 text-center">
                      <span className="text-2xl font-bold tracking-wider text-green-400">
                        {coupon.couponCode}
                      </span>
                    </div>
                  </div>

                  <div className="card-actions justify-center p-4 pt-0">
                    <button
                      className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg
                                 transition duration-300 ease-in-out transform hover:scale-105
                                 flex items-center justify-center gap-2 w-full disabled:opacity-50"
                      onClick={() => handleCopyCode(coupon.couponCode)}
                      disabled={
                        !coupon.isActive ||
                        new Date(coupon.validUntil) < new Date()
                      }
                    >
                      <FiCopy /> Copy Code
                    </button>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="text-center text-gray-400 p-8 bg-gray-900 rounded-lg border border-gray-700">
              <h4 className="text-xl font-semibold text-pink-400 mb-3">
                No Active Coupons Available!
              </h4>
              <p>Please check back later for exciting offers.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FloatingCoupons;
