import axios from "axios";
import React from "react";
import UseAuth from "./UseAuth";
const axiosSecure = axios.create({
  baseURL: "https://builida-server.vercel.app",
});
const useAxiosSecure = () => {
  const { user } = UseAuth();
  axiosSecure.interceptors.request.use(
    function (config) {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  return axiosSecure;
};

export default useAxiosSecure;
