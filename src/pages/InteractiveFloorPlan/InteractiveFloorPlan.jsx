import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const Typewriter = ({ text, speed }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    }
  }, [index, text, speed]);

  return <span className="font-semibold">{displayedText}</span>;
};

const Building = () => {
  const [selectedFloor, setSelectedFloor] = useState(null);
  const axiosPublic = useAxiosPublic();

  const {
    isLoading,
    data: allApartmentsData,
    isError,
    error,
  } = useQuery({
    queryKey: ["allApartmentsData"],
    queryFn: async () => {
      const result = await axiosPublic.get("/allApartmentsData");
      return result.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950">
        <span className="loading loading-spinner loading-xl text-indigo-400"></span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 text-pink-400">
        <p>Error Loading Apartments: {error?.message || "Unknown error"}</p>
      </div>
    );
  }

  const uniqueFloors = [
    ...new Set(allApartmentsData.map((unit) => unit.FloorNo)),
  ].sort((a, b) => b - a);

  const getStatus = (unit) =>
    unit.currentTenantEmail ? "occupied" : "available";

  const handleFloorClick = (floorNumber) => {
    setSelectedFloor(floorNumber);
  };

  const unitsOnSelectedFloor = allApartmentsData.filter(
    (unit) => unit.FloorNo === selectedFloor
  );

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-gray-950 via-gray-900 to-indigo-950 font-sans overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-pink-500 rounded-full mix-blend-lighten blur-3xl opacity-20 z-0 animate-pulse"></div>
      <div className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-indigo-500 rounded-full mix-blend-lighten blur-3xl opacity-20 z-0 animate-pulse-slow"></div>

      <div className="w-full max-w-7xl mx-auto md:grid md:grid-cols-3 md:gap-12 md:items-center">
        {}
        <div className="w-full mb-8 md:mb-0 col-span-1 p-6 rounded-lg backdrop-blur-sm bg-gray-800 bg-opacity-80 text-center md:text-left">
          <p className="text-gray-100 text-lg sm:text-2xl font-bold">
            <Typewriter
              text="Welcome to Buildia .The Stellar Heights Residence."
              speed={70}
            />
          </p>
          <p className="text-gray-300 text-sm mt-2">
            <Typewriter
              text="Click on a floor to see the available apartments."
              speed={50}
            />
          </p>
        </div>

        {}
        <div className="relative w-64 sm:w-80 mx-auto md:mx-0 col-span-1 flex flex-col items-center border-4 border-indigo-500 rounded-sm shadow-xl z-20">
          <div className="w-full text-center py-2 bg-indigo-950 border-b-4 border-indigo-500">
            <h2 className="text-gray-100 font-bold text-lg tracking-widest">
              STELLAR HEIGHTS
            </h2>
          </div>

          <div className="w-full flex-grow flex flex-col justify-evenly items-center p-4 bg-gray-900 border-x-4 border-indigo-500">
            {uniqueFloors.map((floor) => {
              const hasAvailableUnit = allApartmentsData.some(
                (unit) => unit.FloorNo === floor && !unit.currentTenantEmail
              );
              return (
                <button
                  key={floor}
                  onClick={() => handleFloorClick(floor)}
                  className={`w-full flex justify-between px-2 my-2 transition-transform duration-300 transform ${
                    selectedFloor === floor ? "scale-105" : "hover:scale-105"
                  }`}
                >
                  <div className="flex justify-between w-full">
                    <div className="flex space-x-1">
                      <div className="w-2 h-4 bg-gray-600 rounded-sm"></div>
                      <div className="w-2 h-4 bg-gray-600 rounded-sm"></div>
                    </div>
                    <div>
                      <span className="text-gray-100 font-semibold">
                        Floor {floor}
                      </span>
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-4 bg-gray-600 rounded-sm"></div>
                      <div className="w-2 h-4 bg-gray-600 rounded-sm"></div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="w-full flex flex-col items-center bg-indigo-950 border-t-4 border-indigo-500 py-4">
            <div className="w-1/2 h-16 bg-indigo-400 border-2 border-indigo-500"></div>
            <p className="text-gray-300 text-sm mt-2">Entrance</p>
          </div>
        </div>

        {}
        {selectedFloor && (
          <div className="w-64 mx-auto mt-8 md:mt-0 col-span-1 p-4 bg-gray-800 bg-opacity-80 backdrop-blur-sm border-4 border-indigo-500 rounded-lg shadow-xl z-30">
            <h3 className="text-gray-100 text-xl font-bold mb-2 text-center">
              Floor {selectedFloor}
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {unitsOnSelectedFloor.map((unit) => (
                <div
                  key={unit._id}
                  className={`p-2 rounded-md text-center border-2 border-indigo-500 ${
                    getStatus(unit) === "available"
                      ? "bg-indigo-600 text-gray-100"
                      : "bg-pink-500 text-gray-100"
                  }`}
                >
                  <p className="font-bold">{unit.ApartmentNo}</p>
                  <p className="text-sm">
                    {getStatus(unit).charAt(0).toUpperCase() +
                      getStatus(unit).slice(1)}
                  </p>
                </div>
              ))}
            </div>
            <button
              onClick={() => setSelectedFloor(null)}
              className="mt-4 w-full py-2 bg-indigo-600 text-gray-100 font-semibold rounded-md hover:bg-indigo-700"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Building;
