import axios from "axios";
import React from "react";

const useAxiosPublic = () => {
  const axiosPublic = axios.create({
    baseURL: "https://a12-buildia-server.vercel.app",
    //  baseURL: "http://localhost:3000",
    

  });
  return axiosPublic;
};

export default useAxiosPublic;
