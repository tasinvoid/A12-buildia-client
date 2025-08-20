import axios from "axios";
import React from "react";
import UseAuth from "./UseAuth";
const axiosSecure = axios.create({
  baseURL: "https://a12-buildia-server.vercel.app",
  // baseURL: "http://localhost:3000",
});
const useAxiosSecure = () => {
  const { user } = UseAuth();
  axiosSecure.interceptors.request.use(
    function (config) {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
